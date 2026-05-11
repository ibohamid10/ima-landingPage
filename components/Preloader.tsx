"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SESSION_KEY = "ajione-intro-shown";

export default function Preloader() {
  // Always start hidden on the server so SSR output matches the
  // most-common branch (returning visitors). We flip to visible only
  // after mount if the session flag is missing, then auto-hide.
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);
    const seen = typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY);
    if (seen) return;

    setShow(true);
    document.documentElement.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setShow(false);
    }, 1300);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!show) {
      document.documentElement.style.overflow = "";
    }
  }, [show]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="preloader"
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden
        >
          <motion.div
            className="preloader__logo"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{
              opacity: [0, 1, 1, 1],
              scale: [0.94, 1, 1, 0.98],
            }}
            transition={{
              duration: 1.25,
              times: [0, 0.35, 0.85, 1],
              ease: [0.2, 0.75, 0.18, 1],
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ajione-logo.png" alt="AJIONE" />
          </motion.div>

          <motion.span
            className="preloader__rule"
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 1] }}
            transition={{
              duration: 1.1,
              times: [0, 0.6, 1],
              ease: [0.2, 0.75, 0.18, 1],
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
