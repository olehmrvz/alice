import { useEffect, useRef, useState } from "react";
import ShinyText from "./components/ShinyText";
import {
  ArrowDown,
  ArrowRight,
  ArrowsHorizontal,
  ArrowUpRight,
  InstagramLogo,
  MapPin,
  Sparkle,
} from "@phosphor-icons/react";

const directions = [
  [
    "01",
    "Ін’єкційна косметологія",
    "Працюємо з мімікою та пропорціями, щоб зберегти природні риси обличчя.",
    "/assets/hero.avif",
    "iniektsiina-kosmetolohiia",
  ],
  [
    "02",
    "Anti-age програми та якість шкіри",
    "Плануємо догляд і процедури для щільності, тону та текстури шкіри.",
    "/assets/skin-macro.png",
    "anti-age-prohramy",
  ],
  [
    "03",
    "Апаратна косметологія",
    "Лікар підбирає технологію для тону, текстури й щільності шкіри за показаннями.",
    "/assets/clinic-interior.png",
    "aparatna-kosmetolohiia",
  ],
  [
    "04",
    "Дерматологія",
    "Спочатку з’ясовуємо причину змін шкіри, потім обираємо лікування або догляд.",
    "/assets/skin-macro.png",
    "dermatolohiia",
  ],
  [
    "05",
    "Трихологія",
    "Допомагаємо розібратися з випадінням волосся та станом шкіри голови.",
    "/assets/interior.avif",
    "trykholohiia",
  ],
  [
    "06",
    "Якість шкіри",
    "Працюємо зі зволоженням, тоном, текстурою та захисним бар'єром шкіри.",
    "/assets/care-still-life.png",
    "yakist-shkiry",
  ],
  [
    "07",
    "Процедури по тілу",
    "Поєднуємо методики для тіла лише після консультації та оцінки показань.",
    "/assets/interior.avif",
    "procedury-po-tilu",
  ],
];

const concerns = [
  ["Акне та постакне", "Оцінка стану шкіри"],
  ["Пігментація", "Тактика за типом і причиною"],
  ["Судини та почервоніння", "План для чутливої шкіри"],
  ["Тьмяність і нерівний тон", "Якість замість маскування"],
  ["Зморшки та втрата тонусу", "Міміка й пропорції"],
  ["Випадіння волосся", "Шкіра голови й анамнез"],
  ["Губи та контури обличчя", "Корекція з повагою до анатомії"],
  ["Гіпергідроз", "Оцінка показань лікарем"],
  ["Небажане волосся", "Зони й актуальна вартість"],
  ["Корекція фігури", "Доречна тактика для тіла"],
  ["Контроль ваги", "Консультація й оцінка показань"],
];

const faqs = [
  [
    "Як проходить консультація?",
    "Лікар уточнює запит, збирає анамнез і оцінює стан. Після візиту ви маєте зрозумілий план дій.",
  ],
  [
    "Скільки коштує консультація?",
    "Консультація лікаря — 1 000 грн. Консультація головного лікаря — 1 800 грн.",
  ],
  [
    "Як обрати між лікарем і головним лікарем?",
    "Опишіть свій запит адміністратору — він допоможе підібрати комфортний формат першого візиту.",
  ],
  [
    "Як зрозуміти, яка процедура мені потрібна?",
    "Не потрібно обирати процедуру самостійно: лікар пояснить, які варіанти підходять після консультації.",
  ],
  [
    "Скільки триває відновлення?",
    "Термін залежить від показань, обраної методики й індивідуальної реакції. Лікар пояснить його до процедури.",
  ],
  [
    "Чи є протипоказання?",
    "Так. Їх лікар оцінює до будь-яких втручань на консультації.",
  ],
  [
    "Чи можна поєднувати процедури?",
    "Лише коли це обґрунтовано вашим станом шкіри та планом відновлення.",
  ],
  [
    "Чи працюєте ви з природним результатом?",
    "Так. Ми зберігаємо ваші риси, міміку та характер обличчя.",
  ],
  [
    "Як записатися?",
    "Залиште контакти у формі нижче — адміністратор уточнить запит і запропонує час.",
  ],
];

