"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const easeOut = [0.2, 0.75, 0.18, 1] as const;

export default function Hero() {
  const prefersReduced = useReducedMotion();

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
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#work">Our Work</a>
          <a href="#insights">Insights</a>
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

        <h1>
          {["Creator", "partnerships."].map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.88, delay: 0.33 + i * 0.1, ease: easeOut }}
            >
              {line}
            </motion.span>
          ))}
          <motion.span
            className="hero__mixed-line"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.88, delay: 0.53, ease: easeOut }}
          >
            <em>that drive</em> growth.
          </motion.span>
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
        href="#about"
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
