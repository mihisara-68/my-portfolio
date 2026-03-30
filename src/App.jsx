import { useState, useEffect, useRef } from "react";
import MyPhoto from "./assets/photo.jpg";
import photo1 from "./assets/1.jpg";
import Photo2 from "./assets/2.jpg";
import photo3 from "./assets/3.jpg";
import photo4 from "./assets/4.jpg";
import photo5 from "./assets/5.jpg";
import photo6 from "./assets/6.jpg";

const portfolio = {
  name: "Mihisara Madhushan",
  role: "Full Stack Developer",
  bio: "I design and build modern, high-performance web applications with clean architecture and beautiful user experiences.",
  email: "mihisaramadushan68@gmail.com",
  linkedin: "https://www.linkedin.com/in/mihisara-madhushan-a48761250/",
  github: "https://github.com/mihisara-68",
  highlight: ["MongoDB", "Express", "React", "Node.js", "TypeScript", "Next.js"],
  skills: {
    Frontend: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js"],
    Backend: ["Node.js", "Express", "REST APIs", "GraphQL", "Python"],
    Database: ["MongoDB", "PostgreSQL", "Redis", "Prisma"],
    DevOps: ["Docker", "CI/CD", "Vercel", "AWS", "Git"],
  },
  projects: [
    {
      name: "Project Alpha",
      desc: "A full-stack SaaS platform with real-time collaboration, built with React and Node.js.",
      stack: ["Next.js", "PostgreSQL", "Stripe", "Tailwind", "Socket.io"],
      github: "#",
      demo: "#",
      accent: "#00ff88",
    },
    {
      name: "Project Beta",
      desc: "An e-commerce storefront with Stripe payments, admin dashboard, and inventory management.",
      stack: ["Next.js", "PostgreSQL", "Stripe", "Tailwind", "Socket.io"],
      github: "#",
      demo: "#",
      accent: "#00cfff",
    },
    {
      name: "Project Gamma",
      desc: "An e-commerce storefront with Stripe payments, admin dashboard, and inventory management.",
      stack: ["Next.js", "PostgreSQL", "Stripe", "Tailwind", "Socket.io"],
      github: "#",
      demo: "#",
      accent: "#bf5af2",
    },
  ],
  achievements: [
    { icon: "🏆", title: "Top Contributor", desc: "Open source community 2024" },
    { icon: "🚀", title: "15+ Projects", desc: "Delivered across 3 continents" },
    { icon: "⭐", title: "5-Star Rated", desc: "Client satisfaction on Upwork" },
    { icon: "📜", title: "AWS Certified", desc: "Solutions Architect Associate" },
  ],gallery: [
    { id: 1, src: photo1, caption: "Graduation Ceremony 2023" },
    { id: 2, src: Photo2, caption: "Hackathon Winner 2023" },
    { id: 3, src: photo3, caption: "Tech Conference 2024" },
    { id: 4, src: photo4, caption: "Tournament Finals 2023" },
    { id: 5, src: photo5, caption: "Team Event 2024" },
    { id: 6, src: photo6, caption: "Award Night 2024" },
  ],
};

const NAV = ["Home", "About", "Projects", "Skills", "Achievements", "Contact"];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function Section({ id, children, className = "", style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <section
      id={id}
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(48px)",
        transition: "opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1)",
      }}
    >
      {children}
    </section>
  );
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hov, setHov] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => setHov(!!e.target.closest("a,button,[data-hover]"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);
  return (
    <>
      <div style={{
        position: "fixed", top: pos.y - 6, left: pos.x - 6, width: 12, height: 12,
        borderRadius: "50%", background: "#00ff88", pointerEvents: "none", zIndex: 9999,
        transition: "transform 0.1s", transform: hov ? "scale(2.5)" : "scale(1)",
        mixBlendMode: "difference",
      }} />
      <div style={{
        position: "fixed", top: pos.y - 22, left: pos.x - 22, width: 44, height: 44,
        borderRadius: "50%", border: "1px solid rgba(0,255,136,0.35)", pointerEvents: "none",
        zIndex: 9998, transition: "top 0.18s, left 0.18s",
      }} />
    </>
  );
}

