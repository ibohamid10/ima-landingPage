"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./DealFlowLanding.module.css";

const ease = [0.2, 0.75, 0.18, 1] as const;

const brandSignals = [
  { name: "Aurelia", market: "skincare", y: 72 },
  { name: "North Form", market: "apparel", y: 174 },
  { name: "Atlas & Co", market: "travel", y: 286 },
  { name: "Kinfolk Park", market: "hospitality", y: 408 },
] as const;

const creatorSignals = [
  { handle: "@maren.a", reach: "1.4M", niche: "beauty", y: 42 },
  { handle: "@theo.tells", reach: "820k", niche: "style", y: 136 },
  { handle: "@isla.frame", reach: "2.1M", niche: "travel", y: 242 },
  { handle: "@nico.sees", reach: "430k", niche: "food", y: 348 },
  { handle: "@orla.draws", reach: "760k", niche: "home", y: 452 },
] as const;

const layerSignals = ["Audience fit", "Brand safety", "Deal potential", "Outreach angle"];

const trustItems = [
  "No upfront agency fee",
  "No monthly retainer",
  "No self-service platform work",
  "Outreach handled by AJIONE",
  "Commission only after a paid deal is agreed",
  "First batch currently onboarding",
] as const;

const comparison = [
  {
    title: "Traditional agency",
    highlight: false,
    items: ["Upfront fees", "Slow onboarding", "Expensive retainers", "Outcome not guaranteed"],
  },
  {
    title: "Influencer platform",
    highlight: false,
    items: ["Data access only", "Brand does the outreach", "Brand negotiates alone", "High manual workload"],
  },
  {
    title: "AJIONE",
    highlight: true,
    items: [
      "Matching plus outreach",
      "Deal facilitation handled",
      "Success-based commission",
      "Payment only after a paid collaboration is agreed",
    ],
  },
] as const;

const steps = [
  {
    title: "Signal scan",
    copy: "Our internal system surfaces relevant brand and creator signals across markets.",
  },
  {
    title: "Match validation",
    copy: "AJIONE reviews audience fit, niche alignment, brand safety, and commercial potential.",
  },
  {
    title: "Personalized outreach",
    copy: "We approach the right side with a clear, relevant deal angle instead of generic cold mail.",
  },
  {
    title: "Deal introduction",
    copy: "Both sides are brought into a focused conversation around a paid collaboration.",
  },
  {
    title: "Success fee only",
    copy: "AJIONE earns only when both sides agree to move forward with a paid deal.",
  },
] as const;

const faqs = [
  {
    question: "When does AJIONE earn?",
    answer:
      "AJIONE earns a commission only after both sides agree to a paid creator-brand collaboration.",
  },
  {
    question: "Do brands pay upfront?",
    answer:
      "No. There is no upfront agency fee and no monthly retainer for the first deal batch.",
  },
  {
    question: "Does it cost creators anything?",
    answer:
      "Creators do not pay to be introduced. The model is designed around successful paid collaborations.",
  },
  {
    question: "Is AJIONE a platform or an agency?",
    answer:
      "AJIONE is a managed matchmaker. We use an internal system for faster discovery, then handle outreach and deal facilitation ourselves.",
  },
  {
    question: "Which markets do you cover?",
    answer:
      "AJIONE is built for cross-market creator-brand opportunities, with the first batch focused on selected brands and creators where the fit is clear.",
  },
  {
    question: "Who handles outreach?",
    answer:
      "AJIONE handles the outreach and introduction. Brands and creators do not have to work through a self-service database.",
  },
  {
    question: "What makes a match relevant?",
    answer:
      "Audience fit, niche alignment, content style, brand safety, deal potential, and whether there is a credible paid collaboration angle.",
  },
] as const;

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.82, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Arrow() {
  return <span aria-hidden className={styles.buttonArrow}>-&gt;</span>;
}

