"use client";

import {
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type CardData = {
  num: string;
  title: string;
  copy: string;
  mark: "line" | "loop" | "arc";
};

const CARDS: CardData[] = [
  {
    num: "01",
    title: "Brand Fit",
    copy: "We ensure alignment with your identity, values and long-term vision.",
    mark: "line",
  },
  {
    num: "02",
    title: "Audience Context",
    copy: "We deep-dive into audience insight to drive relevance and real impact.",
    mark: "loop",
  },
  {
    num: "03",
    title: "Creator Relevance",
    copy: "We identify creators whose content, style and voice resonate authentically.",
    mark: "arc",
  },
  {
    num: "04",
    title: "Cultural Signal",
    copy: "We build into relationships audiences already care about.",
    mark: "loop",
  },
];

const cardTransition = { duration: 0.68, ease: [0.22, 0.61, 0.24, 1] as const };
const trackTransition = { duration: 0.68, ease: [0.22, 0.61, 0.24, 1] as const };
const introEase = [0.2, 0.75, 0.18, 1] as const;

function cardVariants(prefersReduced: boolean) {
  return {
    active: {
      opacity: 1,
      y: -26,
      z: 0,
      rotateY: 0,
      scale: 1,
      filter: "blur(0px) saturate(1)",
    },
    near: (direction: number) => ({
      opacity: 0.5,
      y: 8,
      z: -34,
      rotateY: prefersReduced ? 0 : direction * -9,
      scale: 0.92,
      filter: "blur(0.9px) saturate(0.94)",
    }),
    far: (direction: number) => ({
      opacity: 0.2,
      y: 12,
      z: -72,
      rotateY: prefersReduced ? 0 : direction * -14,
      scale: 0.86,
      filter: "blur(1.8px) saturate(0.88)",
    }),
  };
}

function getVariant(index: number, active: number): { name: "active" | "near" | "far"; dir: number } {
  if (index === active) return { name: "active", dir: 0 };
  const rel = index - active;
  if (Math.abs(rel) === 1) return { name: "near", dir: rel };
  return { name: "far", dir: rel };
}

export default function Approach() {
  const prefersReduced = useReducedMotion() ?? false;

  const [activeIndex, setActiveIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const dragState = useRef<{
    id: number;
    startX: number;
    startY: number;
    moved: boolean;
    decided: boolean;
    horizontal: boolean;
  } | null>(null);

  const isMobile = useMobile();
  const variants = cardVariants(prefersReduced);

  const recomputeOffset = useCallback(() => {
    const viewport = viewportRef.current;
    const card = cardRefs.current[activeIndex];
    if (!viewport || !card) return;
    if (isMobile) {
      setOffset(0);
      return;
    }
    const target = viewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
    setOffset(target);
  }, [activeIndex, isMobile]);

  useLayoutEffect(() => {
    recomputeOffset();
  }, [recomputeOffset]);

  useEffect(() => {
    const onResize = () => recomputeOffset();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [recomputeOffset]);

  useEffect(() => {
    if (!isMobile) return;
    const card = cardRefs.current[activeIndex];
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIndex, isMobile]);

  const goTo = useCallback(
    (next: number) => {
      const wrapped = ((next % CARDS.length) + CARDS.length) % CARDS.length;
      setActiveIndex(wrapped);
    },
    []
  );

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (isMobile) return;
    if (event.button !== 0) return;
    dragState.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
      decided: false,
      horizontal: false,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setIsDragging(true);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    if (!state || event.pointerId !== state.id) return;
    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;
    if (!state.decided) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      state.decided = true;
      state.horizontal = Math.abs(dx) > Math.abs(dy);
      if (!state.horizontal) {
        cancelDrag();
        return;
      }
    }
    if (state.horizontal) {
      state.moved = true;
      setDragOffset(dx);
      event.preventDefault();
    }
  };

  const cancelDrag = () => {
    const state = dragState.current;
    if (!state) return;
    try {
      viewportRef.current?.releasePointerCapture?.(state.id);
    } catch {
      // ignore
    }
    dragState.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    if (!state || event.pointerId !== state.id) return;
    const dx = event.clientX - state.startX;
    const viewport = viewportRef.current;
    const threshold = Math.max(60, (viewport?.clientWidth ?? 0) * 0.06);
    const wasHorizontal = state.horizontal && state.moved;
    setDragOffset(0);
    setIsDragging(false);
    try {
      viewport?.releasePointerCapture?.(state.id);
    } catch {
      // ignore
    }
    dragState.current = null;
    if (!wasHorizontal) return;
    if (dx <= -threshold) goTo(activeIndex + 1);
    else if (dx >= threshold) goTo(activeIndex - 1);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
  };

  const onViewportClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragState.current?.moved) event.preventDefault();
  };

  return (
    <section className="approach" id="about" aria-label="Our approach">
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
        className="approach__cards"
        aria-label="Partnership method cards"
        onKeyDown={onKeyDown}
      >
        <div
          ref={viewportRef}
          className={`approach__card-viewport${isDragging ? " is-dragging" : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={cancelDrag}
          onLostPointerCapture={cancelDrag}
          onClickCapture={onViewportClickCapture}
        >
          <motion.div
            ref={trackRef}
            className="approach__card-track"
            animate={{ x: offset + dragOffset }}
            transition={isDragging ? { duration: 0 } : trackTransition}
            style={{ transformStyle: "preserve-3d" }}
          >
            {CARDS.map((card, index) => {
              const { name, dir } = getVariant(index, activeIndex);
              const isActive = index === activeIndex;
              return (
                <motion.article
                  key={card.num}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className={`method-card${isActive ? " method-card--active" : ""}`}
                  data-card
                  aria-hidden={!isActive}
                  custom={dir}
                  variants={variants}
                  animate={name}
                  transition={cardTransition}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <span className="method-card__num">{card.num}</span>
                  <h3>{card.title}</h3>
                  <div className="method-card__rule" aria-hidden />
                  <p>{card.copy}</p>
                  <div
                    className={`method-card__mark method-card__mark--${card.mark}`}
                    aria-hidden
                  />
                </motion.article>
              );
            })}
          </motion.div>
        </div>

        <button
          className="approach__arrow approach__arrow--left"
          type="button"
          aria-label="Previous approach card"
          onClick={() => goTo(activeIndex - 1)}
        >
          <span aria-hidden>←</span>
        </button>
        <button
          className="approach__arrow approach__arrow--right"
          type="button"
          aria-label="Next approach card"
          onClick={() => goTo(activeIndex + 1)}
        >
          <span aria-hidden>→</span>
        </button>

        <div className="approach__controls">
          <span className="approach__counter" aria-live="polite">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={activeIndex}
                data-current
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <span className="approach__counter-sep">/</span>
            <span data-total>{String(CARDS.length).padStart(2, "0")}</span>
          </span>
          <div className="approach__dots" aria-label="Choose approach card">
            {CARDS.map((card, index) => (
              <button
                key={card.num}
                type="button"
                aria-label={`Show ${card.title}`}
                aria-current={index === activeIndex ? "true" : "false"}
                className={index === activeIndex ? "is-active" : undefined}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return isMobile;
}
