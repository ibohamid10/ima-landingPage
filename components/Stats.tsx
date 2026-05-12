"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

type Chart = "arc" | "ring" | "ticks" | "ring-full";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  source?: string;
  chart: Chart;
};

const LANDSCAPE: Stat[] = [
  {
    value: 480,
    prefix: "$",
    suffix: "B",
    label: "Projected size of the global creator economy by 2027.",
    source: "Goldman Sachs, 2024",
    chart: "arc",
  },
  {
    value: 81,
    suffix: "%",
    label: "Of Gen Z trust creator recommendations more than traditional advertising.",
    source: "Morning Consult, 2024",
    chart: "ring",
  },
];

const PROMISE: Stat[] = [
  {
    value: 30,
    suffix: " days",
    label: "From kickoff to your first creator launch — never longer.",
    chart: "ticks",
  },
  {
    value: 100,
    suffix: "%",
    label: "Manually vetted, hand-picked creators. No algorithmic matching.",
    chart: "ring-full",
  },
];

const easeOut = [0.2, 0.75, 0.18, 1] as const;

function Counter({ stat, inView }: { stat: Stat; inView: boolean }) {
  const prefersReduced = useReducedMotion();
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      setDisplay(stat.value);
      return;
    }
    const controls = animate(mv, stat.value, {
      duration: 1.4,
      ease: easeOut,
    });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, prefersReduced, stat.value, mv, rounded]);

  return (
    <span className="stat__number">
      {stat.prefix}
      {display}
      {stat.suffix}
    </span>
  );
}

function ChartGlyph({ chart, value, inView }: { chart: Chart; value: number; inView: boolean }) {
  if (chart === "arc") {
    // Growth arc — sweeping curve that draws in.
    return (
      <svg viewBox="0 0 96 96" aria-hidden>
        <path
          className="stat__chart-stroke"
          d="M 8 80 Q 36 80 52 56 T 88 16"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={inView ? 0 : 1}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.2,0.75,0.18,1) 0.1s" }}
        />
        <circle cx="88" cy="16" r="2.6" className="stat__chart-fill"
          style={{ opacity: inView ? 1 : 0, transition: "opacity 320ms ease 1.5s" }} />
      </svg>
    );
  }
  if (chart === "ring") {
    // 81% — filled pie wedge that sweeps in from 12 o'clock clockwise.
    // Built from a stroked circle with strokeWidth = 2 * r so the stroke
    // fills the entire disc; stroke-dasharray then carves the wedge.
    const wedgeR = 20;
    const wedgeCirc = 2 * Math.PI * wedgeR;
    const wedgeOffset = wedgeCirc * (1 - value / 100);
    return (
      <svg viewBox="0 0 96 96" aria-hidden className="stat__chart-svg stat__chart-svg--wedge">
        <circle cx="48" cy="48" r="40" className="stat__chart-track" />
        <circle
          cx="48"
          cy="48"
          r={wedgeR}
          fill="none"
          stroke="rgba(10, 13, 16, 0.88)"
          strokeWidth={2 * wedgeR}
          strokeDasharray={wedgeCirc}
          strokeDashoffset={inView ? wedgeOffset : wedgeCirc}
          style={{
            transition: "stroke-dashoffset 1.4s cubic-bezier(0.2,0.75,0.18,1) 0.15s",
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
        />
        {/* Hairline on top to keep the rim crisp against the track. */}
        <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(10, 13, 16, 0.78)" strokeWidth="1" />
      </svg>
    );
  }
  if (chart === "ticks") {
    // 30 days — thirty short vertical ticks that reveal in sequence.
    return (
      <svg viewBox="0 0 96 96" aria-hidden>
        {Array.from({ length: 30 }).map((_, i) => {
          const col = i % 10;
          const row = Math.floor(i / 10);
          const x = 6 + col * 9;
          const y = 28 + row * 18;
          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={x}
              y2={y + 10}
              className="stat__chart-stroke"
              style={{
                opacity: inView ? 0.84 : 0,
                transition: `opacity 240ms ease ${0.1 + i * 0.035}s`,
              }}
            />
          );
        })}
      </svg>
    );
  }
  // 100% — the same wedge primitive as 81%, filled all the way. Pairs
  // the two stats visually: one incomplete, one complete.
  const fullR = 20;
  const fullCirc = 2 * Math.PI * fullR;
  return (
    <svg viewBox="0 0 96 96" aria-hidden className="stat__chart-svg stat__chart-svg--wedge">
      <circle cx="48" cy="48" r="40" className="stat__chart-track" />
      <circle
        cx="48"
        cy="48"
        r={fullR}
        fill="none"
        stroke="rgba(10, 13, 16, 0.88)"
        strokeWidth={2 * fullR}
        strokeDasharray={fullCirc}
        strokeDashoffset={inView ? 0 : fullCirc}
        style={{
          transition: "stroke-dashoffset 1.4s cubic-bezier(0.2,0.75,0.18,1) 0.15s",
          transform: "rotate(-90deg)",
          transformOrigin: "center",
        }}
      />
      <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(10, 13, 16, 0.78)" strokeWidth="1" />
    </svg>
  );
}

function StatBlock({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="stat"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: easeOut }}
    >
      <Counter stat={stat} inView={inView} />
      <div className="stat__chart" aria-hidden>
        <ChartGlyph chart={stat.chart} value={stat.value} inView={inView} />
      </div>
      <div className="stat__body">
        <p className="stat__label">{stat.label}</p>
        {stat.source ? <p className="stat__source">{stat.source}</p> : null}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="stats" aria-label="The opportunity and our commitment">
      <div className="stats__inner">
        <motion.p
          className="stats__top-rule"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <span>Section 04 — Facts · 2024</span>
        </motion.p>

        <header className="stats__header">
          <motion.p
            className="stats__kicker"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            The opportunity, our commitment
          </motion.p>

          <motion.h2
            className="stats__title"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
          >
            Why creator partnerships, <em>why now.</em>
          </motion.h2>
        </header>

        <div className="stats__grid">
          <div className="stats__column">
            <p className="stats__column-label">The landscape</p>
            {LANDSCAPE.map((stat, i) => (
              <StatBlock key={stat.value} stat={stat} delay={0.18 + i * 0.12} />
            ))}
          </div>

          <div className="stats__divider" aria-hidden />

          <div className="stats__column stats__column--offset">
            <p className="stats__column-label">Our promise</p>
            {PROMISE.map((stat, i) => (
              <StatBlock key={stat.value} stat={stat} delay={0.26 + i * 0.12} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
