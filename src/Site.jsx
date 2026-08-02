import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, InstagramLogo, List, MagnifyingGlass, X } from '@phosphor-icons/react';
import { App as HomePage, BookingSection, FaqSection } from './App';
import { articles, legalPages, services } from './data/content';
import { expertVideos, specialOffers, specialistPlaceholders } from './data/experience-content';
import { pricingCategories, pricingSubcategories } from './data/catalog';
import { pricing } from './data/pricing';

const instagramUrl = 'https://www.instagram.com/alice__in__beautyland/';

function Arrow() {
  return <ArrowUpRight aria-hidden="true" weight="regular" />;
}

function formatPrice(value, currency = 'UAH') {
  return `${new Intl.NumberFormat('uk-UA', { maximumFractionDigits: 0 }).format(value).replace(/\u00a0/g, ' ')} ${currency === 'EUR' ? '€' : 'грн'}`;
}

function usePageEffects() {
  const location = useLocation();
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const id = window.setTimeout(() => {
      if (location.hash) document.querySelector(location.hash)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'auto' });
    }, 0);

    const revealItems = Array.from(document.querySelectorAll('[data-page-reveal]'));
    if (reduce) revealItems.forEach(item => item.classList.add('is-visible'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach(item => observer.observe(item));
    return () => { window.clearTimeout(id); observer.disconnect(); };
  }, [location.pathname, location.hash]);
}

function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  useEffect(() => setMenu(false), [location.pathname, location.hash]);
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menu]);

  return <header className="site-header inner-header">
    <Link className="logo" to="/" aria-label="ALICE in Beautyland, головна"><strong>ALICE</strong><small>in Beautyland</small></Link>
    <button className="menu-toggle inner-menu-toggle" type="button" aria-controls="inner-site-nav" aria-expanded={menu} onClick={() => setMenu(!menu)}>
      {menu ? <><X /> Закрити</> : <><List /> Меню</>}
    </button>
    <nav id="inner-site-nav" className={menu ? 'site-nav open' : 'site-nav'} aria-label="Основна навігація">
      <Link to="/posluhy">Послуги</Link>
      <Link to="/likari">Лікарі</Link>
      <Link to="/tsiny">Ціни</Link>
      <Link to="/spetsialni-propozytsii">Пропозиції</Link>
      <Link to="/zhurnal">Журнал</Link>
    </nav>
    <div className="header-cta"><a className="button button-dark" href="#booking">Записатися <Arrow /></a></div>
  </header>;
}

function SiteFooter() {
  return <footer className="home-footer inner-premium-footer">
    <div className="container home-footer-grid">
      <div className="footer-brand">
        <Link className="logo" to="/"><strong>ALICE</strong><small>in Beautyland</small></Link>
        <p>Щоб у дзеркалі ви<br /><em>бачили себе. Просто свіжішою.</em></p>
        <a className="footer-instagram" href={instagramUrl}><InstagramLogo aria-hidden="true" /> @alice__in__beautyland <Arrow /></a>
      </div>
      <nav className="footer-column" aria-label="Навігація в підвалі">
        <span>НАВІГАЦІЯ</span><Link to="/posluhy">Послуги</Link><Link to="/likari">Лікарі</Link><Link to="/tsiny">Ціни</Link><Link to="/spetsialni-propozytsii">Пропозиції</Link><Link to="/zhurnal">Журнал</Link>
      </nav>
      <div className="footer-column footer-visit"><span>ВІЗИТ</span><p>Печерськ<br />Київ, Україна</p></div>
      <div className="footer-column footer-documents"><span>ДОКУМЕНТИ</span><Link to="/polityka-konfidentsiinosti">Конфіденційність</Link><Link to="/pravyla-zapysu">Правила запису</Link><Link to="/publichna-oferta">Публічна оферта</Link><a className="footer-booking-cta" href="#booking">Записатися <Arrow /></a></div>
      <div className="footer-bottom"><span>© 2026 ALICE in Beautyland</span><span>ЕСТЕТИЧНА МЕДИЦИНА · ПЕЧЕРСЬК</span><Link to="/">Нагору ↑</Link></div>
    </div>
  </footer>;
}

function PageLayout({ children }) {
  usePageEffects();
  return <><SiteHeader />{children}<BookingSection /><FaqSection /><SiteFooter /><a className="mobile-booking inner-mobile-booking" href="#booking">Консультація від 1 000 грн <Arrow /></a></>;
}

