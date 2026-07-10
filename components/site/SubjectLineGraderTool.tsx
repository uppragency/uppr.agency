"use client";

import { useState } from "react";
import { analyze, placeholderFor, type Lang } from "@/lib/subject-line-grader";

const mono = { fontFamily: "var(--font-mono-label), monospace" } as const;
const heading = { fontFamily: "var(--font-heading), sans-serif" } as const;

function LangButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "8px 16px",
        borderRadius: 999,
        border: `1px solid ${active ? "rgba(168,85,247,.35)" : "rgba(255,255,255,.12)"}`,
        background: active ? "rgba(168,85,247,.18)" : "transparent",
        color: active ? "#F5F3FF" : "#A29DB8",
        fontWeight: 600,
        fontSize: 12.5,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function ProviderTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "6px 13px",
        borderRadius: 999,
        border: `1px solid ${active ? "rgba(168,85,247,.35)" : "rgba(255,255,255,.12)"}`,
        background: active ? "rgba(168,85,247,.18)" : "transparent",
        color: active ? "#F5F3FF" : "#A29DB8",
        fontWeight: 600,
        fontSize: 12,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function CheckRow({ status, title, detail }: { status: string; title: string; detail: string }) {
  const iconColor = status === "pass" ? "#4ADE80" : status === "warn" ? "#FBBF24" : "#FF6B9D";
  const iconChar = status === "pass" ? "✓" : status === "warn" ? "!" : "✕";
  return (
    <div style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
      <span
        style={{
          flex: "none",
          width: 22,
          height: 22,
          borderRadius: 999,
          background: `${iconColor}22`,
          color: iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {iconChar}
      </span>
      <span>
        <strong style={{ color: "#F5F3FF", fontWeight: 600, fontSize: 14.5 }}>{title}</strong>
        <br />
        <span style={{ fontSize: 13.5, color: "#A29DB8", lineHeight: 1.5 }}>{detail}</span>
      </span>
    </div>
  );
}

export default function SubjectLineGraderTool() {
  const [subject, setSubject] = useState("");
  const [forcedLang, setForcedLang] = useState<"auto" | Lang>("auto");
  const [provider, setProvider] = useState<"gmail" | "yahoo" | "outlook">("gmail");

  const result = analyze(subject, forcedLang);

  const senderPreview = {
    gmail: "— Don't miss out on this update from our team...",
    yahoo: "- Here's what's new this week, just for you...",
    outlook: "— A quick note on your account this week",
  }[provider];

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px clamp(18px,5vw,28px) 0" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 14 }}>
        <LangButton active={forcedLang === "auto"} onClick={() => setForcedLang("auto")}>Auto-detect</LangButton>
        <LangButton active={forcedLang === "en"} onClick={() => setForcedLang("en")}>English</LangButton>
        <LangButton active={forcedLang === "ro"} onClick={() => setForcedLang("ro")}>Română</LangButton>
      </div>

      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        maxLength={150}
        autoComplete="off"
        placeholder={placeholderFor(forcedLang)}
        className="uppr-input"
        style={{ fontSize: 16, padding: "16px 18px" }}
      />

      {result ? (
        <div style={{ marginTop: 28 }}>
          <div className="uppr-card">
            <div className="uppr-card-inner" style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}>
                <div className="grad-text" style={{ ...heading, fontWeight: 700, fontSize: 56, lineHeight: 1 }}>{result.score}</div>
                <div style={{ fontSize: 11, color: "#6E6980", ...mono, letterSpacing: ".06em", textTransform: "uppercase", marginTop: 4 }}>/ 100</div>
              </div>
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{ ...heading, fontWeight: 700, fontSize: 20, color: "#F5F3FF" }}>{result.label}</div>
                  <span style={{ fontWeight: 600, fontSize: 10.5, ...mono, letterSpacing: ".04em", textTransform: "uppercase", color: "#A855F7", background: "rgba(168,85,247,.12)", border: "1px solid rgba(168,85,247,.3)", padding: "3px 9px", borderRadius: 999 }}>
                    {result.langBadge}{forcedLang === "auto" ? " · auto" : ""}
                  </span>
                </div>
                <div style={{ fontSize: 14, color: "#A29DB8", lineHeight: 1.5 }}>{result.summary}</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20, borderRadius: 16, padding: 1, background: "linear-gradient(160deg,rgba(168,85,247,.35),rgba(255,255,255,.04))" }}>
            <div style={{ borderRadius: 15, background: "rgba(14,9,26,.6)", padding: "clamp(18px,3vw,24px)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 12, ...mono, letterSpacing: ".08em", textTransform: "uppercase", color: "#6E6980" }}>
                  Inbox preview
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <ProviderTab active={provider === "gmail"} onClick={() => setProvider("gmail")}>Gmail</ProviderTab>
                  <ProviderTab active={provider === "yahoo"} onClick={() => setProvider("yahoo")}>Yahoo</ProviderTab>
                  <ProviderTab active={provider === "outlook"} onClick={() => setProvider("outlook")}>Outlook</ProviderTab>
                </div>
              </div>

              <div style={{ fontSize: 11, color: "#6E6980", marginBottom: 6, ...mono }}>Desktop</div>
              <div style={{ background: "#fff", borderRadius: 8, overflow: "hidden", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderBottom: "1px solid #f1f1f1", fontFamily: "Arial,sans-serif" }}>
                  <span style={{ fontWeight: 700, color: "#202124", fontSize: 13.5, width: 100, flex: "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Your Brand</span>
                  <span style={{ flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: 13.5 }}>
                    <span style={{ color: "#202124", fontWeight: 700 }}>{subject}</span>
                    <span style={{ color: "#5f6368" }}> {senderPreview}</span>
                  </span>
                  <span style={{ fontSize: 12, color: "#5f6368", flex: "none" }}>2:14 PM</span>
                </div>
              </div>

              <div style={{ fontSize: 11, color: "#6E6980", marginBottom: 6, ...mono }}>Mobile</div>
              <div style={{ background: "#fff", borderRadius: 8, overflow: "hidden", maxWidth: 300, fontFamily: "Arial,sans-serif" }}>
                <div style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
                    <span style={{ fontWeight: 700, color: "#202124", fontSize: 13.5 }}>Your Brand</span>
                    <span style={{ fontSize: 11.5, color: "#5f6368" }}>2:14 PM</span>
                  </div>
                  <div style={{ color: "#202124", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{subject}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20, borderRadius: 16, padding: 1, background: "linear-gradient(160deg,rgba(168,85,247,.35),rgba(255,255,255,.04))" }}>
            <div style={{ borderRadius: 15, background: "rgba(14,9,26,.6)", padding: "clamp(18px,3vw,24px)" }}>
              <div style={{ fontWeight: 700, fontSize: 12, ...mono, letterSpacing: ".08em", textTransform: "uppercase", color: "#6E6980", marginBottom: 8 }}>
                Breakdown
              </div>
              {result.checks.map((c, i) => (
                <CheckRow key={i} status={c.status} title={c.title} detail={c.detail} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 40, textAlign: "center", padding: "40px 20px", borderRadius: 16, border: "1px dashed rgba(168,85,247,.25)" }}>
          <p style={{ margin: 0, fontSize: 14.5, color: "#6E6980" }}>Your score and breakdown will appear here.</p>
        </div>
      )}
    </div>
  );
}
