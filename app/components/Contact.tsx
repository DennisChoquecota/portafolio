import { animate, stagger } from "animejs";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:dennis.choquecota@example.com?subject=Contacto desde Portafolio de ${
      formData.name
    }&body=${encodeURIComponent(formData.message)}%0D%0A%0D%0ADe: ${
      formData.email
    }`;
    window.location.href = mailtoLink;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements =
              containerRef.current?.querySelectorAll(".contact-anim");
            if (elements && elements.length > 0) {
              animate(elements, {
                opacity: [0, 1],
                translateY: [20, 0],
                delay: stagger(100),
                duration: 800,
                easing: "outQuad",
              });
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className="pt-24 pb-10 border-t border-white/5 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-black/50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Section */}
          <div className="contact-anim opacity-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para crear{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                algo increíble?
              </span>
            </h2>
            <p className="text-neutral-400 text-lg mb-12 max-w-xl leading-relaxed">
              Estoy disponible para trabajos freelance y nuevas oportunidades.
              Si tienes un proyecto en mente o simplemente quieres saludar,
              ¡hablemos!
            </p>

            <div className="space-y-6">
              <a
                href="mailto:dennis.choquecota@example.com"
                className="flex items-center gap-4 text-neutral-300 hover:text-white transition-colors group"
              >
                <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors border border-white/10">
                  <FaEnvelope className="text-xl text-pink-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Email</p>
                  <p className="font-medium">dennis.choquecota@example.com</p>
                </div>
              </a>

              <a
                href="https://wa.me/51999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-neutral-300 hover:text-white transition-colors group"
              >
                <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors border border-white/10">
                  <FaWhatsapp className="text-xl text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">WhatsApp</p>
                  <p className="font-medium">+591 63018823</p>
                </div>
              </a>
            </div>

            <div className="mt-12">
              <p className="text-sm text-neutral-500 mb-4">Sígueme en redes</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all hover:scale-110 border border-white/10 text-white"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all hover:scale-110 border border-white/10 text-blue-400"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="contact-anim opacity-0 p-8 rounded-3xl bg-neutral-900/50 border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6">Envíame un mensaje</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-neutral-400 ml-1"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-black/50 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-neutral-400 ml-1"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-black/50 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                  placeholder="hola@ejemplo.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-neutral-400 ml-1"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-6 py-4 rounded-2xl bg-black/50 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
                  placeholder="Cuéntame sobre tu proyecto..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-pink-600 to-violet-600 text-white font-bold rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
              >
                Enviar Mensaje
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* <footer className="mt-24 pt-8 border-t border-white/5 text-center">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Dennis Choquecota. Construido con
            Next.js & Tailwind CSS
          </p>
        </footer> */}
      </div>
    </section>
  );
}
