"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    umami?: {
      track?: (eventName: string, data?: Record<string, string>) => void;
    };
  }
}

const SECTION_EVENTS = [
  { selector: "#about", eventName: "section_approach_view" },
  { selector: ".process-section", eventName: "section_process_view" },
  { selector: ".stats", eventName: "section_stats_view" },
];

function track(eventName: string, props?: Record<string, string>) {
  window.umami?.track?.(eventName, props);
}

export default function AnalyticsEvents() {
  useEffect(() => {
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const eventName = (entry.target as HTMLElement).dataset.analyticsView;
          if (!eventName || seen.has(eventName)) return;
          seen.add(eventName);
          track(eventName);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.42 }
    );

    SECTION_EVENTS.forEach(({ selector, eventName }) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) return;
      element.dataset.analyticsView = eventName;
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const tracked = target.closest<HTMLElement>("[data-analytics-event]");
      if (tracked?.dataset.analyticsEvent) {
        track(tracked.dataset.analyticsEvent, {
          label: tracked.dataset.analyticsLabel ?? tracked.textContent?.trim() ?? "",
        });
        return;
      }

      const link = target.closest<HTMLAnchorElement>("a[href^='mailto:']");
      if (link) {
        track("email_click", {
          label: link.textContent?.trim() || link.href.replace("mailto:", ""),
        });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