const steps = [
  [
    "Знайомство",
    "Спокійно обговорюємо, що саме вас турбує, які зміни ви очікуєте та який результат виглядатиме природно саме для вас.",
    "/assets/interior.avif",
    "Розмова без поспіху",
  ],
  [
    "Діагностика",
    "Лікар уважно оцінює стан шкіри, анатомічні особливості, попередній досвід процедур, домашній догляд та можливі індивідуальні протипоказання до будь-яких втручань.",
    "/assets/skin-macro.png",
    "Оцінка стану шкіри",
  ],
  [
    "План",
    "Формуємо зрозумілу послідовність процедур і домашнього догляду, пояснюємо пріоритети, очікуваний ефект, терміни відновлення та орієнтовну тривалість плану саме для вас.",
    "/assets/care-still-life.png",
    "Зрозумілі рекомендації",
  ],
  [
    "Супровід",
    "Залишаємося на зв’язку після візиту, контролюємо відновлення, відповідаємо на запитання та за потреби коригуємо рекомендації відповідно до динаміки.",
    "/assets/clinic-interior.png",
    "Зв’язок після візиту",
  ],
];

const resultData = [
  [
    "Якість шкіри",
    "/images/responsive/cases/skin-quality/before-1200.webp",
    "/images/responsive/cases/skin-quality/after-1200.webp",
    "Текстура шкіри без ефекту ретуші.",
    "Порівнюємо рельєф, тон і постакне в однаковому світлі.",
    ["Рельєф і пори", "Рівність тону", "Сліди постакне"],
  ],
  [
    "Ін’єкції",
    "/images/responsive/cases/injections/before-1200.webp",
    "/images/responsive/cases/injections/after-1200.webp",
    "Корекція, яка не змінює вас.",
    "Оцінюємо пропорції без зміни міміки та індивідуальних рис.",
    ["Пропорції", "Симетрія", "Природна міміка"],
  ],
  [
    "Апаратні методики",
    "/images/responsive/cases/hardware/before-1200.webp",
    "/images/responsive/cases/hardware/after-1200.webp",
    "Динаміка, а не миттєвий ефект.",
    "Фіксуємо щільність, текстуру й контур без вигіднішого ракурсу.",
    ["Щільність шкіри", "Текстура", "Контур обличчя"],
  ],
  [
    "Трихологія",
    "/images/responsive/cases/trichology/before-1200.webp",
    "/images/responsive/cases/trichology/after-1200.webp",
    "Ріст, який видно в однаковому проділі.",
    "Зіставляємо проділ, щільність і нове волосся без зміни укладки.",
    ["Ширина проділу", "Щільність", "Нове волосся"],
  ],
];

const reviewTopics = [
  [
    "01",
    "Перший візит",
    "Погоджені враження про консультацію, атмосферу клініки та зрозумілий план дій — в оригінальному контексті профілю.",
  ],
  [
    "02",
    "Природний результат",
    "Матеріали про делікатні зміни, збережену міміку та відчуття після процедур — без анонімних переказів.",
  ],
  [
    "03",
    "Супровід",
    "Досвід комунікації з командою, рекомендації після візиту та відповіді лікаря можна переглянути безпосередньо в Instagram.",
  ],
];

function Arrow() {
  return <ArrowUpRight aria-hidden="true" weight="regular" />;
}

const interestGroups = [
  ["Консультація", ["Не знаю, потрібна консультація"]],
  ["Напрями", directions.map(([, title]) => title)],
  ["Запити", concerns.map(([title]) => title)],
];

