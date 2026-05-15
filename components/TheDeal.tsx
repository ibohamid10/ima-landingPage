"use client";

import { motion } from "framer-motion";

const easeOut = [0.2, 0.75, 0.18, 1] as const;

const NEGATIONS = [
  "Not a retainer agency.",
  "Not a self-service database.",
  "Not a discovery tool you operate yourself.",
];

const POSITIVES = [
  "We source the creators ourselves, brief by brief.",
  "We handle outreach and deal facilitation end-to-end.",
  "We earn only after both sides agree to a paid collaboration.",
];

export default function TheDeal() {
  return (
    <section className="deal" id="deal" aria-label="How the deal works">
      <div className="deal__inner">
        <motion.p
          className="deal__kicker"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          The deal
        </motion.p>

        <motion.h2
          className="deal__title"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
        >
          No retainer. No platform fees. <em>Brokered on outcomes.</em>
        </motion.h2>

        <div className="deal__columns">
          <div className="deal__column">
            <p className="deal__column-label">What we don&rsquo;t do</p>
            <ul className="deal__list">
              {NEGATIONS.map((line, i) => (
                <motion.li
                  key={line}
                  className="deal__line deal__line--neg"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: 0.18 + i * 0.08, ease: easeOut }}
                >
                  {line}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="deal__column">
            <p className="deal__column-label">What we do</p>
            <ul className="deal__list">
              {POSITIVES.map((line, i) => (
                <motion.li
                  key={line}
                  className="deal__line deal__line--pos"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: 0.32 + i * 0.08, ease: easeOut }}
                >
                  {line}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
