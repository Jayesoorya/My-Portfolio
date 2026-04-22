import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Portfolio() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
  const sections = document.querySelectorAll("section");

  const handleScroll = () => {
    let current = "home";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120; // adjust for navbar
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    setActive(current);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);



  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItem = (id, label) => (
    <a
      href={`#${id}`}
      onClick={() => setMenuOpen(false)}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
        active === id
          ? "bg-teal-600 text-white shadow-md"
          : "text-gray-700 hover:bg-teal-50"
      }`}
    >
      {label}
    </a>
  );

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-gray-50">

      {/* NAVBAR (GLASS KEPT) */}
      <nav className="fixed top-0 left-0 w-full bg-white/60 backdrop-blur-lg border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

          <h1
            onClick={scrollToTop}
            className="text-xl md:text-3xl font-bold text-teal-700 cursor-pointer"
          >
            Jayesoorya{" "}
            <span className="font-normal text-gray-600 text-base md:text-lg">
              | Full Stack Developer
            </span>
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
      <section id="home" className="min-h-screen flex items-center pt-32 px-6 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div className="flex justify-center">
            <img
              src="/profile_pic.png"
              alt="profile"
              className="w-80 h-80 rounded-2xl object-cover object-[center_20%] shadow-lg bg-white p-1"
            />
          </div>

          <div>
            <p className="text-gray-600 mb-3 text-lg">
              Hello, I'm
            </p>

            <h2 className="text-5xl md:text-6xl font-semibold mb-4 text-gray-800 leading-tight">
              Full Stack Developer focused on Backend Systems
            </h2>

            <p className="text-gray-700 mb-4 text-lg">
              I build scalable and secure web applications using Laravel, REST APIs, and modern frontend technologies.
            </p>

            <p className="text-gray-600 mb-6">
              Experienced in authentication systems (JWT), performance optimization, and building real-world applications from scratch.
            </p>

            {/* SKILLS */}
            <div className="flex flex-wrap gap-3 mb-8 text-sm">
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full">Laravel</span>
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full">REST APIs</span>
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full">JWT Auth</span>
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full">MySQL</span>
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full">Caching</span>
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition shadow-md"
              >
                View Projects
              </a>

              <a
                href="/Soorya Resume.pdf"
                download
                className="border border-teal-600 text-teal-600 px-6 py-3 rounded-xl hover:bg-teal-600 hover:text-white transition flex items-center gap-2"
              >
                ⬇ Resume
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-6 py-24 bg-teal-50/40 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">

          <h3 className="text-5xl font-bold mb-12 text-center text-teal-700">
            Projects
          </h3>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 border border-gray-100">

              <img src="/key_code.png" className="h-48 w-full object-cover rounded-xl mb-4" />

              <h4 className="text-2xl font-bold text-teal-700 mb-2">
                Key-Code-Project
              </h4>

              <p className="text-gray-700 mb-4">
                Displays keyboard key codes in real-time using JavaScript event handling.
              </p>

              <a href="https://github.com/Jayesoorya/Key-Code-Project" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                GitHub →
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 border border-gray-100">

              <img src="/helpdesk_system.png" className="h-48 w-full object-cover rounded-xl mb-4" />

              <h4 className="text-2xl font-bold text-teal-700 mb-2">
                Helpdesk System
              </h4>

              <p className="text-gray-700 mb-4">
                Full-stack ticket management system with JWT authentication, REST APIs.
              </p>

              <a href="https://github.com/Jayesoorya/Helpdesk-Upgraded" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                GitHub →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-6 py-24 bg-white border-b border-gray-100">

        <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl shadow-sm p-8 border border-gray-100">


          <h3 className="text-5xl font-bold mb-6 text-teal-700">About Me</h3>

          <p className="text-gray-700 text-lg leading-relaxed">
            I am a Full Stack Developer with hands-on experience building real-world web applications from the ground up.
            <br /><br />

            I developed a complete Helpdesk system using Laravel, where I implemented JWT-based authentication, designed RESTful APIs, and handled end-to-end ticket management. I also improved performance using caching techniques like Memcached.
            <br /><br />

            I focus on writing clean, maintainable code and building scalable backend systems. I enjoy solving practical problems and continuously improving my skills to create efficient and reliable applications.
          </p>

        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-24 bg-teal-50 border-t border-gray-100">

        <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl shadow-md p-8 border border-gray-100">

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
            <a href="tel:+919363392969" className="text-teal-600 hover:underline">
              +91 93633 92969
            </a>
          </p>

          <a href="mailto:jayesoorya@gmail.com" className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700">
            Email Me
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-teal-900 text-white py-6 mt-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">

          {/* LEFT */}
          <div className="text-sm text-teal-100 mb-4 md:mb-0">
            <p className="font-semibold text-white">Jayesoorya</p>
            <p className="text-xs opacity-80">Full Stack Developer</p>
          </div>

          {/* RIGHT (SOCIAL ICONS) */}
          <div className="flex space-x-5 text-xl">
            <a
              href="https://github.com/Jayesoorya"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition transform hover:scale-110"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/jayesoorya-p-11307624a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition transform hover:scale-110"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="text-center text-xs text-teal-200 mt-4 opacity-80">
          © 2026 Jayesoorya. All rights reserved.
        </div>

        {/* BACK TO TOP (RIGHT SIDE) */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center 
          bg-white text-teal-700 rounded-full shadow-lg 
          hover:scale-110 hover:bg-teal-100 transition duration-300 text-2xl z-50"
        >
          ↑
        </button>

      </footer>

    </div>
  );
}
