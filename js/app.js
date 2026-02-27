
/* ============ Base ============ */
:root{
  --paper: #f6f3ee;
  --ink: #101522;
  --ink2: rgba(16,21,34,.68);
  --btn: #173a63;
}

*{ box-sizing:border-box; }
html,body{ height:100%; }
body{
  margin:0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
  color: var(--ink);
  background: var(--paper);
}

/* ============ DEV tools ============ */
.amr-dev-tools{
  position: fixed;
  top: 14px;
  right: 14px;
  z-index: 20;
  display: grid;
  gap: 8px;
  justify-items: end;
}

.amr-dev-btn{
  background: rgba(16,21,34,.08);
  border: 1px solid rgba(16,21,34,.15);
  color: var(--ink);
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  cursor: pointer;
}
.amr-dev-btn:hover{ background: rgba(16,21,34,.14); }

.amr-dev-status{
  font-size: 12px;
  color: rgba(16,21,34,.55);
}

/* ============ Hero ============ */
.amr-hero{
  min-height: 100vh;
  width: 100%;
  padding: clamp(60px, 10vw, 140px) 24px;
  position: relative;
  overflow: hidden;
}

/* Soft diagonal band like your earlier version */
.amr-hero::before{
  content:"";
  position:absolute;
  inset:-30% -10%;
  background: linear-gradient(
    90deg,
    rgba(231,210,175,0),
    rgba(231,210,175,.32),
    rgba(231,210,175,0)
  );
  transform: rotate(-9deg);
  pointer-events:none;
}

.amr-hero-inner{
  position: relative;
  z-index: 1;
  max-width: 980px;
  margin: 0 auto;
  text-align: center;
}

/* Headline */
.amr-h1{
  margin: 0 auto;
  line-height: 0.95;
  letter-spacing: -0.02em;
  font-size: clamp(52px, 7vw, 92px);
  font-weight: 750;
}

.amr-h1-secondary{
  display:block;
  font-weight: 400;
  font-style: italic;
  opacity: .92;
}

.amr-subline{
  margin: 18px auto 0;
  max-width: 52ch;
  font-size: 15px;
  color: var(--ink2);
}

/* Input card (not a “card”) */
.amr-hero-card{
  margin: 36px auto 0;
  max-width: 560px;
  padding: 0;
  background: transparent;
  border: 0;
}

/* Form */
.amr-form{
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

/* Labels hidden for clean look */
.amr-label{
  position:absolute;
  left:-9999px;
}

/* Inputs */
.amr-input{
  width: 100%;
  border-radius: 999px;
  border: 1px solid rgba(16,21,34,.12);
  background: rgba(255,255,255,.72);
  padding: 12px 16px;
  font-size: 14.5px;
  color: var(--ink);
  box-shadow: 0 1px 0 rgba(16,21,34,.06);
  outline: none;
}

.amr-input::placeholder{ color: rgba(16,21,34,.48); }

.amr-input:focus{
  border-color: rgba(23,58,99,.40);
  box-shadow: 0 0 0 4px rgba(23,58,99,.10);
}

/* CTA */
.amr-btn{
  width: 100%;
  padding: 12px 18px;
  border: none;
  border-radius: 999px;
  background: var(--btn);
  color: #fff;
  font-weight: 650;
  letter-spacing: .01em;
  cursor: pointer;
  box-shadow: 0 10px 22px rgba(23,58,99,.18);
}

.amr-btn:hover{ filter: brightness(1.03); }
.amr-btn:active{ transform: translateY(1px); }

.amr-microcopy{
  margin: 6px auto 0;
  max-width: 70ch;
  color: rgba(16,21,34,.52);
  font-size: 12.5px;
}

/* Results placeholder */
.amr-results{
  margin: 44px auto 0;
  max-width: 820px;
  text-align: left;
}
.amr-results.is-hidden{ display:none; }

.amr-h2{
  margin: 0;
  font-size: 22px;
  letter-spacing: -0.01em;
}
.amr-results-sub{
  margin: 8px 0 0;
  color: rgba(16,21,34,.65);
}

.amr-debug{
  margin-top: 16px;
  padding: 14px 16px;
  background: rgba(255,255,255,.55);
  border: 1px solid rgba(16,21,34,.10);
  border-radius: 14px;
}
.amr-debug strong{ font-weight: 650; }
