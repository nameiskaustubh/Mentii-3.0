import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

/* ─── Google Fonts + Keyframes ─────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Lora:ital,wght@0,400;0,600;1,400;1,600&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  @keyframes blob {
    0%,100% { border-radius:60% 40% 30% 70%/60% 30% 70% 40%; transform:scale(1) translate(0,0); }
    33%      { border-radius:30% 60% 70% 40%/50% 60% 30% 60%; transform:scale(1.05) translate(15px,-25px); }
    66%      { border-radius:50% 60% 30% 60%/40% 40% 60% 50%; transform:scale(0.97) translate(-10px,15px); }
  }
  @keyframes float-card {
    0%,100% { transform:translateY(0px) rotate(-1deg); }
    50%      { transform:translateY(-18px) rotate(-1deg); }
  }
  @keyframes shimmer-bar {
    0%   { transform:translateX(-100%); }
    100% { transform:translateX(400%); }
  }
  @keyframes spin-ring {
    to { transform:rotate(360deg); }
  }
  @keyframes pulse-dot {
    0%,100% { box-shadow:0 0 0 0 rgba(14,165,233,0.5); }
    50%      { box-shadow:0 0 0 5px rgba(14,165,233,0); }
  }
`;

/* ─── Design tokens ────────────────────────────────────────────── */
const SKY = {
  50:'#f0f9ff', 100:'#e0f2fe', 200:'#bae6fd',
  300:'#7dd3fc', 400:'#38bdf8', 500:'#0ea5e9',
  600:'#0284c7', 700:'#0369a1',
};

/* ─── Framer Motion presets ────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
});

const stagger  = { animate: { transition: { staggerChildren: 0.13 } } };
const cardItem = {
  initial:    { opacity: 0, y: 22 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

/* ─── Static data ──────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Daily Check-ins',
    desc: 'Track your mood and emotions with guided prompts that adapt to your needs over time.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    title: 'Personalised Tools',
    desc: 'Meditations, breathing exercises, and CBT journaling tailored to your current emotional state.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Community Support',
    desc: 'Connect with others on similar journeys in safe, moderated group spaces designed for healing.',
  },
];

const STATS = [
  { value: '50k+', label: 'Active users' },
  { value: '4.9★', label: 'App Store rating' },
  { value: '98%',  label: 'Feel better in week 1' },
];

const TESTIMONIALS = [
  { name: 'Aisha R.',  role: 'Graduate Student', quote: "Mentii feels like the first app that actually gets what I'm going through." },
  { name: 'Marcus T.', role: 'Software Engineer', quote: 'The AI chat is surprisingly good at reframing my anxiety spirals in real time.' },
  { name: 'Priya S.',  role: 'Startup Founder',  quote: "Ten minutes with Mentii sets the tone for my entire day. Nothing else comes close." },
];

/* ═══════════════════════════════════════════════════════════════
   ATOMS
═══════════════════════════════════════════════════════════════ */
const GradientText = ({ children, italic }) => (
  <span style={{
    background: `linear-gradient(135deg, ${SKY[500]}, ${SKY[300]}, ${SKY[600]})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontStyle: italic ? 'italic' : 'inherit',
  }}>
    {children}
  </span>
);

const Glass = ({ children, style, lift = true }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.6)',
        borderRadius: 20,
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        transform: lift && hov ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: lift && hov
          ? `0 24px 48px rgba(14,165,233,0.18), 0 2px 8px rgba(0,0,0,0.05)`
          : '0 4px 20px rgba(0,0,0,0.07)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const PrimaryBtn = ({ to, children }) => {
  const [hov, setHov] = useState(false);
  return (
    <Link to={to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '16px 36px', borderRadius: 16,
        background: hov
          ? `linear-gradient(135deg,${SKY[600]},${SKY[700]})`
          : `linear-gradient(135deg,${SKY[500]},${SKY[700]})`,
        color: '#fff', fontWeight: 700, fontSize: 16,
        textDecoration: 'none',
        fontFamily: "'Bricolage Grotesque', sans-serif",
        letterSpacing: '-0.01em',
        boxShadow: hov
          ? '0 16px 40px rgba(14,165,233,0.42), 0 2px 8px rgba(0,0,0,0.1)'
          : '0 8px 24px rgba(14,165,233,0.3)',
        transform: hov ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.3s ease',
      }}
    >
      {children}
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5-5 5M6 12h12" />
      </svg>
    </Link>
  );
};

const SecondaryBtn = ({ to, children }) => {
  const [hov, setHov] = useState(false);
  return (
    <Link to={to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '16px 36px', borderRadius: 16,
        background: hov ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(12px)',
        color: SKY[600], fontWeight: 700, fontSize: 16,
        textDecoration: 'none',
        fontFamily: "'Bricolage Grotesque', sans-serif",
        letterSpacing: '-0.01em',
        border: `1px solid ${hov ? SKY[300] : 'rgba(255,255,255,0.65)'}`,
        boxShadow: hov
          ? '0 12px 32px rgba(14,165,233,0.18), 0 2px 6px rgba(0,0,0,0.05)'
          : '0 4px 16px rgba(0,0,0,0.07)',
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
      }}
    >
      {children}
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4-4 4M3 12h18" />
      </svg>
    </Link>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div variants={cardItem} style={{ height: '100%' }}>
    <Glass style={{ padding: '36px 32px', height: '100%' }}>
      <div style={{
        width: 56, height: 56, borderRadius: 14, marginBottom: 24,
        background: `linear-gradient(135deg,${SKY[100]},${SKY[50]})`,
        border: `1px solid ${SKY[200]}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: SKY[600],
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 18, fontWeight: 700, color: '#0f172a',
        marginBottom: 12, letterSpacing: '-0.01em',
      }}>
        {title}
      </h3>
      <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7 }}>
        {desc}
      </p>
    </Glass>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════════ */
