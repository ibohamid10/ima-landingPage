"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

const STEPS = [
  {
    num: "01",
    title: "Identify",
    copy: "We analyze data and trends to find the right creators for your brand.",
  },
  {
    num: "02",
    title: "Connect",
    copy: "We build authentic partnerships that align with your goals and resonate with your audience.",
  },
  {
    num: "03",
    title: "Grow",
    copy: "We optimize and scale partnerships that drive engagement, conversion and long-term brand growth.",
  },
] as const;

// SVG viewBox: 1240 x 180. Y center around 90.
const POINTS = {
  one: { x: 100, y: 90 },
  two: { x: 600, y: 90 },
  three: { x: 1080, y: 90 },
  growth: { x: 1200, y: 14 },
};

const PATH_A = `M ${POINTS.one.x} ${POINTS.one.y} C 260 50, 430 140, ${POINTS.two.x} ${POINTS.two.y}`;
const PATH_B = `M ${POINTS.two.x} ${POINTS.two.y} C 778 42, 920 142, ${POINTS.three.x} ${POINTS.three.y}`;
const PATH_GROWTH = `M ${POINTS.three.x} ${POINTS.three.y} C 1118 70, 1158 40, ${POINTS.growth.x} ${POINTS.growth.y}`;

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 900px)").matches;

    const ctx = gsap.context(() => {
      // For reduced motion / mobile, show everything statically
      if (reduceMotion || mobile) {
        gsap.set(
          [
            ".process-trace-a",
            ".process-trace-b",
            ".process-trace-growth",
          ],
          { strokeDasharray: "none", strokeDashoffset: 0 }
        );
        gsap.set(".process-orb", { opacity: 1, scale: 1 });
        gsap.set(".process-step", { opacity: 1, y: 0 });
        gsap.set(".process-light", { opacity: 0 });
        return;
      }

      // Set up dasharray/offset for each path so they can be drawn
      const setupPath = (selector: string) => {
        gsap.set(selector, {
          strokeDasharray: (_, target) => {
            const length = (target as SVGPathElement).getTotalLength();
            return `${length} ${length}`;
          },
          strokeDashoffset: (_, target) =>
            (target as SVGPathElement).getTotalLength(),
        });
      };
      setupPath(".process-trace-a");
      setupPath(".process-trace-b");
      setupPath(".process-trace-growth");

      // Initial states
      gsap.set(".process-light", { opacity: 0, scale: 0.4 });
      gsap.set(".process-orb", { opacity: 0, scale: 0.5, transformOrigin: "50% 50%" });
      gsap.set(".process-step", { opacity: 0, y: 28 });

      // Scrub timeline tied to scroll
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2400",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ---- Phase A: 01 → 02 (0 → 1) ----

      // Light dot fades in at 01
      tl.to(".process-light", { opacity: 1, scale: 1, duration: 0.06 }, 0);

      // Orb 01 fades in
      tl.to(".process-orb[data-orb='0']", { opacity: 1, scale: 1, duration: 0.1 }, 0);

      // Step 01 text reveals
      tl.to(".process-step[data-step='0']", { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.02);

      // Light travels path A; trace draws behind it
      tl.to(
        ".process-light",
        {
          motionPath: {
            path: ".process-trace-a",
            align: ".process-trace-a",
            alignOrigin: [0.5, 0.5],
          },
          duration: 1,
        },
        0.06
      );
      tl.to(".process-trace-a", { strokeDashoffset: 0, duration: 1 }, 0.06);

      // Arrival pulse at 02
      tl.to(".process-orb[data-orb='1']", { opacity: 1, scale: 1, duration: 0.08 }, 1.04);
      tl.to(".process-orb[data-orb='1']", { scale: 1.6, duration: 0.12 }, 1.1);
      tl.to(".process-orb[data-orb='1']", { scale: 1, duration: 0.14 }, 1.22);
      tl.to(".process-step[data-step='1']", { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 1.05);

      // ---- Phase B: 02 → 03 (1.35 → 2.35) ----

      tl.to(
        ".process-light",
        {
          motionPath: {
            path: ".process-trace-b",
            align: ".process-trace-b",
            alignOrigin: [0.5, 0.5],
          },
          duration: 1,
        },
        1.35
      );
      tl.to(".process-trace-b", { strokeDashoffset: 0, duration: 1 }, 1.35);

      // Arrival pulse at 03
      tl.to(".process-orb[data-orb='2']", { opacity: 1, scale: 1, duration: 0.08 }, 2.33);
      tl.to(".process-orb[data-orb='2']", { scale: 1.6, duration: 0.12 }, 2.39);
      tl.to(".process-orb[data-orb='2']", { scale: 1, duration: 0.14 }, 2.51);
      tl.to(".process-step[data-step='2']", { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 2.34);

      // ---- Phase C: Growth arrow (2.7 → 3.5) ----

      tl.to(
        ".process-light",
        {
          motionPath: {
            path: ".process-trace-growth",
            align: ".process-trace-growth",
            alignOrigin: [0.5, 0.5],
          },
          duration: 0.8,
          ease: "power2.in",
        },
        2.7
      );
      tl.to(".process-trace-growth", { strokeDashoffset: 0, duration: 0.8, ease: "power2.in" }, 2.7);

      // Light dissolves into the arrow tip
      tl.to(".process-light", { scale: 0.4, opacity: 0, duration: 0.18 }, 3.4);

      // After-glow on the section as everything settles
      tl.to(".process-section__halo", { opacity: 0.6, duration: 0.3 }, 3.4);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="process-section" aria-label="Creator partnership process">
      <div className="process-section__halo" aria-hidden />
      <div ref={innerRef} className="process-section__inner">
        <p className="process-section__kicker">The journey</p>
        <h2 className="process-section__title">
          <em>From insight</em>
          <span>to growth.</span>
        </h2>

        <div className="process">
          <svg
            className="process__svg"
            viewBox="0 0 1240 180"
            aria-hidden
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <marker
                id="growthArrowHead"
                viewBox="0 0 12 12"
                refX="6"
                refY="6"
                markerWidth="9"
                markerHeight="9"
                orient="auto-start-reverse"
              >
                <path d="M1 1 L11 6 L1 11 L4 6 Z" fill="rgba(8,13,13,0.7)" />
              </marker>
              <radialGradient id="processLightGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="35%" stopColor="#fff0d8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffd9a0" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="processOrbGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="50%" stopColor="#fff0d8" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#ffd9a0" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Very faint base traces */}
            <path d={PATH_A} fill="none" stroke="rgba(8,13,13,0.06)" strokeWidth="1.1" strokeLinecap="round" />
            <path d={PATH_B} fill="none" stroke="rgba(8,13,13,0.06)" strokeWidth="1.1" strokeLinecap="round" />
            <path d={PATH_GROWTH} fill="none" stroke="rgba(8,13,13,0.06)" strokeWidth="1.3" strokeLinecap="round" />

            {/* Active drawn traces */}
            <path className="process-trace-a process-trace-active" d={PATH_A} />
            <path className="process-trace-b process-trace-active" d={PATH_B} />
            <path
              className="process-trace-growth"
              d={PATH_GROWTH}
              markerEnd="url(#growthArrowHead)"
            />

            {/* Stationary orbs at each step (fade in as light arrives) */}
            {[POINTS.one, POINTS.two, POINTS.three].map((p, i) => (
              <g
                key={i}
                className="process-orb"
                data-orb={i}
                style={{ transformOrigin: `${p.x}px ${p.y}px` } as React.CSSProperties}
              >
                <circle cx={p.x} cy={p.y} r="20" fill="url(#processOrbGradient)" />
                <circle cx={p.x} cy={p.y} r="6" fill="#fff" />
              </g>
            ))}

            {/* Moving light dot (positioned by motionPath) */}
            <g className="process-light">
              <circle cx="0" cy="0" r="26" fill="url(#processLightGradient)" />
              <circle cx="0" cy="0" r="6.5" fill="#ffffff" />
            </g>
          </svg>

          <div className="process__grid">
            {STEPS.map((step, i) => (
              <article
                key={step.num}
                className="process-step"
                data-step={i}
              >
                <span>{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
