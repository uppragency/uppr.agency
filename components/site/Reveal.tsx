import type { CSSProperties, ReactNode } from "react";

/**
 * Wrapper pentru elemente cu animație "reveal" (fade-in + slide-up la scroll).
 * Starea inițială (opacity 0, translateY) e setată inline; SiteInteractions
 * o inversează prin IntersectionObserver la intrarea în viewport.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  style,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div
      data-reveal=""
      className={className}
      style={{
        opacity: 0,
        transform: `translateY(${y}px)`,
        transition: `opacity .7s cubic-bezier(.2,.8,.2,1) ${delay}s, transform .7s cubic-bezier(.2,.8,.2,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
