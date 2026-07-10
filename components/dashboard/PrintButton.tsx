"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="uppr-btn-primary no-print"
      style={{ padding: "12px 20px", fontSize: 14 }}
    >
      Descarcă / Printează PDF
    </button>
  );
}
