import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Logo umum dan logo tiap matkul
import logo from "./assets/Logo.svg";
import logoSBD from "./assets/SBDLogo.svg";
import logoDMJ from "./assets/DMJLogo.svg";
import logoOS from "./assets/OSLogo.svg";

// Color palette constants
const COLORS = {
  primary: "#3B82F6", // Vibrant blue
  secondary: "#10B981", // Emerald green
  accent: "#F59E0B", // Amber
  dark: "#1E293B", // Slate dark
  light: "#F8FAFC", // Slate light
  sbd: "#3B82F6", // Blue for SBD
  dmj: "#10B981", // Green for DMJ
  os: "#8B5CF6", // Purple for OS
};

// Module data for each subject
const moduleData = {
  SBD: [
    { title: "Setup RDBMS", number: 1 },
    { title: "Relational Database Design & Data Definition/Manipulation", number: 2 },
    { title: "Join, Views, and Advanced Query", number: 3 },
    { title: "Normalization", number: 4 },
    { title: "Express JS", number: 5 },
    { title: "Advanced Express JS", number: 6 },
    { title: "MongoDB (NoSQL)", number: 7 },
    { title: "Basic Frontend", number: 8 },
    { title: "Advanced Frontend", number: 9 },
    { title: "Proyek Akhir", number: 10 },
  ],
  DMJ: [
    { title: "Multi-access & Multi-area OSPFv2", number: 1 },
    { title: "Enhanced Interior Gateway Routing Protocol (EIGRP)", number: 2 },
    { title: "Network Address Translation (NAT) & Access Control List (ACL)", number: 3 },
    { title: "Wide Area Network (WAN PPP & Frame Relay)", number: 4 },
    { title: "Virtual Private Network (VPN)", number: 5 },
    { title: "Quality of Service (QoS) & Network Management", number: 6 },
    { title: "Network Monitoring", number: 7 },
    { title: "Network Virtualization", number: 8 },
    { title: "Network Automation", number: 9 },
    { title: "Skill-Based Assessment", number: 10 },
  ],
  OS: [
    { title: "Setup VM and Linux Introduction", number: 1 },
    { title: "Basic Bootloader", number: 2 },
    { title: "Process Creation", number: 3 },
    { title: "Exec Family", number: 4 },
    { title: "Signals", number: 5 },
    { title: "File I/O", number: 6 },
    { title: "Pipe", number: 7 },
    { title: "Input Parsing", number: 8 },
    { title: "Linux Shell", number: "9&10" },
  ],
};

