"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const HEADLINE_PRE = ["Let’s", "build", "something", "that"];
const HEADLINE_POST = ["culture."];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, delay, ease: [0.2, 0.75, 0.18, 1] as const },
  }),
};

export default function CTA() {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Magnetic cursor pull — the button drifts toward the cursor when it gets
  // within MAX_DIST. Disabled if prefers-reduced-motion or coarse pointer.
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const MAX_DIST = 160;
    const STRENGTH = 0.32;
    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      // Critically damped follow
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      btn.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;
      if (Math.abs(currentX - targetX) > 0.05 || Math.abs(currentY - targetY) > 0.05) {
        raf = requestAnimationFrame(animate);
      } else {
        raf = 0;
      }
    };

    const onMove = (event: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < MAX_DIST) {
        const falloff = 1 - dist / MAX_DIST;
        targetX = dx * STRENGTH * falloff;
        targetY = dy * STRENGTH * falloff;
      } else {
        targetX = 0;
        targetY = 0;
      }
      if (!raf) raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
      btn.style.transform = "";
    };
  }, []);

  return (
    <section className="cta" id="partner" aria-label="Start a partnership">
      <div className="cta__mesh" aria-hidden />

      <div className="cta__inner">
        <motion.p
          className="cta__kicker"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.2, 0.75, 0.18, 1] }}
        >
          Ready when you are
        </motion.p>

        <h2 className="cta__headline">
          {HEADLINE_PRE.map((word, i) => (
            <motion.span
              key={`pre-${i}`}
              className="cta__word"
              variants={reveal}
              custom={0.08 + i * 0.08}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {word}
            </motion.span>
          ))}
          <motion.em
            className="cta__word cta__word--accent"
            variants={reveal}
            custom={0.44}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            moves
          </motion.em>
          {HEADLINE_POST.map((word, i) => (
            <motion.span
              key={`post-${i}`}
              className="cta__word"
              variants={reveal}
              custom={0.52 + i * 0.08}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          className="cta__copy"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.2, 0.75, 0.18, 1] }}
        >
          Tell us about the brand and the audience you want to reach. We’ll come back with a
          shortlist of creators and a draft partnership concept within seven days.
        </motion.p>

        <motion.div
          className="cta__actions"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.85, ease: [0.2, 0.75, 0.18, 1] }}
        >
          <a
            ref={buttonRef}
            className="cta__button"
            href="mailto:partnership@ajione.com?subject=Partnership%20inquiry"
            data-analytics-event="cta_partnership_click"
            data-analytics-label="CTA section start partnership"
          >
            <span>Start a partnership</span>
            <span className="cta__button-arrow" aria-hidden>
              →
            </span>
          </a>

          <div className="cta__live" aria-live="polite">
            <span className="cta__pulse" aria-hidden />
            <span className="cta__live-text">
              Next kickoff slot — <strong>June 2026</strong>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