function Breadcrumbs({ items }) {
  return <nav className="breadcrumbs" aria-label="Навігаційний шлях"><Link to="/">Головна</Link>{items.map((item, index) => <span key={`${item.label}-${index}`}>/ {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}</span>)}</nav>;
}

function PageHero({ eyebrow, title, intro, children, image = '/assets/generated/ivory-sage-botanical-glass.jpg', imageAlt = '', variant = 'default' }) {
  return <section className={`page-hero page-hero--${variant}`} data-page-reveal>
    <div className="container page-hero-grid">
      <div className="page-hero-copy"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p>{children}</div>
      <figure className="page-hero-media"><img src={image} alt={imageAlt} /><figcaption>ALICE IN BEAUTYLAND · ПЕЧЕРСЬК</figcaption></figure>
    </div>
    <span className="page-hero-index" aria-hidden="true">A</span>
  </section>;
}

function ServicesPage() {
  return <PageLayout><main className="inner-main services-page">
    <PageHero variant="services" eyebrow="ALICE IN BEAUTYLAND · МАРШРУТ" title={<>Послуги. <em>Ваш маршрут.</em></>} intro="Лікар поєднує методики лише після консультації, діагностики та оцінки показань." image="/images/services-editorial-v1.webp" imageAlt="Природна текстура шкіри під час лікарської оцінки">
      <div className="page-hero-actions"><a className="button button-dark" href="#service-directory">Обрати напрям <ArrowDown /></a><Link className="button button-outline" to="/tsiny">Переглянути ціни</Link></div>
    </PageHero>
    <section className="page-section container" id="service-directory" data-page-reveal>
      <div className="directory-heading"><div><span className="eyebrow">07 НАПРЯМІВ</span><h2>Від запиту —<br /><em>до точного рішення.</em></h2></div><p>Оберіть напрям, щоб побачити показання, етапи роботи та логіку персонального плану.</p></div>
      <div className="services-directory">{services.map((service, index) => <Link className="directory-card" to={`/posluhy/${service.slug}`} key={service.slug} style={{ '--card-index': index }}>
        <figure><img src={service.image} alt={service.imageAlt} loading="lazy" /><span>0{index + 1}</span></figure>
        <div><small>{service.eyebrow}</small><h3>{service.title}</h3><p>{service.summary}</p><b>Відкрити напрям <Arrow /></b></div>
      </Link>)}</div>
    </section>
    <EditorialCallout />
  </main></PageLayout>;
}

function EditorialCallout() {
  return <section className="editorial-callout container" data-page-reveal>
    <img src="/assets/generated/sage-glass-stone-editorial.jpg" alt="Абстрактна композиція зі скла та каменю в оливкових відтінках" loading="lazy" />
    <div><h2>Не обирайте процедуру. <em>Оберіть розмову з лікарем.</em></h2><p>Опишіть, що вас турбує. Доречний маршрут з’явиться після оцінки стану й показань.</p><Link className="button button-light" to="/#booking">Записатися <Arrow /></Link></div>
  </section>;
}

