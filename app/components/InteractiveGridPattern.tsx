"use client";

import React, { useState, useEffect } from "react";

export default function InteractiveGridPattern() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Grid cell size
  const cellSize = 40;

  // Calculate snap position
  const snapX = Math.floor(mousePos.x / cellSize) * cellSize;
  const snapY = Math.floor(mousePos.y / cellSize) * cellSize;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Static Grid Layer */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundSize: `${cellSize}px ${cellSize}px`,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 40%, transparent 100%)",
        }}
      />

      {/* Interactive Highlight Cell */}
      <div
        className="absolute transition-transform duration-75 ease-out will-change-transform"
        style={{
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          transform: `translate(${snapX}px, ${snapY}px)`,
          backgroundColor: "rgba(255, 255, 255, 0.1)", // Highlight color
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)", // Glow effect
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      />
    </div>
  );
}
