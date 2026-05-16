"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Diagram = "fit" | "context" | "relevance" | "signal";

type CardData = {
  num: string;
  title: string;
  copy: string;
  diagram: Diagram;
};

const CARDS: CardData[] = [
  {
    num: "01",
    title: "Brand Fit",
    copy: "We ensure alignment with your identity, values and long-term vision.",
    diagram: "fit",
  },
  {
    num: "02",
    title: "Audience Context",
    copy: "We deep-dive into audience insight to drive relevance and real impact.",
    diagram: "context",
  },
  {
    num: "03",
    title: "Creator Relevance",
    copy: "We identify creators whose content, style and voice resonate authentically.",
    diagram: "relevance",
  },
  {
    num: "04",
    title: "Cultural Signal",
    copy: "We build into relationships audiences already care about.",
    diagram: "signal",
  },
];

const ROTATE_INTERVAL = 3800;
const introEase = [0.2, 0.75, 0.18, 1] as const;

export default function Approach() {
  const prefersReduced = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const userOverride = useRef(false);

  useEffect(() => {
    if (prefersReduced || paused) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % CARDS.length);
    }, ROTATE_INTERVAL);
    return () => window.clearInterval(id);
  }, [prefersReduced, paused]);

  const handleEnter = useCallback((index: number) => {
    userOverride.current = true;
    setPaused(true);
    setActiveIndex(index);
  }, []);

  const handleLeave = useCallback(() => {
    userOverride.current = false;
    setPaused(false);
  }, []);

  return (
    <section className="approach" id="approach" aria-label="Our approach">
      <div className="approach__blend" aria-hidden />
      <div className="approach__wash" aria-hidden />

      <div className="approach__intro">
        {[
          <p key="kicker" className="section-kicker">Our approach</p>,
          <h2 key="title">
            <span>Built on strategy.</span>
            <em>Driven by creators.</em>
          </h2>,
          <div key="rule" className="approach__rule" aria-hidden />,
          <p key="copy">
            We combine brand positioning, audience insight and creator relevance to build
            partnerships that feel natural, selective and commercially meaningful.
          </p>,
        ].map((child, i) => (
          <motion.div
            key={(child as React.ReactElement).key ?? i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.72, delay: 0.08 + i * 0.1, ease: introEase }}
          >
            {child}
          </motion.div>
        ))}
      </div>

      <div
        className="approach__pillars"
        aria-label="Partnership pillars"
        onMouseLeave={handleLeave}
        style={{ ["--active" as never]: activeIndex }}
      >
        <div className="approach__grid">
          {CARDS.map((card, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.article
                key={card.num}
                className={`pillar-card${isActive ? " pillar-card--active" : ""}`}
                aria-current={isActive ? "true" : undefined}
                onMouseEnter={() => handleEnter(index)}
                onFocus={() => handleEnter(index)}
                onClick={() => handleEnter(index)}
                tabIndex={0}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.72,
                  delay: 0.18 + index * 0.08,
                  ease: introEase,
                }}
              >
                <span className="pillar-card__num">{card.num}</span>
                <h3>{card.title}</h3>
                <div className="pillar-card__rule" aria-hidden />
                <p>{card.copy}</p>
                <div className="pillar-card__diagram" aria-hidden>
                  <Diagram kind={card.diagram} active={isActive && !prefersReduced} />
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="approach__thread" aria-hidden>
          <div className="approach__thread-line" />
          <div className="approach__thread-stations">
            {CARDS.map((card) => (
              <span key={card.num} />
            ))}
          </div>
          <div className="approach__thread-pulse" />
        </div>
      </div>
    </section>
  );
}

function Diagram({ kind, active }: { kind: Diagram; active: boolean }) {
  const cls = `pdiag pdiag--${kind}${active ? " is-active" : ""}`;
  switch (kind) {
    case "fit":
      return (
        <svg className={cls} viewBox="0 0 140 96" fill="none" aria-hidden>
          <circle className="pdiag__a" cx="56" cy="48" r="30" />
          <circle className="pdiag__b" cx="84" cy="48" r="30" />
        </svg>
      );
    case "context":
      return (
        <svg className={cls} viewBox="0 0 140 96" fill="none" aria-hidden>
          <circle className="pdiag__ring pdiag__ring--1" cx="70" cy="50" r="10" />
          <circle className="pdiag__ring pdiag__ring--2" cx="70" cy="50" r="22" />
          <circle className="pdiag__ring pdiag__ring--3" cx="70" cy="50" r="34" />
          <circle className="pdiag__core" cx="70" cy="50" r="2.2" />
        </svg>
      );
    case "relevance":
      return (
        <svg className={cls} viewBox="0 0 140 96" fill="none" aria-hidden>
          <line className="pdiag__edge pdiag__edge--1" x1="28" y1="68" x2="70" y2="32" />
          <line className="pdiag__edge pdiag__edge--2" x1="70" y1="32" x2="112" y2="64" />
          <line className="pdiag__edge pdiag__edge--3" x1="28" y1="68" x2="112" y2="64" />
          <circle className="pdiag__node pdiag__node--1" cx="28" cy="68" r="3.2" />
          <circle className="pdiag__node pdiag__node--2" cx="70" cy="32" r="3.6" />
          <circle className="pdiag__node pdiag__node--3" cx="112" cy="64" r="3.2" />
        </svg>
      );
    case "signal": {
      const noise: Array<[number, number, number, number]> = [
        [12, 20, 1.3, 0],
        [26, 12, 1, 180],
        [44, 26, 1.2, 360],
        [60, 10, 1, 540],
        [80, 22, 1.3, 720],
        [100, 14, 1, 900],
        [120, 24, 1.2, 1080],
        [16, 56, 1, 240],
        [38, 60, 1.3, 420],
        [56, 76, 1.2, 600],
        [78, 82, 1, 780],
        [96, 72, 1.3, 960],
        [114, 64, 1, 1140],
        [128, 84, 1.2, 1320],
      ];
      return (
        <svg className={cls} viewBox="0 0 140 96" fill="none" aria-hidden>
          {noise.map(([cx, cy, r, delay], i) => (
            <circle
              key={i}
              className="pdiag__noise"
              cx={cx}
              cy={cy}
              r={r}
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
          <path
            className="pdiag__signal"
            d="M6 68 C36 60, 56 48, 78 44 S118 30, 134 26"
          />
          <circle className="pdiag__signal-tip" cx="134" cy="26" r="2.6" />
        </svg>
      );
    }
  }
}
