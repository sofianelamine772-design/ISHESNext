"use client";

import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function InstitutVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Force autoplay for iOS Safari which sometimes blocks React's autoPlay attribute
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay prevented by browser", err);
      });
    }
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden group bg-black z-0">
      <video
        ref={videoRef}
        src="/videos/institut-video.mp4"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        poster="/images/quran-coffee.png"
        className="w-full h-full object-cover transition-transform duration-700 opacity-60 lg:opacity-100"
      />
      <div className="absolute inset-0 bg-ishes-gold/10 mix-blend-overlay pointer-events-none" />
      
      {/* Custom Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-10 w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110 shadow-lg"
        aria-label={isMuted ? "Activer le son" : "Couper le son"}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </div>
  );
}
