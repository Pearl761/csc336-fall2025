function Pill({ text, kind }) {
  const base = {
    display: "inline-block",
    padding: "0.2rem 0.6rem",
    borderRadius: "999px",
    fontSize: "0.85rem",
    marginRight: "0.5rem"
  };
  let bg = "#e5e7eb";
  let color = "#111827";
  if (kind === "genre") { bg = "#dbeafe"; color = "#1e3a8a"; }
  if (kind === "rating-high") { bg = "#dcfce7"; color = "#166534"; }
  if (kind === "rating-mid") { bg = "#f1f5f9"; color = "#0f172a"; }
  if (kind === "rating-low") { bg = "#fee2e2"; color = "#991b1b"; }
  return <span style={{ ...base, backgroundColor: bg, color }}>{text}</span>;
}

export default Pill;