function InterestSelect({ value, onChange, invalid }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const closeOutside = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return (
    <div
      className={`interest-select${open ? " is-open" : ""}${invalid ? " is-invalid" : ""}`}
      ref={rootRef}
    >
      <button
        id="interest-trigger"
        className="interest-select-trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="interest-options"
        aria-labelledby="interest-field-label interest-value"
        aria-required="true"
        aria-invalid={invalid || undefined}
        onPointerDown={(event) => {
          event.preventDefault();
          event.currentTarget.focus();
          setOpen((current) => !current);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen((current) => !current);
          }
          if (event.key === "Escape") setOpen(false);
        }}
      >
        <span id="interest-value" className={value ? "" : "is-placeholder"}>
          {value || "Оберіть напрям або консультацію"}
        </span>
        <ArrowDown aria-hidden="true" />
      </button>
      {open && (
        <div
          id="interest-options"
          className="interest-select-menu"
          role="listbox"
          aria-label="Що вас цікавить?"
          onKeyDown={(event) => event.key === "Escape" && setOpen(false)}
        >
          {interestGroups.map(([group, options]) => (
            <div className="interest-select-group" key={group}>
              <span>{group}</span>
              {options.map((option) => (
                <button
                  className={value === option ? "is-selected" : ""}
                  type="button"
                  role="option"
                  aria-selected={value === option}
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  <b>{option}</b>
                  <i aria-hidden="true" />
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
      {invalid && (
        <small className="field-error">Оберіть напрям або консультацію.</small>
      )}
    </div>
  );
}

function InstagramPanel() {
  return (
    <section className="instagram-follow" aria-label="Instagram клініки">
      <div className="container">
        <div className="instagram-panel">
          <div className="instagram-profile">
            <span>
              <InstagramLogo aria-hidden="true" />
              <small>ПЕРЕВІРЕНИЙ ПРОФІЛЬ</small>
            </span>
            <strong>@alice__in__beautyland</strong>
            <p>Тут залишається те, що можна побачити у первинному контексті.</p>
            <ul className="instagram-topics" aria-label="Що є у профілі">
              <li>Відгуки</li>
              <li>Пояснення лікарів</li>
              <li>Атмосфера клініки</li>
            </ul>
          </div>
          <div className="instagram-invite">
            <span>ПЕРЕД ПЕРШИМ ВІЗИТОМ</span>
            <h3>Подивіться, як усе відбувається насправді.</h3>
            <p>Без вигаданих цитат і вирваних з контексту результатів.</p>
            <a
              className="button button-light"
              href="https://www.instagram.com/alice__in__beautyland/"
              target="_blank"
              rel="noreferrer"
            >
              Відкрити Instagram <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function App() {
  const [menu, setMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(0);
  const [diagnosticPosition, setDiagnosticPosition] = useState(58);
  const [submitted, setSubmitted] = useState(false);
  const [interest, setInterest] = useState(
    () => new URLSearchParams(window.location.search).get("interest") || "",
  );

  const handleServiceRailWheel = (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    const rail = event.currentTarget;
    if (rail.scrollWidth <= rail.clientWidth) return;
    event.preventDefault();
    rail.scrollLeft += event.deltaY;
  };
  const [interestError, setInterestError] = useState(false);
  const [bookingVisible, setBookingVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const currentResult = resultData[result];
  const currentStep = steps[step];

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    revealItems.forEach((item) => observer.observe(item));

    const bookingSection = document.querySelector("#booking");
    const bookingObserver = new IntersectionObserver(
      ([entry]) => setBookingVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    if (bookingSection) bookingObserver.observe(bookingSection);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      bookingObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  useEffect(() => {
    const journey = document.querySelector("#journey");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!journey) return undefined;

    let frame = 0;
    const updateJourney = () => {
      frame = 0;
      if (reduceMotion.matches) return;

      const rect = journey.getBoundingClientRect();
      const stickyTop = window.innerWidth <= 900 ? 64 : 68;
      const scrollDistance = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(
        1,
        Math.max(0, (stickyTop - rect.top) / scrollDistance),
      );
      const nextStep = Math.min(
        steps.length - 1,
        Math.floor(progress * steps.length),
      );
      setStep((current) => (current === nextStep ? current : nextStep));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateJourney);
    };

    updateJourney();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reduceMotion.addEventListener("change", requestUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reduceMotion.removeEventListener("change", requestUpdate);
    };
  }, []);

  const goToJourneyStep = (index) => {
    setStep(index);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const journey = document.querySelector("#journey");
    if (!journey) return;
    const stickyTop = window.innerWidth <= 900 ? 64 : 68;
    const sectionTop = window.scrollY + journey.getBoundingClientRect().top;
    const scrollDistance = Math.max(
      1,
      journey.offsetHeight - window.innerHeight,
    );
    window.scrollTo({
      top: sectionTop - stickyTop + scrollDistance * (index / steps.length) + 2,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header
        className={
          scrollProgress > 0.01 ? "site-header scrolled" : "site-header"
        }
      >
        <a
          className="logo"
          href="#top"
          aria-label="ALICE in Beautyland, головна"
        >
          <strong>ALICE</strong>
          <small>in Beautyland</small>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-controls="site-nav"
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Закрити" : "Меню"}
        </button>
        <nav
          id="site-nav"
          className={menu ? "site-nav open" : "site-nav"}
          aria-label="Основна навігація"
        >
          <a href="/posluhy" onClick={() => setMenu(false)}>
            Послуги
          </a>
          <a href="/likari" onClick={() => setMenu(false)}>
            Лікарі
          </a>
          <a href="/tsiny" onClick={() => setMenu(false)}>
            Ціни
          </a>
          <a href="#faq" onClick={() => setMenu(false)}>
            FAQ
          </a>
          <a href="#booking" onClick={() => setMenu(false)}>
            Контакти
          </a>
        </nav>
        <div className="header-cta">
          <a className="button button-dark" href="#booking">
            Записатися <Arrow />
          </a>
        </div>
        <div
          className="scroll-progress"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-stage container">
            <div className="hero-copy">
              <h1 id="hero-title">
                <span><ShinyText text="Природний" speed={7} delay={9} /></span>
                <span><ShinyText text="результат" speed={7} delay={9} /></span>
                <span><ShinyText text="без зайвих" speed={7} delay={9} /></span>
                <span>
                  <ShinyText text="втручань" speed={7} delay={9} /><i>.</i>
                </span>
              </h1>
              <p>
                Починаємо з діагностики, щоб зберегти ваші риси й рекомендувати
                процедури лише за показаннями.
              </p>
              <div className="hero-actions">
                <a className="button button-dark" href="#booking">
                  Консультація від 1 000 грн
                </a>
                <a
                  className="round-link"
                  href="#concerns"
                  aria-label="Обрати свій запит"
                >
                  <Arrow />
                </a>
              </div>
              <div className="hero-meta">
                <div>
                  <MapPin aria-hidden="true" />
                  <span>
                    <strong>Печерськ, Київ</strong>
                    <small>зручна локація для першого візиту</small>
                  </span>
                </div>
                <div>
                  <Sparkle aria-hidden="true" color="var(--ember)" />
                  <span>
                    <strong>7 напрямів</strong>
                    <small>послуги для різних запитів</small>
                  </span>
                </div>
              </div>
            </div>
            <figure className="hero-image">
              <img
                src="/assets/hero.avif"
                alt="Жінка в природному світлі торкається обличчя"
              />
            </figure>
            <a
              className="hero-scroll"
              href="#approach"
              aria-label="Далі до підходу"
            >
              <ArrowDown aria-hidden="true" />
            </a>
          </div>
        </section>

        <section
          className="manifesto container section"
          id="approach"
          aria-labelledby="manifesto-title"
          data-reveal
        >
          <div>
            <span className="eyebrow">НАШ ПІДХІД</span>
            <h2 id="manifesto-title">
              Спочатку аналіз.
              <br />
              <em>Потім — рекомендації.</em>
            </h2>
          </div>
          <p className="section-intro">
            Лікар враховує стан шкіри, анатомію та ваш запит. Рекомендуємо лише
            процедури, для яких є показання.
          </p>
          <div className="principles">
            {[
              [
                "Наука перед трендами",
                "Спираємося на діагностику, клінічні показання та доказові протоколи, а не на сезонні тренди чи популярність окремої процедури.",
              ],
              [
                "Делікатна корекція",
                "Зберігаємо живу міміку й індивідуальні пропорції, коригуючи лише те, що справді впливає на гармонію та ваше самовідчуття.",
              ],
              [
                "Персональний протокол",
                "Поєднуємо методики, інтенсивність і домашній догляд у персональний план, складений після ретельної оцінки стану шкіри.",
              ],
              [
                "Безпека в деталях",
                "Перед процедурою пояснюємо обмеження, протипоказання, відновлення та очікувану динаміку, щоб кожне рішення залишалося усвідомленим і безпечним.",
              ],
              [
                "Чесна відмова",
                "Відмовляємо від зайвих втручань, якщо вони не покращать результат, не відповідають показанням або можуть порушити природність ваших рис.",
              ],
            ].map(([title, text], i) => (
              <article key={title}>
                <b>0{i + 1}</b>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="consultation container"
          aria-labelledby="consultation-title"
          data-reveal
        >
          <div className="consultation-copy">
            <div className="consultation-meta">
              <span className="eyebrow orange">КОНСУЛЬТАЦІЯ</span>
              <span className="price-chip">від 1 000 грн</span>
            </div>
            <h2 id="consultation-title">Не обирайте процедуру самостійно.</h2>
            <p>
              Розкажіть, що вас турбує. Лікар оцінить стан шкіри, пояснить
              можливі варіанти й складе план дій.
            </p>
            <a className="button button-light" href="#journey">
              Як проходить консультація <Arrow />
            </a>
          </div>
          <div className="consultation-images">
            <img
              src="/assets/interior.avif"
              alt="Світлий мінімалістичний інтер’єр клініки"
            />
            <img
              src="/assets/care-still-life.png"
              alt="Сироватки для персонального домашнього догляду"
            />
          </div>
        </section>

        <section
          className="services section"
          id="services"
          aria-labelledby="services-title"
          data-reveal
        >
          <div className="container section-heading">
            <div>
              <span className="eyebrow">НАПРЯМИ</span>
              <h2 id="services-title">
                З якими запитами
                <br />
                <em>ми працюємо.</em>
              </h2>
            </div>
            <span className="rail-hint">
              Гортайте <ArrowRight aria-hidden="true" />
            </span>
          </div>
          <div
            className="service-rail"
            aria-label="Напрями послуг. Прокручуйте колесом миші або горизонтальним жестом"
            onWheel={handleServiceRailWheel}
            tabIndex="0"
          >
            {directions.map(([number, title, description, image, slug]) => (
              <a
                className="service-card"
                href={`/posluhy/${slug}`}
                key={number}
              >
                <img src={image} alt="" loading="lazy" />
                <div>
                  <span>{number} / 07</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <small>
                    Відкрити напрям <Arrow />
                  </small>
                </div>
              </a>
            ))}
          </div>
          <div className="container all-services-wrap">
            <a className="button button-outline all-services" href="/posluhy">
              Переглянути всі напрямки <Arrow />
            </a>
          </div>
        </section>

        <section
          className="concerns container section"
          id="concerns"
          aria-labelledby="concerns-title"
          data-reveal
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">ВАШ ЗАПИТ</span>
              <h2 id="concerns-title">
                Що вас <em>турбує?</em>
              </h2>
              <p>
                Оберіть свій запит — лікар запропонує рішення, що підходить саме
                вам.
              </p>
            </div>
            <a className="button button-dark" href="#booking">
              Консультація від 1 000 грн
            </a>
          </div>
          <div className="concern-grid">
            {concerns.map(([title, text]) => (
              <a href="#booking" onClick={() => setInterest(title)} key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
                <Arrow />
              </a>
            ))}
          </div>
        </section>

        <section
          className="journey"
          id="journey"
          aria-labelledby="journey-title"
        >
          <div className="journey-sticky">
            <div className="journey-backdrop" aria-hidden="true">
              {steps.map(([, , image], i) => (
                <img
                  className={i === step ? "active" : ""}
                  src={image}
                  alt=""
                  key={image}
                />
              ))}
              <span>0{step + 1}</span>
            </div>
            <div className="container journey-grid">
              <div className="journey-intro">
                <span className="eyebrow">ПЕРШИЙ ВІЗИТ</span>
                <h2 id="journey-title">
                  Як проходить
                  <br />
                  <em>консультація.</em>
                </h2>
                <p>
                  Від розмови про ваш запит до зрозумілого плану — крок за
                  кроком.
                </p>
                <div className="journey-counter" aria-live="polite">
                  <span>0{step + 1} / 04</span>
                  <i
                    style={{
                      transform: `scaleX(${(step + 1) / steps.length})`,
                    }}
                  />
                  <small>
                    {step === steps.length - 1 ? "Можна далі" : "Гортайте вниз"}
                  </small>
                </div>
              </div>
              <figure className="journey-visual" aria-hidden="true">
                {steps.map(([, , image], i) => (
                  <img
                    className={i === step ? "active" : ""}
                    src={image}
                    alt=""
                    key={image}
                  />
                ))}
                <figcaption>
                  <span>0{step + 1}</span>
                  <small>{currentStep[3]}</small>
                </figcaption>
              </figure>
              <div
                className="journey-steps"
                role="tablist"
                aria-label="Етапи першого візиту"
              >
                {steps.map(([title, text], i) => (
                  <button
                    className={
                      i === step ? "journey-step active" : "journey-step"
                    }
                    type="button"
                    role="tab"
                    aria-selected={i === step}
                    onClick={() => goToJourneyStep(i)}
                    key={title}
                  >
                    <b>0{i + 1}</b>
                    <span>
                      <strong>{title}</strong>
                      <small aria-hidden={i !== step}>{text}</small>
                    </span>
                    <Arrow />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="technology container section"
          id="technology"
          aria-labelledby="technology-title"
          data-reveal
        >
          <figure>
            <img
              src="/assets/clinic-interior.png"
              alt="Біле медичне обладнання в мінімалістичному кабінеті"
              loading="lazy"
            />
            <figcaption>
              <span>Клінічний простір</span>
            </figcaption>
          </figure>
          <div className="technology-copy">
            <span className="eyebrow orange">ТЕХНОЛОГІЇ</span>
            <h2 id="technology-title">
              Не апарат визначає план. <em>Спочатку — шкіра.</em>
            </h2>
            <p>
              Лікар обирає метод і параметри лише після оцінки стану шкіри,
              анамнезу та очікуваного результату.
            </p>
            <ol className="technology-flow">
              <li>
                <b>01</b>
                <span>
                  <strong>Оцінюємо стан</strong>
                  <small>Текстура, тон, чутливість і анамнез.</small>
                </span>
              </li>
              <li>
                <b>02</b>
                <span>
                  <strong>Обираємо метод</strong>
                  <small>Лише технологія, що відповідає показанням.</small>
                </span>
              </li>
              <li>
                <b>03</b>
                <span>
                  <strong>Плануємо відновлення</strong>
                  <small>Параметри, догляд і контроль динаміки.</small>
                </span>
              </li>
            </ol>
            <a
              className="button button-dark"
              href="/posluhy/aparatna-kosmetolohiia"
            >
              Переглянути апаратні методики <Arrow />
            </a>
          </div>
        </section>

        <section
          className="results section"
          id="results"
          aria-labelledby="results-title"
          data-reveal
        >
          <div className="container">
            <div className="results-heading">
              <div>
                <span className="eyebrow">ДІАГНОСТИЧНИЙ ПОГЛЯД</span>
                <h2 id="results-title">
                  Результат — не один кадр.
                  <br />
                  <em>Важливий контекст.</em>
                </h2>
              </div>
              <p>
                Оберіть напрям і рухайте маркер: так легше побачити, що лікар
                оцінює динаміку, а не один вигідний кадр.
              </p>
            </div>
            <div
              className="result-tabs"
              role="tablist"
              aria-label="Напрями оцінювання"
            >
              {resultData.map(([title], index) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={result === index}
                  className={result === index ? "selected" : ""}
                  onClick={() => {
                    setResult(index);
                    setDiagnosticPosition(50);
                  }}
                  key={title}
                >
                  <span>0{index + 1}</span>
                  {title}
                </button>
              ))}
            </div>
            <div className="evaluation-layout">
              <figure className="evaluation-media" key={currentResult[0]}>
                <img
                  className="evaluation-context-image"
                  src={currentResult[2]}
                  alt={`Після: ${currentResult[0]}`}
                />
                <img
                  className="evaluation-detail-image"
                  src={currentResult[1]}
                  alt={`До: ${currentResult[0]}`}
                  style={{
                    clipPath: `inset(0 ${100 - diagnosticPosition}% 0 0)`,
                  }}
                />
                <div className="evaluation-slider-labels" aria-hidden="true">
                  <span>01 / ДО</span>
                  <span>02 / ПІСЛЯ</span>
                </div>
                <span
                  className="evaluation-slider-handle"
                  style={{ left: `${diagnosticPosition}%` }}
                  aria-hidden="true"
                >
                  <ArrowsHorizontal />
                </span>
                <input
                  type="range"
                  min="8"
                  max="92"
                  value={diagnosticPosition}
                  onInput={(event) =>
                    setDiagnosticPosition(Number(event.currentTarget.value))
                  }
                  aria-label={`Порівняти фото до та після: ${currentResult[0]}`}
                />
                <figcaption>
                  <span>ОДНАКОВИЙ РАКУРС</span>
                  <strong>{currentResult[0]}</strong>
                </figcaption>
              </figure>
              <article className="evaluation-copy">
                <div className="evaluation-copy-top">
                  <span>ФОКУС ОЦІНКИ</span>
                  <b>0{result + 1} / 04</b>
                </div>
                <h3>{currentResult[3]}</h3>
                <p>{currentResult[4]}</p>
                <div className="evaluation-points">
                  <span>ЩО ОЦІНЮЄМО</span>
                  {currentResult[5].map((item, index) => (
                    <div key={item}>
                      <b>0{index + 1}</b>
                      <strong>{item}</strong>
                    </div>
                  ))}
                </div>
                <div className="evaluation-principle">
                  <span>ДО</span>
                  <strong>Початковий стан</strong>
                  <i />
                  <span>ПІСЛЯ</span>
                  <strong>Контроль динаміки</strong>
                </div>
                <a className="button button-light" href="#booking">
                  Обговорити запит <Arrow />
                </a>
              </article>
            </div>
            <p className="evaluation-note">
              <strong>Не гарантія індивідуального результату.</strong>
              <span>
                Рішення та план лікування формуються лише після очної
                консультації й оцінки показань.
              </span>
            </p>
          </div>
        </section>

        <section
          className="reviews section"
          aria-labelledby="reviews-title"
          data-reveal
        >
          <div className="container">
            <div className="reviews-heading">
              <div>
                <span className="eyebrow orange">ВІДГУКИ</span>
                <h2 id="reviews-title">
                  Реальний досвід.
                  <br />
                  <em>Перевірене джерело.</em>
                </h2>
              </div>
              <p>
                Не вигадуємо цитати й не вириваємо слова з контексту. Погоджені
                враження клієнтів зібрані в Instagram клініки.
              </p>
            </div>
            <div className="review-stories">
              {reviewTopics.map(([number, title, text]) => (
                <a
                  className="review-story"
                  href="https://www.instagram.com/alice__in__beautyland/"
                  key={number}
                >
                  <span>{number}</span>
                  <small>INSTAGRAM</small>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <b>
                    Переглянути джерело <Arrow />
                  </b>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          className="booking"
          id="booking"
          aria-labelledby="booking-title"
        >
          <div className="container booking-grid">
            <div className="booking-copy">
              <span className="eyebrow orange">ЗАПИС НА КОНСУЛЬТАЦІЮ</span>
              <h2 id="booking-title">
                Заповніть форму —<em>ми підберемо лікаря й зручний час.</em>
              </h2>
              <p>
                Адміністратор зв’яжеться з вами, уточнить запит і запропонує час
                для першої консультації. Обирати процедуру самостійно не
                потрібно.
              </p>
              <div className="booking-prices">
                <span>
                  <small>ЛІКАР</small>
                  <b>1 000 грн</b>
                </span>
                <span>
                  <small>ГОЛОВНИЙ ЛІКАР</small>
                  <b>1 800 грн</b>
                </span>
              </div>
              <div className="booking-contact-cards">
                <a
                  href="https://www.instagram.com/alice__in__beautyland/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramLogo aria-hidden="true" />
                  <span>
                    <small>INSTAGRAM</small>
                    <strong>@alice__in__beautyland</strong>
                  </span>
                  <Arrow />
                </a>
                <a
                  href="https://maps.app.goo.gl/8yWuvxcJt8amanj28"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin aria-hidden="true" />
                  <span>
                    <small>ЛОКАЦІЯ</small>
                    <strong>Відкрити на Google Maps</strong>
                  </span>
                  <Arrow />
                </a>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!interest) {
                  setInterestError(true);
                  document.querySelector("#interest-trigger")?.focus();
                  return;
                }
                setInterestError(false);
                setSubmitted(true);
              }}
            >
              <span className="form-kicker">01 / ПЕРШИЙ КРОК</span>
              <span className="form-title">Запит на консультацію</span>
              <label>
                <span className="field-label">
                  Ім’я{" "}
                  <span className="required-mark" aria-hidden="true">
                    *
                  </span>
                </span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  placeholder="Як до вас звертатися"
                />
              </label>
              <label>
                <span className="field-label">
                  Телефон{" "}
                  <span className="required-mark" aria-hidden="true">
                    *
                  </span>
                </span>
                <input
                  required
                  name="phone"
                  autoComplete="tel"
                  type="tel"
                  placeholder="+380 XX XXX XX XX"
                />
              </label>
              <label>
                <span className="field-label">Instagram-нікнейм</span>
                <input
                  name="instagram"
                  autoComplete="off"
                  placeholder="@username"
                />
              </label>
              <div className="form-field interest-field">
                <label id="interest-field-label">
                  Що вас цікавить?{" "}
                  <span className="required-mark" aria-hidden="true">
                    *
                  </span>
                </label>
                <InterestSelect
                  value={interest}
                  invalid={interestError}
                  onChange={(value) => {
                    setInterest(value);
                    setInterestError(false);
                  }}
                />
              </div>
              <fieldset>
                <legend>
                  Як зручно зв’язатися?{" "}
                  <span className="required-mark" aria-hidden="true">
                    *
                  </span>
                </legend>
                <label>
                  <input
                    required
                    type="radio"
                    name="contact"
                    value="instagram"
                    defaultChecked
                  />{" "}
                  Instagram
                </label>
                <label>
                  <input type="radio" name="contact" value="phone" /> Телефон
                </label>
              </fieldset>
              <label className="privacy">
                <input type="checkbox" required /> Погоджуюся з{" "}
                <a href="/polityka-konfidentsiinosti">
                  політикою конфіденційності
                </a>
                .
              </label>
              <button className="button button-dark" type="submit">
                {submitted ? (
                  "Запит надіслано"
                ) : (
                  <>
                    Надіслати запит <Arrow />
                  </>
                )}
              </button>
              {submitted && (
                <p className="form-success" role="status">
                  Дякуємо! Адміністратор зв’яжеться з вами найближчим часом.
                </p>
              )}
            </form>
          </div>
        </section>
        <InstagramPanel />

        <section
          className="faq container section"
          id="faq"
          aria-labelledby="faq-title"
        >
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 id="faq-title">
              Відповіді перед
              <br />
              <em>першим візитом.</em>
            </h2>
            <p>Коротко пояснюємо, як підготуватися до консультації.</p>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], i) => (
              <article
                className={openFaq === i ? "faq-item open" : "faq-item"}
                key={question}
              >
                <button
                  type="button"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <span>{question}</span>
                  <b>{openFaq === i ? "−" : "+"}</b>
                </button>
                {openFaq === i && <p>{answer}</p>}
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="contacts" className="home-footer">
        <div className="container home-footer-grid">
          <div className="footer-brand">
            <a className="logo" href="#top">
              <strong>ALICE</strong>
              <small>in Beautyland</small>
            </a>
            <p>
              Природність — наш принцип.
              <br />
              <em>Не короткочасний тренд.</em>
            </p>
            <a
              className="footer-instagram"
              href="https://www.instagram.com/alice__in__beautyland/"
            >
              <InstagramLogo aria-hidden="true" /> @alice__in__beautyland{" "}
              <Arrow />
            </a>
          </div>
          <nav className="footer-column" aria-label="Навігація в підвалі">
            <span>НАВІГАЦІЯ</span>
            <a href="/posluhy">Послуги</a>
            <a href="/likari">Лікарі</a>
            <a href="/tsiny">Ціни</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="footer-column footer-visit">
            <span>ВІЗИТ</span>
            <p>
              Печерськ
              <br />
              Київ, Україна
            </p>
          </div>
          <div className="footer-column footer-documents">
            <span>ДОКУМЕНТИ</span>
            <a href="/polityka-konfidentsiinosti">Конфіденційність</a>
            <a href="/publichna-oferta">Публічна оферта</a>
            <a href="/zghoda-na-otrymannia-reklamnykh-materialiv">
              Згода на комунікацію
            </a>
            <a className="footer-booking-cta" href="#booking">
              Записатися <Arrow />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© 2026 ALICE in Beautyland</span>
            <span>ЕСТЕТИЧНА МЕДИЦИНА · ПЕЧЕРСЬК</span>
            <a href="#top">Нагору ↑</a>
          </div>
        </div>
      </footer>
      {!bookingVisible && (
        <a className="mobile-booking" href="#booking">
          Консультація від 1 000 грн <Arrow />
        </a>
      )}
    </>
  );
}
