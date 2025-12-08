"use client";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { animate, splitText, stagger } from 'animejs';
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const textRef = useRef<HTMLParagraphElement>(null);

  const textos = [
    "Desarrollador Full Stack",
    "Dennis Choquecota",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const cambio = setInterval(() => {
      setIndex((prev) => (prev + 1) % textos.length);
    }, 4000); // cambia cada 2.5s

    return () => clearInterval(cambio);
  }, []);

  useEffect(() => {
    if (!textRef.current) return;

    const { words } = splitText(textRef.current, {
      words: { wrap: "clip" },
    });

    animate(words, {
      y: [
        { to: ["100%", "0%"] },
        { to: "-100%", delay: 2200, ease: "in(3)" }
      ],
      duration: 1400,
      ease: "out(3)",
      delay: stagger(150),
    });

  }, [index]);

  return (
    <main className="bg-neutral-950 text-white min-h-screen flex items-center justify-center">
      <p ref={textRef} className="text-4xl font-bold">
        {textos[index]}
      </p>
    </main>
  );
}
