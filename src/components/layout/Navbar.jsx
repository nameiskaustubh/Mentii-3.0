import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import { motion } from 'framer-motion';

const SKY = {
  50:  '#f0f9ff',
  100: '#e0f2fe',
  200: '#bae6fd',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',
  600: '#0284c7',
  700: '#0369a1',
};

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&display=swap');
`;

/* ─── Nav text link ─────────────────────────────────────────── */
const NavLink = ({ to, children, active }) => {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '7px 14px',
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "'Bricolage Grotesque', sans-serif",
        color: active ? SKY[600] : hov ? SKY[600] : '#475569',
        textDecoration: 'none',
        borderRadius: 8,
        background: active ? SKY[50] : hov ? SKY[50] : 'transparent',
        transition: 'all 0.2s ease',
        position: 'relative',
      }}
    >
      {children}
      {active && (
        <span style={{
          position: 'absolute', bottom: 2, left: '50%',
          transform: 'translateX(-50%)',
          width: 4, height: 4, borderRadius: '50%',
          background: SKY[500],
        }} />
      )}
    </Link>
  );
};

/* ─── Primary pill button ───────────────────────────────────── */
const PillBtn = ({ to, onClick, children, variant = 'primary' }) => {
  const [hov, setHov] = useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '9px 22px', borderRadius: 100,
    fontSize: 14, fontWeight: 600,
    fontFamily: "'Bricolage Grotesque', sans-serif",
    letterSpacing: '-0.01em',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.22s ease',
  };

  const styles = variant === 'primary' ? {
    background: hov
      ? `linear-gradient(135deg, ${SKY[600]}, ${SKY[700]})`
      : `linear-gradient(135deg, ${SKY[500]}, ${SKY[700]})`,
    color: '#fff',
    boxShadow: hov
      ? '0 6px 20px rgba(14,165,233,0.38)'
      : '0 3px 10px rgba(14,165,233,0.22)',
    transform: hov ? 'translateY(-1px)' : 'translateY(0)',
  } : {
    background: hov ? SKY[50] : 'transparent',
    color: hov ? SKY[600] : '#475569',
    border: `1px solid ${hov ? SKY[300] : 'rgba(148,163,184,0.4)'}`,
  };

  const props = {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: { ...base, ...styles },
  };

  if (onClick) return <button onClick={onClick} {...props}>{children}</button>;
  return <Link to={to} {...props}>{children}</Link>;
};

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════ */
const Navbar = () => {
  const { currentUser, signout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const path      = location.pathname;

  const handleLogout = async () => {
    try {
      await signout();
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <>
      <style>{FONTS}</style>

      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: 'rgba(240,249,255,0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid rgba(186,230,253,0.5)`,
          fontFamily: "'Bricolage Grotesque', sans-serif",
        }}
      >
        <div style={{
          maxWidth: 1180, margin: '0 auto',
          padding: '0 32px', height: 64,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 16,
        }}>

          {/* ── Logo ─────────────────────────────────────────── */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: `linear-gradient(135deg, ${SKY[500]}, ${SKY[700]})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(14,165,233,0.3)',
            }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 18, lineHeight: 1 }}>M</span>
            </div>
            <span style={{
              fontSize: 20, fontWeight: 800,
              color: '#0f172a', letterSpacing: '-0.03em',
            }}>
              Mentii
            </span>
          </Link>

          {/* ── Center links (authenticated only) ────────────── */}
          {currentUser && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <NavLink to="/dashboard" active={path === '/dashboard'}>Dashboard</NavLink>
              <NavLink to="/profile"   active={path === '/profile'}>Profile</NavLink>
            </div>
          )}

          {/* ── Right actions ─────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            {currentUser ? (
              <>
                {/* Avatar chip */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.7)',
                  border: `1px solid ${SKY[200]}`,
                  borderRadius: 100, padding: '5px 14px 5px 6px',
                  backdropFilter: 'blur(8px)',
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${SKY[400]}, ${SKY[600]})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0,
                  }}>
                    {currentUser.email?.[0]?.toUpperCase() ?? 'U'}
                  </div>
                  <span style={{ fontSize: 13, color: '#334155', fontWeight: 500, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentUser.displayName ?? currentUser.email?.split('@')[0]}
                  </span>
                </div>

                <PillBtn variant="ghost" onClick={handleLogout}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                  </svg>
                  Logout
                </PillBtn>
              </>
            ) : (
              <>
                <PillBtn to="/login" variant="ghost">Sign in</PillBtn>
                <PillBtn to="/signup" variant="primary">Get Started</PillBtn>
              </>
            )}
          </div>

        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;