function TypeWriter({ text }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (idx < text.length) {
      const t = setTimeout(() => { setDisplayed(text.slice(0, idx + 1)); setIdx(idx + 1); }, 60);
      return () => clearTimeout(t);
    }
  }, [idx, text]);
  return <span>{displayed}<span style={{ animation: "blink 1s step-end infinite", color: "#00ff88" }}>|</span></span>;
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ background: "#080c10", color: "#e8eaf0", fontFamily: "'DM Mono', 'Fira Code', monospace", minHeight: "100vh", cursor: "none", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Syne:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{cursor:none;}
        ::selection{background:#00ff8840;color:#00ff88;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#0d1117;}
        ::-webkit-scrollbar-thumb{background:#00ff88;border-radius:2px;}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:0.6}50%{opacity:1}}
        @keyframes scanline{0%{top:-10%}100%{top:110%}}
        .nav-link{transition:color 0.2s,letter-spacing 0.2s;}
        .nav-link:hover,.nav-link.active{color:#00ff88;letter-spacing:0.08em;}
        .card-glow{transition:box-shadow 0.3s,transform 0.3s;}
        .card-glow:hover{box-shadow:0 0 40px #00ff8828,0 8px 48px #0008;transform:translateY(-4px);}
        .skill-chip{transition:background 0.2s,color 0.2s,transform 0.2s;}
        .skill-chip:hover{background:#00ff8820;color:#00ff88;transform:scale(1.07);}
        .btn-main{background:transparent;border:1px solid #00ff88;color:#00ff88;padding:12px 32px;font-family:inherit;font-size:14px;letter-spacing:0.12em;cursor:none;transition:background 0.2s,color 0.2s;}
        .btn-main:hover{background:#00ff88;color:#080c10;}
        .btn-ghost{background:transparent;border:1px solid #ffffff22;color:#aaa;padding:12px 32px;font-family:inherit;font-size:13px;letter-spacing:0.08em;cursor:none;transition:border-color 0.2s,color 0.2s;}
        .btn-ghost:hover{border-color:#ffffff55;color:#fff;}
        .grid-bg{background-image:linear-gradient(rgba(0,255,136,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,136,0.03) 1px,transparent 1px);background-size:60px 60px;}
        .highlight-chip{border:1px solid #00ff8844;background:#00ff8808;padding:4px 12px;font-size:12px;letter-spacing:0.08em;color:#00ff88;white-space:nowrap;}
        .section-label{font-size:11px;letter-spacing:0.24em;color:#00ff8888;text-transform:uppercase;margin-bottom:8px;}
        .section-title{font-family:'Syne',sans-serif;font-size:clamp(28px,5vw,48px);font-weight:800;line-height:1.1;margin-bottom:32px;}
        .project-card{background:#0d1117;border:1px solid #1a2232;padding:32px;position:relative;overflow:hidden;}
        .project-card::before{content:'';position:absolute;inset:0;opacity:0;transition:opacity 0.3s;pointer-events:none;}
        .project-card:hover::before{opacity:1;}
        .ach-card{background:#0d1117;border:1px solid #1a2232;padding:28px 24px;text-align:center;transition:border-color 0.3s,transform 0.3s;}
        .ach-card:hover{border-color:#00ff8844;transform:translateY(-4px);}
        .gallery-item{position:relative;overflow:hidden;cursor:none;border:1px solid #1a2232;background:#0d1117;aspect-ratio:4/3;transition:border-color 0.3s;}
        .gallery-item:hover{border-color:#00ff8844;}
        .gallery-item img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.5s cubic-bezier(.16,1,.3,1),filter 0.4s;}
        .gallery-item:hover img{transform:scale(1.07);filter:brightness(0.55);}
        .gallery-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;opacity:0;transition:opacity 0.35s;pointer-events:none;}
        .gallery-item:hover .gallery-overlay{opacity:1;}
        .gallery-top-bar{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#00ff88,transparent);transform:scaleX(0);transform-origin:left;transition:transform 0.4s cubic-bezier(.16,1,.3,1);}
        .gallery-item:hover .gallery-top-bar{transform:scaleX(1);}
        input,textarea{background:#0d1117;border:1px solid #1a2232;color:#e8eaf0;padding:14px 18px;width:100%;font-family:inherit;font-size:14px;outline:none;transition:border-color 0.2s;}
        input:focus,textarea:focus{border-color:#00ff88;}
        input::placeholder,textarea::placeholder{color:#444;}
        .noise{position:fixed;inset:0;pointer-events:none;z-index:1;opacity:0.025;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:200px;}
      `}</style>

      <Cursor />
      <div className="noise" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(8,12,16,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #ffffff0a" : "1px solid transparent",
        transition: "all 0.4s",
      }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "0.04em" }}>
          <span style={{ color: "#00ff88" }}>Mihi</span>sara
        </div>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {NAV.map(n => (
            <button key={n} className={`nav-link ${active === n ? "active" : ""}`}
              onClick={() => scrollTo(n)}
              style={{ background: "none", border: "none", color: active === n ? "#00ff88" : "#8892a4", fontSize: 13, letterSpacing: "0.08em", cursor: "none", fontFamily: "inherit" }}>
              {n}
            </button>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            className="btn-main"
            style={{ padding: "8px 20px", fontSize: 12, textDecoration: "none", display: "inline-block" }}
          >
            Resume ↓
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="Home" className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 10vw 80px", position: "relative", overflow: "hidden" }}>
        {/* Glow orbs */}
        <div style={{ position: "absolute", top: "20%", right: "8%", width: 420, height: 420, background: "radial-gradient(circle, #00ff8812 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none", animation: "float 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 280, height: 280, background: "radial-gradient(circle, #00cfff0c 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none", animation: "float 10s ease-in-out infinite reverse" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 60, alignItems: "center", width: "100%", zIndex: 2 }}>
          {/* LEFT: text */}
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
              {portfolio.highlight.map(t => <span key={t} className="highlight-chip">{t}</span>)}
            </div>
            <p className="section-label">Available for freelance · 2024</p>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(36px,6vw,80px)", lineHeight: 1.0, marginBottom: 16, letterSpacing: "-0.02em" }}>
              <TypeWriter text={portfolio.name} />
            </h1>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: "clamp(16px,2.5vw,26px)", color: "#00ff88", marginBottom: 24, letterSpacing: "0.04em" }}>
              {portfolio.role}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#8892a4", maxWidth: 520, marginBottom: 48 }}>
              {portfolio.bio}
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="btn-main" onClick={() => scrollTo("Projects")}>View Work →</button>
              <button className="btn-ghost" onClick={() => scrollTo("Contact")}>Get in Touch</button>
            </div>
          </div>

          {/* RIGHT: photo */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            {/* Spinning ring behind photo */}
            <div style={{ position: "absolute", inset: -20, border: "1px solid #00ff8828", borderRadius: "50%", animation: "spin 20s linear infinite", pointerEvents: "none" }}>
              <div style={{ position: "absolute", top: -5, left: "50%", width: 10, height: 10, background: "#00ff88", borderRadius: "50%", transform: "translateX(-50%)" }} />
            </div>
            <div style={{ position: "absolute", inset: -40, border: "1px solid #00cfff14", borderRadius: "50%", animation: "spin 35s linear infinite reverse", pointerEvents: "none" }}>
              <div style={{ position: "absolute", bottom: -5, left: "50%", width: 6, height: 6, background: "#00cfff", borderRadius: "50%", transform: "translateX(-50%)" }} />
            </div>

            {/* Photo frame */}
            <div style={{ width: 280, height: 280, borderRadius: "50%", position: "relative", animation: "float 6s ease-in-out infinite" }}>
              {/* Green glow behind */}
              <div style={{ position: "absolute", inset: -8, borderRadius: "50%", background: "conic-gradient(from 0deg, #00ff88, #00cfff, #bf5af2, #00ff88)", padding: 3, zIndex: 0 }}>
                <div style={{ borderRadius: "50%", width: "100%", height: "100%", background: "#080c10" }} />
              </div>
              {/* Photo — replace src with your actual image URL */}
              <img
                src={MyPhoto}
                alt="Mihisara Madhushan"
                style={{
                  position: "absolute", inset: 6, width: "calc(100% - 12px)", height: "calc(100% - 12px)",
                  borderRadius: "50%", objectFit: "cover", zIndex: 1,
                  filter: "grayscale(20%) contrast(1.05)",
                }}
              />
              {/* Scanline overlay */}
              <div style={{ position: "absolute", inset: 6, borderRadius: "50%", background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)", zIndex: 2, pointerEvents: "none" }} />
              {/* Status badge */}
              <div style={{ position: "absolute", bottom: 16, right: -8, background: "#0d1117", border: "1px solid #00ff8844", padding: "6px 14px", fontSize: 11, letterSpacing: "0.12em", color: "#00ff88", zIndex: 3, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ff88", display: "inline-block", animation: "pulse 1.5s ease-in-out infinite" }} />
                AVAILABLE
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "#444", fontSize: 11, letterSpacing: "0.16em" }}>
          <span>SCROLL</span>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, #00ff88, transparent)", animation: "pulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ABOUT */}
      <Section id="About" style={{ padding: "120px 10vw", borderTop: "1px solid #1a2232" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <p className="section-label">// about_me</p>
            <h2 className="section-title">Crafting Digital<br /><span style={{ color: "#00ff88" }}>Experiences</span></h2>
            <p style={{ color: "#8892a4", lineHeight: 1.9, fontSize: 15, marginBottom: 24 }}>
              I'm a Full Stack Developer with a passion for building products that live at the intersection of design and engineering. From pixel-perfect UIs to robust backend systems, I own the full cycle.
            </p>
            <p style={{ color: "#8892a4", lineHeight: 1.9, fontSize: 15, marginBottom: 40 }}>
              My stack is anchored by the MERN ecosystem — MongoDB, Express, React, Node.js — supercharged with TypeScript and Next.js for scalable, type-safe applications.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {[["3+", "Years Experience"], ["50+", "Projects Shipped"], ["15+", "Happy Clients"], ["∞", "Lines of Code"]].map(([n, l]) => (
                <div key={l} style={{ borderLeft: "2px solid #00ff88", paddingLeft: 16 }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 32, color: "#00ff88" }}>{n}</div>
                  <div style={{ fontSize: 13, color: "#8892a4", letterSpacing: "0.06em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ width: "100%", aspectRatio: "1", background: "#0d1117", border: "1px solid #1a2232", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              {/* Code snippet visual */}
              <div style={{ padding: 32, fontFamily: "'DM Mono',monospace", fontSize: 13, lineHeight: 2, color: "#4a5568", width: "100%" }}>
                <div><span style={{ color: "#8892a4" }}>const</span> <span style={{ color: "#00ff88" }}>developer</span> = {"{"}</div>
                <div style={{ paddingLeft: 24 }}><span style={{ color: "#00cfff" }}>name</span>: <span style={{ color: "#f5c842" }}>"Mihisara"</span>,</div>
                <div style={{ paddingLeft: 24 }}><span style={{ color: "#00cfff" }}>role</span>: <span style={{ color: "#f5c842" }}>"Full Stack"</span>,</div>
                <div style={{ paddingLeft: 24 }}><span style={{ color: "#00cfff" }}>stack</span>: [<span style={{ color: "#f5c842" }}>"MERN"</span>, <span style={{ color: "#f5c842" }}>"Next.js"</span>],</div>
                <div style={{ paddingLeft: 24 }}><span style={{ color: "#00cfff" }}>available</span>: <span style={{ color: "#00ff88" }}>true</span>,</div>
                <div style={{ paddingLeft: 24 }}><span style={{ color: "#00cfff" }}>coffee</span>: <span style={{ color: "#00cfff" }}>Infinity</span>,</div>
                <div>{"}"}</div>
              </div>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #00ff88, #00cfff, transparent)" }} />
            </div>
            <div style={{ position: "absolute", bottom: -20, right: -20, width: 120, height: 120, border: "1px solid #00ff8822", borderRadius: "50%" }} />
            <div style={{ position: "absolute", top: -16, left: -16, width: 60, height: 60, background: "#00ff8812", borderRadius: "50%" }} />
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="Projects" style={{ padding: "120px 10vw", borderTop: "1px solid #1a2232" }}>
        <p className="section-label">// selected_work</p>
        <h2 className="section-title">Featured <span style={{ color: "#00ff88" }}>Projects</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {portfolio.projects.map((p, i) => (
            <div key={p.name} className="project-card card-glow" data-hover style={{ animationDelay: `${i * 0.1}s` }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />
              <div style={{ fontSize: 11, letterSpacing: "0.2em", color: p.accent, marginBottom: 16 }}>// PROJECT_{String(i + 1).padStart(2, "0")}</div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 12, color: "#e8eaf0" }}>{p.name}</h3>
              <p style={{ color: "#8892a4", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                {p.stack.map(t => (
                  <span key={t} className="skill-chip" style={{ border: `1px solid ${p.accent}22`, background: `${p.accent}0a`, padding: "4px 12px", fontSize: 12, letterSpacing: "0.06em", color: p.accent }}>
                    {t}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <a href={p.github} data-hover style={{ fontSize: 13, color: "#8892a4", textDecoration: "none", letterSpacing: "0.06em", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = p.accent} onMouseLeave={e => e.target.style.color = "#8892a4"}>
                  GitHub ↗
                </a>
                <a href={p.demo} data-hover style={{ fontSize: 13, color: "#8892a4", textDecoration: "none", letterSpacing: "0.06em", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = p.accent} onMouseLeave={e => e.target.style.color = "#8892a4"}>
                  Live Demo ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="Skills" style={{ padding: "120px 10vw", borderTop: "1px solid #1a2232", background: "#060a0e" }}>
        <p className="section-label">// tech_stack</p>
        <h2 className="section-title">Skills & <span style={{ color: "#00ff88" }}>Technologies</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
          {Object.entries(portfolio.skills).map(([cat, skills]) => (
            <div key={cat}>
              <div style={{ fontSize: 12, letterSpacing: "0.2em", color: "#00ff88", marginBottom: 20, borderBottom: "1px solid #1a2232", paddingBottom: 12 }}>
                {cat.toUpperCase()}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {skills.map((s) => {
                  const isHighlight = portfolio.highlight.includes(s);
                  return (
                    <div key={s} className="skill-chip" style={{
                      padding: "10px 16px", border: `1px solid ${isHighlight ? "#00ff8844" : "#1a2232"}`,
                      background: isHighlight ? "#00ff8808" : "transparent",
                      color: isHighlight ? "#00ff88" : "#8892a4", fontSize: 14, letterSpacing: "0.04em",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
                      {s}
                      {isHighlight && <span style={{ fontSize: 8, background: "#00ff88", color: "#080c10", padding: "2px 6px", letterSpacing: "0.12em" }}>CORE</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ACHIEVEMENTS */}
      <Section id="Achievements" style={{ padding: "120px 10vw", borderTop: "1px solid #1a2232" }}>
        <p className="section-label">// milestones</p>
        <h2 className="section-title">Achieve<span style={{ color: "#00ff88" }}>ments</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
          {portfolio.achievements.map((a) => (
            <div key={a.title} className="ach-card">
              <div style={{ fontSize: 36, marginBottom: 16 }}>{a.icon}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 8, color: "#e8eaf0" }}>{a.title}</div>
              <div style={{ fontSize: 13, color: "#8892a4", letterSpacing: "0.04em" }}>{a.desc}</div>
            </div>
          ))}
        </div>
      </Section>


            {/* GALLERY */}
      <Section id="Gallery" style={{ padding: "120px 10vw", borderTop: "1px solid #1a2232", background: "#060a0e" }}>
        <p className="section-label">// photo_gallery</p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <h2 className="section-title" style={{ margin: 0 }}>Memory <span style={{ color: "#00ff88" }}>Gallery</span></h2>
          <p style={{ fontSize: 11, color: "#4a5568", letterSpacing: "0.16em" }}>{portfolio.gallery.length} PHOTOS · CLICK TO EXPAND</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {portfolio.gallery.map((photo, i) => (
            <div key={photo.id} className="gallery-item" data-hover onClick={() => openLightbox(i)}>
              <div className="gallery-top-bar" />
              <img src={photo.src} alt={photo.caption} loading="lazy" />
              <div className="gallery-overlay">
                <div style={{ fontSize: 32, color: "#fff" }}>⊕</div>
                <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 13, color: "#fff", textAlign: "center", padding: "0 20px", lineHeight: 1.5 }}>{photo.caption}</p>
                <p style={{ fontSize: 10, color: "#00ff88", letterSpacing: "0.2em" }}>// PHOTO_{String(i + 1).padStart(2, "0")}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, padding: "14px 22px", border: "1px dashed #1a2232", display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ color: "#00ff88", fontSize: 20, lineHeight: 1 }}>+</span>
          <p style={{ fontSize: 12, color: "#4a5568", letterSpacing: "0.05em" }}>
            To add more photos, add objects to <span style={{ color: "#00ff88" }}>portfolio.gallery</span> in the file — the grid expands automatically.
          </p>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="Contact" style={{ padding: "120px 10vw", borderTop: "1px solid #1a2232", background: "#060a0e" }}>
        <p className="section-label">// get_in_touch</p>
        <h2 className="section-title">Let's <span style={{ color: "#00ff88" }}>Connect</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <p style={{ color: "#8892a4", lineHeight: 1.9, fontSize: 15, marginBottom: 48 }}>
              Have a project in mind or just want to chat? My inbox is always open. Whether it's a full-scale application or a quick question, I'll get back to you.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                {
                  label: "Email",
                  value: "mihisaramadushan68@gmail.com",
                  href: `https://mail.google.com/mail/?view=cm&fs=1&to=${portfolio.email}&su=Portfolio%20Contact&body=Hi%20Mihisara,%0A%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.`
                },
                { label: "LinkedIn", value: "mihisara-madhushan", href: portfolio.linkedin },
                { label: "GitHub", value: "github.com/mihisara", href: portfolio.github },
              ].map(({ label, value, href }) => (
                <a key={label} href={href} data-hover style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none", padding: "16px 20px", border: "1px solid #1a2232", transition: "border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#00ff8844"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#1a2232"}>
                  <span style={{ fontSize: 11, color: "#00ff88", letterSpacing: "0.2em", minWidth: 80 }}>{label.toUpperCase()}</span>
                  <span style={{ color: "#8892a4", fontSize: 14 }}>{value}</span>
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input placeholder="Your Name" />
            <input placeholder="Your Email" type="email" />
            <textarea placeholder="Your Message" rows={6} style={{ resize: "none" }} />
            <button className="btn-main" style={{ width: "100%", padding: "16px" }}
              onClick={() => alert("Message sent! (Wire up your backend here 🚀)")}>
              Send Message →
            </button>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 10vw", borderTop: "1px solid #1a2232", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16 }}>
          <span style={{ color: "#00ff88" }}>M</span>M
        </div>
        <div style={{ fontSize: 12, color: "#4a5568", letterSpacing: "0.08em" }}>
          © 2025 Mihisara Madhushan · Built with React · All rights reserved
        </div>
    <div style={{ display: "flex", gap: 20 }}>
  <a
    href={portfolio.github}
    target="_blank"
    data-hover
    style={{ fontSize: 12, color: "#4a5568", textDecoration: "none" }}
    onMouseEnter={e => e.target.style.color = "#00ff88"}
    onMouseLeave={e => e.target.style.color = "#4a5568"}
  >
    GitHub
  </a>

  <a
    href={portfolio.linkedin}
    target="_blank"
    data-hover
    style={{ fontSize: 12, color: "#4a5568", textDecoration: "none" }}
    onMouseEnter={e => e.target.style.color = "#00ff88"}
    onMouseLeave={e => e.target.style.color = "#4a5568"}
  >
    LinkedIn
  </a>

  <a
    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolio.email}&su=Portfolio%20Contact&body=Hi%20Mihisara,%0A%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.:${portfolio.email}`}
    data-hover
    style={{ fontSize: 12, color: "#4a5568", textDecoration: "none" }}
    onMouseEnter={e => e.target.style.color = "#00ff88"}
    onMouseLeave={e => e.target.style.color = "#4a5568"}
  >
    Email
  </a>
</div>
      </footer>
    </div>
  );
}
