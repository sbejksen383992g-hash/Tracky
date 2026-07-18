import React, { useEffect, useRef, useState } from "react";

// Ambient full-bleed background clip. Sits behind every glass panel in the
// app so cards read as frosted glass floating over a living scene, instead
// of flat panels on a static gradient.
//
// Swap BG_VIDEO_URL for your own footage any time — drop an mp4 in
// `public/videos/` and point this at `/videos/your-file.mp4`. If the clip
// ever fails to load (offline, blocked, slow network) we fall back to the
// existing animated gradient so the app never looks broken.
const BG_VIDEO_URL = "https://assets.mixkit.co/videos/46316/46316-720.mp4";

const VideoBackground = () => {
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <div className="video-bg" aria-hidden="true">
      {!failed && (
        <video
          ref={videoRef}
          className="video-bg-el"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={() => setFailed(true)}
        >
          <source src={BG_VIDEO_URL} type="video/mp4" />
        </video>
      )}

      {failed && <div className="video-bg-fallback" />}

      <div className="video-bg-overlay" />
    </div>
  );
};

export default VideoBackground;
