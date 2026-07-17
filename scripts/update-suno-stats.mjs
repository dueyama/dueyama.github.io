import { mkdir, readFile, rename, writeFile } from "node:fs/promises";

const API_ORIGIN = "https://studio-api-prod.suno.com";
const PROFILE_HANDLE = "donnyu";
const PROFILE_USER_ID = "2f1c6f50-b408-41bd-a6d9-04d49bdcbb7a";
const HISTORY_PATH = new URL("../data/suno-history.json", import.meta.url);
const HISTORY_TEMP_PATH = new URL("../data/suno-history.json.tmp", import.meta.url);
const PRIVATE_MAINTENANCE_DIR = new URL("../private/profile-maintenance/", import.meta.url);
const DIFF_PATH = new URL("../private/profile-maintenance/suno-latest-diff.json", import.meta.url);
const DRY_RUN = process.argv.includes("--dry-run");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function jstDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "user-agent": "dueyama-profile-suno-history/1.0",
      ...options.headers,
    },
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    throw new Error(`Suno request failed (${response.status} ${response.statusText})`);
  }

  return response.json();
}

async function fetchProfile() {
  const url = new URL(`/api/profiles/${PROFILE_HANDLE}`, API_ORIGIN);
  url.searchParams.set("playlists_sort_by", "created_at");
  url.searchParams.set("clips_sort_by", "created_at");
  const profile = await fetchJson(url);

  assert(profile.user_id === PROFILE_USER_ID, "Suno profile user ID changed");
  assert(profile.handle === PROFILE_HANDLE, "Suno profile handle changed");
  assert(Number.isInteger(profile.num_total_clips), "Suno profile song count is missing");
  assert(Number.isInteger(profile.stats?.play_count__sum), "Suno total play count is missing");
  assert(Number.isInteger(profile.stats?.upvote_count__sum), "Suno total like count is missing");
  return profile;
}

async function fetchAllSongs() {
  const songs = new Map();
  const seenCursors = new Set();
  let cursor;

  for (let page = 0; page < 100; page += 1) {
    const data = await fetchJson(new URL("/api/unified/feed", API_ORIGIN), {
      method: "POST",
      body: JSON.stringify({
        feed_id: "user_songs",
        target_user_id: PROFILE_USER_ID,
        request_metadata: { sort_by: "created_at" },
        page_size: 20,
        ...(cursor ? { cursor } : {}),
      }),
    });

    const feed = data.feed;
    assert(feed && Array.isArray(feed.items), "Suno song feed is missing");

    for (const item of feed.items) {
      const song = item?.content_item;
      if (
        item?.content_type !== "clip" ||
        song?.entity_type !== "song_schema" ||
        song?.user_id !== PROFILE_USER_ID ||
        song?.is_public !== true ||
        song?.is_trashed === true
      ) {
        continue;
      }

      assert(typeof song.id === "string" && song.id.length > 0, "A Suno song ID is missing");
      assert(typeof song.title === "string" && song.title.length > 0, `Title is missing for ${song.id}`);
      assert(Number.isInteger(song.play_count) && song.play_count >= 0, `Invalid plays for ${song.id}`);
      assert(Number.isInteger(song.upvote_count) && song.upvote_count >= 0, `Invalid likes for ${song.id}`);

      songs.set(song.id, {
        id: song.id,
        title: song.title,
        plays: song.play_count,
        likes: song.upvote_count,
        publishedAt: song.created_at || null,
      });
    }

    cursor = feed.next_cursor || null;
    if (!cursor) {
      return [...songs.values()];
    }
    assert(!seenCursors.has(cursor), `Suno feed repeated cursor ${cursor}`);
    seenCursors.add(cursor);
  }

  throw new Error("Suno feed exceeded the page safety limit");
}

function validateTotals(profile, songs) {
  assert(songs.length === profile.num_total_clips, `Expected ${profile.num_total_clips} songs, received ${songs.length}`);

  const songPlays = songs.reduce((sum, song) => sum + song.plays, 0);
  const songLikes = songs.reduce((sum, song) => sum + song.likes, 0);
  const profilePlays = profile.stats.play_count__sum;
  const profileLikes = profile.stats.upvote_count__sum;
  const playTolerance = Math.max(10, Math.ceil(profilePlays * 0.001));

  assert(Math.abs(songPlays - profilePlays) <= playTolerance, `Song plays differ from profile total by ${songPlays - profilePlays}`);
  assert(Math.abs(songLikes - profileLikes) <= 2, `Song likes differ from profile total by ${songLikes - profileLikes}`);
}

async function collectSnapshot() {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const songs = await fetchAllSongs();
    const profile = await fetchProfile();

    if (songs.length !== profile.num_total_clips && attempt === 0) {
      continue;
    }

    validateTotals(profile, songs);
    return {
      profile,
      songs: songs.sort((a, b) => b.plays - a.plays || a.title.localeCompare(b.title)),
    };
  }

  throw new Error("Suno song count changed while collecting data");
}

