import React, { useEffect } from "react";

// A soft gold glow that trails the pointer. Desktop-only (checked via a
// pointer:fine media query) and throttled to one update per animation
// frame, so it never competes with real interaction work.
const CursorGlow = () => {
  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return undefined;

    let frame = null;

    const handleMove = (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
        document.documentElement.style.setProperty("--my", `${event.clientY}px`);
        frame = null;
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="cursor-glow" aria-hidden="true" />;
};

export default CursorGlow;
