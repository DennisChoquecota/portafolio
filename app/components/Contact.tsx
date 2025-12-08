"use client";

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 border-t border-white/5"
    >
      <div className="absolute inset-0 z-20" />
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">
          Ready to <span className="text-white">create</span> something?
        </h2>
        <p className="text-neutral-400 mb-12 max-w-xl mx-auto">
          I'm currently available for freelance work and open to new
          opportunities. Let's build something amazing together.
        </p>

        <a
          href="mailto:contact@example.com"
          className="inline-block px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors"
        >
          Get in Touch
        </a>

        <footer className="mt-24 pt-8 border-t border-white/5 text-neutral-500 text-sm">
          <p>
            © {new Date().getFullYear()} DevPortfolio. Built with Next.js &
            Anime.js
          </p>
        </footer>
      </div>
    </section>
  );
}
