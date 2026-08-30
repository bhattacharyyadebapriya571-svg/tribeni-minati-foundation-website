import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";

const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };
const SPRING_SLOW = { type: "spring" as const, stiffness: 200, damping: 28 };

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Social Impact", href: "#pillars" },
    { label: "Corporate CSR", href: "#csr" },
    { label: "Agribusiness", href: "#pillars" },
    { label: "Contact", href: "#footer" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...SPRING, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className="mx-auto transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(250, 250, 250, 0.82)"
            : "rgba(250, 250, 250, 0.4)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(0,0,0,0.07)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.04)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "#1C3D2F" }}
            >
              <span
                className="text-xs font-bold"
                style={{ color: "#F0F5F2", fontFamily: "'DM Serif Display', serif" }}
              >
                MV
              </span>
            </div>
            <span
              className="text-base font-semibold tracking-tight"
              style={{ color: "#111111", fontFamily: "'Inter', sans-serif" }}
            >
              Minati Vision
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: "#5A5A5A" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#111111")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#5A5A5A")
                }
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#csr"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING}
              className="px-5 py-2.5 text-sm font-medium rounded-lg border transition-colors duration-200"
              style={{
                color: "#1C3D2F",
                borderColor: "rgba(28,61,47,0.25)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(28,61,47,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              Partner With Us
            </motion.a>
            <motion.a
              href="#hero-cta"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING}
              className="px-5 py-2.5 text-sm font-semibold rounded-lg"
              style={{
                background: "#1C3D2F",
                color: "#F0F5F2",
                boxShadow: "0 4px 16px rgba(28,61,47,0.25)",
              }}
            >
              Donate Now
            </motion.a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-px bg-gray-700 mb-1.5 transition-all" />
            <div className="w-5 h-px bg-gray-700 mb-1.5" />
            <div className="w-5 h-px bg-gray-700" />
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={SPRING}
              className="md:hidden overflow-hidden border-t"
              style={{ borderColor: "rgba(0,0,0,0.07)" }}
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium"
                    style={{ color: "#3A3A3A" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex flex-col gap-2 pt-2 border-t" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                  <a
                    href="#csr"
                    className="text-center px-5 py-2.5 text-sm font-medium rounded-lg border"
                    style={{ color: "#1C3D2F", borderColor: "rgba(28,61,47,0.3)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    Partner With Us
                  </a>
                  <a
                    href="#hero-cta"
                    className="text-center px-5 py-2.5 text-sm font-semibold rounded-lg"
                    style={{ background: "#1C3D2F", color: "#F0F5F2" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    Donate Now
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function FloatingMetricCard() {
  const y = useSpring(0, { stiffness: 60, damping: 12 });

  useEffect(() => {
    let t = 0;
    const animate = () => {
      t += 0.015;
      y.set(Math.sin(t) * 10);
      requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [y]);

  const metrics = [
    { value: "10,000+", label: "Farmers Impacted" },
    { value: "₹18Cr+", label: "CSR Funds Deployed" },
    { value: "6 States", label: "Active Operations" },
  ];

  return (
    <motion.div
      style={{ y }}
      className="relative"
    >
      <div
        className="rounded-2xl p-6 min-w-[280px]"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(0,0,0,0.07)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-2 mb-5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "#4E8B65" }}
          />
          <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "#6B7280" }}>
            Live Impact
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div
                className="text-xl font-bold leading-tight"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  color: "#1C3D2F",
                }}
              >
                {m.value}
              </div>
              <div className="text-xs mt-1 leading-tight" style={{ color: "#8A9A8E" }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute -bottom-4 -right-4 rounded-xl px-3 py-2"
        style={{
          background: "#1C3D2F",
          color: "#F0F5F2",
          boxShadow: "0 8px 24px rgba(28,61,47,0.3)",
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="text-xs font-semibold">12A / 80G</div>
        <div className="text-[10px] opacity-70">Certified Trust</div>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 60]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden"
      style={{ background: "#FAFAFA" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(78,139,101,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 -left-20 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(28,61,47,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        style={{ opacity, y }}
        className="max-w-7xl mx-auto px-6 lg:px-10 w-full"
      >
        <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
              style={{
                background: "rgba(78,139,101,0.1)",
                border: "1px solid rgba(78,139,101,0.2)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#4E8B65" }} />
              <span className="text-xs font-medium tracking-wide" style={{ color: "#2D6644" }}>
                Project Billion — Est. 2024
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.3 }}
              className="leading-[1.1] mb-6"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)",
                color: "#0F1F16",
                letterSpacing: "-0.02em",
              }}
            >
              Transforming Lives.{" "}
              <span
                className="italic"
                style={{ color: "#4E8B65" }}
              >
                Building a Sustainable
              </span>{" "}
              Economy.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.4 }}
              className="text-lg leading-relaxed mb-10 max-w-xl"
              style={{ color: "#5A6B62", fontWeight: 400 }}
            >
              Bridging the gap between grassroots social welfare and high-impact corporate
              infrastructure across India — through two entities, one unified mission.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.5 }}
              className="flex flex-wrap gap-4"
              id="hero-cta"
            >
              <motion.a
                href="#pillars"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold"
                style={{
                  background: "#1C3D2F",
                  color: "#F0F5F2",
                  boxShadow: "0 8px 32px rgba(28,61,47,0.28)",
                }}
              >
                Support the Vision
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
              <motion.a
                href="#csr"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium"
                style={{
                  color: "#1C3D2F",
                  border: "1px solid rgba(28,61,47,0.2)",
                  background: "transparent",
                }}
              >
                View CSR Portfolio
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-6 mt-12 pt-8"
              style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
            >
              {[
                { label: "Tribeni Minati Foundation", sub: "NGO — Section 25" },
                { label: "Minati Vision Foundation", sub: "Section 8 — Business Entity" },
              ].map((e) => (
                <div key={e.label}>
                  <div className="text-xs font-semibold" style={{ color: "#111111" }}>
                    {e.label}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#9AA89F" }}>
                    {e.sub}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ ...SPRING_SLOW, delay: 0.4 }}
            className="hidden lg:block"
          >
            <FloatingMetricCard />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function PillarCard({
  icon,
  title,
  subtitle,
  body,
  tag,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  body: string;
  tag: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...SPRING, delay }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative rounded-2xl p-8 flex flex-col cursor-default"
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 20px 60px rgba(28,61,47,0.1), 0 4px 16px rgba(0,0,0,0.05)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 4px 24px rgba(0,0,0,0.04)";
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
        style={{ background: "rgba(28,61,47,0.07)" }}
      >
        {icon}
      </div>
      <div
        className="text-xs font-semibold uppercase tracking-widest mb-2"
        style={{ color: "#4E8B65" }}
      >
        {tag}
      </div>
      <h3
        className="text-xl mb-1"
        style={{
          fontFamily: "'DM Serif Display', serif",
          color: "#0F1F16",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      <p className="text-sm font-medium mb-3" style={{ color: "#3D6B4F" }}>
        {subtitle}
      </p>
      <p className="text-sm leading-relaxed flex-1" style={{ color: "#6B7A72" }}>
        {body}
      </p>
      <motion.div
        className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold"
        style={{ color: "#1C3D2F" }}
        whileHover={{ gap: "8px" }}
        transition={SPRING}
      >
        Learn More
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function Pillars() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const pillars = [
    {
      tag: "Healthcare",
      title: "Project HELP!!",
      subtitle: "24/7 Emergency Medical & Super-Specialty Care",
      body: "A fully integrated healthcare response system providing emergency ambulance networks, telemedicine, and super-specialty referrals to underserved rural communities across six Indian states.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 4v14M4 11h14" stroke="#1C3D2F" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      tag: "Mobility",
      title: "Green Transport",
      subtitle: "GPS-Based Smart Mobility & Rural Connectivity",
      body: "Electric fleet and GPS-optimized last-mile logistics connecting remote villages to district markets, health facilities, and education centers — reducing travel burden by up to 60%.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="3" y="7" width="16" height="9" rx="2" stroke="#1C3D2F" strokeWidth="1.6" />
          <circle cx="7" cy="16" r="1.5" stroke="#1C3D2F" strokeWidth="1.4" />
          <circle cx="15" cy="16" r="1.5" stroke="#1C3D2F" strokeWidth="1.4" />
          <path d="M3 10h16" stroke="#1C3D2F" strokeWidth="1.4" />
        </svg>
      ),
    },
    {
      tag: "Agriculture",
      title: "Agri-Business (FPO/FPC)",
      subtitle: "Direct Market Linkages & Cold Chain Infrastructure",
      body: "Farmer Producer Organizations backed by institutional cold storage, digital mandi access, and export certification — transforming subsistence farming into sustainable agribusiness for 10,000+ smallholders.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 19V9M11 9C11 9 7 8 5 4c4 0 6 2 6 5zM11 9c0 0 4-1 6-5-4 0-6 2-6 5z" stroke="#1C3D2F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      tag: "Welfare",
      title: "Women & Child Welfare",
      subtitle: "Crèche Services & Skill Development Centers",
      body: "Registered crèche facilities, maternal nutrition programs, and vocational training hubs empowering women with market-relevant skills in textiles, digital literacy, and microenterprise management.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="7" r="3" stroke="#1C3D2F" strokeWidth="1.6" />
          <path d="M4 19c0-3.866 3.134-7 7-7h2c3.866 0 7 3.134 7 7" stroke="#1C3D2F" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section id="pillars" className="py-28" style={{ background: "#FAFAFA" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={SPRING}
          className="max-w-xl mb-16"
        >
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#4E8B65" }}
          >
            Core Pillars
          </div>
          <h2
            className="mb-4 leading-tight"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              color: "#0F1F16",
              letterSpacing: "-0.02em",
            }}
          >
            Four Pillars. One Vision.
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "#5A6B62" }}>
            Each initiative is designed as an independent, scalable vertical — connected by shared infrastructure, governance, and an unwavering commitment to measurable impact.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <PillarCard key={p.title} {...p} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { value: "₹42Cr+", label: "Total Impact Mobilized" },
    { value: "6", label: "Indian States Active" },
    { value: "3,200+", label: "Women Trained" },
    { value: "18", label: "Corporate CSR Partners" },
  ];

  return (
    <div
      ref={ref}
      className="py-16"
      style={{
        background: "#FFFFFF",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...SPRING, delay: i * 0.08 }}
              className="text-center"
            >
              <div
                className="text-3xl lg:text-4xl mb-2"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  color: "#1C3D2F",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.value}
              </div>
              <div className="text-sm" style={{ color: "#8A9A8E" }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CSR() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L3 6v4c0 4 3 7.7 7 8.9C17 17.7 20 14 20 10V6l-7-4H10z" stroke="#4E8B65" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ),
      title: "12A & 80G Certified",
      body: "All donations are tax-deductible under Section 80G of the Income Tax Act. Annual FCRA compliance for international contributions.",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="5" width="14" height="10" rx="2" stroke="#4E8B65" strokeWidth="1.5" />
          <path d="M7 5V4a3 3 0 016 0v1" stroke="#4E8B65" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: "Blockchain Impact Tracking",
      body: "Every rupee disbursed is logged on an immutable public ledger. Real-time dashboards for corporate partners show utilization down to the beneficiary level.",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="7" stroke="#4E8B65" strokeWidth="1.5" />
          <path d="M10 6v4l3 3" stroke="#4E8B65" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: "Quarterly Impact Reports",
      body: "Audited impact statements prepared by Big Four associates. Aligned with GRI Standards and UN SDGs for global ESG reporting requirements.",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2 10l8-8 8 8" stroke="#4E8B65" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="6" y="10" width="8" height="8" rx="1" stroke="#4E8B65" strokeWidth="1.5" />
        </svg>
      ),
      title: "Dedicated CSR Cell",
      body: "Assigned relationship managers for each corporate partner. Custom program design aligned with your company's ESG strategy, geography, and beneficiary preferences.",
    },
  ];

  return (
    <section
      id="csr"
      className="py-28 relative overflow-hidden"
      style={{ background: "#0C1A11" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(78,139,101,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "rgba(78,139,101,0.2)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-20 items-start">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={SPRING}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
              style={{
                background: "rgba(78,139,101,0.12)",
                border: "1px solid rgba(78,139,101,0.2)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#4E8B65" }} />
              <span className="text-xs font-medium tracking-wide" style={{ color: "#6DBF88" }}>
                Corporate CSR Programs
              </span>
            </div>

            <h2
              className="mb-6 leading-tight"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#E8F0EB",
                letterSpacing: "-0.02em",
              }}
            >
              The Most Transparent CSR Partner in India.
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: "#7A9E85" }}>
              We don't just accept CSR funds — we architect impact programs that satisfy your board, your ESG team, and the 2% mandate under Companies Act 2013. Every rupee is accounted for, on-chain.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a
                href="mailto:csr@minativisionsevafoundation.org"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold"
                style={{
                  background: "#4E8B65",
                  color: "#FFFFFF",
                  boxShadow: "0 8px 32px rgba(78,139,101,0.3)",
                }}
              >
                Start a CSR Partnership
              </motion.a>
              <motion.a
                href="#footer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium"
                style={{
                  color: "#7A9E85",
                  border: "1px solid rgba(78,139,101,0.25)",
                }}
              >
                Download Impact Deck
              </motion.a>
            </div>

            <div
              className="mt-14 grid grid-cols-2 gap-5 pt-10"
              style={{ borderTop: "1px solid rgba(78,139,101,0.15)" }}
            >
              {[
                { val: "₹18Cr+", label: "CSR Deployed" },
                { val: "100%", label: "Audit Compliant" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      color: "#E8F0EB",
                    }}
                  >
                    {s.val}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#5A8A6A" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...SPRING, delay: 0.1 + i * 0.07 }}
                whileHover={{ y: -4 }}
                className="rounded-xl p-6"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(78,139,101,0.12)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "rgba(78,139,101,0.1)" }}
                >
                  {f.icon}
                </div>
                <h4
                  className="text-sm font-semibold mb-2"
                  style={{ color: "#D4E8DA" }}
                >
                  {f.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "#6A8C73" }}>
                  {f.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24" style={{ background: "#F2F7F4" }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <motion.blockquote
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={SPRING}
          className="text-center"
        >
          <div
            className="text-5xl mb-6"
            style={{ color: "#4E8B65", fontFamily: "'DM Serif Display', serif", lineHeight: 1 }}
          >
            "
          </div>
          <p
            className="text-xl lg:text-2xl leading-relaxed mb-8 max-w-3xl mx-auto"
            style={{
              fontFamily: "'DM Serif Display', serif",
              color: "#1C3D2F",
              letterSpacing: "-0.01em",
              fontStyle: "italic",
            }}
          >
            Project Billion represents the kind of ecosystem thinking India needs — where social welfare and commercial viability aren't opposites, but multipliers.
          </p>
          <div className="flex items-center justify-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
              style={{ background: "#1C3D2F", color: "#F0F5F2" }}
            >
              RK
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold" style={{ color: "#111111" }}>
                Rajiv Kumar
              </div>
              <div className="text-xs" style={{ color: "#8A9A8E" }}>
                Head of CSR, Indus Valley Capital Partners
              </div>
            </div>
          </div>
        </motion.blockquote>
      </div>
    </section>
  );
}

