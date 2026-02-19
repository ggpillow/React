import { useEffect, useMemo, useState } from "react";
import styles from "./ExpeditionJournal.module.css";

function getCategoryFromPost(post) {
  // В JSONPlaceholder нет категорий — имитируем их для фильтра (ДЗ)
  // Позже заменишь на реальные теги/категории из твоих данных/бэка.
  const map = {
    1: "Routes",
    2: "Gear",
    3: "Safety",
    4: "Stories",
    5: "App updates",
  };
  return map[post.userId] || "Other";
}

export function ExpeditionJournal() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });

  // ДЗ3: поиск + фильтр
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setStatus({ loading: true, error: "" });

        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        setPosts(data.slice(0, 20)); // под лендинг достаточно
      } catch (e) {
        if (e.name !== "AbortError") {
          setStatus({ loading: false, error: e.message || "Request failed" });
          return;
        }
      } finally {
        setStatus((s) => ({ ...s, loading: false }));
      }
    }

    load();
    return () => controller.abort();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(posts.map(getCategoryFromPost));
    return [...set].sort();
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return posts.filter((p) => {
      const text = `${p.title} ${p.body}`.toLowerCase();
      const byQuery = q ? text.includes(q) : true;
      const byCategory = category ? getCategoryFromPost(p) === category : true;
      return byQuery && byCategory;
    });
  }, [posts, query, category]);

  return (
    <section id="journey" className={styles.section} aria-label="Expedition journal">
      <header className={styles.header}>
        <h2 className={styles.title}>Expedition journal</h2>
        <p className={styles.subtitle}>News and notes (demo data for homework)</p>
      </header>

      <div className={styles.controls}>
        <input
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search in notes..."
          type="text"
        />

        <select
          className={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {status.loading && <p className={styles.state}>Loading journal...</p>}
      {status.error && <p className={styles.error}>Error: {status.error}</p>}

      {!status.loading && !status.error && (
        <>
          {filtered.length === 0 ? (
            <p className={styles.state}>Nothing found</p>
          ) : (
            <ul className={styles.grid}>
              {filtered.map((p) => (
                <li key={p.id} className={styles.card}>
                  <div className={styles.badge}>{getCategoryFromPost(p)}</div>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardText}>{p.body}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}