function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find(item => item.slug === slug);
  if (!service) return <NotFoundPage />;
  const related = service.related.map(item => services.find(candidate => candidate.slug === item)).filter(Boolean);
  return <PageLayout><main className="inner-main service-detail-page">
    <section className="service-detail-hero" data-page-reveal><div className="container service-detail-hero-grid">
      <div><Breadcrumbs items={[{ label: 'Послуги', to: '/posluhy' }, { label: service.title }]} /><span className="eyebrow">{service.eyebrow}</span><h1>{service.headline}</h1><p>{service.summary}</p><Link className="button button-dark" to={`/?interest=${encodeURIComponent(service.title)}#booking`}>{service.cta} <Arrow /></Link></div>
      <figure><img src={service.image} alt={service.imageAlt} /><figcaption><span>ALICE METHOD</span><b>Діагностика → план → супровід</b></figcaption></figure>
    </div></section>
    <section className="page-section container service-detail-layout" data-page-reveal>
      <div className="service-detail-content">
        <section className="detail-block"><span className="detail-index">01</span><h2>Коли варто почати з консультації</h2><div className="suitable-grid">{service.suitableFor.map(item => <p key={item}>{item}</p>)}</div></section>
        <section className="detail-block narrative-block"><span className="detail-index">02</span><h2>Яке завдання вирішує напрям</h2><p>{service.solves}</p></section>
        <section className="detail-block"><span className="detail-index">03</span><h2>Як проходить робота</h2><ol className="process-list">{service.process.map((item, index) => <li key={item}><b>0{index + 1}</b><p>{item}</p></li>)}</ol></section>
        <section className="detail-block benefits-block"><span className="detail-index">04</span><h2>Спокійна логіка персонального плану</h2><ul>{service.benefits.map(item => <li key={item}>{item}</li>)}</ul></section>
        <aside className="medical-note"><small>МЕДИЧНА БЕЗПЕКА</small><h3>Безпека починається з повної інформації.</h3><p>{service.important}</p></aside>
        <section className="detail-block result-block"><span className="detail-index">05</span><h2>Очікуваний результат</h2><p>{service.result}</p></section>
      </div>
      <aside className="detail-sticky-card"><span className="eyebrow">КОНСУЛЬТАЦІЯ</span><h3>Не знаєте, з чого почати?</h3><p>Опишіть свій запит. Лікар запропонує доречний маршрут після очної оцінки.</p><Link className="button button-light" to={`/?interest=${encodeURIComponent(service.title)}#booking`}>Записатися <Arrow /></Link><small>Печерськ, Київ · за попереднім записом</small></aside>
    </section>
    <section className="related-services page-section" data-page-reveal><div className="container"><div className="directory-heading"><div><span className="eyebrow">ПОВ’ЯЗАНІ НАПРЯМИ</span><h2>Методики можуть<br /><em>доповнювати одна одну.</em></h2></div><p>Лише коли це обґрунтовано показаннями та узгоджено з вашим планом.</p></div><div className="related-grid">{related.map(item => <Link to={`/posluhy/${item.slug}`} key={item.slug}><h3>{item.title}</h3><p>{item.summary}</p><b>Детальніше <Arrow /></b></Link>)}</div></div></section>
    <p className="container medical-disclaimer">Інформація має ознайомчий характер. Показання, протипоказання, методику, препарат або технологію та послідовність процедур визначає лікар після консультації й збору анамнезу.</p>
  </main></PageLayout>;
}

function SpecialistsPage() {
  return <PageLayout><main className="inner-main">
    <PageHero variant="team" eyebrow="КОМАНДА ALICE" title={<>Фахівці, які починають <em>із вашого запиту.</em></>} intro="Публікуємо лише погоджені фото, спеціалізації та професійні дані." image="/images/founder-placeholder.webp" imageAlt="Редакційний портрет для профілю головного лікаря">
      <div className="page-hero-actions"><Link className="button button-dark" to="/#booking">Допоможіть обрати лікаря <Arrow /></Link></div>
    </PageHero>
    <section className="page-section container" data-page-reveal><div className="specialist-marquee" aria-hidden="true"><span>Дерматологія / Косметологія / Якість шкіри / Апаратні методики / Ін’єкційні методики /</span></div><div className="specialist-grid">{specialistPlaceholders.map((item, index) => <article className="specialist-card" key={item.id}><figure><img src={item.image} alt={item.imageAlt} /><span>0{index + 1}</span></figure><div><small>{item.role}</small><h2>Профіль фахівця</h2><p>{item.note}</p></div></article>)}</div><div className="doctor-help"><Link className="button button-dark" to="/#booking">Допоможіть обрати лікаря <Arrow /></Link></div></section>
  </main></PageLayout>;
}

function getPriceValue(item) {
  if (item.priceType === 'on_request') return 'Вартість уточнюйте';
  if (item.priceOptions?.length) return item.priceOptions.map(option => [option.label, option.currentPrice, option.headDoctorPrice, option.doctorPrice]);
  if (item.headDoctorPrice !== null || item.doctorPrice !== null) return [['Головний лікар', item.headDoctorPrice], ['Лікар', item.doctorPrice]];
  if (item.currentPrice === null) return 'Вартість уточнюйте';
  const current = formatPrice(item.currentPrice, item.currency);
  return item.priceType === 'from' ? `від ${current}` : current;
}

