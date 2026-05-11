"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

const STEPS = [
  {
    num: "01",
    title: "Identify",
    copy: "We analyze data and trends to find the right creators for your brand.",
  },
  {
    num: "02",
    title: "Connect",
    copy: "We build authentic partnerships that align with your goals and resonate with your audience.",
  },
  {
    num: "03",
    title: "Grow",
    copy: "We optimize and scale partnerships that drive engagement, conversion and long-term brand growth.",
  },
] as const;

// SVG viewBox: 1240 x 200
//   y =  30  → step number     (e.g. "01")
//   y = 100  → line / dots
//   y = 170  → step title       (e.g. "Identify")
const POINTS = {
  one: { x: 100, y: 100 },
  two: { x: 600, y: 100 },
  three: { x: 1060, y: 100 },
  growth: { x: 1216, y: 18 },
};

// PATH_A ends with tangent pointing slightly up; PATH_B mirrors that for a smooth S.
const PATH_A = `M ${POINTS.one.x} ${POINTS.one.y} C 280 78, 420 122, ${POINTS.two.x} ${POINTS.two.y}`;
const PATH_B = `M ${POINTS.two.x} ${POINTS.two.y} C 780 78, 920 122, ${POINTS.three.x} ${POINTS.three.y}`;

// PATH_GROWTH: bull-market zigzag — higher highs, higher lows, breakout to peak.
// Sharp L-segments instead of a bezier for the trading-chart aesthetic.
//   03 (1060,100) → peak1 (1092,76) → pullback1 (1110,86)
//                 → peak2 (1148,50) → pullback2 (1166,60)
//                 → peak3 (1196,28) → final breakout to (1216,18)
const GROWTH_VERTICES = [
  { x: POINTS.three.x, y: POINTS.three.y },
  { x: 1092, y: 76 },
  { x: 1110, y: 86 },
  { x: 1148, y: 50 },
  { x: 1166, y: 60 },
  { x: 1196, y: 28 },
  { x: POINTS.growth.x, y: POINTS.growth.y },
];

const PATH_GROWTH = GROWTH_VERTICES.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

