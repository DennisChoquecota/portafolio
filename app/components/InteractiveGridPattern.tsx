"use client";

import React, { useState, useEffect } from "react";

export default function InteractiveGridPattern() {
  const [hoveredCells, setHoveredCells] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const cellSize = 40;

  useEffect(() => {
    let count = 0;
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      const snapX = Math.floor(x / cellSize) * cellSize;
      const snapY = Math.floor(y / cellSize) * cellSize;

      setHoveredCells((prev) => {
        // Prevent adding duplicate of the most recent cell
        if (
          prev.length > 0 &&
          prev[prev.length - 1].x === snapX &&
          prev[prev.length - 1].y === snapY
        ) {
          return prev;
        }

        // Keep only last 5 cells (current + 4 trail)
        const newCells = [...prev, { x: snapX, y: snapY, id: count++ }];
        if (newCells.length > 5) {
          return newCells.slice(newCells.length - 5);
        }
        return newCells;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Fade out effect: Remove oldest cell periodically
    const intervalId = setInterval(() => {
      setHoveredCells((prev) => {
        if (prev.length === 0) return prev;
        return prev.slice(1); // Remove the oldest cell
      });
    }, 100); // Adjust speed of fading here

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(intervalId);
    };
  }, []);

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

      {/* Interactive Highlight Cells */}
      {hoveredCells.map((cell, index) => {
        // Calculate opacity based on position in array (newest = higher opacity)
        // index 0 (oldest) -> low opacity
        // index length-1 (newest) -> high opacity
        const opacity = (index + 1) / hoveredCells.length;

        return (
          <div
            key={cell.id}
            className="absolute transition-transform duration-75 ease-out will-change-transform grid-hover-neon"
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              transform: `translate(${cell.x}px, ${cell.y}px)`,
              opacity: opacity,
            }}
          />
        );
      })}
    </div>
  );
}