function validateAgainstPrevious(history, snapshot) {
  const previous = latestCompleteSnapshot(history);

  if (!previous) {
    return;
  }

  assert(snapshot.totals.plays >= previous.totals.plays, "Total plays decreased; manual review is required");

  for (const [songId, values] of Object.entries(snapshot.songs)) {
    const previousValues = previous.songs?.[songId];
    if (previousValues && Number.isInteger(previousValues.plays)) {
      assert(values.plays >= previousValues.plays, `Play count decreased for ${songId}; manual review is required`);
    }
  }
}

function latestCompleteSnapshot(history, beforeDate = null) {
  return [...history.snapshots]
    .reverse()
    .find((entry) => Number.isInteger(entry.totals?.plays) && (!beforeDate || entry.date < beforeDate));
}

function buildDiff(history, songs, snapshot) {
  const previous = latestCompleteSnapshot(history, snapshot.date);
  const knownSongIds = new Set(previous ? Object.keys(previous.songs || {}) : Object.keys(history.catalog));
  const newSongs = songs
    .filter((song) => !knownSongIds.has(song.id))
    .map((song) => ({
      id: song.id,
      title: song.title,
      url: `https://suno.com/song/${song.id}`,
      publishedAt: song.publishedAt,
      plays: song.plays,
      likes: song.likes,
    }));

  const songGains = previous
    ? songs
        .filter((song) => previous.songs?.[song.id])
        .map((song) => ({
          id: song.id,
          title: song.title,
          url: `https://suno.com/song/${song.id}`,
          plays: song.plays - previous.songs[song.id].plays,
          likes: song.likes - previous.songs[song.id].likes,
        }))
        .sort((a, b) => b.plays - a.plays || b.likes - a.likes || a.title.localeCompare(b.title))
    : [];

  return {
    generatedAt: snapshot.capturedAt,
    previousDate: previous?.date || null,
    currentDate: snapshot.date,
    totals: previous
      ? {
          plays: snapshot.totals.plays - previous.totals.plays,
          likes: snapshot.totals.likes - previous.totals.likes,
          songs: snapshot.totals.songs - previous.totals.songs,
        }
      : null,
    newSongs,
    topSongGains: songGains.slice(0, 10),
  };
}

async function main() {
  const history = JSON.parse(await readFile(HISTORY_PATH, "utf8"));
  assert(history.schemaVersion === 1, "Unsupported Suno history schema");
  assert(history.profile?.userId === PROFILE_USER_ID, "History profile user ID does not match");
  assert(Array.isArray(history.snapshots), "History snapshots are missing");

  const { profile, songs } = await collectSnapshot();
  const capturedAt = new Date().toISOString();
  const date = jstDate();
  const snapshot = {
    date,
    capturedAt,
    source: "suno-public-profile",
    totals: {
      plays: profile.stats.play_count__sum,
      likes: profile.stats.upvote_count__sum,
      songs: profile.num_total_clips,
    },
    songs: Object.fromEntries(songs.map((song) => [song.id, { plays: song.plays, likes: song.likes }])),
  };

  validateAgainstPrevious(history, snapshot);
  const diff = buildDiff(history, songs, snapshot);

  for (const song of songs) {
    const existing = history.catalog[song.id];
    history.catalog[song.id] = {
      title: song.title,
      url: `https://suno.com/song/${song.id}`,
      publishedAt: song.publishedAt || existing?.publishedAt || null,
      firstSeenOn: existing?.firstSeenOn || date,
      lastSeenOn: date,
    };
  }

  history.catalog = Object.fromEntries(
    Object.entries(history.catalog).sort(([, a], [, b]) =>
      (b.publishedAt || "").localeCompare(a.publishedAt || "") || a.title.localeCompare(b.title),
    ),
  );

  const sameDayIndex = history.snapshots.findIndex(
    (entry) => entry.date === date && entry.source === "suno-public-profile",
  );
  if (sameDayIndex >= 0) {
    history.snapshots[sameDayIndex] = snapshot;
  } else {
    history.snapshots.push(snapshot);
  }
  history.snapshots.sort((a, b) => a.date.localeCompare(b.date));

  if (!DRY_RUN) {
    await writeFile(HISTORY_TEMP_PATH, `${JSON.stringify(history, null, 2)}\n`);
    await rename(HISTORY_TEMP_PATH, HISTORY_PATH);
    await mkdir(PRIVATE_MAINTENANCE_DIR, { recursive: true });
    await writeFile(DIFF_PATH, `${JSON.stringify(diff, null, 2)}\n`);
  }

  const topFive = songs.slice(0, 5).map((song) => `${song.title}: ${song.plays} plays / ${song.likes} likes`);
  console.log(`${DRY_RUN ? "Validated" : "Recorded"} ${songs.length} public songs for ${date} JST.`);
  console.log(`Profile totals: ${snapshot.totals.plays} plays / ${snapshot.totals.likes} likes.`);
  console.log(`New public songs: ${diff.newSongs.length}.`);
  console.log(topFive.join("\n"));
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
