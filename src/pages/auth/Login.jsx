import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

/* ─── SKY palette (exact match to Mentii Home + Navbar) ─────── */
const SKY = {
  50:  '#f0f9ff',
  100: '#e0f2fe',
  200: '#bae6fd',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',
  600: '#0284c7',
  700: '#0369a1',
  800: '#075985',
  900: '#0c4a6e',
};

/* ─── Error map ─────────────────────────────────────────────── */
const getErrorMessage = (code) => {
  const map = {
    'auth/user-not-found':         'No account found with this email.',
    'auth/wrong-password':         'Incorrect password.',
    'auth/invalid-credential':     'Incorrect email or password.',
    'auth/invalid-email':          'Invalid email address.',
    'auth/user-disabled':          'This account has been disabled.',
    'auth/too-many-requests':      'Too many attempts. Try again later.',
    'auth/network-request-failed': 'Network error. Check your connection.',
  };
  return map[code] ?? 'Authentication failed. Please try again.';
};

/* ─── Typewriter hook ────────────────────────────────────────── */
const useTypewriter = (text, speed = 55, startDelay = 600) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed(''); setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text]);
  return { displayed, done };
};

/* ─── Floating orbs (match home page ambient blobs) ─────────── */
const AmbientOrbs = () => (
  <>
    <div style={{
      position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
      overflow: 'hidden',
    }}>
      {/* Top-left large orb — matches home page */}
      <div style={{
        position: 'absolute', width: 560, height: 560, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(186,230,253,0.55) 0%, transparent 70%)',
        top: -160, left: -120,
        animation: 'orbDrift1 14s ease-in-out infinite alternate',
      }} />
      {/* Bottom-right orb */}
      <div style={{
        position: 'absolute', width: 440, height: 440, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(125,211,252,0.35) 0%, transparent 70%)',
        bottom: -100, right: -80,
        animation: 'orbDrift2 18s ease-in-out infinite alternate',
      }} />
      {/* Center subtle tint */}
      <div style={{
        position: 'absolute', width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)',
        top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
      }} />
    </div>
    <style>{`
      @keyframes orbDrift1 { from { transform:translate(0,0) scale(1); } to { transform:translate(24px,18px) scale(1.06); } }
      @keyframes orbDrift2 { from { transform:translate(0,0) scale(1); } to { transform:translate(-20px,-14px) scale(1.04); } }
    `}</style>
  </>
);

