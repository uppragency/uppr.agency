"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const STORAGE_KEY = "uppr-cookie-consent";
const MOBILE_BREAKPOINT = 640;

export default function CookieBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) setVisible(true);
    } catch {
      // localStorage indisponibil — nu blocăm nimic, doar nu afișăm bannerul
    }

    function updateIsMobile() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignorăm
    }
    setVisible(false);
  }

  // nu afișăm în panourile private — acolo persoana e deja autentificată
  const isPrivateRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/dashboard") || pathname.startsWith("/login");

  // isMobile === null înseamnă că încă nu s-a determinat lățimea ecranului
  // (prima randare, pe server) — nu afișăm nimic până nu știm sigur
  if (!visible || isPrivateRoute || isMobile === null) return null;

  if (isMobile) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: "rgba(11,8,23,.95)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(168,85,247,.25)",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 11.5, color: "#A29DB8" }}>
          Folosim cookies.{" "}
          <Link href="/privacy" style={{ color: "#C084FC", textDecoration: "underline" }}>
            Detalii
          </Link>
        </span>
        <button
          onClick={accept}
          className="uppr-btn-primary"
          style={{ padding: "7px 16px", fontSize: 12, minHeight: "auto", flex: "none" }}
        >
          Accept
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        zIndex: 200,
        width: 300,
        borderRadius: 16,
        padding: 1,
        background: "linear-gradient(150deg,rgba(168,85,247,.5),rgba(255,255,255,.05))",
        boxShadow: "0 20px 50px rgba(0,0,0,.5)",
      }}
    >
      <div
        style={{
          background: "linear-gradient(165deg,#160F2E,#0B0817)",
          borderRadius: 15,
          padding: "16px 18px",
        }}
      >
        <p style={{ margin: "0 0 12px", fontSize: 12.5, lineHeight: 1.55, color: "#C4BCDC" }}>
          Folosim cookies pentru analiză și funcționare site.{" "}
          <Link href="/privacy" style={{ color: "#C084FC", textDecoration: "underline" }}>
            Detalii
          </Link>
        </p>
        <button
          onClick={accept}
          className="uppr-btn-primary"
          style={{ width: "100%", padding: "9px 14px", fontSize: 13, minHeight: "auto" }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
