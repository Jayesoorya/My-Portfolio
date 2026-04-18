import React, { useEffect, useState } from "react";

export default function Portfolio() {
  const [showTop, setShowTop] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            setActive(entry.target.id);
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));

    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItem = (id, label) => (
    <a
      href={`#${id}`}
      className={`px-4 py-2 rounded-lg transition ${
        active === id
          ? "bg-purple-600 text-white shadow"
          : "hover:bg-purple-100"
      }`}
    >
      {label}
    </a>
  );

  return (
    <div className="min-h-screen font-sans scroll-smooth text-lg text-gray-900 relative overflow-x-hidden">

      {/* BACKGROUND DESIGN */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-200 via-pink-100 to-indigo-200"></div>
      <div className="fixed top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-400 opacity-30 rounded-full blur-3xl"></div>
      <div className="fixed bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-indigo-400 opacity-30 rounded-full blur-3xl"></div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-white/60 backdrop-blur-lg border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-5">
          <h1
            onClick={scrollToTop}
            className="text-4xl font-bold text-purple-700 cursor-pointer"
          >
            My Portfolio
          </h1>

          <div className="flex items-center space-x-4 text-lg">
            {navItem("projects", "Projects")}
            {navItem("about", "About")}
            {navItem("contact", "Contact")}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="flex flex-col items-center justify-center text-center pt-44 pb-32 px-6 fade-in">
        <h2 className="text-6xl md:text-8xl font-extrabold mb-6 bg-gradient-to-r from-purple-700 via-pink-500 to-indigo-600 text-transparent bg-clip-text">
          Full Stack Developer
        </h2>
        <p className="text-gray-700 max-w-2xl mb-8 text-xl">
          I build scalable web applications with clean architecture and modern technologies.
        </p>
        <a href="#projects" className="bg-purple-600 text-white hover:bg-purple-700 px-7 py-3 rounded-xl shadow-md transition">
          View Projects
        </a>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-6 py-24 max-w-6xl mx-auto fade-in">
        <h3 className="text-5xl font-bold mb-12 text-center text-purple-700">Projects</h3>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-md hover:scale-105 hover:shadow-xl transition duration-300"
            >
              <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
              <h4 className="text-2xl font-semibold mb-2 text-purple-700">Project Title</h4>
              <p className="text-gray-700 mb-4">
                Short description of the project goes here.
              </p>
              <div className="flex justify-between">
                <button className="hover:text-purple-700 transition">Live Demo</button>
                <button className="hover:text-purple-700 transition">Code</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-6 py-24 max-w-4xl mx-auto text-center fade-in">
        <h3 className="text-5xl font-bold mb-6 text-purple-700">About Me</h3>
        <p className="text-gray-700 text-xl">
          Write a short introduction about yourself here.
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-24 text-center fade-in">
        <h3 className="text-5xl font-bold mb-6 text-purple-700">Contact</h3>
        <p className="text-gray-700 mb-4 text-xl">
          Feel free to reach out.
        </p>
        <button className="bg-purple-600 text-white hover:bg-purple-700 px-7 py-3 rounded-xl transition">
          Email Me
        </button>
      </section>

      {/* FOOTER WITH ICONS */}
      <footer className="text-center py-8 border-t border-gray-200 text-gray-600">
        <div className="mb-4 flex justify-center space-x-6">
          <a href="https://github.com/" target="_blank" className="hover:text-purple-700">
            GitHub
          </a>
          <a href="https://linkedin.com/" target="_blank" className="hover:text-purple-700">
            LinkedIn
          </a>
        </div>
        <p>© 2026 My Portfolio</p>
      </footer>

      {/* BACK TO TOP */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition"
        >
          ↑
        </button>
      )}
    </div>
  );
}
