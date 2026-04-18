import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const SKY = {
  50:'#f0f9ff', 100:'#e0f2fe', 200:'#bae6fd',
  300:'#7dd3fc', 400:'#38bdf8', 500:'#0ea5e9',
  600:'#0284c7', 700:'#0369a1',
};

const AmbientOrbs = () => (
  <>
    <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0, overflow:'hidden' }}>
      <div style={{
        position:'absolute', width:560, height:560, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(186,230,253,0.55) 0%,transparent 70%)',
        top:-160, left:-120,
        animation:'orbDrift1 14s ease-in-out infinite alternate',
      }}/>
      <div style={{
        position:'absolute', width:440, height:440, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(125,211,252,0.35) 0%,transparent 70%)',
        bottom:-100, right:-80,
        animation:'orbDrift2 18s ease-in-out infinite alternate',
      }}/>
    </div>
    <style>{`
      @keyframes orbDrift1{from{transform:translate(0,0) scale(1)}to{transform:translate(24px,18px) scale(1.06)}}
      @keyframes orbDrift2{from{transform:translate(0,0) scale(1)}to{transform:translate(-20px,-14px) scale(1.04)}}
    `}</style>
  </>
);

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email,   setEmail]   = useState('');
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState('');
  const [mounted, setMounted] = useState(false);

  useState(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  });

  const validate = () => {
    if (!email.trim()) { setError('Email is required.'); return false; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Enter a valid email.'); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError('');
    try {
      await resetPassword(email.trim().toLowerCase());
      setSent(true);
      toast.success('Reset email sent!');
    } catch (err) {
      const map = {
        'auth/user-not-found':        'No account found with this email.',
        'auth/invalid-email':         'Enter a valid email address.',
        'auth/too-many-requests':     'Too many attempts. Try again later.',
        'auth/network-request-failed':'Network error. Check connection.',
      };
      setError(map[err.code] ?? 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap');
        .fp-root{
          position:fixed; top:64px; left:0; right:0; bottom:0;
          display:flex; align-items:center; justify-content:center;
          background:linear-gradient(160deg,#f0f9ff 0%,#e0f2fe 40%,#bae6fd 100%);
          font-family:'Bricolage Grotesque',sans-serif;
          padding:16px 20px; overflow:hidden;
        }
        .fp-card{
          position:relative; width:min(440px,96vw); z-index:1;
          background:rgba(255,255,255,0.88);
          backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
          border:1px solid rgba(186,230,253,0.7);
          border-radius:20px;
          box-shadow:0 4px 6px rgba(14,165,233,.04),0 10px 40px rgba(14,165,233,.10),0 32px 80px rgba(12,74,110,.12);
          padding:40px 36px;
          transform:translateY(32px) scale(0.97); opacity:0;
          transition:transform 0.65s cubic-bezier(0.22,1,0.36,1),opacity 0.5s ease;
        }
        .fp-card.in{transform:translateY(0) scale(1);opacity:1;}
        .fp-input{
          width:100%; padding:12px 16px;
          background:#f8fbff; border:1.5px solid ${SKY[200]};
          border-radius:11px; color:#0f172a; font-size:14px;
          font-family:'Bricolage Grotesque',sans-serif;
          outline:none; box-sizing:border-box;
          transition:border-color .2s,box-shadow .2s,background .2s;
        }
        .fp-input::placeholder{color:#94a3b8;}
        .fp-input:focus{border-color:${SKY[400]};background:#fff;box-shadow:0 0 0 3px rgba(14,165,233,0.12);}
        .fp-input.err{border-color:#f87171;box-shadow:0 0 0 3px rgba(248,113,113,0.10);}
        .fp-btn{
          width:100%; padding:13px; border-radius:12px; border:none;
          background:linear-gradient(135deg,${SKY[500]},${SKY[700]});
          color:#fff; font-size:15px; font-weight:700;
          font-family:'Bricolage Grotesque',sans-serif;
          cursor:pointer; box-shadow:0 4px 14px rgba(14,165,233,.32);
          transition:all .22s ease; position:relative; overflow:hidden;
        }
        .fp-btn:hover:not(:disabled){box-shadow:0 6px 22px rgba(14,165,233,.42);transform:translateY(-1px);}
        .fp-btn:disabled{opacity:.55;cursor:not-allowed;}
        .fp-btn::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.16),transparent);transform:translateX(-120%);transition:transform .55s ease;}
        .fp-btn:hover::after{transform:translateX(120%);}
      `}</style>

      <AmbientOrbs />

      <div className="fp-root">
        <div className={`fp-card ${mounted ? 'in' : ''}`}>

          {/* Icon */}
          <div style={{
            width:56, height:56, borderRadius:16, margin:'0 auto 24px',
            background:`linear-gradient(135deg,${SKY[500]},${SKY[700]})`,
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:`0 8px 24px rgba(14,165,233,.35)`,
          }}>
            <svg width="26" height="26" fill="none" stroke="#fff" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
            </svg>
          </div>

          {!sent ? (
            <>
              <h1 style={{
                fontSize:24, fontWeight:800, color:'#0f172a',
                letterSpacing:'-0.03em', marginBottom:8, textAlign:'center',
              }}>
                Reset password
              </h1>
              <p style={{
                fontSize:14, color:'#64748b', textAlign:'center',
                lineHeight:1.6, marginBottom:28,
              }}>
                Enter your email and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit}>
                <label style={{
                  display:'block', fontSize:12, fontWeight:700,
                  color:'#475569', letterSpacing:'.06em',
                  textTransform:'uppercase', marginBottom:8,
                }}>
                  Email address
                </label>
                <input
                  className={`fp-input${error ? ' err' : ''}`}
                  type="email" value={email}
                  onChange={e => { setEmail(e.target.value.trim().toLowerCase()); setError(''); }}
                  placeholder="you@example.com"
                  disabled={loading}
                  autoComplete="email"
                />
                {error && (
                  <p style={{ fontSize:12, color:'#ef4444', marginTop:6, marginBottom:0 }}>
                    ⚠ {error}
                  </p>
                )}

                <button
                  className="fp-btn"
                  type="submit"
                  disabled={loading || !email}
                  style={{ marginTop:20 }}
                >
                  {loading ? 'Sending…' : 'Send Reset Link →'}
                </button>
              </form>
            </>
          ) : (
            /* ── Success state ── */
            <div style={{ textAlign:'center' }}>
              <div style={{
                width:64, height:64, borderRadius:'50%',
                background:'#dcfce7', margin:'0 auto 20px',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <svg width="28" height="28" fill="none" stroke="#16a34a" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h2 style={{ fontSize:22, fontWeight:800, color:'#0f172a', marginBottom:12 }}>
                Check your inbox
              </h2>
              <p style={{ fontSize:14, color:'#64748b', lineHeight:1.7, marginBottom:28 }}>
                We sent a reset link to <strong style={{ color:'#0f172a' }}>{email}</strong>.
                Check your spam folder if you don't see it.
              </p>
              <button
                onClick={() => { setSent(false); setEmail(''); }}
                style={{
                  background:'transparent', border:`1.5px solid ${SKY[200]}`,
                  borderRadius:10, padding:'10px 20px',
                  fontSize:13, fontWeight:600, color:SKY[600],
                  cursor:'pointer', width:'100%', marginBottom:12,
                  fontFamily:"'Bricolage Grotesque',sans-serif",
                }}
              >
                Try a different email
              </button>
            </div>
          )}

          {/* Footer links */}
          <div style={{
            display:'flex', justifyContent:'center', gap:24,
            marginTop:24, paddingTop:20,
            borderTop:`1px solid ${SKY[100]}`,
          }}>
            <Link to="/login" style={{ fontSize:13, color:SKY[600], fontWeight:600, textDecoration:'none' }}>
              ← Back to sign in
            </Link>
            <Link to="/signup" style={{ fontSize:13, color:'#64748b', fontWeight:500, textDecoration:'none' }}>
              Create account
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default ForgotPassword;