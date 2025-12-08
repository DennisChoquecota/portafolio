"use client";

import { animate, splitText, stagger } from "animejs";
import { useEffect, useRef, useState } from "react";
import "./styles.css";

export function Hero() {
  const textRef = useRef<HTMLParagraphElement>(null);

  const textos = [
    { text: "Dennis Choquecota", gradient: ["#ec4899", "#8b5cf6"] },
    { text: "Desarrollador Full Stack", gradient: ["#3b82f6", "#06b6d4"] },
  ];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const cambio = setInterval(() => {
      setIndex((prev) => (prev + 1) % textos.length);
    }, 4000);

    return () => clearInterval(cambio);
  }, []);
  useEffect(() => {
    if (!textRef.current) return;

    textRef.current.textContent = textos[index].text;

    const { words } = splitText(textRef.current, { words: { wrap: "clip" } });

    words.forEach((word: HTMLElement) => {
  word.style.backgroundImage = `linear-gradient(to right, ${textos[index].gradient[0]}, ${textos[index].gradient[1]})`;
      word.style.backgroundSize = "200% 200%"; // necesario para animar
      word.style.webkitBackgroundClip = "text";
      word.style.color = "transparent";
      word.style.animation = "gradientMove 3s linear infinite"; // aplica la animación a cada palabra
    });

    animate(words, {
      y: [{ to: ["100%", "0%"] }, { to: "-100%", delay: 2200, ease: "in(3)" }],
      duration: 1400,
      ease: "out(3)",
      delay: stagger(150),
    });
  }, [index]);

  // useEffect(() => {
  //   if (descriptionRef.current && buttonsRef.current) {
  //     animate([descriptionRef.current, buttonsRef.current], {
  //       opacity: [0, 1],
  //       translateY: [20, 0],
  //       delay: stagger(100, { start: 500 }),
  //       duration: 800,
  //       easing: "outQuad",
  //     });
  //   }

  //   if (imageRef.current) {
  //     animate(imageRef.current, {
  //       opacity: [0, 1],
  //       scale: [0.8, 1],
  //       delay: 400,
  //       duration: 1000,
  //       easing: "outElastic(1, .8)",
  //     });
  //   }

  //   if (circleRef.current) {
  //     animate(circleRef.current, {
  //       rotate: 360,
  //       duration: 10000,
  //       loop: true,
  //       easing: "linear",
  //     });
  //   }
  // }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
    >
      {/* Fondos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-14 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left order-2 lg:order-1">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            Hola soy
            <div className="relative h-[1.2em] mt-5 overflow-visible">
              <p
                ref={textRef}
                className="absolute left-0 right-0 lg:left-0 lg:right-auto whitespace-nowrap text-transparent gradient-animate"
                style={{
                  backgroundImage: `linear-gradient(to right, ${textos[0].gradient[0]}, ${textos[0].gradient[1]})`,
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {textos[0].text}
              </p>
            </div>
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            Desarrollador Full Stack con más de 2 años de experiencia creando
            aplicaciones ágiles, funcionales y bien estructuradas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300">
              View Projects
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300">
              Contact Me
            </button>
          </div>
        </div>

        {/* <div className="relative order-1 lg:order-2 flex justify-center">
          <div
            ref={circleRef}
            className="absolute inset-0 w-[350px] h-[350px] border-2 border-dashed border-pink-500/30 rounded-full -z-10 m-auto"
          />
          <div
            ref={imageRef}
            className="relative w-[300px] h-[300px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden border-4 border-white/5 shadow-2xl opacity-0"
          >
            <img
              src="/img1.jpg"
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
        </div> */}
      </div>
    </section>
  );
}
