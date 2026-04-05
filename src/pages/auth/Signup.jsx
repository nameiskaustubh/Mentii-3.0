import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

/* ─── SKY palette ────────────────────────────────────────────── */
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

/* ─── Error map ──────────────────────────────────────────────── */
const getErrorMessage = (code) => {
  const map = {
    'auth/email-already-in-use':   'An account with this email already exists.',
    'auth/invalid-email':          'Invalid email address.',
    'auth/weak-password':          'Password must be at least 6 characters.',
    'auth/too-many-requests':      'Too many attempts. Try again later.',
    'auth/network-request-failed': 'Network error. Check your connection.',
  };
  return map[code] ?? 'Sign up failed. Please try again.';
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

/* ─── Ambient orbs ───────────────────────────────────────────── */
const AmbientOrbs = () => (
  <>
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', width: 560, height: 560, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(186,230,253,0.55) 0%, transparent 70%)',
        top: -160, left: -120, animation: 'orbDrift1 14s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'absolute', width: 440, height: 440, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(125,211,252,0.35) 0%, transparent 70%)',
        bottom: -100, right: -80, animation: 'orbDrift2 18s ease-in-out infinite alternate',
      }} />
    </div>
    <style>{`
      @keyframes orbDrift1{from{transform:translate(0,0) scale(1)}to{transform:translate(24px,18px) scale(1.06)}}
      @keyframes orbDrift2{from{transform:translate(0,0) scale(1)}to{transform:translate(-20px,-14px) scale(1.04)}}
    `}</style>
  </>
);