function PriceRow({ item }) {
  const value = getPriceValue(item);
  const meta = [item.variant, item.area, item.product, item.volume, item.dosage, item.duration, item.unit, item.note].filter(Boolean).join(' · ');
  return <article className="price-row"><div><h4>{item.sourceTitle}</h4>{meta && <p>{meta}</p>}{item.description && <p>{item.description}</p>}{item.included?.length > 0 && <ul>{item.included.map(value => <li key={value}>{value}</li>)}</ul>}</div><div className="price-values">{Array.isArray(value) ? value.map((entry, index) => {
    if (entry.length === 2) return entry[1] !== null && <span key={`${entry[0]}-${index}`}><small>{entry[0]}</small><strong>{formatPrice(entry[1], item.currency)}</strong></span>;
    const [, current, head, doctor] = entry;
    return <span key={`${entry[0]}-${index}`}><small>{entry[0]}</small>{current !== null && <strong>{formatPrice(current, item.currency)}</strong>}{head !== null && <em>Головний лікар · {formatPrice(head, item.currency)}</em>}{doctor !== null && <em>Лікар · {formatPrice(doctor, item.currency)}</em>}</span>;
  }) : <strong>{value}</strong>}</div></article>;
}

function PricesPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [openGroup, setOpenGroup] = useState(pricingCategories[0]?.id || '');
  const filtered = useMemo(() => {
    const needle = query.toLocaleLowerCase('uk-UA').trim();
    return pricing.filter(item => {
      const subcategoryTitle = pricingSubcategories.find(sub => sub.id === item.subcategoryId)?.title;
      const categoryTitle = pricingCategories.find(cat => cat.id === item.categoryId)?.title;
      const haystack = [categoryTitle, subcategoryTitle, item.sourceTitle, item.service, item.variant, item.area, item.product, item.note, item.description, ...(item.included || [])].filter(Boolean).join(' ').toLocaleLowerCase('uk-UA');
      return item.isPublished && (category === 'all' || item.categoryId === category) && (!needle || haystack.includes(needle));
    });
  }, [query, category]);
  const groups = useMemo(() => pricingCategories.map(cat => ({ ...cat, subcategories: pricingSubcategories.filter(sub => sub.categoryId === cat.id).map(sub => ({ ...sub, items: filtered.filter(item => item.subcategoryId === sub.id) })).filter(sub => sub.items.length) })).filter(group => group.subcategories.length), [filtered]);

  return <PageLayout><main className="inner-main pricing-page">
    <PageHero variant="pricing" eyebrow="ПРОЗОРИЙ ПРАЙС" title={<>Ціни Alice <em>in Beautyland.</em></>} intro="Оберіть напрям або знайдіть потрібну процедуру. Вартість залежить від зони, препарату, об’єму та лікаря лише там, де це зазначено в прайсі." image="/images/skincare-serums.webp" imageAlt="Сироватки для професійного догляду">
      <div className="consultation-prices"><span>Консультація лікаря <b>1 000 грн</b></span><span>Головний лікар <b>1 800 грн</b></span></div>
    </PageHero>
    <section className="page-section container pricing-layout" data-page-reveal>
      <aside className="pricing-tools"><label><span>Пошук у прайсі</span><div><MagnifyingGlass /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Процедура, препарат або зона" /></div></label><nav aria-label="Категорії прайсу"><button className={category === 'all' ? 'active' : ''} onClick={() => { setCategory('all'); setOpenGroup(pricingCategories[0]?.id || ''); }}><span>Усі напрямки</span><small>{pricing.filter(item => item.isPublished).length}</small></button>{pricingCategories.map(item => <button className={category === item.id ? 'active' : ''} onClick={() => { setCategory(item.id); setOpenGroup(item.id); }} key={item.id}><span>{item.title}</span><small>{pricing.filter(price => price.isPublished && price.categoryId === item.id).length}</small></button>)}</nav><p>Повний актуальний прайс із варіантами препаратів, зон та рівня лікаря.</p></aside>
      <div className="pricing-catalog"><header><div><span className="eyebrow">КАТАЛОГ ПРОЦЕДУР</span><h2>{category === 'all' ? 'Усі напрямки' : pricingCategories.find(item => item.id === category)?.title}</h2></div><b>{filtered.length} позицій</b></header>{groups.length ? groups.map(group => <section className="price-group" key={group.id}><button className="price-group-toggle" type="button" aria-expanded={query ? true : openGroup === group.id} onClick={() => setOpenGroup(current => current === group.id ? '' : group.id)}><span><small>{group.subcategories.reduce((sum, sub) => sum + sub.items.length, 0)} позицій</small>{group.title}</span><b>{query || openGroup === group.id ? '−' : '+'}</b></button>{(query || openGroup === group.id) && <div>{group.subcategories.map(sub => <section className="price-subcategory" key={sub.id}><h3>{sub.title}<span>{sub.items.length}</span></h3>{sub.items.map(item => <PriceRow item={item} key={item.id} />)}</section>)}</div>}</section>) : <div className="price-empty"><h2>Нічого не знайдено</h2><p>Спробуйте інший запит або скиньте фільтри.</p><button className="button button-dark" onClick={() => { setQuery(''); setCategory('all'); }}>Скинути фільтри</button></div>}<p className="price-disclaimer">Остаточна вартість окремих процедур може залежати від препарату, об’єму та зони. Лікар узгоджує рекомендований план і вартість до проведення процедури.</p></div>
    </section>
  </main></PageLayout>;
}

