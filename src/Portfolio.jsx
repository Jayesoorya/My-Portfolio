import React, { useEffect, useState } from "react";

export default function Portfolio() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItem = (id, label) => (
    <a
      href={`#${id}`}
      onClick={() => setMenuOpen(false)}
      className={`px-4 py-2 rounded-lg transition cursor-pointer ${
        active === id
          ? "bg-teal-600 text-white shadow"
          : "hover:bg-teal-100"
      }`}
    >
      {label}
    </a>
  );

  return (
    <div className="min-h-screen font-sans scroll-smooth text-lg text-gray-900">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-green-100 via-teal-100 to-blue-200 pointer-events-none"></div>

      <div className="fixed top-[-100px] left-[-100px] ... pointer-events-none"></div>
      <div className="fixed bottom-[-100px] right-[-100px] ... pointer-events-none"></div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-white/60 backdrop-blur-lg border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

          <h1
            onClick={scrollToTop}
            className="text-xl md:text-3xl font-bold text-teal-700 cursor-pointer"
          >
            Jayesoorya <span className="font-normal text-gray-600 text-base md:text-lg">| Full Stack Developer</span>
          </h1>

          <div className="hidden md:flex items-center space-x-4 text-lg">
            {navItem("projects", "Projects")}
            {navItem("about", "About")}
            {navItem("contact", "Contact")}
          </div>

          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 pb-4 flex flex-col space-y-3 text-lg">
            {navItem("projects", "Projects")}
            {navItem("about", "About")}
            {navItem("contact", "Contact")}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center pt-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div className="flex justify-center">
            <img
              src="/profile_pic.png"
              alt="profile"
              className="w-80 h-80 rounded-2xl object-cover object-[center_20%] shadow-xl bg-white p-1"
            />
          </div>

          <div>
            <p className="text-teal-600 font-semibold mb-2">Hello, I'm</p>

            <h2 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-teal-600 via-cyan-500 to-blue-600 text-transparent bg-clip-text">
              Full Stack Developer
            </h2>

            <p className="text-gray-700 mb-4">
              I build scalable web applications with clean backend architecture and modern frontend technologies.
            </p>

            <p className="text-gray-600 mb-6">
              Specialized in Laravel, REST APIs, authentication, and performance optimization.
            </p>

            <div className="flex gap-4">
              <a href="#projects" className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition">
                View Projects
              </a>

              <a href="/Soorya Resume.pdf" download className="border border-teal-600 text-teal-600 px-6 py-3 rounded-xl hover:bg-teal-600 hover:text-white transition">
                Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-6 py-24 bg-white/40">
        <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur rounded-3xl shadow-md p-8">

          <h3 className="text-5xl font-bold mb-12 text-center text-teal-700">
            Projects
          </h3>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white/70 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition">

              <img src="/key_code.png" className="h-48 w-full object-cover rounded-xl mb-4" />

              <h4 className="text-2xl font-bold text-teal-700 mb-2">
                Key-Code-Project
              </h4>

              <p className="text-gray-700 mb-4">
                Displays keyboard key codes in real-time using JavaScript event handling.
              </p>

              <a href="https://github.com/Jayesoorya/Key-Code-Project" target="_blank" className="text-teal-600 hover:underline">
                GitHub →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-6 py-24 bg-teal-50">
        <div className="max-w-6xl mx-auto bg-white/70 rounded-3xl shadow-md p-8 text-center">

          <h3 className="text-5xl font-bold mb-6 text-teal-700">About Me</h3>

          <p className="text-gray-700 text-lg leading-relaxed">

            I am a Full Stack Developer with hands-on experience in building real-world web applications.
            <br /><br />
            I developed a Helpdesk system from scratch using Laravel, implementing JWT-based authentication, RESTful APIs, and efficient ticket management.
            I also worked on performance improvements using caching techniques like Memcached.
            <br /><br />
            I enjoy working on backend architecture, solving real problems, and building scalable systems.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-24 bg-gradient-to-b from-teal-50 to-blue-100">
        <div className="max-w-6xl mx-auto bg-white/70 rounded-3xl shadow-md p-8 text-center">

          <h3 className="text-5xl font-bold mb-6 text-teal-700">Contact</h3>

          <p className="text-gray-700 mb-4">
            Feel free to reach out for collaboration or opportunities.
          </p>

          <p className="mb-2">
            <a href="mailto:jayesoorya@gmail.com" className="text-teal-600 hover:underline">
              jayesoorya@gmail.com
            </a>
          </p>

          <p className="mb-6">
            <a href="tel:+919876543210" className="text-teal-600 hover:underline">
              +91 98765 43210
            </a>
          </p>

          <a href="mailto:jayesoorya@gmail.com" className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700">
            Email Me
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-10 text-center">
        <div className="space-x-6 mb-4">
          <a href="https://github.com/Jayesoorya" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/jayesoorya-p-11307624a/" target="_blank">LinkedIn</a>
        </div>

        <p>© 2026 Jayesoorya</p>

        <button onClick={scrollToTop} className="mt-6 w-10 h-10 bg-white text-teal-600 rounded-full mx-auto">
          ↑
        </button>
      </footer>
    </div>
  );
}
