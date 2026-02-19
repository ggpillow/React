// src/components/HomeworkMovies/HomeworkMovies.jsx
import { useEffect, useMemo, useState } from "react";
import styles from "./HomeworkMovies.module.css";

export function HomeworkMovies() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });

  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    const TOKEN = import.meta.env.VITE_KINOPOISK_TOKEN;

    if (!TOKEN) {
      setStatus({
        loading: false,
        error:
          "Не найден токен. Проверь .env: VITE_KINOPOISK_TOKEN=... и перезапусти npm run dev",
      });
      return;
    }

    const controller = new AbortController();

    async function loadMovies() {
      try {
        setStatus({ loading: true, error: "" });

        // ВАЖНО: rating.kp диапазоном в query для v1.4 не работает (даёт 400),
        // поэтому берём список и фильтруем по рейтингу уже на фронте.
        const url =
          "https://api.kinopoisk.dev/v1.4/movie?page=1&limit=50" +
          "&selectFields=id&selectFields=name&selectFields=year&selectFields=rating&selectFields=poster&selectFields=genres" +
          "&sortField=rating.kp&sortType=-1";

        const res = await fetch(url, {
          method: "GET",
          headers: {
            "X-API-KEY": TOKEN,
            accept: "application/json",
          },
          signal: controller.signal,
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status} ${res.statusText}. ${text}`);
        }

        const data = await res.json();
        setMovies(Array.isArray(data?.docs) ? data.docs : []);
        setStatus({ loading: false, error: "" });
      } catch (e) {
        if (e.name === "AbortError") return;
        setStatus({ loading: false, error: e.message || "Request failed" });
      }
    }

    loadMovies();
    return () => controller.abort();
  }, []);

  const genres = useMemo(() => {
    const set = new Set();
    for (const m of movies) {
      for (const g of m?.genres ?? []) {
        if (g?.name) set.add(g.name);
      }
    }
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [movies]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return movies.filter((m) => {
      const title = (m?.name ?? "").toLowerCase();
      const byQuery = q ? title.includes(q) : true;

      const mGenres = (m?.genres ?? []).map((x) => x?.name).filter(Boolean);
      const byGenre = genre ? mGenres.includes(genre) : true;

      // Фильтр по рейтингу KP 6..10 (теперь на фронте)
      const kp = m?.rating?.kp;
      const byRating = typeof kp === "number" ? kp >= 6 && kp <= 10 : false;

      return byQuery && byGenre && byRating;
    });
  }, [movies, query, genre]);

  return (
    <section className={styles.section} aria-label="Movies">
      <header className={styles.header}>
        <h2 className={styles.title}>Movies (Kinopoisk)</h2>
        <p className={styles.subtitle}>Search + filter (homework)</p>
      </header>

      <div className={styles.controls}>
        <input
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title..."
          type="text"
        />

        <select
          className={styles.select}
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">All genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {status.loading && <p className={styles.state}>Loading...</p>}
      {status.error && <p className={styles.error}>Error: {status.error}</p>}

      {!status.loading && !status.error && (
        <>
          {filtered.length === 0 ? (
            <p className={styles.state}>Nothing found</p>
          ) : (
            <ul className={styles.grid}>
              {filtered.map((m) => {
                const posterUrl = m?.poster?.previewUrl || m?.poster?.url;
                const rating = m?.rating?.kp;

                return (
                  <li key={m.id} className={styles.card}>
                    {posterUrl ? (
                      <img
                        className={styles.poster}
                        src={posterUrl}
                        alt={m?.name || "Movie poster"}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.posterStub}>No poster</div>
                    )}

                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{m?.name || "—"}</h3>

                      <div className={styles.meta}>
                        <span>{m?.year || "—"}</span>
                        <span>
                          KP:{" "}
                          {typeof rating === "number" ? rating.toFixed(1) : "—"}
                        </span>
                      </div>

                      <p className={styles.genres}>
                        {(m?.genres ?? [])
                          .map((g) => g?.name)
                          .filter(Boolean)
                          .slice(0, 3)
                          .join(", ") || "—"}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </section>
  );
}