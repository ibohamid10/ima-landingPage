"use client";

import { motion } from "framer-motion";

type Stat = {
  number: string;
  label: string;
  source?: string;
};

const LANDSCAPE: Stat[] = [
  {
    number: "$480B",
    label: "Projected size of the global creator economy by 2027.",
    source: "Goldman Sachs, 2024",
  },
  {
    number: "81%",
    label: "Of Gen Z trust creator recommendations more than traditional advertising.",
    source: "Morning Consult, 2024",
  },
];

const PROMISE: Stat[] = [
  {
    number: "30 days",
    label: "From kickoff to your first creator launch — never longer.",
  },
  {
    number: "100%",
    label: "Manually vetted, hand-picked creators. No algorithmic matching.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.2, 0.75, 0.18, 1] as const },
  }),
};

function StatBlock({ stat, delay }: { stat: Stat; delay: number }) {
  return (
    <motion.div
      className="stat"
      variants={reveal}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <span className="stat__number">{stat.number}</span>
      <p className="stat__label">{stat.label}</p>
      {stat.source ? <p className="stat__source">{stat.source}</p> : null}
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="stats" aria-label="The opportunity and our commitment">
      <div className="stats__inner">
        <header className="stats__header">
          <motion.p
            className="stats__kicker"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.2, 0.75, 0.18, 1] }}
          >
            The opportunity, our commitment
          </motion.p>

          <motion.h2
            className="stats__title"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.2, 0.75, 0.18, 1] }}
          >
            Why creator partnerships, <em>why now.</em>
          </motion.h2>
        </header>

        <div className="stats__grid">
          <div className="stats__column">
            <p className="stats__column-label">The landscape</p>
            {LANDSCAPE.map((stat, i) => (
              <StatBlock key={stat.number} stat={stat} delay={0.18 + i * 0.12} />
            ))}
          </div>

          <div className="stats__divider" aria-hidden />

          <div className="stats__column">
            <p className="stats__column-label">Our promise</p>
            {PROMISE.map((stat, i) => (
              <StatBlock key={stat.number} stat={stat} delay={0.26 + i * 0.12} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
