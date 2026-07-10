"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <input
      type="text"
      value={q}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="Caută newsletter după titlu..."
      className="uppr-input"
      style={{ maxWidth: 320 }}
    />
  );
}
