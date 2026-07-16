"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function FocusModeToggle({
  months,
}: {
  months: { id: string; label: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const focus = searchParams.get("focus");

  function setFocus(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("focus", value);
    } else {
      params.delete("focus");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  if (months.length < 2) return null;

  return (
    <div className="flex items-center gap-2">
      <select
        value={focus ?? ""}
        onChange={(e) => setFocus(e.target.value)}
        className="uppr-input"
        style={{ padding: "8px 12px", fontSize: 12.5, width: "auto", minHeight: "auto" }}
      >
        <option value="">Toate lunile</option>
        {months.map((m) => (
          <option key={m.id} value={m.id}>
            Doar {m.label}
          </option>
        ))}
      </select>
      {focus && (
        <button
          onClick={() => setFocus("")}
          style={{ fontSize: 12.5, color: "#C084FC", fontWeight: 600 }}
        >
          Ieși din mod focus ×
        </button>
      )}
    </div>
  );
}
