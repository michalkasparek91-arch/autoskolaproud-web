// site-app.jsx — booking modal + main app shell
const { useState: useStateApp, useEffect: useEffectApp } = React;

/* ---------- Booking Modal (interactive multi-step) ---------- */
function BookingModal({ open, onClose, initialCourse }) {
  const [step, setStep] = useStateApp(0);
  const [form, setForm] = useStateApp({
    course: initialCourse || "b",
    cohort: 0,
    firstName: "", lastName: "", email: "", phone: "",
    pickup: "Poruba",
    payment: "full",
  });
  const [sent, setSent] = useStateApp(false);

  useEffectApp(() => {
    if (open && initialCourse) setForm((f) => ({ ...f, course: initialCourse }));
    if (open) { setStep(0); setSent(false); document.body.style.overflow = "hidden"; }
    else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [open, initialCourse]);

  if (!open) return null;

  const course = COURSES.find((c) => c.id === form.course);
  const cohorts = [
    { id: 0, label: "Ostrava",       date: "začátek 2. 9. 2026 · zbývá 5 míst" },
    { id: 1, label: "Opava",         date: "termín bude upřesněn" },
    { id: 2, label: "Frýdek-Místek", date: "termín bude upřesněn" },
  ];
  const totalBase = course.price;
  const total = totalBase;

  const steps = ["Kurz", "Termín", "Údaje", "Shrnutí"];
  const canNext = () => {
    if (step === 0) return !!form.course;
    if (step === 1) return form.cohort != null;
    if (step === 2) return form.firstName && form.lastName && form.email && form.phone;
    return true;
  };

  const submit = () => setSent(true);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(10, 11, 10, 0.86)", backdropFilter: "blur(14px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      animation: "fadein 0.25s ease",
    }}
    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="booking-card" style={{ width: "100%", maxHeight: "92vh", overflow: "auto", position: "relative" }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 20, right: 20, background: "transparent",
          border: "1px solid var(--line)", color: "var(--paper)", borderRadius: "50%",
          width: 36, height: 36, fontSize: 16
        }}>✕</button>

        {sent ? (
          <div className="success">
            <div className="check">✓</div>
            <h3>Hotovo. Voláme ti zítra.</h3>
            <p>
              Děkujeme, {form.firstName}. Potvrzení jsme poslali na <b style={{ color: "var(--paper)" }}>{form.email}</b>. Martin se ti ozve do 24 hodin a domluvíte první jízdu.
            </p>
            <button className="btn btn-volt lg" onClick={onClose}>Zavřít</button>
            <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em", marginTop: 32, textTransform: "uppercase" }}>
              Rezervační kód · PR-{Math.floor(Math.random() * 90000) + 10000}
            </p>
          </div>
        ) : (
          <React.Fragment>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
              přihláška · krok {step + 1} / {steps.length}
            </div>
            <h3 style={{ fontFamily: "var(--display)", fontWeight: 500, fontSize: 36, letterSpacing: "-0.03em", margin: "0 0 28px", lineHeight: 1 }}>
              {step === 0 && "Vyber kurz."}
              {step === 1 && "Vyber pobočku."}
              {step === 2 && "Pár údajů o tobě."}
              {step === 3 && "Tak co, jdeme do toho?"}
            </h3>

            <div className="steps">
              {steps.map((s, i) => (
                <div key={s} className={`step ${i === step ? "active" : i < step ? "done" : ""}`}>
                  {String(i + 1).padStart(2, "0")} · {s}
                </div>
              ))}
            </div>

            {step === 0 && (
              <div className="pick-grid">
                {COURSES.map((c) => (
                  <button key={c.id} className={`pick ${form.course === c.id ? "selected" : ""}`} onClick={() => setForm({ ...form, course: c.id })}>
                    <div className="nm">{c.code} · {c.name}</div>
                    <div className="pr">{c.price.toLocaleString("cs-CZ")} Kč · {c.duration}</div>
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <React.Fragment>
                <div className="pick-grid">
                  {cohorts.map((co) => (
                    <button key={co.id} className={`pick ${form.cohort === co.id ? "selected" : ""}`} onClick={() => setForm({ ...form, cohort: co.id })}>
                      <div className="nm">{co.label}</div>
                      <div className="pr">{co.date}</div>
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: 20, padding: 16, border: "1px solid var(--line)", borderRadius: "var(--r-md)", background: "rgba(215, 242, 58, 0.04)", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--volt)", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0 }}>i</div>
                  <div>
                    <div style={{ fontFamily: "var(--display)", fontWeight: 500, fontSize: 15 }}>Jezdí se pouze s automatem.</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.04em", marginTop: 6, lineHeight: 1.5 }}>Řidičák získáš s kódem 78 — platí pro auta s automatickou převodovkou. Dnes je to 9 z 10 nových aut.</div>
                  </div>
                </div>
              </React.Fragment>
            )}

            {step === 2 && (
              <React.Fragment>
                <div className="field row2">
                  <div>
                    <label>Jméno</label>
                    <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="Jana" />
                  </div>
                  <div>
                    <label>Příjmení</label>
                    <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Nováková" />
                  </div>
                </div>
                <div className="field">
                  <label>E-mail</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jana@email.cz" />
                </div>
                <div className="field">
                  <label>Telefon</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+420 777 ..." />
                </div>
                <div className="field">
                  <label>Forma platby</label>
                  <div className="pick-grid">
                    <button className={`pick ${form.payment === "full" ? "selected" : ""}`} onClick={() => setForm({ ...form, payment: "full" })}>
                      <div className="nm">Jednorázově</div>
                      <div className="pr">Sleva 500 Kč</div>
                    </button>
                    <button className={`pick ${form.payment === "6" ? "selected" : ""}`} onClick={() => setForm({ ...form, payment: "6" })}>
                      <div className="nm">6 splátek</div>
                      <div className="pr">0 % · cca {Math.round(total / 6).toLocaleString("cs-CZ")} Kč / měs.</div>
                    </button>
                    <button className={`pick ${form.payment === "12" ? "selected" : ""}`} onClick={() => setForm({ ...form, payment: "12" })}>
                      <div className="nm">12 splátek</div>
                      <div className="pr">0 % · cca {Math.round(total / 12).toLocaleString("cs-CZ")} Kč / měs.</div>
                    </button>
                  </div>
                </div>
              </React.Fragment>
            )}

            {step === 3 && (
              <div className="summary">
                <div className="row"><span>Kurz</span><b>{course.code} · {course.name}</b></div>
                <div className="row"><span>Termín</span><b>{cohorts[form.cohort].label} · {cohorts[form.cohort].date}</b></div>
                <div className="row"><span>Pobočka</span><b>{cohorts[form.cohort].label}</b></div>
                <div className="row"><span>Převodovka</span><b>Automat (kód 78)</b></div>
                <div className="row"><span>Jméno</span><b>{form.firstName} {form.lastName}</b></div>
                <div className="row"><span>E-mail</span><b>{form.email}</b></div>
                <div className="row"><span>Platba</span><b>{form.payment === "full" ? "Jednorázově" : `${form.payment} splátek`}</b></div>
                <div className="total">
                  <span>Celkem</span>
                  <span>{total.toLocaleString("cs-CZ")} Kč</span>
                </div>
              </div>
            )}

            <div className="booking-actions">
              {step > 0 ? (
                <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>← Zpět</button>
              ) : <span></span>}
              {step < 3 ? (
                <button className="btn btn-volt" disabled={!canNext()} onClick={() => setStep(step + 1)} style={{ opacity: canNext() ? 1 : 0.45, cursor: canNext() ? "pointer" : "not-allowed" }}>
                  Pokračovat <span className="arrow">→</span>
                </button>
              ) : (
                <button className="btn btn-volt lg" onClick={submit}>
                  Odeslat přihlášku <span className="arrow">→</span>
                </button>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

/* ---------- Booking section ---------- */
function BookingCTA({ onBook }) {
  const [ref, cls] = useReveal();
  return (
    <section className="booking" id="booking" ref={ref}>
      {/* sine motif backdrop */}
      <svg viewBox="0 0 1440 400" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }}>
        <path d="M 0 200 Q 90 80 180 200 T 360 200 T 540 200 T 720 200 T 900 200 T 1080 200 T 1260 200 T 1440 200" stroke="rgba(0,0,0,0.5)" strokeWidth="2" fill="none" />
        <path d="M 0 240 Q 90 120 180 240 T 360 240 T 540 240 T 720 240 T 900 240 T 1080 240 T 1260 240 T 1440 240" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" fill="none" />
        <path d="M 0 280 Q 90 160 180 280 T 360 280 T 540 280 T 720 280 T 900 280 T 1080 280 T 1260 280 T 1440 280" stroke="rgba(0,0,0,0.2)" strokeWidth="1" fill="none" />
      </svg>
      <div className={`wrap ${cls}`}>
        <div className="section-head">
          <div className="kicker"><span className="n">→</span> Přihláška</div>
          <div>
            <h2>Příští kurz<br />startuje 15. září.</h2>
            <p className="lead" style={{ marginTop: 24, color: "var(--ink-2)" }}>
              Zbývá <b>1 místo</b> z původních čtyř. Online přihláška ti zabere dvě minuty, do 24 hodin se ti ozve Martin a domluvíte první jízdu.
            </p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <button className="btn btn-ink lg" onClick={() => onBook()}>
            Spustit přihlášku <span className="arrow">→</span>
          </button>
          <a href="tel:+420777123456" className="btn lg" style={{ background: "transparent", border: "1px solid rgba(0,0,0,0.2)", color: "var(--ink)" }}>
            Nebo zavolej · +420 777 123 456
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- App ---------- */
function App() {
  const [bookingOpen, setBookingOpen] = useStateApp(false);
  const [initialCourse, setInitialCourse] = useStateApp(null);

  const openBooking = (courseId = null) => {
    setInitialCourse(courseId);
    setBookingOpen(true);
  };

  return (
    <React.Fragment>
      <Ticker />
      <Nav onBook={() => openBooking()} />
      <Hero onBook={() => openBooking()} />
      <HowToStart onBook={() => openBooking()} />
      <WhyElectric />
      <Courses onPickCourse={(id) => openBooking(id)} />
      <TheoryTests />
      <Instructors />
      <Fleet onBook={() => openBooking()} />
      <Routes />
      <BookingCTA onBook={() => openBooking()} />
      <Contact onBook={() => openBooking()} />
      <FAQ />
      <Footer />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} initialCourse={initialCourse} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
