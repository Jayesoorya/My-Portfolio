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
    <div className="min-h-screen font-sans scroll-smooth text-lg text-gray-900">

      {/* BACKGROUND */}
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
            Jayesoorya | Full Stack Developer
          </h1>

          <div className="flex items-center space-x-4 text-lg">
            {navItem("projects", "Projects")}
            {navItem("about", "About")}
            {navItem("contact", "Contact")}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-32 px-6">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT - IMAGE */}
          <div className="flex justify-center">
            <img
              src="/profile_pic.png"
              alt="profile"
              className="w-72 h-72 md:w-80 md:h-80 rounded-2xl object-cover object-[center_20%] scale-110 shadow-xl"
            />
          </div>

          {/* RIGHT - CONTENT */}
          <div>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-700 via-pink-500 to-indigo-600 text-transparent bg-clip-text">
              Full Stack Developer
            </h2>

            <p className="text-gray-700 mb-4 text-lg">
              I build scalable web applications with clean backend architecture and modern frontend technologies.
            </p>

            <p className="text-gray-600 mb-6">
              Focused on Laravel, REST APIs, authentication systems, and performance optimization.
            </p>

            <div className="flex gap-4">
              <a
                href="#projects"
                className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
              >
                View Projects
              </a>

              <a href="/Soorya Resume.pdf"
                download
                className="border border-purple-600 text-purple-600 px-6 py-3 rounded-xl hover:bg-purple-600 hover:text-white transition"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-6 py-24 max-w-6xl mx-auto">
        <h3 className="text-5xl font-bold mb-12 text-center text-purple-700">
          Projects
        </h3>

        <div className="grid md:grid-cols-2 gap-8">

          {/* PROJECT CARD */}
          <div className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-lg hover:shadow-xl transition">

            {/* <div className="h-40 bg-gray-200 rounded-xl mb-4"></div> */}
            <img src="/key_code.png" alt="Key Code Project" className="h-48 w-full object-cover rounded-xl mb-4"/>


            <h4 className="text-2xl font-bold text-purple-700 mb-2">
              Key-Code-Project
            </h4>

            <p className="text-gray-700 mb-4">
             An interactive web application that captures and displays keyboard key codes in real time, demonstrating event handling and user input processing using JavaScript.
            </p>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Tech: HTML / CSS / Javascript
              </span>

              <a
                href="https://github.com/Jayesoorya/Key-Code-Project"
                target="_blank"
                className="text-purple-600 hover:underline"
              >
                GitHub →
              </a>
            </div>

          </div>

        </div>
      </section>


      {/* ABOUT */}
      <section id="about" className="px-6 py-24 max-w-4xl mx-auto text-center">
        <h3 className="text-5xl font-bold mb-6 text-purple-700">About Me</h3>

        <p className="text-gray-700 text-lg leading-relaxed">
          I am a Full Stack Developer with hands-on experience in building real-world web applications.
          <br /><br />
          I developed a Helpdesk system from scratch using Laravel, implementing JWT-based authentication, RESTful APIs, and efficient ticket management.
          I also worked on performance improvements using caching techniques like Memcached.
          <br /><br />
          I enjoy working on backend architecture, solving real problems, and building scalable systems.
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-24 text-center">
        <h3 className="text-5xl font-bold mb-6 text-purple-700">Contact</h3>

        <p className="text-gray-700 mb-4">
          Feel free to reach out for collaboration or opportunities.
        </p>

        <p className="text-gray-600 mb-6">
          Email: jayesoorya@gmail.com
        </p>

        {/* <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition">
          Email Me
        </button> */}
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-10 mt-10">
        <div className="text-center">

          <div className="mb-4 space-x-6 text-lg">
            <a href="https://github.com/Jayesoorya" target="_blank" className="hover:underline">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/jayesoorya-p-11307624a/" target="_blank" className="hover:underline">
              LinkedIn
            </a>
          </div>

          <p className="text-sm opacity-90">
            © 2026 Jayesoorya - Portfolio
          </p>

        </div>
      </footer>


      {/* BACK TO TOP */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-white text-purple-600 p-3 rounded-full shadow-lg"
        >
          ↑
        </button>
      )}
    </div>
  );
}