function OffersPage() {
  const offer = specialOffers[0];
  return <PageLayout><main className="inner-main offers-page"><PageHero eyebrow="АКТУАЛЬНА ПРОПОЗИЦІЯ" title={<>Спеціальні <em>пропозиції.</em></>} intro="Лише актуальні умови без прихованих пакетів. Деталі адміністратор підтверджує до візиту." image="/assets/generated/ivory-sage-botanical-glass.jpg" imageAlt="Світла editorial-композиція у відтінках шавлії"><a className="button button-dark" href="#current-offer">Переглянути умови <ArrowDown /></a></PageHero>
    <section className="page-section container offer-section" id="current-offer" data-page-reveal><article className="offer-panel"><header><strong>{offer.value}</strong><span>{offer.title}</span><small>ЗАПИС ПРОТЯГОМ 24 ГОДИН</small></header><div className="offer-body"><h2>{offer.description}</h2><div><p>{offer.note}</p><Link className="button button-light" to="/?offer=new-client-24h#booking">Скористатися пропозицією <Arrow /></Link></div></div></article><p className="offer-footnote">Пропозиція не є медичною рекомендацією. Можливість і доцільність процедури визначає лікар після консультації.</p></section>
    <section className="offers-value page-section" data-page-reveal><div className="container"><div className="directory-heading"><div><span className="eyebrow">БЕЗ ЗАЙВИХ УМОВ</span><h2>Пропозиція, яка допомагає <em>почати спокійно.</em></h2></div><p>Знижка не замінює консультацію і не впливає на медичні показання. Вона лише робить перший крок приємнішим.</p></div><div className="offer-value-grid"><article><b>01</b><h3>−10% для знайомства</h3><p>Актуальна перевага для нового клієнта, який залишає запит протягом 24 годин.</p></article><article><b>02</b><h3>Спочатку — ваш запит</h3><p>Не потрібно самостійно обирати процедуру. Лікар запропонує доречний маршрут після оцінки.</p></article><article><b>03</b><h3>Умови до візиту</h3><p>Адміністратор підтвердить застосування пропозиції та деталі запису до вашого візиту.</p></article></div></div></section>
    <section className="offer-conversion container page-section" data-page-reveal><div><span className="eyebrow">ЯК СКОРИСТАТИСЯ</span><h2>Один запит.<br /><em>Три зрозумілі кроки.</em></h2></div><ol><li><b>01</b><span><strong>Залиште контакти</strong><small>Заповніть коротку форму — це займе кілька хвилин.</small></span></li><li><b>02</b><span><strong>Опишіть, що турбує</strong><small>Адміністратор уточнить запит і допоможе обрати формат консультації.</small></span></li><li><b>03</b><span><strong>Отримайте підтвердження</strong><small>Погодьте зручний час та актуальні умови пропозиції до візиту.</small></span></li></ol><aside><span>ГОТОВІ ПОЧАТИ?</span><h3>Не обирайте процедуру — оберіть розмову з лікарем.</h3><Link className="button button-light" to="/?offer=new-client-24h#booking">Залишити заявку <Arrow /></Link></aside></section>
  </main></PageLayout>;
}

function VideosPage() {
  return <PageLayout><main className="inner-main"><PageHero eyebrow="ЕКСПЕРТНІ ВІДЕО" title={<>Пояснюємо складне <em>спокійно.</em></>} intro="Матеріали лікаря про показання, протоколи, відновлення та природний результат." image="/images/technology.webp" imageAlt="Сучасне косметологічне обладнання" /><section className="page-section container" data-page-reveal><div className="video-grid">{expertVideos.map((video, index) => <article className="video-card" key={video.id}><div><span>0{index + 1}</span><b>PLAY</b></div><h2>{video.title}</h2><p>{video.description}</p><small>Відео буде додано після публікації клінікою</small></article>)}</div></section></main></PageLayout>;
}

