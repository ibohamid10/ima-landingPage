"use client";

import { Fragment, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const easeOut = [0.2, 0.75, 0.18, 1] as const;

const FAQS = [
  {
    q: "How does AJIONE work?",
    a: "We source creators ourselves brief by brief, handle outreach and deal facilitation, and only earn once a paid collaboration is agreed on both sides.",
  },
  {
    q: "Which markets do you cover?",
    a: "Cross-market. The first deal batch focuses on selected brands and creator niches where the fit is clear from day one.",
  },
  {
    q: "What is expected from the brand?",
    a: "A brief on audience, budget range, and what success looks like. We handle creator selection, outreach and deal facilitation.",
  },
] as const;

function AnswerText({ text, reduced }: { text: string; reduced: boolean }) {
  if (reduced) return <p className="faq__a-text">{text}</p>;
  const words = text.split(" ");
  let charIndex = 0;
  return (
    <p className="faq__a-text">
      {words.map((word, wi) => {
        const startChar = charIndex;
        charIndex += word.length;
        return (
          <Fragment key={wi}>
            <span className="faq__a-word">
              {Array.from(word).map((ch, ci) => (
                <motion.span
                  key={ci}
                  className="faq__a-char"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.26,
                    delay: 0.06 + (startChar + ci) * 0.007,
                    ease: easeOut,
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
            {wi < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </p>
  );
}

export default function FAQ() {
  const reduced = useReducedMotion() ?? false;
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="faq" id="faq" aria-label="Frequently asked questions">
      <div className="faq__inner">
        <motion.p
          className="faq__kicker"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          Clear terms
        </motion.p>

        <motion.h2
          className="faq__title"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
        >
          Before <em>the first intro.</em>
        </motion.h2>

        <ul className="faq__list">
          {FAQS.map((item, i) => {
            const isOpen = openIdx === i;
            const num = String(i + 1).padStart(2, "0");
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-q-${i}`;

            return (
              <motion.li
                key={item.q}
                className={`faq__item ${isOpen ? "is-open" : ""}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.18 + i * 0.06, ease: easeOut }}
              >
                <button
                  id={buttonId}
                  type="button"
                  className="faq__row"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  data-analytics-event={`faq_toggle_${num}`}
                  data-analytics-label={item.q}
                >
                  <span className="faq__num" aria-hidden>
                    {num}
                  </span>
                  <span className="faq__q">{item.q}</span>
                  <span className="faq__icon" data-open={isOpen} aria-hidden>
                    <span className="faq__icon-h" />
                    <span className="faq__icon-v" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="panel"
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="faq__a-wrap"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: reduced ? 0.001 : 0.3, ease: easeOut },
                        opacity: { duration: reduced ? 0.001 : 0.22, ease: easeOut },
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="faq__a">
                        <AnswerText text={item.a} reduced={reduced} />
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
