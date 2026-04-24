import React, { useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Portfolio() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const canvasRef = useRef(null);  // ← added

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const handleScroll = () => {
      let current = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
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

  // ← added: particle network animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const section = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const TEAL = "15,114,96";
    let animFrameId;
    let nodes = [];

    function initNodes() {
      nodes = Array.from({ length: 48 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 2 + 1.2,
      }));
    }

    function resize() {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
      initNodes();
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${TEAL},${0.13 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${TEAL},0.3)`;
        ctx.fill();
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }
      animFrameId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    const ro = new ResizeObserver(resize);
    ro.observe(section);
    return () => {
      cancelAnimationFrame(animFrameId);
      ro.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItem = (id, label) => (
    <button
      onClick={() => {
        setMenuOpen(false);
        const section = document.getElementById(id);
        section?.scrollIntoView({ behavior: "smooth" });
      }}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
        active === id
          ? "bg-teal-600 text-white shadow-md"
          : "text-gray-700 hover:bg-teal-50"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-gray-50 scroll-smooth">

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
            {navItem("home", "Home")}
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
            {navItem("home", "Home")}
            {navItem("projects", "Projects")}
            {navItem("about", "About")}
            {navItem("contact", "Contact")}
          </div>
        )}
      </nav>

      {/* HERO */}
      // 1. section tag — bg-white → bg-[#f0faf7], add relative overflow-hidden
      <section id="home" className="min-h-screen flex items-center pt-32 px-6 border-b border-gray-100 bg-[#f0faf7] relative overflow-hidden">

        {/* 2. ADD this canvas as the very first child inside the section */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />

        {/* 3. content grid — add relative z-10 */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">

          {/* IMAGE (from LEFT) */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center"
          >
            <img
              src="/profile_pic.png"
              alt="profile"
              className="w-80 h-80 rounded-2xl object-cover object-[center_20%] shadow-lg bg-white p-1"
            />
          </motion.div>

          {/* TEXT (from RIGHT) */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <motion.p
              className="text-gray-600 mb-3 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Hello, I'm
            </motion.p>

            <motion.h2
              className="text-5xl md:text-6xl font-semibold mb-4 text-gray-800 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Full Stack Developer focused on Backend Systems
            </motion.h2>

            <motion.p
              className="text-gray-700 mb-4 text-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              I build scalable and secure web applications using Laravel, REST APIs, and modern frontend technologies.
            </motion.p>

            <motion.p
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Experienced in authentication systems (JWT), performance optimization, and building real-world applications from scratch.
            </motion.p>

            {/* SKILLS */}
            <motion.div
              className="flex flex-wrap gap-3 mb-8 text-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {["Laravel", "REST APIs", "JWT Auth", "MySQL", "Caching"].map((skill) => (
                <span key={skill} className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* BUTTONS */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <a
                href="#projects"
                className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition shadow-md"
              >
                View Projects
              </a>

              <a
                href="/Jayesoorya Resume.pdf"
                download
                className="border border-teal-600 text-teal-600 px-6 py-3 rounded-xl hover:bg-teal-600 hover:text-white transition flex items-center gap-2"
              >
                ⬇ Resume
              </a>
            </motion.div>
          </motion.div>

        </div>
      </section>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-60"></div>

      {/* PROJECTS */}
      <section id="projects" className="px-6 py-24 bg-teal-50/40 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">

          <h3 className="text-5xl font-bold mb-12 text-center text-teal-700">
            Projects
          </h3>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="group bg-white rounded-2xl p-6 shadow-md 
              hover:shadow-2xl hover:-translate-y-2 
              transition duration-300 border border-gray-100
              hover:bg-emerald-100 hover:border-emerald-400">

                <img src="/key_code.png" className="h-48 w-full object-cover rounded-xl mb-4" />

                <h4 className="text-2xl font-bold text-teal-700 mb-2 
                group-hover:text-emerald-800 transition">
                  Key Code Project
                </h4>

                <p className="text-gray-700 mb-4 
                group-hover:text-gray-700 transition">
                  Displays keyboard key codes in real-time using JavaScript event handling.
                </p>

                <a
                  href="https://github.com/Jayesoorya/Key-Code-Project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-1 px-4 py-1.5 rounded-md 
                  border border-emerald-500 text-emerald-600 
                  transition duration-700
                  hover:bg-emerald-600 hover:text-white"
                >
                  GitHub
                  <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                    →
                  </span>
                </a>

              </div>

              <div className="group bg-white rounded-2xl p-6 shadow-md 
                hover:shadow-2xl hover:-translate-y-2 
                transition duration-300 border border-gray-100
                hover:bg-violet-100 hover:border-violet-400">

                  <img src="/helpdesk_system.png" className="h-48 w-full object-cover rounded-xl mb-4" />

                  <h4 className="text-2xl font-bold text-teal-700 mb-2 
                  group-hover:text-violet-800 transition">
                    Helpdesk System
                  </h4>

                  <p className="text-gray-700 mb-4 
                  group-hover:text-gray-700 transition">
                    Full-stack ticket management system with JWT authentication, REST APIs.
                  </p>

                  <a
                    href="https://github.com/Jayesoorya/Helpdesk-Upgraded"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-1 px-4 py-1.5 rounded-md 
                    border border-violet-500 text-violet-600 
                    transition duration-300
                    hover:bg-violet-600 hover:text-white"
                  >
                    GitHub
                    <span className="transition-transform duration-700 group-hover/btn:translate-x-1">
                      →
                    </span>
                  </a>

              </div>

          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-6 py-24 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT - IMAGE */}
          <div className="flex justify-center">
            <img
              src="/about_me.png"
              alt="developer illustration"
              className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-2xl shadow-lg"
            />
          </div>

          {/* RIGHT - CONTENT */}
          <div>
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

        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-24 bg-teal-50 border-t border-gray-100">

        <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl shadow-md p-10 border border-gray-100">

          {/* HEADING */}
          <h3 className="text-4xl md:text-5xl font-bold mb-4 text-teal-700">
            Let’s Work Together
          </h3>

          {/* SUBTEXT */}
          <p className="text-gray-600 mb-8">
            Open to opportunities, collaborations, or just a tech conversation.
          </p>

          {/* CONTACT CARDS */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">

            {/* EMAIL */}
            <a 
              href="mailto:jayesoorya@gmail.com"
              className="px-6 py-3 bg-gray-50 rounded-xl border border-gray-200 
              hover:bg-teal-50 hover:border-teal-300 transition"
            >
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-teal-700 font-medium">jayesoorya@gmail.com</p>
            </a>

            {/* PHONE */}
            <a 
              href="tel:+919363392969"
              className="px-6 py-3 bg-gray-50 rounded-xl border border-gray-200 
              hover:bg-teal-50 hover:border-teal-300 transition"
            >
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-teal-700 font-medium">+91 93633 92969</p>
            </a>

          </div>

          {/* CTA BUTTON */}
          <a 
            href="mailto:jayesoorya@gmail.com" 
            className="inline-block bg-teal-600 text-white px-8 py-3 rounded-xl 
            hover:bg-teal-700 hover:scale-105 shadow-md transition duration-300"
          >
            Send Email
          </a>

        </div>
      </section> 


      {/* FOOTER */}
      <footer className="bg-teal-600 text-white py-8 mt-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6 items-center">

          {/* LEFT */}
          <div>
            <p className="font-semibold text-lg">Jayesoorya</p>
            <p className="text-sm opacity-80">Full Stack Developer</p>
            <p className="text-sm mt-1 text-teal-100 opacity-80">
              Building scalable and efficient web applications
            </p>
          </div>

          {/* CENTER - QUICK LINKS */}
          <div className="text-center">
            <p className="text-lg mb-2 opacity-80">Quick Links</p>
            <div className="flex justify-center space-x-6 text-md">
              <a href="#projects" className="hover:text-teal-200 transition">Projects</a>
              <a href="#about" className="hover:text-teal-200 transition">About</a>
              {/* <a href="#" className="hover:text-teal-200 transition"></a> */}
            </div>
          </div>

          {/* RIGHT - SOCIAL */}
          <div className="flex flex-col items-center md:items-end">
            <p className="text-lg mb-2 opacity-80">Connect</p>

            <div className="flex space-x-5 text-xl">
              <a
                href="https://www.linkedin.com/in/jayesoorya-p-11307624a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-transform duration-300 transform hover:scale-115 hover:-translate-y-1"
              >
                <FaLinkedin size={26} />
              </a>

              <a
                href="https://github.com/Jayesoorya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-transform duration-300 transform hover:scale-115 hover:-translate-y-1"
              >
                <FaGithub size={26} />
              </a>
            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-xs text-teal-100 mt-6 opacity-80">
          © 2026 Jayesoorya
        </div>

        {/* BACK TO TOP */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 right-6 w-12 h-12 flex items-center justify-center 
          bg-white text-teal-700 rounded-full shadow-lg 
          hover:scale-110 hover:bg-teal-100 transition duration-300 text-2xl z-50"
        >
          ↑
        </button>
      </footer>

    </div>
  );
}
