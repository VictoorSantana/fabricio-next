"use client";

import { useEffect } from "react";

export default function IntersectionAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const classAnim = el.getAttribute("data-anim");

          if (entry.isIntersecting) {
            el.classList.add(classAnim);
          }
        });
      },
      {
        threshold: 1,
      }
    );

    document.querySelectorAll(".custom-anim").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}