function JournalPage() {
  return <PageLayout><main className="inner-main"><PageHero variant="journal" eyebrow="ALICE IN BEAUTYLAND JOURNAL" title={<>Знання допомагає <em>обирати спокійно.</em></>} intro="Пояснення лікаря, новини центру та корисні матеріали зараз доступні в Instagram." image="/images/journal-face.webp" imageAlt="Природний портрет у м’якому світлі"><a className="button button-dark" href={instagramUrl} target="_blank" rel="noreferrer">Перейти в Instagram <InstagramLogo /></a></PageHero><section className="page-section container" data-page-reveal><div className="journal-grid">{articles.map((article, index) => <article key={article.title}><figure><img src={article.image} alt="" loading="lazy" /><span>0{index + 1}</span></figure><small>{article.category}</small><h2>{article.title}</h2><p>{article.excerpt}</p><a href={instagramUrl} target="_blank" rel="noreferrer">Читайте в Instagram <Arrow /></a></article>)}</div></section></main></PageLayout>;
}

function LegalPage() {
  const { legal } = useParams();
  const page = legalPages[legal];
  if (!page) return <NotFoundPage />;
  return <PageLayout><main className="inner-main legal-page"><section className="container legal-content" data-page-reveal><Breadcrumbs items={[{ label: page.title }]} /><span className="eyebrow">ЮРИДИЧНА ІНФОРМАЦІЯ</span><h1>{page.title}</h1><p className="legal-lead">{page.lead}</p><div><span>Як зв’язатися з нами</span><h2>Маєте запитання щодо запису або використання контактних даних?</h2><p>Напишіть Alice in Beautyland в Instagram. Команда клініки надасть актуальне пояснення.</p><a href={instagramUrl} target="_blank" rel="noreferrer">@alice__in__beautyland <Arrow /></a></div><Link className="button button-dark" to="/">Повернутися на головну <ArrowLeft /></Link></section></main></PageLayout>;
}

function NotFoundPage() {
  return <PageLayout><main className="inner-main not-found"><div className="container"><span>404</span><h1>Цієї сторінки <em>не існує.</em></h1><p>Поверніться до головної або перегляньте актуальні напрями клініки.</p><div><Link className="button button-dark" to="/">На головну</Link><Link className="button button-outline" to="/posluhy">Послуги</Link></div></div></main></PageLayout>;
}

function RouteTitles() {
  const location = useLocation();
  useEffect(() => {
    const service = services.find(item => location.pathname === `/posluhy/${item.slug}`);
    const titles = { '/': 'ALICE in Beautyland — естетична медицина', '/posluhy': 'Послуги — ALICE in Beautyland', '/tsiny': 'Ціни — ALICE in Beautyland', '/likari': 'Лікарі — ALICE in Beautyland', '/spetsialni-propozytsii': 'Спеціальні пропозиції — ALICE in Beautyland', '/expert-new-video': 'Експертні відео — ALICE in Beautyland', '/zhurnal': 'Журнал — ALICE in Beautyland' };
    document.title = service ? `${service.title} — ALICE in Beautyland` : titles[location.pathname] || legalPages[location.pathname.slice(1)]?.title || 'ALICE in Beautyland';
  }, [location.pathname]);
  useEffect(() => {
    const id = window.setTimeout(() => {
      const previous = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      if (location.hash) document.querySelector(location.hash)?.scrollIntoView({ block: 'start' });
      else window.scrollTo({ top: 0 });
      window.requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = previous; });
    }, 120);
    return () => window.clearTimeout(id);
  }, [location.pathname, location.hash]);
  return null;
}

export function Site() {
  return <BrowserRouter><RouteTitles /><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/posluhy" element={<ServicesPage />} />
    <Route path="/posluhy/:slug" element={<ServiceDetailPage />} />
    <Route path="/tsiny" element={<PricesPage />} />
    <Route path="/likari" element={<SpecialistsPage />} />
    <Route path="/fakhivtsi" element={<Navigate to="/likari" replace />} />
    <Route path="/spetsialni-propozytsii" element={<OffersPage />} />
    <Route path="/expert-new-video" element={<VideosPage />} />
    <Route path="/zhurnal" element={<JournalPage />} />
    <Route path="/kontakty" element={<Navigate to="/#booking" replace />} />
    <Route path="/:legal" element={<LegalPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes></BrowserRouter>;
}
