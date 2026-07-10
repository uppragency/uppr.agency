"use client";

import { useEffect } from "react";

/**
 * Reimplementare React a comportamentelor din scriptul original DC-builder
 * (data-reveal, data-count-to, data-bar, data-parallax, data-tilt, umbra nav
 * la scroll). Se montează o singură dată în layout-ul public și scanează
 * DOM-ul după atributele data-* de mai jos — identic funcțional cu originalul.
 */
export default function SiteInteractions() {
  useEffect(() => {
    const root = document;

    // Reveal + count-up + bar-fill, la intrarea în viewport
    function animCount(el: HTMLElement) {
      const to = parseFloat(el.dataset.countTo || "0");
      const suf = el.dataset.suffix || "";
      const dur = 1600;
      const start = performance.now();
      const fmt = (n: number) => (to >= 10000 ? n.toLocaleString("en-US") : String(n));
      function step(t: number) {
        const p = Math.min(1, (t - start) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(to * e)) + suf;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "none";
          if (el.dataset.countTo != null) animCount(el);
          if (el.dataset.bar != null) el.style.height = el.dataset.bar;
          io.unobserve(el);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => io.observe(el));

    // Parallax pe mișcarea cursorului
    const parallaxEls = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    function onMove(e: PointerEvent) {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      parallaxEls.forEach((el) => {
        const d = parseFloat(el.dataset.parallax || "0.3");
        el.style.transform = `translate(${cx * d * 40}px, ${cy * d * 40}px)`;
      });
    }
    window.addEventListener("pointermove", onMove, { passive: true });

    // Tilt 3D la hover
    const tiltEls = Array.from(root.querySelectorAll<HTMLElement>("[data-tilt]"));
    const tiltHandlers = tiltEls.map((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(800px) rotateX(${-py * 5}deg) rotateY(${px * 5}deg) translateY(-4px)`;
      };
      const leave = () => {
        el.style.transform = "none";
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return { el, move, leave };
    });

    // Umbra/fundalul navbar-ului la scroll
    function onScroll() {
      const nav = document.getElementById("lm-nav");
      if (nav) {
        const s = window.scrollY > 16;
        nav.style.boxShadow = s ? "0 10px 40px rgba(0,0,0,.5)" : "0 8px 40px rgba(0,0,0,.35)";
        nav.style.background = s ? "rgba(10,6,20,.75)" : "rgba(14,9,26,.55)";
      }
      updateManifesto();
    }

    // Reveal progresiv al cuvintelor din secțiunea Manifesto, pe măsură ce
    // secțiunea traversează viewport-ul (identic cu updateManifesto original)
    function updateManifesto() {
      const root = document.getElementById("lm-manifesto");
      if (!root) return;
      const words = Array.from(root.querySelectorAll<HTMLElement>("[data-mword]"));
      if (!words.length) return;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const end = vh * 0.35;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (rect.height + (start - end))));
      const activeCount = Math.round(progress * words.length);
      words.forEach((w, i) => {
        w.style.color = i < activeCount ? "#F5F3FF" : "#3A3450";
      });
    }
    updateManifesto();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Ascunde elemente marcate pe ecrane foarte înguste
    const narrowEls = Array.from(root.querySelectorAll<HTMLElement>("[data-hide-narrow]"));
    const mq = window.matchMedia("(max-width: 420px)");
    const applyNarrow = () => {
      narrowEls.forEach((el) => {
        el.style.display = mq.matches ? "none" : "";
      });
    };
    applyNarrow();
    mq.addEventListener("change", applyNarrow);

    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", applyNarrow);
      tiltHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    };
  }, []);

  return null;
}
