"use client";

import { motion, useReducedMotion } from "framer-motion";

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

// Single source of truth for animation choreography
const TIMING = {
  segA: { duration: 1.4, delay: 0.0 }, // 01 → 02
  segB: { duration: 1.4, delay: 1.4 }, // 02 → 03
  growth: { duration: 0.8, delay: 3.5 }, // 03 → upward arrow
  orbPulse: [0.8, 2.1, 3.2], // pulse moments per orb
  stepReveal: [0.0, 1.4, 2.8],
};

const VIEWPORT = { once: true, amount: 0.35 } as const;

// Anchor points (matching the column centers of the step grid)
const POINTS = {
  one: { x: 100, y: 112 },
  two: { x: 600, y: 112 },
  three: { x: 1080, y: 112 },
  growth: { x: 1200, y: 18 },
};

const PATH_A = `M ${POINTS.one.x} ${POINTS.one.y} C 260 72, 430 156, ${POINTS.two.x} ${POINTS.two.y}`;
const PATH_B = `M ${POINTS.two.x} ${POINTS.two.y} C 778 70, 920 152, ${POINTS.three.x} ${POINTS.three.y}`;
const PATH_GROWTH = `M ${POINTS.three.x} ${POINTS.three.y} C 1118 96, 1158 60, ${POINTS.growth.x} ${POINTS.growth.y}`;

const easeOut = [0.2, 0.75, 0.18, 1] as const;

export default function Process() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <div className="process" aria-label="Creator partnership process">
      <svg
        className="process__svg"
        viewBox="0 0 1240 180"
        aria-hidden
        preserveAspectRatio="none"
      >
        <defs>
          <marker
            id="growthArrow"
            viewBox="0 0 12 12"
            refX="6"
            refY="6"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path
              d="M1 1 L11 6 L1 11 L4 6 Z"
              fill="rgba(8,13,13,0.62)"
            />
          </marker>
        </defs>

        {/* Static base traces — always visible at low contrast */}
        <path className="process__trace-base" d={PATH_A} />
        <path className="process__trace-base" d={PATH_B} />
        <path className="process__trace-base" d={PATH_GROWTH} opacity="0.35" />

        {/* Animated segment A (01 → 02) */}
        <motion.path
          className="process__trace-active"
          d={PATH_A}
          initial={prefersReduced ? false : { pathLength: 0 }}
          whileInView={prefersReduced ? undefined : { pathLength: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: TIMING.segA.duration, delay: TIMING.segA.delay, ease: easeOut }}
        />

        {/* Animated segment B (02 → 03) */}
        <motion.path
          className="process__trace-active"
          d={PATH_B}
          initial={prefersReduced ? false : { pathLength: 0 }}
          whileInView={prefersReduced ? undefined : { pathLength: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: TIMING.segB.duration, delay: TIMING.segB.delay, ease: easeOut }}
        />

        {/* Growth arrow */}
        <motion.path
          className="process__growth-trace"
          d={PATH_GROWTH}
          markerEnd="url(#growthArrow)"
          initial={prefersReduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={
            prefersReduced
              ? undefined
              : { pathLength: 1, opacity: 1 }
          }
          viewport={VIEWPORT}
          transition={{
            pathLength: {
              duration: TIMING.growth.duration,
              delay: TIMING.growth.delay,
              ease: [0.5, 0, 0.18, 1],
            },
            opacity: { duration: 0.18, delay: TIMING.growth.delay },
          }}
        />

        {/* Glowing orbs at each step — fade in as line arrives, then pulse */}
        {[POINTS.one, POINTS.two, POINTS.three].map((p, i) => (
          <motion.g
            key={i}
            className="process__orb"
            initial={prefersReduced ? false : { opacity: 0, scale: 0.6 }}
            whileInView={
              prefersReduced
                ? undefined
                : {
                    opacity: [0, 1, 1, 1, 0.92],
                    scale: [0.6, 1, 1.45, 1, 1],
                  }
            }
            viewport={VIEWPORT}
            style={{ originX: `${p.x}px`, originY: `${p.y}px`, transformBox: "fill-box" } as React.CSSProperties}
            transition={{
              duration: 1.4,
              delay: TIMING.stepReveal[i],
              times: [0, 0.18, 0.55, 0.78, 1],
              ease: "easeOut",
            }}
          >
            <circle cx={p.x} cy={p.y} r="9" fill="#fff" />
            <circle cx={p.x} cy={p.y} r="14" fill="rgba(255, 240, 220, 0.36)" />
          </motion.g>
        ))}

        {/* Per-orb pulse rings — emit at exact glow moments */}
        {[POINTS.one, POINTS.two, POINTS.three].map((p, i) => (
          <motion.circle
            key={`pulse-${i}`}
            cx={p.x}
            cy={p.y}
            r={9}
            fill="none"
            stroke="rgba(172, 126, 82, 0.5)"
            strokeWidth="1"
            initial={prefersReduced ? false : { opacity: 0, scale: 1 }}
            whileInView={
              prefersReduced
                ? undefined
                : { opacity: [0, 0.85, 0], scale: [1, 2.6, 3.2] }
            }
            viewport={VIEWPORT}
            style={{ originX: `${p.x}px`, originY: `${p.y}px`, transformBox: "fill-box" } as React.CSSProperties}
            transition={{
              duration: 0.9,
              delay: TIMING.orbPulse[i],
              ease: "easeOut",
            }}
          />
        ))}
      </svg>

      {STEPS.map((step, i) => (
        <motion.article
          key={step.num}
          className={`process-step process-step--${["one", "two", "three"][i]}`}
          initial={prefersReduced ? false : { opacity: 0, y: 18 }}
          whileInView={
            prefersReduced
              ? undefined
              : { opacity: 1, y: 0 }
          }
          viewport={VIEWPORT}
          transition={{
            duration: 0.7,
            delay: TIMING.stepReveal[i] + 0.2,
            ease: easeOut,
          }}
        >
          <span>{step.num}</span>
          <h3>{step.title}</h3>
          <p>{step.copy}</p>
        </motion.article>
      ))}
    </div>
  );
}