// Arrowhead: two strokes meeting at the path's end, oriented along the final segment.
const ARROWHEAD_PATH = (() => {
  const end = GROWTH_VERTICES[GROWTH_VERTICES.length - 1];
  const prev = GROWTH_VERTICES[GROWTH_VERTICES.length - 2];
  const dx = end.x - prev.x;
  const dy = end.y - prev.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const armLen = 11;
  const angle = (32 * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const a1x = -(ux * cos - uy * sin);
  const a1y = -(uy * cos + ux * sin);
  const a2x = -(ux * cos + uy * sin);
  const a2y = -(uy * cos - ux * sin);
  const p1 = { x: end.x + a1x * armLen, y: end.y + a1y * armLen };
  const p2 = { x: end.x + a2x * armLen, y: end.y + a2y * armLen };
  return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} L ${end.x} ${end.y} L ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
})();

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 900px)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion || mobile) {
        gsap.set(
          [".process-trace-a", ".process-trace-b", ".process-trace-growth", ".process-arrowhead"],
          { strokeDasharray: "none", strokeDashoffset: 0 }
        );
        gsap.set([".process-num", ".process-title", ".process-orb"], { opacity: 1 });
        gsap.set(".process-desc", { opacity: 1 });
        gsap.set(".process-light", { opacity: 0 });
        // On mobile / reduced motion, reveal title at final color immediately
        gsap.set('.process-section__title-word[data-word="0"]', { color: "rgba(8, 13, 13, 0.6)" });
        gsap.set('.process-section__title-word[data-word="1"]', { color: "rgba(8, 13, 13, 0.6)" });
        gsap.set('.process-section__title-word[data-word="2"]', { color: "#080d0d" });
        gsap.set('.process-section__title-word[data-word="3"]', { color: "#080d0d" });
        return;
      }

      // Prep dash setup for each animated trace
      const setupPath = (selector: string) => {
        gsap.set(selector, {
          strokeDasharray: (_, target) => {
            const length = (target as SVGPathElement).getTotalLength();
            return `${length} ${length}`;
          },
          strokeDashoffset: (_, target) =>
            (target as SVGPathElement).getTotalLength(),
        });
      };
      setupPath(".process-trace-a");
      setupPath(".process-trace-b");
      setupPath(".process-trace-growth");
      setupPath(".process-arrowhead");

      // Initial states
      gsap.set(".process-light", { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" });
      gsap.set(".process-orb", { opacity: 0.35, scale: 0.7, transformOrigin: "50% 50%" });
      gsap.set(".process-num", { opacity: 0.32 });
      gsap.set(".process-title", { opacity: 0.32 });
      gsap.set(".process-desc", { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2600",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ---- Phase A : 01 → 02 -----------------------------------------

      // Title word "From" wakes as the journey starts
      tl.to(
        '.process-section__title-word[data-word="0"]',
        { color: "rgba(8, 13, 13, 0.6)", duration: 0.3, ease: "power2.out" },
        0.02
      );

      // Step 01 wakes up
      tl.to(".process-num[data-i='0']", { opacity: 1, duration: 0.1 }, 0);
      tl.to(".process-title[data-i='0']", { opacity: 1, duration: 0.1 }, 0);
      tl.to(".process-orb[data-i='0']", { opacity: 1, scale: 1, duration: 0.12 }, 0);
      tl.to(".process-desc[data-i='0']", { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.04);

      // Title word "insight" darkens as the light approaches 02
      tl.to(
        '.process-section__title-word[data-word="1"]',
        { color: "rgba(8, 13, 13, 0.6)", duration: 0.35, ease: "power2.out" },
        0.75
      );

      // Light spawns at 01
      tl.to(".process-light", { opacity: 1, scale: 1, duration: 0.06 }, 0);

      // Light travels A, trace draws
      tl.to(
        ".process-light",
        {
          motionPath: { path: ".process-trace-a", align: ".process-trace-a", alignOrigin: [0.5, 0.5] },
          duration: 1,
        },
        0.06
      );
      tl.to(".process-trace-a", { strokeDashoffset: 0, duration: 1 }, 0.06);

      // 01 → 02 handoff: 01 description fades, 02 wakes up
      tl.to(".process-desc[data-i='0']", { opacity: 0, y: -10, duration: 0.18, ease: "power2.in" }, 0.95);
      tl.to(".process-num[data-i='1']", { opacity: 1, duration: 0.12 }, 1.0);
      tl.to(".process-title[data-i='1']", { opacity: 1, duration: 0.12 }, 1.0);
      tl.to(".process-orb[data-i='1']", { opacity: 1, scale: 1, duration: 0.1 }, 1.0);
      tl.to(".process-orb[data-i='1']", { scale: 1.55, duration: 0.12 }, 1.06);
      tl.to(".process-orb[data-i='1']", { scale: 1, duration: 0.14 }, 1.18);
      tl.to(".process-desc[data-i='1']", { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, 1.05);

      // ---- Phase B : 02 → 03 -----------------------------------------

      tl.to(
        ".process-light",
        {
          motionPath: { path: ".process-trace-b", align: ".process-trace-b", alignOrigin: [0.5, 0.5] },
          duration: 1,
        },
        1.35
      );
      tl.to(".process-trace-b", { strokeDashoffset: 0, duration: 1 }, 1.35);

      // Title word "to" darkens during the 02 → 03 stretch
      tl.to(
        '.process-section__title-word[data-word="2"]',
        { color: "#080d0d", duration: 0.4, ease: "power2.out" },
        1.6
      );

      // Handoff to 03
      tl.to(".process-desc[data-i='1']", { opacity: 0, y: -10, duration: 0.18, ease: "power2.in" }, 2.22);
      tl.to(".process-num[data-i='2']", { opacity: 1, duration: 0.12 }, 2.3);
      tl.to(".process-title[data-i='2']", { opacity: 1, duration: 0.12 }, 2.3);
      tl.to(".process-orb[data-i='2']", { opacity: 1, scale: 1, duration: 0.1 }, 2.3);
      tl.to(".process-orb[data-i='2']", { scale: 1.55, duration: 0.12 }, 2.36);
      tl.to(".process-orb[data-i='2']", { scale: 1, duration: 0.14 }, 2.48);
      tl.to(".process-desc[data-i='2']", { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, 2.34);

      // ---- Phase C : Growth -----------------------------------------

      // The bull-line zig-zag is longer than the smooth curve was — give it more
      // timeline space so the user can feel each peak as they scroll.
      tl.to(
        ".process-light",
        {
          motionPath: { path: ".process-trace-growth", align: ".process-trace-growth", alignOrigin: [0.5, 0.5] },
          duration: 1,
          ease: "none",
        },
        2.7
      );
      tl.to(".process-trace-growth", { strokeDashoffset: 0, duration: 1, ease: "none" }, 2.7);

      // Final title word "growth." darkens during the breakout
      tl.to(
        '.process-section__title-word[data-word="3"]',
        { color: "#080d0d", duration: 0.6, ease: "power2.out" },
        3.0
      );

      // Arrowhead draws in just as the light reaches the tip
      tl.to(".process-arrowhead", { strokeDashoffset: 0, duration: 0.18, ease: "power2.out" }, 3.62);

      // Light dissolves into the arrow head
      tl.to(".process-light", { scale: 0.3, opacity: 0, duration: 0.18 }, 3.68);

      // Subtle after-glow halo across the section as everything settles
      tl.to(".process-section__halo", { opacity: 0.7, duration: 0.4 }, 3.55);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="process-section" aria-label="Creator partnership process">
      <div className="process-section__halo" aria-hidden />

      <div className="process-section__inner">
        <header className="process-section__header">
          <p className="process-section__kicker">The journey</p>
          <h2 className="process-section__title">
            <em>
              <span className="process-section__title-word" data-word="0">From</span>{" "}
              <span className="process-section__title-word" data-word="1">insight</span>
            </em>{" "}
            <span className="process-section__title-word" data-word="2">to</span>{" "}
            <span className="process-section__title-word" data-word="3">growth.</span>
          </h2>
        </header>

        <div className="process-stage">
          <svg
            className="process-stage__svg"
            viewBox="0 0 1240 200"
            aria-hidden
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="processLightGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="38%" stopColor="#fff0d6" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#ffd9a0" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="processOrbGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="55%" stopColor="#ffe5b9" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#ffd9a0" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Step numbers (above the line) */}
            {[POINTS.one, POINTS.two, POINTS.three].map((p, i) => (
              <text
                key={`num-${i}`}
                className="process-num"
                data-i={i}
                x={p.x}
                y={42}
                textAnchor="middle"
              >
                {STEPS[i].num}
              </text>
            ))}

            {/* Base traces (faint) */}
            <path d={PATH_A} fill="none" stroke="rgba(8,13,13,0.07)" strokeWidth="1.1" strokeLinecap="round" />
            <path d={PATH_B} fill="none" stroke="rgba(8,13,13,0.07)" strokeWidth="1.1" strokeLinecap="round" />
            <path d={PATH_GROWTH} fill="none" stroke="rgba(8,13,13,0.07)" strokeWidth="1.3" strokeLinecap="round" />

            {/* Active traces (drawn by the scroll-scrubbed timeline) */}
            <path className="process-trace-a process-trace-active" d={PATH_A} />
            <path className="process-trace-b process-trace-active" d={PATH_B} />
            <path className="process-trace-growth" d={PATH_GROWTH} />
            <path className="process-arrowhead" d={ARROWHEAD_PATH} />

            {/* Stationary orbs at each step */}
            {[POINTS.one, POINTS.two, POINTS.three].map((p, i) => (
              <g
                key={`orb-${i}`}
                className="process-orb"
                data-i={i}
                style={{ transformOrigin: `${p.x}px ${p.y}px` } as React.CSSProperties}
              >
                <circle cx={p.x} cy={p.y} r="16" fill="url(#processOrbGradient)" />
                <circle cx={p.x} cy={p.y} r="4.5" fill="#fff" />
              </g>
            ))}

            {/* Moving light dot */}
            <g className="process-light">
              <circle cx="0" cy="0" r="22" fill="url(#processLightGradient)" />
              <circle cx="0" cy="0" r="5" fill="#ffffff" />
            </g>

            {/* Step titles (below the line) */}
            {[POINTS.one, POINTS.two, POINTS.three].map((p, i) => (
              <text
                key={`title-${i}`}
                className="process-title"
                data-i={i}
                x={p.x}
                y={174}
                textAnchor="middle"
              >
                {STEPS[i].title}
              </text>
            ))}
          </svg>

          {/* Description slot: only the active step's copy is visible (desktop).
              On mobile this becomes a static stacked list with num + title + copy. */}
          <div className="process-stage__desc" aria-live="polite">
            {STEPS.map((step, i) => (
              <p key={`desc-${i}`} className="process-desc" data-i={i}>
                <span className="process-desc__num" aria-hidden>{step.num}</span>
                <span className="process-desc__title" aria-hidden>{step.title}</span>
                <span className="process-desc__copy">{step.copy}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
