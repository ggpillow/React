import styles from "./Button.module.css";

export function Button({ href, children, variant = "primary", ariaLabel, onClick }) {
  const className = `${styles.btn} ${styles[variant]}`;

  if (href) {
    return (
      <a href={href} className={className} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={className} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  );
}
