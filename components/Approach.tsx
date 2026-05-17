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
  const [inView, setInView] = useState(false);
  const userOverride = useRef(false);
  const hasEnteredRef = useRef(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setInView(visible);
        if (visible && !hasEnteredRef.current) {
          hasEnteredRef.current = true;
          setActiveIndex(0);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReduced || paused || !inView) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % CARDS.length);
    }, ROTATE_INTERVAL);
    return () => window.clearInterval(id);
  }, [prefersReduced, paused, inView]);

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
    <section ref={sectionRef} className="approach" id="approach" aria-label="Our approach">
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
          <g className="pdiag__wave-flow">
            <path
              className="pdiag__wave pdiag__wave--audience"
              d="M -32 48 Q -16 16, 0 48 T 32 48 T 64 48 T 96 48 T 128 48 T 160 48 T 192 48"
            />
          </g>
          <g className="pdiag__wave-phase">
            <g className="pdiag__wave-flow">
              <path
                className="pdiag__wave pdiag__wave--creator"
                d="M -32 48 Q -16 16, 0 48 T 32 48 T 64 48 T 96 48 T 128 48 T 160 48 T 192 48"
              />
            </g>
          </g>
        </svg>
      );
    case "signal":
      return (
        <svg className={cls} viewBox="0 0 140 96" fill="none" aria-hidden>
          <line className="pdiag__baseline" x1="6" y1="50" x2="134" y2="50" />
          <path
            className="pdiag__pulse"
            d="M6 50 L48 50 L54 50 L58 42 L62 60 L66 22 L70 74 L74 42 L78 50 L134 50"
          />
        </svg>
      );
  }
}
