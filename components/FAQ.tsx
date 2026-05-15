"use client";

import { motion } from "framer-motion";

const easeOut = [0.2, 0.75, 0.18, 1] as const;

const FAQS = [
  {
    q: "When does AJIONE earn?",
    a: "Only after both sides agree to a paid collaboration. There is no upfront fee, no retainer, and no discovery bill.",
  },
  {
    q: "How long until the first introduction?",
    a: "Seven days from kickoff. We come back with a shortlist of fit-relevant creators and a draft partnership concept.",
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

export default function FAQ() {
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

        <div className="faq__grid">
          {FAQS.map((item, i) => (
            <motion.div
              key={item.q}
              className="faq__item"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.18 + i * 0.06, ease: easeOut }}
            >
              <h3 className="faq__q">{item.q}</h3>
              <p className="faq__a">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