const subjects = [
  {
    name: "SBD",
    title: "Sistem Basis Data",
    description:
      "Pelajari bagaimana data disimpan, dikelola, dan dimanipulasi dengan efisien menggunakan SQL, ERD, dan konsep relasional.",
    logo: logoSBD,
    color: COLORS.sbd,
    bgPattern: "radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
    modules: moduleData.SBD,
  },
  {
    name: "DMJ",
    title: "Desain Manajemen Jaringan",
    description:
      "Membahas perancangan topologi jaringan, VLAN, routing dinamis, QoS, hingga monitoring dan troubleshooting jaringan modern.",
    logo: logoDMJ,
    color: COLORS.dmj,
    bgPattern: "radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)",
    modules: moduleData.DMJ,
  },
  {
    name: "OS",
    title: "Sistem Operasi",
    description:
      "Pahami bagaimana proses, memori, file system, dan hardware dikelola dalam sistem operasi Linux dan Windows.",
    logo: logoOS,
    color: COLORS.os,
    bgPattern: "radial-gradient(circle at 40% 60%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)",
    modules: moduleData.OS,
  },
];

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [activeSubject, setActiveSubject] = useState("SBD");
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleCardExpansion = (subjectName) => {
    setExpandedCards((prev) => ({
      ...prev,
      [subjectName]: !prev[subjectName],
    }));
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 6000,
    beforeChange: (current, next) => {
      setActiveSubject(subjects[next].name);
    },
    customPaging: function (i) {
      return (
        <div
          className="w-3 h-3 rounded-full transition-all duration-300"
          style={{
            backgroundColor: subjects[i].name === activeSubject ? subjects[i].color : "#CBD5E1",
            transform: subjects[i].name === activeSubject ? "scale(1.3)" : "scale(1)",
          }}
        />
      );
    },
    appendDots: (dots) => (
      <div>
        <ul className="flex gap-4 justify-center mt-6"> {dots} </ul>
      </div>
    ),
  };

  // Dynamic background style based on active subject
  const getBackgroundStyle = () => {
    const subject = subjects.find((s) => s.name === activeSubject) || subjects[0];
    const baseGradient = darkMode
      ? `linear-gradient(to bottom right, ${COLORS.dark}, #000)`
      : `linear-gradient(to bottom right, ${COLORS.light}, #E2E8F0)`;

    return {
      backgroundImage: `${baseGradient}, ${subject.bgPattern}`,
      transition: "background-image 0.5s ease-in-out",
    };
  };

  // Dynamic accent color for navigation highlight
  const getNavHighlight = (navItem) => {
    if (navItem.toLowerCase() === activeSubject.toLowerCase()) {
      const subject = subjects.find((s) => s.name === activeSubject);
      return { color: subject.color, fontWeight: "bold" };
    }
    return {};
  };

  return (
    <div
      className="min-h-screen text-slate-800 dark:text-white transition-all duration-500"
      style={getBackgroundStyle()}
    >
      {/* Updated Responsive Navbar */}
      <nav className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg sticky top-0 z-50 shadow-lg">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-0 w-full sm:w-auto justify-center sm:justify-start">
          <div className="relative overflow-hidden rounded-full h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-green-500 to-purple-500 animate-spin-slow opacity-70" />
            <img src={logo} alt="Netlab Logo" className="h-7 w-7 sm:h-8 sm:w-8 relative z-10 drop-shadow" />
          </div>
          <span className="text-lg sm:text-xl font-bold flex flex-wrap items-center">
            <span
              className="px-2 py-1 rounded mr-1 sm:mr-2"
              style={{
                background: COLORS.primary,
                color: COLORS.light,
              }}
            >
              Network
            </span>
            <span>Laboratory</span>
          </span>
        </div>
        
        {/* Navigation Items - Stacked on mobile, horizontal on desktop */}
        <ul className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
          <li>
            <a href="#home" className="hover:underline transition-colors duration-300">
              Home
            </a>
          </li>
          <li>
            <a
              href="#sbd"
              className="hover:underline transition-colors duration-300"
              style={getNavHighlight("SBD")}
            >
              SBD
            </a>
          </li>
          <li>
            <a
              href="#dmj"
              className="hover:underline transition-colors duration-300"
              style={getNavHighlight("DMJ")}
            >
              DMJ
            </a>
          </li>
          <li>
            <a
              href="#os"
              className="hover:underline transition-colors duration-300"
              style={getNavHighlight("OS")}
            >
              OS
            </a>
          </li>
          <li>
            <button
              onClick={toggleDarkMode}
              className="ml-1 sm:ml-4 w-12 h-6 sm:w-14 sm:h-7 rounded-full relative transition-all duration-300 shadow-inner"
              style={{
                backgroundColor: darkMode ? COLORS.light : COLORS.dark,
                border: `2px solid ${darkMode ? COLORS.dark : COLORS.light}`,
              }}
            >
              <span
                className="absolute top-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all duration-300 flex items-center justify-center text-xs"
                style={{
                  right: darkMode ? "0.5rem" : "calc(100% - 1.5rem)",
                  backgroundColor: darkMode ? COLORS.dark : COLORS.light,
                  color: darkMode ? COLORS.light : COLORS.dark,
                }}
              >
                {darkMode ? "🌙" : "☀️"}
              </span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Home Section */}
      <section id="home" className="flex flex-col lg:flex-row items-center justify-center px-8 py-20 gap-12">
        <div className="relative group">
          <div
            className="absolute inset-0 rounded-full animate-pulse blur-xl opacity-70"
            style={{ background: COLORS.primary }}
          />
          <img
            src={logo}
            alt="Netlab"
            className="w-60 drop-shadow-xl relative z-10 group-hover:rotate-12 transition-all duration-500 rounded-full"
          />
        </div>

        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-4 flex items-center">
            NETLAB
            <span
              className="ml-3 px-3 py-1 rounded inline-block transform -rotate-3"
              style={{
                background: COLORS[activeSubject.toLowerCase()] || COLORS.primary,
                color: COLORS.light,
                boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
              }}
            >
              {activeSubject}
            </span>
          </h1>
          <div
            className="backdrop-blur-md p-6 rounded-3xl border transition-all duration-500"
            style={{
              backgroundColor: darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.7)",
              borderColor: `${COLORS[activeSubject.toLowerCase()] || COLORS.primary}50`,
              boxShadow: `0 10px 25px -5px ${COLORS[activeSubject.toLowerCase()] || COLORS.primary}20`,
            }}
          >
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce
              posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros
              quis urna.
            </p>
            <p>
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin
              pharetra nonummy pede. Mauris et orci. Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.
            </p>
            <div className="mt-6 flex gap-4">
              <button
                className="px-6 py-2 rounded-full transition-all duration-300 transform hover:-translate-y-1 font-medium text-white"
                style={{ backgroundColor: COLORS[activeSubject.toLowerCase()] || COLORS.primary }}
              >
                Get Started
              </button>
              <button
                className="px-6 py-2 rounded-full transition-all duration-300 transform hover:-translate-y-1 font-medium"
                style={{
                  border: `2px solid ${COLORS[activeSubject.toLowerCase()] || COLORS.primary}`,
                  color: darkMode ? COLORS.light : COLORS.dark,
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Subject Slider - UPDATED WITH CENTERED CONTENT */}
      <main className="w-full max-w-4xl mx-auto pb-20 px-4">
        <Slider {...sliderSettings}>
          {subjects.map((subject) => (
            <div
              key={subject.name}
              id={subject.name.toLowerCase()}
              className="p-8 backdrop-blur-lg rounded-3xl shadow-xl flex flex-col items-center justify-center text-center transition-all duration-500"
              style={{
                backgroundColor: darkMode ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.8)",
                border: `2px solid ${subject.color}30`,
                minHeight: "400px", // Ensuring consistent height
              }}
            >
              <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
                <div className="relative mb-6">
                  <div
                    className="absolute -inset-4 rounded-full animate-pulse blur-lg opacity-40"
                    style={{ backgroundColor: subject.color }}
                  />
                  <img
                    src={subject.logo}
                    alt={`${subject.name} Logo`}
                    className="h-28 relative z-10 drop-shadow-lg"
                  />
                </div>

                <h2 className="text-4xl font-bold mb-2" style={{ color: subject.color }}>
                  {subject.name}
                </h2>

                <h3 className="text-xl font-medium mb-4">{subject.title}</h3>

                <p className="text-base max-w-lg mb-6">{subject.description}</p>

                <button
                  className="px-6 py-2 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-medium text-white"
                  style={{ backgroundColor: subject.color }}
                >
                  Explore {subject.name}
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </main>

      {/* Courses Section */}
      <section className="w-full max-w-6xl mx-auto pb-20 px-4" id="featured-content">
        <h2 className="text-3xl font-bold text-center mb-10">Netlab's Subjects</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={`card-${subject.name}`}
              className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                expandedCards[subject.name] ? "" : "hover:shadow-2xl hover:-translate-y-2"
              }`}
              style={{
                backgroundColor: darkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
                borderTop: `4px solid ${subject.color}`,
              }}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
                  >
                    <img src={subject.logo} alt={subject.name} className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold">{subject.title}</h3>
                </div>

                <p className="text-sm mb-6 opacity-80">{subject.description}</p>

                <div className="flex justify-between items-center">
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${subject.color}20`,
                      color: subject.color,
                    }}
                  >
                    {subject.modules.length} Lessons
                  </span>

                  <button
                    className="text-sm font-medium flex items-center gap-1"
                    style={{ color: subject.color }}
                    onClick={() => toggleCardExpansion(subject.name)}
                  >
                    View Details
                    <span
                      className="transition-transform duration-300"
                      style={{
                        transform: expandedCards[subject.name] ? "rotate(90deg)" : "rotate(0deg)",
                      }}
                    >
                      →
                    </span>
                  </button>
                </div>

                {/* Module List - Dropdown */}
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: expandedCards[subject.name] ? `${subject.modules.length * 3}rem` : "0",
                    opacity: expandedCards[subject.name] ? 1 : 0,
                    marginTop: expandedCards[subject.name] ? "1rem" : "0",
                  }}
                >
                  <div
                    className="border-t pt-4 mt-2"
                    style={{ borderColor: `${subject.color}30` }}
                  >
                    <h4 className="text-sm font-medium mb-3" style={{ color: subject.color }}>
                      Modul Pembelajaran
                    </h4>
                    <ul className="space-y-2">
                      {subject.modules.map((module) => (
                        <li
                          key={`${subject.name}-module-${module.number}`}
                          className="text-sm p-2 rounded transition-all duration-300"
                          style={{
                            backgroundColor: darkMode
                              ? "rgba(255, 255, 255, 0.05)"
                              : "rgba(0, 0, 0, 0.03)",
                          }}
                        >
                          <span
                            className="font-bold mr-2"
                            style={{ color: subject.color }}
                          >
                            Modul {module.number}
                          </span>
                          {module.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-10 text-center border-t backdrop-blur-md"
        style={{
          borderColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
          backgroundColor: darkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.5)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Netlab Logo" className="h-10 rounded-full" />
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-6">
            {subjects.map((subject) => (
              <a
                key={`footer-${subject.name}`}
                href={`#${subject.name.toLowerCase()}`}
                className="flex items-center gap-2 transition-all duration-300 hover:underline"
                style={{ color: subject.color }}
              >
                <img src={subject.logo} alt={subject.name} className="h-5 w-5" />
                <span>{subject.title}</span>
              </a>
            ))}
          </div>

          <p className="text-sm opacity-60">
            © 2025 Netlab TP SBD Zhafira Zahra Alfarisy_2306250636 • All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}