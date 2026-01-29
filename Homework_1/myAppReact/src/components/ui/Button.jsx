export function Button({ href, children, variant = "primary", ariaLabel }) {
  const style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 14px",
    borderRadius: 12,
    fontWeight: 700,
    textDecoration: "none",
    border: "1px solid #2a2f3a",
    background: variant === "secondary" ? "#1b2030" : "#6d5efc",
    color: "white",
    cursor: "pointer",
  };

  // Если передали href — это ссылка, иначе кнопка
  if (href) {
    return (
      <a href={href} style={style} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" style={style} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
