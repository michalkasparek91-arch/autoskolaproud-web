// site-sections.jsx — section components for autoškola proud
const { useState, useEffect, useRef } = React;

/* ---------- Reveal hook ---------- */
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, shown ? "reveal in" : "reveal"];
}

/* ---------- Nav ---------- */
function Nav({ onBook }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["Úvod", "#top"],
    ["Jak začít", "#how"],
    ["Proč u nás", "#why"],
    ["Kurzy a ceny", "#courses"],
    ["Testy a teorie", "#theory"],
    ["Instruktoři", "#instructors"],
    ["Vozový park", "#fleet"],
    ["Kontakty", "#contact"],
    ["FAQ", "#faq"],
  ];
  return (
    <React.Fragment>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="wrap nav-inner">
          <a href="#top" style={{ display: "inline-flex" }}>
            <ProudWordmark size={26} />
          </a>
          <div className="nav-links">
            {links.map(([t, h]) => <a key={h} href={h}>{t}</a>)}
          </div>
          <div className="nav-cta">
            <a href="tel:+420777123456" className="btn btn-ghost sm">+420 777 123 456</a>
            <button className="btn btn-volt sm" onClick={onBook}>
              Přihlásit se <span className="arrow">→</span>
            </button>
            <button className="nav-burger burger-btn" onClick={() => setOpen(true)}>Menu</button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <button className="close" onClick={() => setOpen(false)}>Zavřít ✕</button>
        <div className="mm-links">
          {links.map(([t, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)}>{t}</a>
          ))}
        </div>
        <button className="btn btn-volt" onClick={() => { setOpen(false); onBook(); }}>
          Přihlásit se <span className="arrow">→</span>
        </button>
      </div>
    </React.Fragment>
  );
}

/* ---------- Hero ---------- */
function Hero({ onBook }) {
  return (
    <header className="hero" id="top">
      <div className="hero-bg"></div>
      <svg className="hero-current" viewBox="0 0 1440 220" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cg" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(215, 242, 58, 0)" />
            <stop offset="0.5" stopColor="rgba(215, 242, 58, 0.5)" />
            <stop offset="1" stopColor="rgba(215, 242, 58, 0)" />
          </linearGradient>
        </defs>
        <path d="M 0 110 Q 90 30 180 110 T 360 110 T 540 110 T 720 110 T 900 110 T 1080 110 T 1260 110 T 1440 110" stroke="url(#cg)" strokeWidth="1.5" fill="none" />
        <path d="M 0 140 Q 90 70 180 140 T 360 140 T 540 140 T 720 140 T 900 140 T 1080 140 T 1260 140 T 1440 140" stroke="url(#cg)" strokeWidth="1" fill="none" opacity="0.5" />
      </svg>
      <div className="wrap hero-grid">
        <div>
          <div className="hero-meta">
            <span className="pulse"></span>
            <span>První čistě elektrická autoškola v ČR</span>
            <span className="hm-sep">·</span>
            <span>Ostrava · Opava · Frýdek-Místek</span>
          </div>
          <h1>
            Jezdi v klidu<br />
            a bezpečně.<br />
            Jezdi v <span className="accent">PROUDU</span>.
          </h1>
        </div>
        <aside className="hero-aside">
          <div className="kicker">
            <CurrentMark size={36} color="var(--volt)" stroke={3.2} />
            první čistě elektrická autoškola v ČR
          </div>
          <p>
            Učíme řídit pouze v elektromobilu <b style={{ color: "var(--volt)" }}>Hyundai Ioniq</b>. Manuály jsou na ústupu — už žádné řazení, trhané rozjezdy v křižovatkách, řev otáček a smrad z výfuku. Jen ticho, plná koncentrace na provoz a v hlavě klid.
          </p>
          <a href="#courses" className="hero-promo">
            <span className="hp-tag">Akce</span>
            <span className="hp-body">Přiveď kamaráda a získej slevu! <span className="hp-more">Zjisti více <span className="arrow">→</span></span></span>
          </a>
        </aside>
      </div>
    </header>
  );
}

