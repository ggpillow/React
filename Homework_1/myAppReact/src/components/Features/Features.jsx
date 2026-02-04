import { useState } from "react"
import styles from "./Features.module.css"

export function Features({ items = [] }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <section className={styles.section} aria-label="Features">
      <div className={styles.head}>
        <h2 className={styles.title}>Features</h2>

        <button
          type="button"
          className={styles.toggle}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "Hide" : "Show"}
        </button>
      </div>

      {isOpen ? (
        <ul className={styles.list}>
          {items.map((f) => (
            <li key={f.id} className={`${styles.card} ${styles[`icon_${f.icon}`]}`}>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardText}>{f.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.hint}>Features are hidden.</p>
      )}
    </section>
  );
}
