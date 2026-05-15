"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

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
  return (
    <section className="cta" id="partner" aria-label="Start a partnership">
      <div className="cta__mesh" aria-hidden />

      <div className="cta__inner cta__inner--split">
        <div className="cta__copy-col">
          <motion.p
            className="cta__kicker"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.2, 0.75, 0.18, 1] }}
          >
            First deal batch &mdash; onboarding
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
            AJIONE is onboarding selected brands for its first deal batch. Tell us about the
            brand and the audience you want to reach &mdash; we&rsquo;ll come back within
            seven days with a shortlist of creators and a draft partnership concept.
          </motion.p>
        </div>

        <motion.div
          className="cta__form-col"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.74, delay: 0.4, ease: [0.2, 0.75, 0.18, 1] }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