/* ─── Yoga Figure — Warrior II pose with breath animation ─────── */
const YogaFigure = () => (
  <svg viewBox="0 0 220 230" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', maxWidth: 170, height: 'auto' }}>
    <style>{`
      .yg-body  { animation: ygBreath 4s ease-in-out infinite; transform-origin: 110px 210px; }
      @keyframes ygBreath { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }

      .yg-arm-r { animation: ygArmR 4s ease-in-out infinite; transform-box:fill-box; transform-origin:0% 50%; }
      @keyframes ygArmR  { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(3deg)} }

      .yg-arm-l { animation: ygArmL 4s ease-in-out infinite; transform-box:fill-box; transform-origin:100% 50%; }
      @keyframes ygArmL  { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-3deg)} }

      .yg-aura  { animation: ygAura 4s ease-in-out infinite; transform-origin: 110px 100px; }
      @keyframes ygAura  { 0%,100%{opacity:0.15;transform:scale(1)} 50%{opacity:0.30;transform:scale(1.07)} }

      .yg-sp1 { animation: ygF1 3.2s ease-in-out infinite; }
      .yg-sp2 { animation: ygF2 3.8s ease-in-out infinite; }
      .yg-sp3 { animation: ygF3 2.9s ease-in-out infinite; }
      .yg-sp4 { animation: ygF1 4.1s ease-in-out infinite 0.8s; }
      @keyframes ygF1{0%,100%{transform:translate(0,0);opacity:.6}50%{transform:translate(-5px,-10px);opacity:1}}
      @keyframes ygF2{0%,100%{transform:translate(0,0);opacity:.45}50%{transform:translate(6px,-12px);opacity:.9}}
      @keyframes ygF3{0%,100%{transform:translate(0,0);opacity:.55}50%{transform:translate(-3px,-8px);opacity:1}}

      .yg-halo  { animation: ygHalo 4s ease-in-out infinite; transform-origin: 110px 38px; }
      @keyframes ygHalo { 0%,100%{opacity:0.25} 50%{opacity:0.55} }
    `}</style>

    {/* Outer aura ring */}
    <circle className="yg-aura" cx="110" cy="100" r="60" fill="rgba(255,255,255,0.18)" />

    {/* Yoga mat */}
    <ellipse cx="110" cy="210" rx="58" ry="8" fill="rgba(255,255,255,0.15)" />
    <rect x="54" y="205" width="112" height="7" rx="3.5" fill="rgba(255,255,255,0.25)" />

    {/* ══ BODY (breathes as a unit) ══ */}
    <g className="yg-body">

      {/* ── Head ── */}
      <circle cx="110" cy="38" r="15" fill="rgba(255,255,255,0.88)" />
      {/* Halo */}
      <circle className="yg-halo" cx="110" cy="38" r="20" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" strokeDasharray="3 4" />
      {/* Peaceful eyes (closed) */}
      <path d="M104 37 Q106.5 35 109 37" stroke="rgba(3,105,161,0.75)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M111 37 Q113.5 35 116 37" stroke="rgba(3,105,161,0.75)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Serene smile */}
      <path d="M106 43 Q110 46.5 114 43" stroke="rgba(3,105,161,0.6)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>

      {/* ── Neck ── */}
      <rect x="107" y="52" width="6" height="9" rx="3" fill="rgba(255,255,255,0.75)" />

      {/* ── Torso ── */}
      <rect x="96" y="60" width="28" height="40" rx="12" fill="rgba(255,255,255,0.70)" />

      {/* ── LEFT arm — extended fully left, slightly raised ── */}
      <g className="yg-arm-l">
        {/* upper arm */}
        <rect x="48" y="67" width="50" height="9" rx="4.5" fill="rgba(255,255,255,0.65)"
          style={{transform:'rotate(-6deg)', transformBox:'fill-box', transformOrigin:'100% 50%'}} />
        {/* forearm / hand */}
        <ellipse cx="46" cy="70" rx="6" ry="5" fill="rgba(255,255,255,0.72)" />
      </g>

      {/* ── RIGHT arm — extended fully right, slightly raised ── */}
      <g className="yg-arm-r">
        {/* upper arm */}
        <rect x="122" y="67" width="50" height="9" rx="4.5" fill="rgba(255,255,255,0.65)"
          style={{transform:'rotate(6deg)', transformBox:'fill-box', transformOrigin:'0% 50%'}} />
        {/* forearm / hand */}
        <ellipse cx="174" cy="70" rx="6" ry="5" fill="rgba(255,255,255,0.72)" />
      </g>

      {/* ── Hip band ── */}
      <rect x="92" y="97" width="36" height="11" rx="5.5" fill="rgba(255,255,255,0.52)" />

      {/* ── LEFT leg — lunged forward, knee bent ── */}
      {/* thigh */}
      <rect x="76" y="106" width="16" height="40" rx="8" fill="rgba(255,255,255,0.62)"
        style={{transform:'rotate(-18deg)', transformBox:'fill-box', transformOrigin:'50% 0%'}} />
      {/* shin */}
      <rect x="70" y="143" width="14" height="34" rx="7" fill="rgba(255,255,255,0.55)"
        style={{transform:'rotate(16deg)', transformBox:'fill-box', transformOrigin:'50% 0%'}} />
      {/* foot */}
      <ellipse cx="76" cy="180" rx="12" ry="5.5" fill="rgba(255,255,255,0.50)" />

      {/* ── RIGHT leg — straight back leg ── */}
      {/* thigh */}
      <rect x="128" y="106" width="16" height="40" rx="8" fill="rgba(255,255,255,0.62)"
        style={{transform:'rotate(18deg)', transformBox:'fill-box', transformOrigin:'50% 0%'}} />
      {/* shin */}
      <rect x="134" y="143" width="14" height="34" rx="7" fill="rgba(255,255,255,0.55)"
        style={{transform:'rotate(-16deg)', transformBox:'fill-box', transformOrigin:'50% 0%'}} />
      {/* foot */}
      <ellipse cx="143" cy="180" rx="12" ry="5.5" fill="rgba(255,255,255,0.50)" />

    </g>

    {/* ── Floating sparkles ── */}
    <g className="yg-sp1"><circle cx="36" cy="62" r="3.5" fill="rgba(255,255,255,0.7)"/><circle cx="39" cy="59" r="1.4" fill="white"/></g>
    <g className="yg-sp2"><circle cx="182" cy="52" r="3" fill="rgba(255,255,255,0.65)"/><circle cx="185" cy="50" r="1.2" fill="white"/></g>
    <g className="yg-sp3"><circle cx="176" cy="95" r="2.2" fill="rgba(255,255,255,0.60)"/></g>
    <g className="yg-sp4"><circle cx="32" cy="108" r="2" fill="rgba(255,255,255,0.50)"/></g>
  </svg>
);

/* ─── Password strength ──────────────────────────────────────── */
const PasswordStrength = ({ password }) => {
  if (!password) return null;
  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;
  const colors = ['', '#f87171', '#fb923c', '#facc15', '#4ade80'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  return (
    <div style={{ marginTop: 4 }}>
      <div style={{ display: 'flex', gap: 3 }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{ flex:1, height:3, borderRadius:2, background: i<=score ? colors[score] : SKY[100], transition:'background 0.3s' }} />
        ))}
      </div>
      {score > 0 && <span style={{ fontSize: 10.5, color: colors[score], fontWeight: 600, marginTop: 2, display: 'block' }}>{labels[score]}</span>}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SIGNUP