function DealMap() {
  const reduced = useReducedMotion();

  const lineTransition = (delay: number) => ({
    duration: reduced ? 0 : 1.2,
    delay: reduced ? 0 : delay,
    ease,
  });

  return (
    <section className={styles.dealMapSection} id="deal-map" aria-labelledby="deal-map-title">
      <div className={styles.dealMapGlow} aria-hidden />
      <div className={styles.dealMapHeader}>
        <Reveal>
          <p className={styles.kicker}>Managed matching</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 id="deal-map-title" className={styles.darkTitle}>
            From signal to <em>signed creator deal.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className={styles.darkIntro}>
            The system accelerates discovery. AJIONE still handles the outreach,
            introduction, and deal facilitation until a paid collaboration is agreed.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.2} className={styles.dealMapShell}>
        <div className={styles.dealMap} aria-label="Creator-brand deal matching flow">
          <div className={styles.mapLabels} aria-hidden>
            <span>Brand signals</span>
            <span>AJIONE layer</span>
            <span>Creator signals</span>
          </div>

          <div className={styles.brandColumn}>
            {brandSignals.map((brand, index) => (
              <motion.article
                key={brand.name}
                className={styles.brandCard}
                initial={reduced ? false : { opacity: 0, x: -22 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.62, delay: 0.22 + index * 0.08, ease }}
              >
                <strong>{brand.name}</strong>
                <span>{brand.market}</span>
                <i aria-hidden />
              </motion.article>
            ))}
          </div>

          <svg className={styles.connectionSvg} viewBox="0 0 1100 520" aria-hidden>
            <defs>
              <linearGradient id="dealStrong" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="rgba(246,247,245,0.16)" />
                <stop offset="48%" stopColor="rgba(255,232,196,0.9)" />
                <stop offset="100%" stopColor="rgba(246,247,245,0.22)" />
              </linearGradient>
              <filter id="dealGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {[
              { d: "M 178 95 C 350 95, 430 60, 544 92 C 675 130, 756 54, 916 54", strong: true, delay: 0.42 },
              { d: "M 178 95 C 356 98, 424 164, 550 178 C 690 194, 744 148, 916 148", delay: 0.52 },
              { d: "M 178 198 C 354 198, 420 194, 548 214 C 700 238, 756 148, 916 148", strong: true, delay: 0.62 },
              { d: "M 178 198 C 340 200, 430 250, 548 258 C 670 268, 760 254, 916 254", delay: 0.72 },
              { d: "M 178 310 C 348 310, 426 278, 548 258 C 670 236, 752 254, 916 254", strong: true, delay: 0.82 },
              { d: "M 178 310 C 352 310, 424 344, 548 358 C 674 372, 750 360, 916 360", delay: 0.92 },
              { d: "M 178 432 C 346 430, 420 386, 548 358 C 682 328, 752 360, 916 360", strong: true, delay: 1.02 },
              { d: "M 178 432 C 360 430, 438 456, 548 466 C 690 480, 756 464, 916 464", delay: 1.12 },
            ].map((line, index) => (
              <motion.path
                key={line.d}
                d={line.d}
                className={line.strong ? styles.strongLine : styles.softLine}
                initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                whileInView={reduced ? undefined : { pathLength: 1, opacity: line.strong ? 1 : 0.42 }}
                viewport={{ once: true, amount: 0.32 }}
                transition={lineTransition(line.delay)}
                filter={line.strong ? "url(#dealGlow)" : undefined}
              />
            ))}

            {[220, 430, 640, 806].map((x, index) => (
              <motion.circle
                key={x}
                cx={x}
                cy={[94, 198, 310, 432][index]}
                r="3.2"
                className={styles.sparkDot}
                initial={reduced ? false : { opacity: 0, scale: 0.4 }}
                whileInView={reduced ? undefined : { opacity: [0, 1, 0.6], scale: [0.6, 1.4, 1] }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 1.05 + index * 0.1, ease }}
              />
            ))}
          </svg>

          <motion.div
            className={styles.logicLayer}
            initial={reduced ? false : { opacity: 0, y: 18, scale: 0.96 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.64, ease }}
          >
            <span className={styles.logicLogo}>AJIONE</span>
            {layerSignals.map((item, index) => (
              <motion.span
                key={item}
                className={styles.logicPill}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.86 + index * 0.08, ease }}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>

          <div className={styles.creatorColumn}>
            {creatorSignals.map((creator, index) => (
              <motion.article
                key={creator.handle}
                className={styles.creatorCard}
                initial={reduced ? false : { opacity: 0, x: 22 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.62, delay: 0.28 + index * 0.08, ease }}
              >
                <span className={styles.avatar} aria-hidden />
                <strong>{creator.handle}</strong>
                <span>
                  {creator.reach} · {creator.niche}
                </span>
              </motion.article>
            ))}
          </div>

          <motion.aside
            className={styles.outreachCard}
            initial={reduced ? false : { opacity: 0, y: 26, rotate: -1.5 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0, rotate: -1.5 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.76, delay: 1.2, ease }}
          >
            <span>Personalized outreach</span>
            <p>
              Clear deal angle, fit rationale, and a direct path to a paid collaboration.
            </p>
          </motion.aside>

          <motion.div
            className={styles.unlockBadge}
            initial={reduced ? false : { opacity: 0, y: 18, scale: 0.94 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.76, delay: 1.42, ease }}
          >
            <strong>Paid deal agreed</strong>
            <span>Success fee unlocked</span>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

export default function DealFlowLanding() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} id="main" aria-label="AJIONE deal flow">
        <motion.div
          className={styles.heroImage}
          aria-hidden
          initial={{ scale: 1.04 }}
          animate={{ scale: 1.01 }}
          transition={{ duration: 2.2, ease }}
        />
        <div className={styles.heroGrain} aria-hidden />

        <motion.header
          className={styles.nav}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.76, delay: 0.08, ease }}
        >
          <a className={styles.brand} href="/" aria-label="AJIONE home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ajione-logo.png" alt="AJIONE" />
          </a>
          <nav className={styles.navLinks} aria-label="Deal flow page navigation">
            <a href="#audience">Audience</a>
            <a href="#deal-map">Deal flow</a>
            <a href="#first-batch">First batch</a>
          </nav>
        </motion.header>

        <div className={styles.heroContent}>
          <motion.p
            className={styles.heroKicker}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.18, ease }}
          >
            Success-based matchmaking
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.86, delay: 0.28, ease }}
          >
            Creator-brand deals. <em>Brokered on success.</em>
          </motion.h1>
          <motion.p
            className={styles.heroCopy}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.42, ease }}
          >
            AJIONE matches brands and creators, handles the outreach, and only
            earns when a paid collaboration is agreed.
          </motion.p>
          <motion.div
            className={styles.heroActions}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.76, delay: 0.54, ease }}
          >
            <a className={styles.primaryButton} href="#first-batch">
              <span>Join the first deal batch</span>
              <Arrow />
            </a>
            <a className={styles.secondaryButton} href="#deal-map">
              See how it works
            </a>
          </motion.div>
          <motion.p
            className={styles.trustLine}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68, ease }}
          >
            No upfront fees · Outreach handled · Success-based commission ·
            Cross-market matching
          </motion.p>
        </div>
      </section>

      <section className={styles.audience} id="audience" aria-labelledby="audience-title">
        <div className={styles.sectionIntro}>
          <Reveal>
            <p className={styles.kicker}>Two-sided deal flow</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="audience-title">
              Built for both sides of the <em>collaboration.</em>
            </h2>
          </Reveal>
        </div>

        <div className={styles.audienceGrid}>
          <Reveal className={styles.audienceCard}>
            <span>For Brands</span>
            <h3>Relevant creator deal opportunities without retainers.</h3>
            <p>Get relevant creator deal opportunities without retainers, platform work or cold outreach.</p>
            <a href="#first-batch">I'm a Brand</a>
          </Reveal>
          <Reveal delay={0.12} className={styles.audienceCard}>
            <span>For Creators</span>
            <h3>Brand opportunities that fit your audience.</h3>
            <p>Get introduced to brand opportunities that fit your audience, niche and content style.</p>
            <a href="#first-batch">I'm a Creator</a>
          </Reveal>
        </div>
      </section>

      <DealMap />

      <section className={styles.trustSection} aria-labelledby="risk-title">
        <div className={styles.trustHeader}>
          <Reveal>
            <p className={styles.kicker}>Trust without fake proof</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="risk-title">
              Built to remove <em>upfront risk.</em>
            </h2>
          </Reveal>
        </div>
        <div className={styles.trustGrid}>
          {trustItems.map((item, index) => (
            <Reveal key={item} delay={index * 0.04} className={styles.trustItem}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.comparison} aria-labelledby="comparison-title">
        <Reveal className={styles.sectionIntro}>
          <p className={styles.kicker}>Different by model</p>
          <h2 id="comparison-title">
            Not an agency retainer. <em>Not a self-service database.</em>
          </h2>
        </Reveal>

        <div className={styles.compareGrid}>
          {comparison.map((column, index) => (
            <Reveal
              key={column.title}
              delay={index * 0.08}
              className={`${styles.compareCard} ${column.highlight ? styles.compareCardHighlight : ""}`}
            >
              <h3>{column.title}</h3>
              <ul>
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.stepsSection} aria-labelledby="steps-title">
        <div className={styles.stepsIntro}>
          <Reveal>
            <p className={styles.kicker}>How it works</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="steps-title">
              Our internal system speeds discovery. <em>AJIONE still brokers the deal.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p>
              Our internal system helps us discover relevant brand and creator
              signals faster. AJIONE then handles the outreach and facilitates
              the introduction until both sides decide whether a paid collaboration
              makes sense.
            </p>
          </Reveal>
        </div>
        <div className={styles.stepsList}>
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.06} className={styles.stepRow}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.batch} id="first-batch" aria-labelledby="batch-title">
        <div className={styles.batchMesh} aria-hidden />
        <Reveal className={styles.batchInner}>
          <p className={styles.kicker}>First batch</p>
          <h2 id="batch-title">
            Join the first <em>deal batch.</em>
          </h2>
          <p>
            AJIONE is onboarding selected brands and creators for its first deal
            batch. Early partners get a hands-on, success-based introduction
            process with no upfront fees.
          </p>
          <a className={styles.primaryButton} href="mailto:partnership@ajione.com?subject=First%20deal%20batch">
            <span>Apply for the first batch</span>
            <Arrow />
          </a>
        </Reveal>
      </section>

      <section className={styles.faq} aria-labelledby="faq-title">
        <Reveal className={styles.faqIntro}>
          <p className={styles.kicker}>FAQ</p>
          <h2 id="faq-title">
            Clear terms before <em>the first intro.</em>
          </h2>
        </Reveal>
        <div className={styles.faqGrid}>
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.04} className={styles.faqItem}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
