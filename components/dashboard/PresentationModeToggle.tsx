"use client";

import { useState, useEffect } from "react";

export default function PresentationModeToggle() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("presentation-mode", active);
    return () => document.body.classList.remove("presentation-mode");
  }, [active]);

  return (
    <button
      onClick={() => setActive((a) => !a)}
      className="uppr-btn-secondary"
      style={{ padding: "8px 14px", fontSize: 12.5, minHeight: "auto" }}
      title="Ascunde cifrele exacte pentru screen-share (hover pentru a dezvălui)"
    >
      {active ? "🙈 Mod prezentare: ON" : "👁 Mod prezentare"}
    </button>
  );
}
