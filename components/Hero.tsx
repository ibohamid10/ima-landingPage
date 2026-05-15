"use client";

import { Fragment } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const easeOut = [0.2, 0.75, 0.18, 1] as const;

type SplitLineProps = {
  text: string;
  delay: number;
  charDelay?: number;
  reduced: boolean;
};

// Character-by-character reveal: each char rises from below an
// overflow:hidden mask with stagger. Words stay non-breaking; line
// breaks happen only at real spaces between words.
function SplitLine({ text, delay, charDelay = 0.024, reduced }: SplitLineProps) {
  const words = text.split(" ");
  let charCount = 0;
  return (
    <>
      {words.map((word, wi) => {
        const startChar = charCount;
        charCount += word.length;
        return (
          <Fragment key={wi}>
            <span className="hero__word">
              {Array.from(word).map((ch, ci) => (
                <span key={ci} className="hero__char" aria-hidden>
                  <motion.span
                    className="hero__char-inner"
                    initial={reduced ? false : { y: "110%" }}
                    animate={reduced ? undefined : { y: "0%" }}
                    transition={{
                      duration: 0.74,
                      delay: delay + (startChar + ci) * charDelay,
                      ease: easeOut,
                    }}
                  >
                    {ch}
                  </motion.span>
                </span>
              ))}
            </span>
            {wi < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </>
  );
}

export default function Hero() {
  const prefersReduced = useReducedMotion() ?? false;

  const { scrollY } = useScroll();
  const backdropY = useTransform(scrollY, [0, 800], [0, 176]);
  const cueOpacity = useTransform(scrollY, [30, 250], [1, 0]);
  const cueY = useTransform(scrollY, [30, 250], [0, 14]);

  return (
    <section className="hero" id="main" aria-label="Creator partnerships">
      <motion.div
        className="hero__backdrop"
        aria-hidden
        style={{ y: prefersReduced ? 0 : backdropY }}
      />
      <div className="hero__grain" aria-hidden />

      <motion.header
        className="nav"
        aria-label="Main navigation"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.76, delay: 0.12, ease: easeOut }}
      >
        <a className="nav__brand" href="/" aria-label="AJIONE home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ajione-logo.png" alt="AJIONE" />
        </a>

        <nav className="nav__links" aria-label="Primary">
          <a href="#approach">Approach</a>
          <a href="#process">Process</a>
          <a href="#partner">Partnership</a>
        </nav>
      </motion.header>

      <div className="hero__content">
        <motion.p
          className="hero__kicker"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.76, delay: 0.24, ease: easeOut }}
        >
          Creator growth studio
        </motion.p>

        <h1 aria-label="Creator partnerships. that drive growth.">
          <span className="hero__line">
            <SplitLine text="Creator" delay={0.32} reduced={prefersReduced} />
          </span>
          <span className="hero__line">
            <SplitLine text="partnerships." delay={0.5} reduced={prefersReduced} />
          </span>
          <span className="hero__mixed-line">
            <em>
              <SplitLine text="that drive" delay={0.84} reduced={prefersReduced} />
            </em>
            {" "}
            <SplitLine text="growth." delay={1.16} reduced={prefersReduced} />
          </span>
        </h1>

        <motion.div
          className="hero__rule"
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.72, delay: 0.65, ease: easeOut }}
        />

        <motion.p
          className="hero__copy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.76, delay: 0.76, ease: easeOut }}
        >
          We connect ambitious brands with creators who move culture, shape demand,
          and turn attention into measurable growth.
        </motion.p>

        <motion.a
          className="button button--primary"
          href="#partner"
          data-analytics-event="cta_start_partnership_click"
          data-analytics-label="Hero start partnership"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.76, delay: 0.89, ease: easeOut }}
        >
          <span>Start a Partnership</span>
          <span className="button__arrow" aria-hidden>
            -&gt;
          </span>
        </motion.a>
      </div>

      <motion.a
        className="hero__scroll-cue"
        href="#approach"
        aria-label="Scroll to our approach"
        style={{
          x: "-50%",
          y: prefersReduced ? 0 : cueY,
          opacity: prefersReduced ? 1 : cueOpacity,
        }}
      >
        <span className="hero__scroll-label">Scroll</span>
        <span className="hero__scroll-line" aria-hidden />
      </motion.a>
    </section>
  );
}