/* ─── Walking People SVG (refined, lighter) ─────────────────── */
const WalkingPeople = () => (
  <svg viewBox="0 0 280 150" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', maxWidth: 180, height: 'auto', opacity: 0.9 }}>
    <style>{`
      .wb1{animation:bob .75s ease-in-out infinite;}
      .wb2{animation:bob .75s ease-in-out infinite;animation-delay:-.25s;}
      .wb3{animation:bob .75s ease-in-out infinite;animation-delay:-.5s;}
      .lf {animation:swF .75s ease-in-out infinite;transform-box:fill-box;transform-origin:top center;}
      .lb {animation:swB .75s ease-in-out infinite;transform-box:fill-box;transform-origin:top center;}
      .af {animation:swB .75s ease-in-out infinite;transform-box:fill-box;transform-origin:top center;}
      .ab {animation:swF .75s ease-in-out infinite;transform-box:fill-box;transform-origin:top center;}
      .lf2{animation:swF .75s ease-in-out infinite;animation-delay:-.25s;transform-box:fill-box;transform-origin:top center;}
      .lb2{animation:swB .75s ease-in-out infinite;animation-delay:-.25s;transform-box:fill-box;transform-origin:top center;}
      .af2{animation:swB .75s ease-in-out infinite;animation-delay:-.25s;transform-box:fill-box;transform-origin:top center;}
      .ab2{animation:swF .75s ease-in-out infinite;animation-delay:-.25s;transform-box:fill-box;transform-origin:top center;}
      .lf3{animation:swF .75s ease-in-out infinite;animation-delay:-.5s;transform-box:fill-box;transform-origin:top center;}
      .lb3{animation:swB .75s ease-in-out infinite;animation-delay:-.5s;transform-box:fill-box;transform-origin:top center;}
      .af3{animation:swB .75s ease-in-out infinite;animation-delay:-.5s;transform-box:fill-box;transform-origin:top center;}
      .ab3{animation:swF .75s ease-in-out infinite;animation-delay:-.5s;transform-box:fill-box;transform-origin:top center;}
      @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
      @keyframes swF{0%,100%{transform:rotate(-16deg)}50%{transform:rotate(16deg)}}
      @keyframes swB{0%,100%{transform:rotate(16deg)}50%{transform:rotate(-16deg)}}
    `}</style>
    {/* Person 1 — leftmost, slightly smaller */}
    <g className="wb1">
      <circle cx="52" cy="46" r="12" fill={SKY[300]} opacity="0.7"/>
      <rect x="46" y="60" width="12" height="26" rx="6" fill={SKY[400]} opacity="0.6"/>
      <rect className="lf" x="47" y="84" width="6" height="20" rx="3" fill={SKY[400]} opacity="0.6"/>
      <rect className="lb" x="54" y="84" width="6" height="20" rx="3" fill={SKY[400]} opacity="0.6"/>
      <rect className="af" x="37" y="62" width="5" height="18" rx="2.5" fill={SKY[300]} opacity="0.5"/>
      <rect className="ab" x="61" y="62" width="5" height="18" rx="2.5" fill={SKY[300]} opacity="0.5"/>
    </g>
    {/* Person 2 — center, largest (hero) */}
    <g className="wb2">
      <circle cx="138" cy="40" r="15" fill={SKY[600]} opacity="0.85"/>
      <rect x="130" y="57" width="15" height="30" rx="7.5" fill={SKY[600]} opacity="0.8"/>
      <rect className="lf2" x="131" y="85" width="7" height="24" rx="3.5" fill={SKY[600]} opacity="0.8"/>
      <rect className="lb2" x="140" y="85" width="7" height="24" rx="3.5" fill={SKY[600]} opacity="0.8"/>
      <rect className="af2" x="118" y="59" width="6" height="20" rx="3" fill={SKY[500]} opacity="0.65"/>
      <rect className="ab2" x="152" y="59" width="6" height="20" rx="3" fill={SKY[500]} opacity="0.65"/>
    </g>
    {/* Person 3 — rightmost */}
    <g className="wb3">
      <circle cx="224" cy="48" r="11" fill={SKY[400]} opacity="0.6"/>
      <rect x="219" y="61" width="11" height="24" rx="5.5" fill={SKY[400]} opacity="0.55"/>
      <rect className="lf3" x="220" y="83" width="5" height="18" rx="2.5" fill={SKY[400]} opacity="0.55"/>
      <rect className="lb3" x="226" y="83" width="5" height="18" rx="2.5" fill={SKY[400]} opacity="0.55"/>
      <rect className="af3" x="210" y="63" width="4.5" height="16" rx="2.25" fill={SKY[300]} opacity="0.45"/>
      <rect className="ab3" x="234" y="63" width="4.5" height="16" rx="2.25" fill={SKY[300]} opacity="0.45"/>
    </g>
    {/* Ground line */}
    <line x1="24" y1="124" x2="256" y2="124" stroke={SKY[300]} strokeWidth="1.5" strokeDasharray="4 7" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   LOGIN
═══════════════════════════════════════════════════════════════ */
const Login = () => {
  const { signin, signInWithGoogle, signinAnonymously } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname ?? '/dashboard';

  const [tab, setTab]         = useState('email');
  const [form, setForm]       = useState({ email: '', password: '' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const line1 = useTypewriter('Welcome', 70, 700);
  const line2 = useTypewriter('back.', 70, 1300);
  const line3 = useTypewriter('Your journey continues here.', 38, 2000);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: name === 'email' ? value.trim().toLowerCase() : value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.password) e.password = 'Password is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try { await signin(form.email, form.password); navigate(from, { replace: true }); }
    catch (err) { toast.error(getErrorMessage(err.code ?? err.message)); }
    finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try { await signInWithGoogle(); navigate(from, { replace: true }); }
    catch (err) { toast.error(getErrorMessage(err.code ?? err.message)); }
    finally { setLoading(false); }
  };

  const handleGuest = async () => {
    setLoading(true);
    try { await signinAnonymously(); navigate(from, { replace: true }); }
    catch (err) { toast.error(getErrorMessage(err.code ?? err.message)); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap');

        .lp-root *, .lp-root *::before, .lp-root *::after { box-sizing: border-box; }

        /* ── Page shell — sits below 64px navbar, fills rest ── */
        .lp-root {
          position: fixed;
          top: 64px; left: 0; right: 0; bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 40%, #bae6fd 100%);
          font-family: 'Bricolage Grotesque', sans-serif;
          padding: 16px 20px;
          overflow: hidden;
        }

        /* ── Card ── */
        .lp-card {
          position: relative;
          width: min(840px, 96vw);
          max-height: calc(100vh - 64px - 32px); /* never taller than viewport minus navbar+padding */
          display: flex;
          border-radius: 20px;
          overflow: hidden;
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(186,230,253,0.7);
          box-shadow:
            0 4px 6px rgba(14,165,233,0.04),
            0 10px 40px rgba(14,165,233,0.10),
            0 32px 80px rgba(12,74,110,0.12);
          transform: translateY(32px) scale(0.97);
          opacity: 0;
          transition: transform 0.65s cubic-bezier(0.22,1,0.36,1),
                      opacity 0.5s ease;
          z-index: 1;
        }
        .lp-card.in {
          transform: translateY(0) scale(1);
          opacity: 1;
        }

        /* ── LEFT: form panel (white/glass) ── */
        .lp-left {
          flex: 0 0 46%;
          min-width: 0;
          background: rgba(255,255,255,0.85);
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
          padding: 32px 36px;
          border-right: 1px solid rgba(186,230,253,0.6);
          position: relative;
          overflow-y: auto;
        }

        /* ── RIGHT: brand/visual panel ── */
        .lp-right {
          flex: 1;
          min-width: 0;
          background: linear-gradient(145deg, ${SKY[700]} 0%, ${SKY[500]} 55%, ${SKY[300]} 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        /* Subtle geometric pattern on right panel */
        .lp-right::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 40%),
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 40%);
          pointer-events: none;
        }

        /* ── Inputs ── */
        .lp-input-wrap { position: relative; width: 100%; margin-bottom: 10px; }
        .lp-input {
          width: 100%;
          padding: 11px 42px 11px 14px;
          background: #f8fbff;
          border: 1.5px solid ${SKY[200]};
          border-radius: 11px;
          color: #0f172a;
          font-size: 14px;
          font-family: 'Bricolage Grotesque', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .lp-input::placeholder { color: #94a3b8; }
        .lp-input:focus {
          border-color: ${SKY[400]};
          background: #fff;
          box-shadow: 0 0 0 3px rgba(14,165,233,0.12);
        }
        .lp-input.err {
          border-color: #f87171;
          box-shadow: 0 0 0 3px rgba(248,113,113,0.1);
        }
        .lp-input-icon {
          position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
          color: ${SKY[400]}; pointer-events: none;
          display: flex; align-items: center;
        }
        .lp-input-icon.clickable { pointer-events: auto; cursor: pointer; }
        .lp-input-icon.clickable:hover { color: ${SKY[600]}; }

        /* ── Primary CTA button — matches home "Start Your Journey" ── */
        .lp-btn {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, ${SKY[500]}, ${SKY[700]});
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Bricolage Grotesque', sans-serif;
          cursor: pointer;
          letter-spacing: -0.01em;
          box-shadow: 0 4px 14px rgba(14,165,233,0.32);
          transition: all 0.22s ease;
          position: relative;
          overflow: hidden;
        }
        .lp-btn:hover:not(:disabled) {
          box-shadow: 0 6px 22px rgba(14,165,233,0.42);
          transform: translateY(-1px);
        }
        .lp-btn:active:not(:disabled) { transform: translateY(0); }
        .lp-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        /* Shimmer sweep */
        .lp-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.16) 50%, transparent 100%);
          transform: translateX(-120%);
          transition: transform 0.55s ease;
        }
        .lp-btn:hover::after { transform: translateX(120%); }

        /* ── Google button — matches home "Already have an account?" style ── */
        .lp-google {
          width: 100%;
          padding: 10px 16px;
          margin-bottom: 14px;
          border-radius: 12px;
          border: 1.5px solid ${SKY[200]};
          background: #fff;
          color: #334155;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Bricolage Grotesque', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.22s ease;
        }
        .lp-google:hover:not(:disabled) {
          border-color: ${SKY[300]};
          background: ${SKY[50]};
          box-shadow: 0 4px 12px rgba(14,165,233,0.12);
          transform: translateY(-1px);
        }
        .lp-google:disabled { opacity: 0.55; cursor: not-allowed; }

        /* ── Divider ── */
        .lp-divider {
          display: flex; align-items: center; gap: 12px;
          margin: 0 0 12px;
          color: #94a3b8;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
        }
        .lp-divider::before, .lp-divider::after {
          content: ''; flex: 1; height: 1px;
          background: ${SKY[100]};
        }

        /* ── Tabs ── */
        .lp-tabs {
          display: flex; gap: 3px; margin-bottom: 14px; width: 100%;
          background: ${SKY[50]};
          border: 1px solid ${SKY[100]};
          border-radius: 10px;
          padding: 3px;
        }
        .lp-tab {
          flex: 1; padding: 8px 0; border-radius: 8px; border: none;
          background: transparent;
          color: #64748b;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Bricolage Grotesque', sans-serif;
          transition: all 0.2s ease;
        }
        .lp-tab.active {
          background: #fff;
          color: ${SKY[700]};
          font-weight: 700;
          box-shadow: 0 1px 4px rgba(14,165,233,0.14), 0 0 0 1px ${SKY[100]};
        }

        /* ── Error text ── */
        .lp-err {
          font-size: 11.5px;
          color: #ef4444;
          margin-top: 4px;
          padding-left: 2px;
          display: flex; align-items: center; gap: 4px;
        }

        /* ── Label ── */
        .lp-label {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 6px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        /* ── Cursor blink ── */
        .lp-cursor {
          display: inline-block; width: 2.5px; height: 0.9em;
          background: ${SKY[500]}; margin-left: 2px; vertical-align: middle;
          border-radius: 2px;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* ── Stat pills ── */
        .lp-stat { text-align: center; }
        .lp-stat-val {
          font-size: 18px; font-weight: 800;
          color: #fff;
          line-height: 1;
        }
        .lp-stat-lbl {
          font-size: 10px;
          color: rgba(255,255,255,0.65);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 3px;
        }

        /* ── Entrance animations ── */
        .lp-form-enter {
          opacity: 0; transform: translateX(-16px);
          animation: slideInForm 0.45s cubic-bezier(0.22,1,0.36,1) 0.75s forwards;
        }
        @keyframes slideInForm { to { opacity:1; transform:translateX(0); } }

        .lp-right-enter {
          opacity: 0; transform: translateY(20px);
          animation: dropIn 0.55s cubic-bezier(0.22,1,0.36,1) 0.5s forwards;
        }
        @keyframes dropIn { to { opacity:1; transform:translateY(0); } }

        /* ── Mobile stack ── */
        @media (max-width: 620px) {
          .lp-root { padding: 16px; align-items: flex-start; overflow-y: auto; }
          .lp-card { flex-direction: column; width: 100%; }
          .lp-right { display: none; }
          .lp-left { padding: 36px 28px; border-right: none; }
        }
      `}</style>

      <AmbientOrbs />

      <div className="lp-root">
        <div className={`lp-card ${mounted ? 'in' : ''}`}>

          {/* ════ LEFT: FORM ════════════════════════════════════ */}
          <div className="lp-left">

          

            <div className="lp-form-enter">
              <h1 style={{
                fontSize: 26, fontWeight: 800, color: '#0f172a',
                letterSpacing: '-0.03em', marginBottom: 4, lineHeight: 1.15,
              }}>
                Sign in
              </h1>
              <p style={{ fontSize: 13, color: '#64748b', marginBottom: 20, lineHeight: 1.5 }}>
                Continue your wellness journey
              </p>

              {/* Google SSO */}
              <button className="lp-google" onClick={handleGoogle} disabled={loading}>
                <svg width="17" height="17" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <div className="lp-divider">or</div>

              {/* Tabs */}
              <div className="lp-tabs">
                {[['email','Email'],['anonymous','Guest']].map(([k,l]) => (
                  <button key={k} className={`lp-tab ${tab===k?'active':''}`} onClick={() => setTab(k)}>{l}</button>
                ))}
              </div>

              {/* Email form */}
              {tab === 'email' && (
                <form onSubmit={handleEmailLogin}>
                  <div className="lp-input-wrap">
                    <div className="lp-label">Email</div>
                    <input
                      className={`lp-input${errors.email?' err':''}`}
                      type="email" name="email"
                      value={form.email} onChange={handleChange}
                      placeholder="you@example.com" disabled={loading}
                      autoComplete="email"
                    />
                    <span className="lp-input-icon">
                      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </span>
                    {errors.email && <div className="lp-err">⚠ {errors.email}</div>}
                  </div>

                  <div className="lp-input-wrap">
                    <div className="lp-label">
                      <span>Password</span>
                      <Link to="/forgot-password" style={{
                        color: SKY[500], textDecoration: 'none',
                        fontSize: 12, fontWeight: 500,
                        textTransform: 'none', letterSpacing: 0,
                        transition: 'color 0.15s',
                      }}>
                        Forgot password?
                      </Link>
                    </div>
                    <input
                      className={`lp-input${errors.password?' err':''}`}
                      type={showPass ? 'text' : 'password'} name="password"
                      value={form.password} onChange={handleChange}
                      placeholder="••••••••" disabled={loading}
                      autoComplete="current-password"
                    />
                    <span className="lp-input-icon clickable" onClick={() => setShowPass(p => !p)}>
                      {showPass
                        ? <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                        : <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      }
                    </span>
                    {errors.password && <div className="lp-err">⚠ {errors.password}</div>}
                  </div>

                  <button className="lp-btn" type="submit" disabled={loading} style={{ marginTop: 6 }}>
                    {loading ? 'Signing in…' : 'Sign In →'}
                  </button>
                </form>
              )}

              {/* Guest tab */}
              {tab === 'anonymous' && (
                <div>
                  <div style={{
                    background: SKY[50],
                    border: `1px solid ${SKY[100]}`,
                    borderRadius: 12, padding: '14px 16px', marginBottom: 16,
                  }}>
                    <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                      Explore Mentii without creating an account. Your progress won't be saved.
                    </p>
                  </div>
                  <button className="lp-btn" onClick={handleGuest} disabled={loading}>
                    {loading ? 'Loading…' : 'Continue as Guest →'}
                  </button>
                </div>
              )}

              <p style={{
                textAlign: 'center', fontSize: 13,
                color: '#64748b', marginTop: 16,
              }}>
                No account?{' '}
                <Link to="/signup" style={{ color: SKY[500], fontWeight: 700, textDecoration: 'none' }}>
                  Sign up free
                </Link>
              </p>
            </div>
          </div>

          {/* ════ RIGHT: VISUAL PANEL ════════════════════════════ */}
          <div className="lp-right">
            <div className="lp-right-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, position: 'relative', zIndex: 1 }}>

              {/* Walking animation */}
              <WalkingPeople />

              {/* Typewriter headline — echoes home page tone */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 36, fontWeight: 800, color: '#fff',
                  letterSpacing: '-0.04em', lineHeight: 1.05,
                  minHeight: 78,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}>
                  <div>
                    {line1.displayed}
                    {!line1.done && <span className="lp-cursor" />}
                  </div>
                  <div style={{ color: SKY[200] }}>
                    {line1.done && line2.displayed}
                    {line1.done && !line2.done && <span className="lp-cursor" />}
                  </div>
                </div>

                <p style={{
                  fontSize: 14.5, color: 'rgba(255,255,255,0.72)',
                  lineHeight: 1.65, marginTop: 12, minHeight: 24,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}>
                  {line2.done && line3.displayed}
                  {line2.done && !line3.done && <span className="lp-cursor" />}
                </p>
              </div>

              {/* Divider */}
              <div style={{ width: 40, height: 2, borderRadius: 2, background: 'rgba(255,255,255,0.3)' }} />

              {/* Stats — social proof */}
              <div style={{ display: 'flex', gap: 28 }}>
                {[['50k+','Users'],['4.9★','Rating'],['98%','Feel better']].map(([v,l]) => (
                  <div key={l} className="lp-stat">
                    <div className="lp-stat-val">{v}</div>
                    <div className="lp-stat-lbl">{l}</div>
                  </div>
                ))}
              </div>

              {/* mentii.app label */}
              <div style={{
                marginTop: 4,
                fontSize: 11, color: 'rgba(255,255,255,0.38)',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}>
                mentii.app
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;