function Footer() {
  const nav = {
    "Our Work": ["Social Impact", "Agribusiness", "Healthcare", "Green Transport", "Women & Child"],
    "Organization": ["About Us", "Leadership", "Annual Reports", "Press & Media", "Careers"],
    "Partner": ["Corporate CSR", "International Donors", "Government Programs", "Volunteer"],
    "Legal": ["Privacy Policy", "Terms of Use", "12A Certificate", "80G Certificate", "FCRA Status"],
  };

  return (
    <footer id="footer" style={{ background: "#0C1A11" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-[1.4fr_repeat(4,1fr)] gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "#4E8B65" }}
              >
                <span
                  className="text-xs font-bold"
                  style={{ color: "#FFFFFF", fontFamily: "'DM Serif Display', serif" }}
                >
                  MV
                </span>
              </div>
              <span className="text-sm font-semibold" style={{ color: "#E8F0EB" }}>
                Minati Vision
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#4D6B57" }}>
              A hybrid ecosystem driving sustainable development across India — from emergency healthcare to agri-market access.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:info@minativisionsevafoundation.org"
                className="text-xs"
                style={{ color: "#4D6B57" }}
              >
                info@minativisionsevafoundation.org
              </a>
              <a href="tel:+911234567890" className="text-xs" style={{ color: "#4D6B57" }}>
                +91 12345 67890
              </a>
              <div className="text-xs" style={{ color: "#3A5244" }}>
                Tribeni, West Bengal — 712503
              </div>
            </div>
          </div>

          {Object.entries(nav).map(([section, links]) => (
            <div key={section}>
              <h5 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "#4E8B65" }}>
                {section}
              </h5>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs transition-colors duration-150"
                      style={{ color: "#3A5244" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#7ABF8E")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#3A5244")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(78,139,101,0.12)" }}
        >
          <div className="text-xs" style={{ color: "#2A4433" }}>
            © 2024 Minati Vision Foundation. All rights reserved. CIN: U85300WB2024NPL000000
          </div>
          <div className="flex items-center gap-4">
            {["Registered NGO", "12A Certified", "80G Approved", "FCRA Compliant"].map((b) => (
              <span
                key={b}
                className="text-[10px] font-medium px-2.5 py-1 rounded"
                style={{
                  background: "rgba(78,139,101,0.1)",
                  color: "#4E8B65",
                  border: "1px solid rgba(78,139,101,0.15)",
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif", background: "#FAFAFA" }}>
      <Nav />
      <Hero />
      <StatBar />
      <Pillars />
      <CSR />
      <Testimonial />
      <Footer />
    </div>
  );
}