/* ---------- Announcement bar (top, looping) ---------- */
function Ticker() {
  const cohorts = [
    { city: "Ostrava", date: "2. 9. 2026", note: "zbývá 5 míst" },
    { city: "Opava", date: "bude upřesněno", note: null },
    { city: "Frýdek-Místek", date: "bude upřesněno", note: null },
  ];
  const unit = (
    <React.Fragment>
      <span className="ann-lead">Příští kurz — zahájení</span>
      {cohorts.map((c, i) => (
        <span key={i} className="ann-item">
          <span className="dot"></span>
          <b>{c.city}</b>
          <span className="sep">·</span>
          <span>{c.date}</span>
          {c.note && <React.Fragment><span className="sep">·</span><span className="ann-note">{c.note}</span></React.Fragment>}
        </span>
      ))}
    </React.Fragment>
  );
  return (
    <div className="annbar">
      <div className="annbar-track">
        {unit}{unit}{unit}{unit}
      </div>
    </div>
  );
}

/* ---------- Why us ---------- */
function WhyElectric() {
  const [ref, cls] = useReveal();
  const cells = [
    { n: "01", t: "Moderní elektromobil. Automat.", b: "Jezdíš v čistém elektromobilu Hyundai Ioniq — tedy s automatem. Žádné trápení se spojkou, hlídání otáček ani odvádění pozornosti řadicí pákou. Plně se věnuješ provozu a posloucháš učitele. Přes 70 % nových a poprvé i přes 50 % ojetých aut v ČR má dnes automat — a čísla rostou." },
    { n: "02", t: "Jeden instruktor. Osobní přístup.", b: "Celou dobu jezdíš jen s jedním učitelem — od teorie až po zkoušku. Žádná štafeta, žádné „toho neznám“ ráno před jízdou. Zkušení a trpěliví profíci vysvětlí situaci tolikrát, kolikrát potřebuješ. Držíme maximálně 5 uchazečů na jednoho učitele — máš dost prostoru i jistotu odpočatého instruktora." },
    { n: "03", t: "V samém centru Ostravy.", b: "Učebna sídlí na Havlíčkově nábřeží 2728/38 u řeky Ostravice, hned vedle zastávky Most Pionýrů. Jízdy startují z parkoviště před budovou, zkušební místnost je 3 minuty chůze. Podél řeky vede cyklostezka — na teorii klidně přijeď na kole, autobusem nebo trolejbusem." },
  ];
  return (
    <section className="why" id="why" ref={ref} data-screen-label="Proč u nás">
      <div className={`wrap ${cls}`}>
        <div className="section-head">
          <div className="kicker"><span className="n">02</span> Proč u nás</div>
          <div>
            <h2>Auto bez výfuku.<br />Řidič bez stresu.</h2>
            <p className="lead" style={{ marginTop: 24 }}>
              Z mnoha důvodů. Moderní a čistý elektromobil, jeden zkušený instruktor po celou dobu a učebna v samém centru Ostravy. Tak neváhej a jezdi s&nbsp;PROUDEM.
            </p>
          </div>
        </div>
        <div className="why-grid why-grid-3">
          {cells.map((c) => (
            <div key={c.n} className="why-cell">
              <div className="num">{c.n}</div>
              <div>
                <h3>{c.t}</h3>
                <p>{c.b}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="stats">
          {STATS.map((s) => (
            <div key={s.l} className="stat">
              <div className="n">{s.n.includes(" ") || s.n.includes("%") || s.n.includes(",") ? <span className="v">{s.n}</span> : <span>{s.n}</span>}</div>
              <div className="l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Courses ---------- */
function Courses({ onPickCourse }) {
  const [active, setActive] = useState("b");
  const course = COURSES.find((c) => c.id === active);
  const [ref, cls] = useReveal();

  const bars = course.spotsLeft != null
    ? Array.from({ length: course.cohorts || 4 }, (_, i) => i < course.spotsLeft)
    : null;

  return (
    <section className="courses" id="courses" ref={ref}>
      <div className={`wrap ${cls}`}>
        <div className="section-head">
          <div className="kicker"><span className="n">03</span> Kurzy & ceny</div>
          <div>
            <h2>Tři způsoby, jak se sem dostat.</h2>
            <p className="lead" style={{ marginTop: 24 }}>
              Klasický kurz pro mladé. Intenzivní pro nedočkavé. Kondiční pro ty, co už řidičák mají, ale s elektrikou nikdy nejeli.
            </p>
          </div>
        </div>

        <div className="course-tabs">
          {COURSES.map((c) => (
            <button
              key={c.id}
              className={`course-tab ${c.id === active ? "active" : ""}`}
              onClick={() => setActive(c.id)}
            >
              {c.code} · {c.name}
            </button>
          ))}
        </div>

        <div className="course-card">
          <div className="code-badge">{course.code}</div>
          <div>
            <h3>{course.name}</h3>
            <div className="sub">{course.sub}</div>
            <p className="blurb">{course.blurb}</p>
            <ul>
              {course.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <button className="btn btn-volt lg" onClick={() => onPickCourse(course.id)}>
              Přihlásit se na {course.code} <span className="arrow">→</span>
            </button>
          </div>

          <div>
            <div className="course-meta">
              <div className="cell">
                <div className="l">Hodin jízdy</div>
                <div className="v">{course.hours.drive}<span className="small">h</span></div>
              </div>
              <div className="cell">
                <div className="l">Teorie</div>
                <div className="v">{course.hours.theory}<span className="small">h</span></div>
              </div>
              <div className="cell">
                <div className="l">Délka</div>
                <div className="v" style={{ fontSize: 18 }}>{course.duration}</div>
              </div>
              <div className="cell">
                <div className="l">Simulátor</div>
                <div className="v">{course.hours.sim}<span className="small">h</span></div>
              </div>
            </div>

            <div className="price-block">
              <div>
                {course.priceOld && <div className="price-old">{course.priceOld.toLocaleString("cs-CZ")} Kč</div>}
                <div className="price">{course.price.toLocaleString("cs-CZ")}<span className="cur">Kč</span></div>
              </div>
              {bars && (
                <div className="spots">
                  <div className="bars">
                    {bars.map((on, i) => <span key={i} className={on ? "fill" : ""}></span>)}
                  </div>
                  <span>zbývá {course.spotsLeft} z {course.cohorts}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Routes (light section) ---------- */
function Routes() {
  const [active, setActive] = useState(0);
  const [ref, cls] = useReveal();
  // hand-positioned pins on the abstract map
  const pins = [
    { ...ROUTES[0], x: 22, y: 30 },
    { ...ROUTES[1], x: 48, y: 52 },
    { ...ROUTES[2], x: 30, y: 70 },
    { ...ROUTES[3], x: 68, y: 65 },
    { ...ROUTES[4], x: 84, y: 78 },
  ];
  const cur = pins[active];

  return (
    <section className="routes" id="routes" ref={ref}>
      <div className={`wrap ${cls}`}>
        <div className="section-head">
          <div className="kicker"><span className="n">07</span> Kde jezdíme</div>
          <div>
            <h2>Ostrava od centra<br />až po Beskydy.</h2>
            <p className="lead" style={{ marginTop: 24, color: "var(--ink-2)" }}>
              Vyzvedneme tě z domova. Naučíš se zvládat každý typ provozu, který tě v životě potká — od obytné zóny v Porubě po horské serpentiny na Pustevnách.
            </p>
          </div>
        </div>

        <div className="routes-map">
          <div className="grid"></div>
          {/* abstract Ostrava silhouette */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <path d="M 10 35 Q 18 28 28 30 Q 38 24 50 30 Q 62 26 70 36 Q 82 40 88 56 Q 92 70 84 80 Q 70 86 60 80 Q 48 88 36 82 Q 24 84 18 72 Q 8 60 10 35 Z"
                  fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.15)" strokeWidth="0.2" strokeDasharray="0.6 0.6" />
            {/* river */}
            <path d="M 5 45 Q 25 50 40 60 Q 60 70 80 65 Q 95 60 100 70"
                  fill="none" stroke="rgba(107, 197, 255, 0.5)" strokeWidth="0.8" />
            {/* route line between pins */}
            <path d={`M ${pins[0].x} ${pins[0].y} Q ${pins[1].x} ${pins[1].y - 5}, ${pins[1].x} ${pins[1].y} T ${pins[2].x} ${pins[2].y} T ${pins[3].x} ${pins[3].y} T ${pins[4].x} ${pins[4].y}`}
                  fill="none" stroke="var(--volt-deep)" strokeWidth="0.4" strokeDasharray="1.2 0.8" />
          </svg>
          {pins.map((p, i) => (
            <button
              key={p.nm}
              onClick={() => setActive(i)}
              className={`route-pin ${i === active ? "active" : ""}`}
              style={{ left: `${p.x}%`, top: `${p.y}%`, background: "transparent", border: "none" }}
            >
              <div className="head">{p.nm}</div>
              <div className="stem"></div>
              <div className="dot"></div>
            </button>
          ))}
          <div className="route-info">
            <div>
              <div className="nm">{cur.nm}</div>
              <div className="note" style={{ marginTop: 4 }}>{cur.note}</div>
            </div>
            <div className="note">trasa {String(active + 1).padStart(2, "0")} / 05</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Instructor (single spotlight) ---------- */
function Instructors() {
  const [ref, cls] = useReveal();
  const p = INSTRUCTORS[0];
  return (
    <section className="instructors" id="instructors" ref={ref} data-screen-label="Instruktoři">
      <div className={`wrap ${cls}`}>
        <div className="section-head">
          <div className="kicker"><span className="n">05</span> Kdo tě učí</div>
          <div>
            <h2>Jeden člověk.<br />Od přihlášky až ke zkoušce.</h2>
            <p className="lead" style={{ marginTop: 24 }}>
              Žádná štafeta mezi pěti instruktory. Žádné „toho neznám" ráno před zkouškou. Jeden plán, jedno auto, jeden přístup. Můj.
            </p>
          </div>
        </div>

        <article className="inst-spotlight">
          <div className="inst-portrait">
            <img src="images/martin-ioniq.png" alt="Martin Samec u Hyundai Ioniq, Dolní oblast Vítkovic" />
          </div>
          <div className="inst-body">
            <div className="role">{p.role}</div>
            <div className="nm">{p.nm}</div>
            <p className="bio">{p.bio}</p>
            <p className="bio-long">{p.longBio}</p>

            <div className="meta-row" style={{ marginTop: 8 }}>
              {p.spec.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
            <div className="region">→ {p.region}</div>

            <div className="inst-stats">
              {p.stats.map((s) => (
                <div key={s.l}>
                  <div className="sn">{s.n}</div>
                  <div className="sl">{s.l}</div>
                </div>
              ))}
            </div>

            <blockquote className="inst-quote">
              „Když to umí jet samo, není co řadit. Soustřeď se na silnici, ne na převodovku."
            </blockquote>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ---------- How to start ---------- */
function HowToStart({ onBook }) {
  const [ref, cls] = useReveal();
  const steps = [
    { n: "01", t: "Potvrzení od lékaře", b: (<React.Fragment>Vytiskni si <a href="#" className="how-link">Potvrzení od lékaře</a>. Doma vyplň jméno, adresu atd. a zbytek nech na svém praktickém lékaři. Objednej se k němu a nezapomeň se zeptat, kolik si za potvrzení účtuje (většinou kolem 500 Kč).</React.Fragment>) },
    { n: "02", t: "Online přihláška", b: "Mezitím si tady vyplň online přihlášku. Zabere ti to dvě minuty — vybereš město, termín a necháš na sebe kontakt." },
    { n: "03", t: "Osobní schůzka", b: "S podepsaným potvrzením přijď na pobočku v otevírací době, nebo napiš či zavolej (viz Kontakty) a domluv si osobní schůzku, kde se dozvíš všechny informace o tom, co tě čeká nemine." },
    { n: "04", t: "Začátek kurzu", b: "Pak už jen počkáš na začátek nejbližšího kurzu. Tak neváhej a jezdi s PROUDEM!" },
  ];
  return (
    <section className="how" id="how" ref={ref} data-screen-label="Jak začít">
      <div className={`wrap ${cls}`}>
        <div className="section-head">
          <div className="kicker"><span className="n">01</span> Jak začít</div>
          <div>
            <h2>Začít je jednoduché.<br />Čtyři kroky a jedeš.</h2>
            <p className="lead" style={{ marginTop: 24 }}>
              Žádná byrokratická noční můra. Provedeme tě celým procesem osobně — ty se staráš jen o to, abys přišel na jízdy.
            </p>
          </div>
        </div>
        <div className="how-grid">
          {steps.map((s) => (
            <div key={s.n} className="how-step">
              <div className="how-num">{s.n}</div>
              <div className="how-line"></div>
              <h3>{s.t}</h3>
              <p>{s.b}</p>
            </div>
          ))}
        </div>
        <div className="how-cta">
          <span>Tak neváhej a jezdi s PROUDEM!</span>
          <button className="btn btn-volt lg" onClick={onBook}>Spustit přihlášku <span className="arrow">→</span></button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Theory & tests ---------- */
function TheoryTests() {
  const [ref, cls] = useReveal();
  const cats = [
    { nm: "Pravidla provozu", q: 220, done: 88 },
    { nm: "Dopravní značky", q: 140, done: 64 },
    { nm: "Zásady bezpečné jízdy", q: 95, done: 40 },
    { nm: "Konstrukce vozidla", q: 60, done: 22 },
    { nm: "Předpisy o podmínkách", q: 75, done: 12 },
    { nm: "Zdravotnická příprava", q: 45, done: 0 },
  ];
  return (
    <section className="theory" id="theory" ref={ref} data-screen-label="Testy a teorie">
      <div className={`wrap ${cls}`}>
        <div className="section-head">
          <div className="kicker"><span className="n">04</span> Testy a teorie</div>
          <div>
            <h2>Procvičuj testy<br />kdykoliv a kdekoliv.</h2>
            <p className="lead" style={{ marginTop: 24, color: "var(--ink-2)" }}>
              Stejné otázky jako u státní zkoušky. Online přístup dostaneš hned po přihlášce — trénuj v tramvaji, na gauči, kdykoliv máš pět minut.
            </p>
          </div>
        </div>

        <div className="theory-grid">
          <div className="theory-board">
            <div className="theory-board-head">
              <div>
                <div className="tb-l">Tvůj postup</div>
                <div className="tb-v">38 %</div>
              </div>
              <div className="tb-meta">635 otázek · 6 okruhů</div>
            </div>
            {cats.map((c) => (
              <div key={c.nm} className="theory-row">
                <div className="theory-row-top">
                  <span>{c.nm}</span>
                  <span className="tr-q">{c.done}/{c.q}</span>
                </div>
                <div className="theory-bar"><span style={{ width: `${Math.round((c.done / c.q) * 100)}%` }}></span></div>
              </div>
            ))}
          </div>

          <div className="theory-side">
            <div className="theory-card">
              <div className="tc-big">25</div>
              <div className="tc-l">otázek v ostrém testu</div>
            </div>
            <div className="theory-card">
              <div className="tc-big">50<span className="tc-min">min</span></div>
              <div className="tc-l">časový limit</div>
            </div>
            <div className="theory-card">
              <div className="tc-big">43<span className="tc-min">/50</span></div>
              <div className="tc-l">bodů na úspěch</div>
            </div>
            <a href="#" className="btn btn-ink lg" style={{ justifyContent: "center" }}>
              Otevřít cvičné testy <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Fleet ---------- */
function Fleet({ onBook }) {
  const [ref, cls] = useReveal();
  const specs = [
    { l: "Dojezd", v: "311", u: "km" },
    { l: "Výkon", v: "100", u: "kW" },
    { l: "Baterie", v: "38,3", u: "kWh" },
    { l: "0–100", v: "9,7", u: "s" },
  ];
  return (
    <section className="fleet" id="fleet" ref={ref} data-screen-label="Vozový park">
      <div className={`wrap ${cls}`}>
        <div className="section-head">
          <div className="kicker"><span className="n">06</span> Vozový park</div>
          <div>
            <h2>Jedno auto.<br />A je to elektromobil.</h2>
            <p className="lead" style={{ marginTop: 24 }}>
              Hyundai Ioniq Electric. Automat, couvací kamera, asistenti do pruhu i parkování. Po celou dobu kurzu jezdíš v jednom voze — žádné překvapení u zkoušky.
            </p>
          </div>
        </div>

        <div className="fleet-feature">
          <img src="images/martin-ioniq.png" alt="Hyundai Ioniq Electric autoškoly proud, Dolní oblast Vítkovic" />
          <div className="fleet-plate">EL3 010N</div>
          <div className="fleet-tag">Hyundai Ioniq Electric · 2022</div>
        </div>

        <div className="fleet-specs">
          {specs.map((s) => (
            <div key={s.l} className="fleet-spec">
              <div className="fs-v">{s.v}<span className="fs-u">{s.u}</span></div>
              <div className="fs-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact({ onBook }) {
  const [ref, cls] = useReveal();
  return (
    <section className="contact" id="contact" ref={ref} data-screen-label="Kontakty">
      <div className={`wrap ${cls}`}>
        <div className="section-head">
          <div className="kicker"><span className="n">08</span> Kontakty</div>
          <div>
            <h2>Ozvi se.<br />Volám zpět do 24 hodin.</h2>
            <p className="lead" style={{ marginTop: 24 }}>
              Nejraději po telefonu — řekneš mi, co potřebuješ, a domluvíme se za pět minut. Nebo napiš, jak ti to vyhovuje.
            </p>
          </div>
        </div>

        <div className="contact-grid">
          <div className="contact-cards">
            <a href="tel:+420777123456" className="contact-card">
              <div className="cc-l">Telefon</div>
              <div className="cc-v">+420 777 123 456</div>
              <div className="cc-note">Po–Pá 8:00–19:00 · So 9:00–13:00</div>
            </a>
            <a href="mailto:ahoj@autoskolaproud.cz" className="contact-card">
              <div className="cc-l">E-mail</div>
              <div className="cc-v">ahoj@autoskolaproud.cz</div>
              <div className="cc-note">Odpovídám typicky do 2 hodin</div>
            </a>
            <div className="contact-card">
              <div className="cc-l">Učebna & zázemí</div>
              <div className="cc-v" style={{ fontSize: 22 }}>Havlíčkovo nábřeží 2728/38<br />702 00 Ostrava</div>
              <div className="cc-note">U řeky Ostravice · zastávka Most Pionýrů</div>
            </div>
            <button className="contact-card cc-action" onClick={onBook}>
              <div className="cc-l">Online</div>
              <div className="cc-v">Přihláška na kurz</div>
              <div className="cc-note">Zabere dvě minuty <span className="arrow">→</span></div>
            </button>
          </div>

          <div className="contact-map">
            <div className="grid"></div>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
              <path d="M 5 58 Q 25 62 42 70 Q 62 80 82 74 Q 95 70 100 78" fill="none" stroke="rgba(107,197,255,0.5)" strokeWidth="0.8" />
              <path d="M 0 40 L 100 44" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
              <path d="M 38 0 L 44 100" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
            </svg>
            <div className="map-pin">
              <div className="map-pin-head">Havlíčkovo nábřeží 2728/38</div>
              <div className="map-pin-dot"></div>
            </div>
            <div className="map-cta">Otevřít v Mapy.cz →</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const [open, setOpen] = useState(0);
  const [ref, cls] = useReveal();
  return (
    <section className="faq" id="faq" ref={ref}>
      <div className={`wrap ${cls}`}>
        <div className="section-head">
          <div className="kicker"><span className="n">09</span> Časté otázky</div>
          <div>
            <h2>Na co se ptáte nejčastěji.</h2>
            <p className="lead" style={{ marginTop: 24 }}>
              Nenašli jste odpověď? Napište nám — odpovídáme typicky do 2 hodin v pracovní době.
            </p>
          </div>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div key={i} className={`faq-item ${i === open ? "open" : ""}`}>
              <button className="faq-q" onClick={() => setOpen(i === open ? -1 : i)}>
                <span>{f.q}</span>
                <span className="plus">+</span>
              </button>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <ProudWordmark size={36} />
            <p style={{ color: "var(--muted)", marginTop: 24, maxWidth: 36 + "ch", lineHeight: 1.6 }}>
              První ostravská autoškola jezdící výhradně na elektřinu. Otevřeno od 2022. Akreditace MD ČR č. 03/2022.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <a href="#" className="btn btn-ghost sm">Instagram</a>
              <a href="#" className="btn btn-ghost sm">Mapy.cz</a>
            </div>
          </div>
          <div className="foot-col">
            <h4>Kontakt</h4>
            <a href="tel:+420777123456">+420 777 123 456</a>
            <a href="mailto:ahoj@autoskolaproud.cz">ahoj@autoskolaproud.cz</a>
            <p style={{ color: "var(--muted)", marginTop: 8 }}>Havlíčkovo nábřeží 2728/38<br />702 00 Ostrava<br />u zastávky Most Pionýrů</p>
          </div>
          <div className="foot-col">
            <h4>Kurzy</h4>
            {COURSES.map((c) => <a key={c.id} href="#courses">{c.code} · {c.name}</a>)}
            <a href="#">Dárkový voucher</a>
          </div>
          <div className="foot-col">
            <h4>Studovna</h4>
            <a href="#">Online testy</a>
            <a href="#">Učebnice (PDF)</a>
            <a href="#">Lékařský posudek</a>
            <a href="#">Aplikace pro studenty</a>
          </div>
        </div>
        <div className="foot-bottom">
          <div>© 2026 autoškola proud s.r.o. · IČO 12345678</div>
          <div>made in Ostrava · powered by 100% obnovitelnou energií</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, Ticker, WhyElectric, Courses, Routes, Instructors, HowToStart, TheoryTests, Fleet, Contact, FAQ, Footer, useReveal });