const Home = () => {
  const { currentUser } = useAuth();
  const [activeTx, setActiveTx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveTx(p => (p + 1) % TESTIMONIALS.length), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{STYLES}</style>

      <div style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        background: 'linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 40%, #f8faff 100%)',
        minHeight: '100vh',
        overflowX: 'hidden',
        color: '#0f172a',
      }}>

        {/* ── BACKGROUND ──────────────────────────────────────── */}
        <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[
            { top:'-10%', right:'-8%',  w:520, bg:`${SKY[200]}88`, delay:'0s'   },
            { top:'30%',  left:'-10%',  w:400, bg:`${SKY[300]}55`, delay:'-6s'  },
            { bottom:'10%',right:'20%', w:300, bg:`${SKY[100]}99`, delay:'-12s' },
          ].map((b, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: b.top, right: b.right, left: b.left, bottom: b.bottom,
              width: b.w, height: b.w,
              background: `radial-gradient(circle, ${b.bg} 0%, transparent 70%)`,
              animation: `blob 16s ease-in-out infinite`,
              animationDelay: b.delay,
            }} />
          ))}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `radial-gradient(circle, ${SKY[400]}28 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
            maskImage: 'radial-gradient(ellipse 85% 70% at 50% 30%, black 20%, transparent 100%)',
          }} />
        </div>

        {/* ── HERO ────────────────────────────────────────────── */}
        <section style={{ position: 'relative', zIndex: 1, padding: 'clamp(64px,10vw,112px) 24px clamp(60px,8vw,90px)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>

            {/* Trust badge */}
            <motion.div {...fadeUp(0.05)}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.8)',
                border: `1px solid ${SKY[200]}`,
                borderRadius: 100, padding: '8px 18px', marginBottom: 36,
                boxShadow: '0 2px 12px rgba(14,165,233,0.1)',
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: SKY[500],
                  boxShadow: `0 0 0 3px ${SKY[200]}`,
                  display: 'inline-block',
                  animation: 'pulse-dot 2.5s ease-in-out infinite',
                }} />
                <span style={{ fontSize: 13, color: SKY[700], fontWeight: 600 }}>
                  Trusted by 50,000+ users worldwide
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 {...fadeUp(0.15)} style={{
              fontFamily: "'Lora', serif",
              fontSize: 'clamp(2.8rem,7vw,5.2rem)',
              fontWeight: 700, lineHeight: 1.13,
              letterSpacing: '-0.03em',
              color: '#0f172a', marginBottom: 28,
            }}>
              Find <GradientText>Joy</GradientText> and{' '}
              <GradientText>Peace</GradientText>
              <br />in Every Moment
            </motion.h1>

            {/* Subheading */}
            <motion.p {...fadeUp(0.28)} style={{
              fontSize: 'clamp(16px,2.2vw,19px)',
              color: '#475569', lineHeight: 1.75,
              maxWidth: 580, margin: '0 auto 52px',
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}>
              Science-backed tools to help you navigate your mental health journey
              with clarity and care — personalised for your unique path to wellness.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.4)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
              {currentUser ? (
                <PrimaryBtn to="/dashboard">Go to Dashboard</PrimaryBtn>
              ) : (
                <>
                  <PrimaryBtn to="/signup">Start Your Journey</PrimaryBtn>
                  <SecondaryBtn to="/login">Already have an account?</SecondaryBtn>
                </>
              )}
            </motion.div>

            {/* Stats strip */}
            <motion.div {...fadeUp(0.55)} style={{
              display: 'inline-flex', gap: 48, flexWrap: 'wrap', justifyContent: 'center',
              background: 'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${SKY[100]}`,
              borderRadius: 20, padding: '24px 48px',
              boxShadow: '0 4px 24px rgba(14,165,233,0.08)',
            }}>
              {STATS.map(({ value, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: "'Lora', serif", fontSize: 26, fontWeight: 700,
                    background: `linear-gradient(135deg,${SKY[500]},${SKY[700]})`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>{value}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FEATURE CARDS ───────────────────────────────────── */}
        <section style={{ position: 'relative', zIndex: 1, padding: 'clamp(40px,8vw,90px) clamp(20px,5vw,48px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: SKY[500], marginBottom: 14 }}>
              What we offer
            </div>
            <h2 style={{
              fontFamily: "'Lora', serif",
              fontSize: 'clamp(1.9rem,4vw,3rem)',
              fontWeight: 700, letterSpacing: '-0.025em', color: '#0f172a',
            }}>
              Everything you need to <GradientText italic>feel well</GradientText>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger} initial="initial" whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 24, maxWidth: 1100, margin: '0 auto',
            }}
          >
            {FEATURES.map(f => <FeatureCard key={f.title} {...f} />)}
          </motion.div>
        </section>

        {/* ── FLOATING CARD ───────────────────────────────────── */}
        <section style={{ position: 'relative', zIndex: 1, padding: 'clamp(20px,4vw,40px) 24px clamp(60px,8vw,80px)', display: 'flex', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
            style={{ position: 'relative', maxWidth: 460, width: '100%', animation: 'float-card 6s ease-in-out infinite' }}
          >
            <div style={{
              position: 'absolute', inset: -20, pointerEvents: 'none',
              background: `radial-gradient(ellipse, ${SKY[300]}44 0%, transparent 70%)`,
              filter: 'blur(24px)', borderRadius: '50%',
            }} />
            <Glass style={{ padding: '32px 40px' }} lift={false}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 18, flexShrink: 0,
                  background: `linear-gradient(135deg,${SKY[500]},${SKY[700]})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(14,165,233,0.35)', fontSize: 28,
                }}>
                  🌱
                </div>
                <div>
                  <p style={{ fontFamily: "'Lora', serif", fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>
                    Start growing today
                  </p>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
                    Your mental wellness journey begins here
                  </p>
                </div>
              </div>
              <div style={{ marginTop: 24, background: SKY[100], borderRadius: 100, height: 6, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: '62%',
                  background: `linear-gradient(90deg,${SKY[400]},${SKY[500]},${SKY[300]})`,
                  borderRadius: 100, position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)',
                    animation: 'shimmer-bar 2s linear infinite',
                  }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>Weekly goal</span>
                <span style={{ fontSize: 11, color: SKY[600], fontWeight: 700 }}>62% complete</span>
              </div>
            </Glass>
          </motion.div>
        </section>

        {/* ── TESTIMONIALS ────────────────────────────────────── */}
        <section style={{
          position: 'relative', zIndex: 1,
          padding: 'clamp(60px,8vw,90px) 24px',
          background: 'rgba(255,255,255,0.48)',
          backdropFilter: 'blur(8px)',
          borderTop: `1px solid ${SKY[100]}`,
          borderBottom: `1px solid ${SKY[100]}`,
        }}>
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: SKY[500], marginBottom: 44 }}>
              Real stories
            </div>

            <div style={{ minHeight: 140, maxWidth: 680, margin: '0 auto' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTx}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45 }}
                >
                  <blockquote style={{
                    fontFamily: "'Lora', serif",
                    fontSize: 'clamp(1.2rem,3vw,1.75rem)',
                    fontStyle: 'italic', color: '#1e293b',
                    lineHeight: 1.55, marginBottom: 28,
                  }}>
                    "{TESTIMONIALS[activeTx].quote}"
                  </blockquote>
                  <div style={{ fontSize: 15, fontWeight: 700, color: SKY[600] }}>
                    {TESTIMONIALS[activeTx].name}
                  </div>
                  <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>
                    {TESTIMONIALS[activeTx].role}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 36 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveTx(i)} style={{
                  width: i === activeTx ? 28 : 8, height: 8, borderRadius: 100,
                  border: 'none', cursor: 'pointer', padding: 0,
                  background: i === activeTx
                    ? `linear-gradient(90deg,${SKY[500]},${SKY[400]})`
                    : SKY[200],
                  transition: 'all 0.4s ease',
                }} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── FINAL CTA ───────────────────────────────────────── */}
        <section style={{ position: 'relative', zIndex: 1, padding: 'clamp(70px,10vw,110px) 24px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.75, ease: [0.22,1,0.36,1] }}
            style={{ maxWidth: 740, margin: '0 auto', textAlign: 'center' }}
          >
            <Glass style={{ padding: 'clamp(48px,8vw,80px) clamp(28px,6vw,80px)' }} lift={false}>
              <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 32px' }}>
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  border: `2px dashed ${SKY[300]}`,
                  animation: 'spin-ring 12s linear infinite',
                }} />
                <div style={{
                  position: 'absolute', inset: 10, borderRadius: '50%',
                  background: `linear-gradient(135deg,${SKY[100]},${SKY[200]})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
                }}>
                  🧠
                </div>
              </div>

              <h2 style={{
                fontFamily: "'Lora', serif",
                fontSize: 'clamp(1.8rem,4vw,2.8rem)',
                fontWeight: 700, letterSpacing: '-0.025em',
                color: '#0f172a', lineHeight: 1.2, marginBottom: 18,
              }}>
                Your mind deserves{' '}
                <GradientText italic>this moment</GradientText>
              </h2>

              <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 44px' }}>
                Join thousands who've chosen to invest five mindful minutes a day
                into a calmer, clearer, more grounded life.
              </p>

              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                {currentUser ? (
                  <PrimaryBtn to="/dashboard">Go to Dashboard</PrimaryBtn>
                ) : (
                  <>
                    <PrimaryBtn to="/signup">Start Your Journey</PrimaryBtn>
                    <SecondaryBtn to="/login">Sign in</SecondaryBtn>
                  </>
                )}
              </div>

              <p style={{ marginTop: 24, fontSize: 13, color: '#94a3b8' }}>
                Free to start · No credit card needed · Cancel anytime
              </p>
            </Glass>
          </motion.div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────── */}
        <footer style={{
          position: 'relative', zIndex: 1,
          borderTop: `1px solid ${SKY[100]}`,
          padding: '32px 24px', textAlign: 'center',
          background: 'rgba(240,249,255,0.6)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: `linear-gradient(135deg,${SKY[500]},${SKY[700]})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>M</span>
            </div>
            <span style={{ fontSize: 17, fontWeight: 800, color: '#334155', letterSpacing: '-0.02em' }}>
              Mentii
            </span>
          </div>
          <p style={{ fontSize: 13, color: '#94a3b8' }}>
            © {new Date().getFullYear()} Mentii. Crafted with care for minds everywhere.
          </p>
        </footer>

      </div>
    </>
  );
};

export default Home;