═══════════════════════════════════════════════════════════════ */
const Signup = () => {
  const { signup, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [form, setForm]         = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [mounted, setMounted]   = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);

  const line1 = useTypewriter('Start your', 65, 700);
  const line2 = useTypewriter('journey.', 65, 1250);
  const line3 = useTypewriter('Wellness, personalised for you.', 36, 1950);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: name === 'email' ? value.trim().toLowerCase() : value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())                    e.name     = 'Name is required.';
    if (!form.email)                          e.email    = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email  = 'Enter a valid email.';
    if (!form.password)                       e.password = 'Password is required.';
    else if (form.password.length < 6)        e.password = 'Min. 6 characters.';
    if (!form.confirm)                        e.confirm  = 'Please confirm your password.';
    else if (form.confirm !== form.password)  e.confirm  = 'Passwords do not match.';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault(); if (!validate()) return;
    setLoading(true);
    try { await signup(form.email, form.password, form.name.trim()); navigate('/dashboard', { replace: true }); }
    catch (err) { toast.error(getErrorMessage(err.code ?? err.message)); }
    finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try { await signInWithGoogle(); navigate('/dashboard', { replace: true }); }
    catch (err) { toast.error(getErrorMessage(err.code ?? err.message)); }
    finally { setLoading(false); }
  };

  const IcoUser   = () => <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>;
  const IcoMail   = () => <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>;
  const IcoEye    = () => <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>;
  const IcoEyeOff = () => <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap');

        .sp-root *, .sp-root *::before, .sp-root *::after { box-sizing: border-box; }

        .sp-root {
          position: fixed;
          top: 64px; left: 0; right: 0; bottom: 0;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 40%, #bae6fd 100%);
          font-family: 'Bricolage Grotesque', sans-serif;
          padding: 16px 20px;
          overflow: hidden;  /* no page scroll ever */
        }

        .sp-card {
          position: relative;
          width: min(840px, 96vw);
          display: flex;
          border-radius: 20px;
          overflow: hidden;    /* clips children — no scrollbar visible */
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(186,230,253,0.7);
          box-shadow: 0 4px 6px rgba(14,165,233,0.04), 0 10px 40px rgba(14,165,233,0.10), 0 32px 80px rgba(12,74,110,0.12);
          transform: translateY(32px) scale(0.97); opacity: 0;
          transition: transform 0.65s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease;
          z-index: 1;
        }
        .sp-card.in { transform: translateY(0) scale(1); opacity: 1; }

        /* LEFT — hard clip, zero scroll */
        .sp-left {
          flex: 0 0 48%; min-width: 0;
          background: rgba(255,255,255,0.88);
          display: flex; flex-direction: column;
          align-items: stretch; justify-content: center;
          padding: 22px 30px;   /* tight but breathable */
          border-right: 1px solid rgba(186,230,253,0.6);
          overflow: hidden;     /* ← NO scrollbar */
        }

        .sp-right {
          flex: 1; min-width: 0;
          background: linear-gradient(145deg, ${SKY[700]} 0%, ${SKY[500]} 55%, ${SKY[300]} 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 28px 26px; text-align: center;
          position: relative; overflow: hidden;
        }
        .sp-right::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 40%),
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 40%);
          pointer-events: none;
        }

        /* Inputs */
        .sp-iw { position: relative; width: 100%; margin-bottom: 6px; }
        .sp-input {
          width: 100%; padding: 9px 36px 9px 12px;
          background: #f8fbff; border: 1.5px solid ${SKY[200]};
          border-radius: 10px; color: #0f172a; font-size: 13px;
          font-family: 'Bricolage Grotesque', sans-serif;
          outline: none; transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .sp-input::placeholder { color: #94a3b8; }
        .sp-input:focus { border-color: ${SKY[400]}; background: #fff; box-shadow: 0 0 0 3px rgba(14,165,233,0.11); }
        .sp-input.err   { border-color: #f87171;   box-shadow: 0 0 0 3px rgba(248,113,113,0.09); }
        .sp-ico { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: ${SKY[400]}; pointer-events: none; display: flex; align-items: center; }
        .sp-ico.c { pointer-events: auto; cursor: pointer; }
        .sp-ico.c:hover { color: ${SKY[600]}; }

        /* Primary btn */
        .sp-btn {
          width: 100%; padding: 11px; border-radius: 11px; border: none;
          background: linear-gradient(135deg, ${SKY[500]}, ${SKY[700]});
          color: #fff; font-size: 14px; font-weight: 700;
          font-family: 'Bricolage Grotesque', sans-serif;
          cursor: pointer; letter-spacing: -.01em;
          box-shadow: 0 4px 14px rgba(14,165,233,.30);
          transition: all .22s ease; position: relative; overflow: hidden;
        }
        .sp-btn:hover:not(:disabled) { box-shadow: 0 6px 22px rgba(14,165,233,.40); transform: translateY(-1px); }
        .sp-btn:active:not(:disabled){ transform: translateY(0); }
        .sp-btn:disabled { opacity: .55; cursor: not-allowed; }
        .sp-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent); transform:translateX(-120%); transition:transform .5s ease; }
        .sp-btn:hover::after { transform:translateX(120%); }

        /* Google btn */
        .sp-google {
          width: 100%; padding: 9px 14px; margin-bottom: 9px;
          border-radius: 11px; border: 1.5px solid ${SKY[200]};
          background: #fff; color: #334155; font-size: 13px; font-weight: 600;
          font-family: 'Bricolage Grotesque', sans-serif;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 9px;
          box-shadow: 0 1px 3px rgba(0,0,0,.05); transition: all .22s ease;
        }
        .sp-google:hover:not(:disabled) { border-color:${SKY[300]}; background:${SKY[50]}; box-shadow:0 4px 12px rgba(14,165,233,.12); transform:translateY(-1px); }
        .sp-google:disabled { opacity:.55; cursor:not-allowed; }

        /* Divider */
        .sp-div { display:flex; align-items:center; gap:10px; margin:0 0 8px; color:#94a3b8; font-size:10.5px; font-weight:600; letter-spacing:.1em; }
        .sp-div::before,.sp-div::after { content:''; flex:1; height:1px; background:${SKY[100]}; }

        /* Label */
        .sp-lbl { font-size:11px; font-weight:600; color:#475569; margin-bottom:3px; letter-spacing:.03em; text-transform:uppercase; display:block; }

        /* Error */
        .sp-err { font-size:10.5px; color:#ef4444; margin-top:2px; padding-left:1px; display:flex; align-items:center; gap:3px; }

        /* Cursor */
        .sp-cur { display:inline-block; width:2px; height:.85em; background:${SKY[300]}; margin-left:2px; vertical-align:middle; border-radius:2px; animation:spBlink 1s step-end infinite; }
        @keyframes spBlink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* Entrance */
        .sp-fe { opacity:0; transform:translateX(-14px); animation:spSI .45s cubic-bezier(.22,1,.36,1) .7s forwards; }
        @keyframes spSI { to { opacity:1; transform:translateX(0); } }
        .sp-re { opacity:0; transform:translateY(18px); animation:spDI .55s cubic-bezier(.22,1,.36,1) .5s forwards; }
        @keyframes spDI { to { opacity:1; transform:translateY(0); } }

        /* Mobile */
        @media (max-width:620px) {
          .sp-root { padding:12px; overflow-y:auto; align-items:flex-start; }
          .sp-card { flex-direction:column; }
          .sp-right { display:none; }
          .sp-left { padding:26px 20px; overflow:visible; }
        }
      `}</style>

      <AmbientOrbs />

      <div className="sp-root">
        <div className={`sp-card ${mounted ? 'in' : ''}`}>

          {/* ════ LEFT ════ */}
          <div className="sp-left">

            

            <div className="sp-fe">
              <h1 style={{ fontSize:21, fontWeight:800, color:'#0f172a', letterSpacing:'-0.03em', marginBottom:2, lineHeight:1.15 }}>
                Create your account
              </h1>
              {/* <p style={{ fontSize:12.5, color:'#64748b', marginBottom:12, lineHeight:1.4 }}>
                Your wellness journey starts here
              </p> */}

              {/* Google */}
              <button className="sp-google" onClick={handleGoogle} disabled={loading}>
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </button>

              <div className="sp-div">or</div>

              <form onSubmit={handleSignup}>

                {/* Name */}
                <div className="sp-iw">
                  <label className="sp-lbl">Full Name</label>
                  <input className={`sp-input${errors.name?' err':''}`} type="text" name="name"
                    value={form.name} onChange={handleChange} placeholder="Jane Doe"
                    disabled={loading} autoComplete="name" />
                  <span className="sp-ico"><IcoUser /></span>
                  {errors.name && <div className="sp-err">⚠ {errors.name}</div>}
                </div>

                {/* Email */}
                <div className="sp-iw">
                  <label className="sp-lbl">Email</label>
                  <input className={`sp-input${errors.email?' err':''}`} type="email" name="email"
                    value={form.email} onChange={handleChange} placeholder="you@example.com"
                    disabled={loading} autoComplete="email" />
                  <span className="sp-ico"><IcoMail /></span>
                  {errors.email && <div className="sp-err">⚠ {errors.email}</div>}
                </div>

                {/* Password */}
                <div className="sp-iw">
                  <label className="sp-lbl">Password</label>
                  <input className={`sp-input${errors.password?' err':''}`}
                    type={showPass?'text':'password'} name="password"
                    value={form.password} onChange={handleChange} placeholder="Min. 6 characters"
                    disabled={loading} autoComplete="new-password" />
                  <span className="sp-ico c" onClick={() => setShowPass(p=>!p)}>
                    {showPass ? <IcoEyeOff /> : <IcoEye />}
                  </span>
                  {errors.password
                    ? <div className="sp-err">⚠ {errors.password}</div>
                    : <PasswordStrength password={form.password} />}
                </div>

                {/* Confirm */}
                <div className="sp-iw">
                  <label className="sp-lbl">Confirm Password</label>
                  <input className={`sp-input${errors.confirm?' err':''}`}
                    type={showConf?'text':'password'} name="confirm"
                    value={form.confirm} onChange={handleChange} placeholder="Re-enter password"
                    disabled={loading} autoComplete="new-password" />
                  <span className="sp-ico c" onClick={() => setShowConf(p=>!p)}>
                    {showConf ? <IcoEyeOff /> : <IcoEye />}
                  </span>
                  {!errors.confirm && form.confirm && form.confirm === form.password && (
                    <div style={{ fontSize:10.5, color:'#4ade80', marginTop:2, display:'flex', alignItems:'center', gap:3 }}>
                      <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                      Passwords match
                    </div>
                  )}
                  {errors.confirm && <div className="sp-err">⚠ {errors.confirm}</div>}
                </div>

                {/* Terms */}
                <p style={{ fontSize:11, color:'#94a3b8', lineHeight:1.5, marginBottom:9 }}>
                  By signing up you agree to our{' '}
                  <Link to="/terms" style={{ color:SKY[500], textDecoration:'none', fontWeight:600 }}>Terms</Link>
                  {' & '}
                  <Link to="/privacy" style={{ color:SKY[500], textDecoration:'none', fontWeight:600 }}>Privacy Policy</Link>.
                </p>

                <button className="sp-btn" type="submit" disabled={loading}>
                  {loading ? 'Creating account…' : 'Create Account →'}
                </button>
              </form>

              <p style={{ textAlign:'center', fontSize:12.5, color:'#64748b', marginTop:11 }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color:SKY[500], fontWeight:700, textDecoration:'none' }}>Sign in</Link>
              </p>
            </div>
          </div>

          {/* ════ RIGHT ════ */}
          <div className="sp-right">
            <div className="sp-re" style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:13, position:'relative', zIndex:1 }}>

              <YogaFigure />

              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:33, fontWeight:800, color:'#fff', letterSpacing:'-0.04em', lineHeight:1.05, minHeight:70, fontFamily:"'Bricolage Grotesque', sans-serif" }}>
                  <div>
                    {line1.displayed}{!line1.done && <span className="sp-cur" />}
                  </div>
                  <div style={{ color:SKY[200] }}>
                    {line1.done && line2.displayed}
                    {line1.done && !line2.done && <span className="sp-cur" />}
                  </div>
                </div>
                <p style={{ fontSize:13, color:'rgba(255,255,255,0.70)', lineHeight:1.6, marginTop:7, minHeight:20, fontFamily:"'Bricolage Grotesque', sans-serif" }}>
                  {line2.done && line3.displayed}
                  {line2.done && !line3.done && <span className="sp-cur" />}
                </p>
              </div>

              <div style={{ width:34, height:2, borderRadius:2, background:'rgba(255,255,255,0.28)' }} />

              {/* Feature pills */}
              <div style={{ display:'flex', flexDirection:'column', gap:7, alignSelf:'stretch' }}>
                {[['🧠','AI-powered mood tracking'],['🌿','Guided breathing & meditation'],['📈','Weekly wellness insights']].map(([icon, text]) => (
                  <div key={text} style={{ display:'flex', alignItems:'center', gap:9, background:'rgba(255,255,255,0.12)', borderRadius:9, padding:'7px 11px', border:'1px solid rgba(255,255,255,0.14)' }}>
                    <span style={{ fontSize:14 }}>{icon}</span>
                    <span style={{ fontSize:12.5, color:'rgba(255,255,255,0.88)', fontWeight:500 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={{ fontSize:10.5, color:'rgba(255,255,255,0.35)', letterSpacing:'0.14em', textTransform:'uppercase', fontFamily:"'Bricolage Grotesque', sans-serif" }}>
                mentii.app
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Signup;