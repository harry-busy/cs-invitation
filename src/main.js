import { Rive, Layout, Fit, Alignment } from "@rive-app/canvas-lite";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { invitation as c } from "./content.js";
import "./style.css";

const rivePath = (name) => `/assets/rive/${name}.riv`;

const arrow = `
  <span class="button__icon button__icon--hover" aria-hidden="true">→</span>
  <span class="button__label">%LABEL%</span>
  <span class="button__icon button__icon--default" aria-hidden="true">→</span>`;

const button = (label, href = "#rsvp", tone = "green") =>
  `<a class="button button--${tone} magnetic" href="${href}">${arrow.replace("%LABEL%", label)}</a>`;

const storyCard = (story, index) => {
  const nextHref = index < c.stories.length - 1 ? `#story-${index + 2}` : "#personal-invitation";
  return `
  <article class="story-card reveal" data-reveal data-story="${index}">
    <span class="story-card__back story-card__back--${story.color}" aria-hidden="true"></span>
    <div class="story-card__front">
      <p class="eyebrow">0${index + 1} · ${story.label}</p>
      <h3>${story.title}</h3>
      <p>${story.copy}</p>
      ${button(index < c.stories.length - 1 ? "Keep scrolling" : "Open invitation", nextHref, story.color)}
    </div>
  </article>`;
};

const timelineDecor = [
  "clock", "clock-shape", "clock-shape-mobile", "folder", "folder-shape",
  "plane-1", "plane-2", "plane-trace", "sheet", "composer-shape",
  "composer-shape-2", "music-note-1", "music-note-2", "music-note-3",
  "trumper-shape", "gamer-shape", "joystick", "joystick-shape",
  "soccer-circle", "soccer-circle-2", "soccer-shape-1", "soccer-shape-2",
  "soccer-shape-3", "soccer-shape-4", "soccer-trace",
].map((name) => `<img class="timeline-decor__asset timeline-decor__asset--${name}" src="/assets/timeline/${name}.svg" alt="" />`).join("");

const guestRails = (() => {
  const rows = [
    c.guests,
    [...c.guests.slice(2), ...c.guests.slice(0, 2)],
    [...c.guests].reverse(),
  ];
  return rows.map((row, i) => {
    const original = row.map((name) => `<a class="name-pill magnetic" href="?guest=${encodeURIComponent(name)}#personal-invitation" data-invite-name="${name}">${name}</a>`).join("");
    const duplicate = row.map((name) => `<span class="name-pill" aria-hidden="true">${name}</span>`).join("");
    return `<div class="name-rail ${i === 1 ? "name-rail--reverse" : ""}">
      <div class="name-rail__track">${original}${duplicate}</div>
    </div>`;
  }).join("");
})();

document.querySelector("#app").innerHTML = `
  <div class="preloader" aria-hidden="true">
    <div class="preloader__wrap">
      <svg class="preloader__doodle" viewBox="0 0 320 270" role="img" aria-label="A playful IEEE Computer Society robot waking up">
        <path class="preloader__spark preloader__spark--one" d="M52 42l-9-17m4 22-19-2m30-9 9-16" />
        <path class="preloader__spark preloader__spark--two" d="M269 55l13-14m-8 22 19 3m-28 4 5 19" />
        <g class="preloader__antenna"><path d="M160 62V39"/><circle cx="160" cy="29" r="10"/></g>
        <path class="preloader__arm preloader__arm--left" d="M85 132c-27 1-36 19-43 39" />
        <path class="preloader__arm preloader__arm--right" d="M235 132c27 1 36 19 43 39" />
        <rect class="preloader__body" x="79" y="63" width="162" height="154" rx="44" />
        <g class="preloader__face">
          <circle class="preloader__eye" cx="128" cy="116" r="10" />
          <circle class="preloader__eye" cx="192" cy="116" r="10" />
          <path d="M131 153c17 18 42 18 59 0" />
        </g>
        <text x="160" y="198" text-anchor="middle">IEEE CS</text>
        <path class="preloader__leg" d="M124 216l-10 27m82-27 10 27" />
      </svg>
      <p class="preloader__caption">Calling the core team<span>…</span></p>
    </div>
  </div>

  <div class="cursor" aria-hidden="true"><span>IEEE</span></div>

  <header class="site-header" data-header>
    <a class="brand magnetic" href="/" aria-label="${c.brand} home">
      <svg class="brand__mark" viewBox="0 0 42 42" aria-hidden="true">
        <path class="brand__antenna" d="M21 8V4" />
        <circle class="brand__antenna-dot" cx="21" cy="3.5" r="2.5" />
        <rect class="brand__robot" x="6" y="8" width="30" height="28" rx="9" />
        <circle class="brand__eye" cx="16" cy="19" r="2.3" />
        <circle class="brand__eye" cx="26" cy="19" r="2.3" />
        <path class="brand__smile" d="M15.5 26c3.5 3.6 7.5 3.6 11 0" />
      </svg>
      <span>${c.brand}</span>
    </a>
    <nav class="desktop-nav" aria-label="Main navigation">
      <a href="#story-1">Our story</a>
      <a href="#film">The film</a>
      <a href="#guest-list">The people</a>
    </nav>
    <button class="menu-toggle magnetic" type="button" aria-expanded="false" aria-controls="menu-panel"><span></span><span></span><span class="sr-only">Open menu</span></button>
    ${button("View invitation", "#personal-invitation", "green")}
  </header>

  <aside class="menu-panel" id="menu-panel" aria-hidden="true">
    <div class="menu-panel__art"><canvas data-rive="pop_up_girl" data-fit="contain"></canvas></div>
    <nav aria-label="Invitation menu">
      <a href="#story-1">Our story <span>01</span></a>
      <a href="#film">The film <span>02</span></a>
      <a href="#guest-list">The people <span>03</span></a>
      <a href="#personal-invitation">The invitation <span>04</span></a>
    </nav>
  </aside>

  <main>
    <section class="hero" id="top">
      <div class="hero__sticky">
        <div class="hero__copy">
          <h1 aria-label="${c.heroLineOne} ${c.heroLineTwo}">
            <span class="hero__line">${c.heroLineOne}</span>
            <span class="hero__line">${c.heroLineTwo}</span>
          </h1>
          <p>${c.heroKicker}</p>
        </div>
        <img class="hero__cloud hero__cloud--left" src="/assets/timeline/hero-background-illustration.svg" alt="" />
        <div class="hero__rive"><canvas data-rive="hero_animation" data-fit="contain"></canvas></div>
        <div class="scroll-cue"><span>Scroll to remember</span><i></i></div>
      </div>
    </section>

    <section class="timeline" aria-label="Our shared story">
      <div class="timeline__intro reveal" data-reveal>
        <p>${c.intro}</p>
        ${button("Open invitation", "#personal-invitation", "green")}
      </div>

      <svg class="timeline__path" viewBox="0 0 1944.2 6151.5" preserveAspectRatio="none" aria-hidden="true">
        <path class="timeline__path-shadow" d="M1085 250c-868 126.5-961 907-29.5 1453S1397 3353 733 3318s-606-718-53.6-808M679.3 2510c552.3-90 1689.3 743.4 475.6 1689-985 767.5-234 1313-234 1702.5" />
        <path class="timeline__path-main" pathLength="1" d="M1085 250c-868 126.5-961 907-29.5 1453S1397 3353 733 3318s-606-718-53.6-808M679.3 2510c552.3-90 1689.3 743.4 475.6 1689-985 767.5-234 1313-234 1702.5" />
      </svg>

      <div class="timeline-decor" aria-hidden="true">${timelineDecor}</div>

      ${c.stories.map((story, i) => `
        <div class="story-stage story-stage--${i + 1}" id="story-${i + 1}">
          <div class="scene scene--${story.art}" data-parallax="${i % 2 ? -0.08 : 0.08}">
            <canvas data-rive="${story.art}" data-fit="contain"></canvas>
          </div>
          ${storyCard(story, i)}
        </div>`).join("")}

      <div class="timeline__finale" aria-hidden="true">
        ${[1, 2, 3, 4, 5].map((n) => `<img class="timeline__cloud timeline__cloud--${n}" src="/assets/timeline/timeline_end_cloud_${n}.svg" alt="" />`).join("")}
        <img class="timeline__green timeline__green--back" src="/assets/timeline/timeline-end-green-back.svg" alt="" />
        <div class="finale-rive finale-rive--one"><canvas data-rive="binoculars" data-fit="contain"></canvas></div>
        <div class="finale-rive finale-rive--two"><canvas data-rive="unicycle" data-fit="contain"></canvas></div>
        <div class="finale-rive finale-rive--three"><canvas data-rive="basketball_player" data-fit="contain"></canvas></div>
        <img class="timeline__green timeline__green--middle" src="/assets/timeline/timeline-end-green-middle.svg" alt="" />
        <img class="timeline__green timeline__green--front" src="/assets/timeline/timeline-end-green-front.svg" alt="" />
      </div>
    </section>

    <section class="ready" id="rsvp">
      <div class="ready__scribble" aria-hidden="true"></div>
      <div class="ready__copy reveal" data-reveal>
        <h2><span>Ready when</span><span>you are!</span></h2>
        <p>Your old core team. One new evening. No agenda except remembering what we built and discovering where everyone went next.</p>
        ${button("Save the moment", "#personal-invitation", "blue")}
      </div>
      <div class="ready__chips" aria-hidden="true">
        <span>ONE TEAM</span><span>OLD STORIES</span><span>NEW MEMORIES</span>
      </div>
    </section>

    <section class="personal-invite" id="personal-invitation">
      <div class="personal-invite__heading reveal" data-reveal>
        <p class="eyebrow">${c.personalInvitation.eyebrow}</p>
        <h2>${c.personalInvitation.heading}</h2>
        <p>${c.personalInvitation.intro}</p>
      </div>

      <div class="invite-name-picker reveal" data-reveal role="group" aria-label="Choose your name to open your invitation">
        ${c.guests.map((name, index) => `<button class="invite-name magnetic" type="button" data-invite-name="${name}" aria-pressed="false"><span>0${index + 1}</span>${name}</button>`).join("")}
      </div>

      <div class="fold-card-shell reveal" data-reveal>
        <article class="fold-card" data-fold-card aria-live="polite" aria-label="Personal invitation card">
          <div class="fold-card__inside">
            <div class="fold-card__inside-top">
              <span class="fold-card__mini-mark" aria-hidden="true">◎</span>
              <span>IEEE COMPUTER SOCIETY</span>
              <span>CORE REUNION</span>
            </div>
            <div class="fold-card__letter">
              <p class="fold-card__dear">Dear <strong data-card-name>Core teammate</strong>,</p>
              ${c.personalInvitation.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
              <p class="fold-card__closing">${c.personalInvitation.closing}</p>
              <p class="fold-card__signoff">${c.personalInvitation.signoff}<br><strong>${c.personalInvitation.from}</strong></p>
            </div>
            <div class="fold-card__details">
              <span><small>WHEN</small>${c.date}</span>
              <span><small>WHERE</small>${c.venue}</span>
              <a href="#film">Play our message <i aria-hidden="true">↗</i></a>
            </div>
          </div>
          <div class="fold-card__gate fold-card__gate--left" aria-hidden="true">
            <span class="fold-card__gate-kicker">A LITTLE SOMETHING FOR</span>
            <strong>YOUR</strong>
            <span class="fold-card__gate-doodle">✦</span>
          </div>
          <div class="fold-card__gate fold-card__gate--right" aria-hidden="true">
            <span class="fold-card__gate-kicker">IEEE CS · CORE REUNION</span>
            <strong>INVITE</strong>
            <span class="fold-card__gate-doodle">☺</span>
          </div>
        </article>
      </div>
      <p class="personal-invite__status" data-card-status>Pick your name. Your card is waiting.</p>
    </section>

    <section class="film" id="film">
      <div class="section-heading reveal" data-reveal>
        <p class="eyebrow">A message for the core</p>
        <h2>This one is for all of us.</h2>
      </div>
      <div class="film__frame reveal" data-reveal>
        <video id="invitation-film" playsinline controls preload="metadata" poster="${c.videoPoster}"></video>
        <div class="film__placeholder">
          <span class="film__play">▶</span>
          <p>Your final invitation film will play here.</p>
          <small>Add the video path in <strong>src/content.js</strong>.</small>
        </div>
      </div>
    </section>

    <section class="moments" id="details">
      <div class="section-heading reveal" data-reveal>
        <p class="eyebrow">A few things that never changed</p>
        <h2>The numbers behind our favourite chapter.</h2>
        <p>Not metrics. Not milestones. Just a way to count the parts of the story that stayed with us.</p>
      </div>
      <div class="moment-grid">
        ${c.moments.map((m, i) => `<article class="moment-card moment-card--${i + 1} reveal" data-reveal><span class="moment-card__icon">${m.icon}</span><strong>${m.value}</strong><p>${m.label}</p></article>`).join("")}
      </div>
    </section>

    <section class="guest-list" id="guest-list">
      <div class="section-heading section-heading--center reveal" data-reveal>
        <p class="eyebrow">The people who made it happen</p>
        <h2>The core, together again.</h2>
      </div>
      <div class="guest-list__rails">${guestRails}</div>
    </section>
  </main>

  <footer class="footer">
    <div class="footer__top">
      <div>
        <p>Keep this evening open.</p>
        <p>${c.date}</p>
      </div>
      <div>
        <p>${c.chapter}</p>
        <p>${c.venue}</p>
      </div>
      ${button("I’m in", c.rsvpHref, "blue")}
    </div>
    <h2>See you<br><span>there.</span></h2>
    <div class="footer__bottom">
      <span>${c.eventName}</span>
      <span>Made for the people who built the chapter.</span>
      <a class="footer__credit" href="${c.credit.href}" target="_blank" rel="noopener noreferrer" aria-label="${c.credit.label} - open Harshal Jain on LinkedIn">${c.credit.label} <span aria-hidden="true">↗</span></a>
    </div>
  </footer>
`;

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const riveInstances = [];

function mountRive(canvas) {
  const name = canvas.dataset.rive;
  if (!name || reducedMotion) return;
  const fit = canvas.dataset.fit === "cover" ? Fit.Cover : Fit.Contain;
  const instance = new Rive({
    src: rivePath(name),
    canvas,
    autoplay: true,
    layout: new Layout({ fit, alignment: Alignment.Center }),
    onLoad: () => instance.resizeDrawingSurfaceToCanvas(),
  });
  riveInstances.push(instance);
}

document.querySelectorAll("canvas[data-rive]").forEach(mountRive);

const film = document.querySelector("#invitation-film");
const filmPlaceholder = document.querySelector(".film__placeholder");
if (c.videoSrc) {
  film.src = c.videoSrc;
  filmPlaceholder.hidden = true;
} else {
  film.removeAttribute("controls");
}

const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  }
}, { rootMargin: "0px 0px -12%", threshold: 0.12 });
document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));

const header = document.querySelector("[data-header]");
const path = document.querySelector(".timeline__path-main");
const hero = document.querySelector(".hero");
const heroCopy = document.querySelector(".hero__copy");
const heroRive = document.querySelector(".hero__rive");
const timeline = document.querySelector(".timeline");
const parallaxItems = [...document.querySelectorAll("[data-parallax]")];
let targetY = window.scrollY;
let currentY = targetY;

const lenis = reducedMotion ? null : new Lenis({
  duration: 1.25,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.88,
  anchors: { offset: -96, duration: 1.15 },
});

if (lenis) {
  lenis.on("scroll", ({ scroll }) => { targetY = scroll; });
} else {
  window.addEventListener("scroll", () => { targetY = window.scrollY; }, { passive: true });
}

function clamp(n, min = 0, max = 1) { return Math.min(max, Math.max(min, n)); }

function renderScroll(time) {
  lenis?.raf(time);
  currentY = lenis ? targetY : currentY + (targetY - currentY) * (reducedMotion ? 1 : 0.18);
  header.classList.toggle("is-scrolled", currentY > 80);

  if (!reducedMotion) {
    const heroProgress = clamp(currentY / Math.max(1, hero.offsetHeight - innerHeight));
    heroCopy.style.transform = `translate3d(0, ${heroProgress * -38}px, 0)`;
    heroCopy.style.opacity = String(1 - heroProgress * 1.25);
    heroRive.style.transform = `translate3d(-50%, ${heroProgress * 15}%, 0) scale(${1 + heroProgress * .18})`;

    const tr = timeline.getBoundingClientRect();
    const total = timeline.offsetHeight - innerHeight;
    const p = clamp(-tr.top / Math.max(1, total));
    path.style.strokeDashoffset = String(1 - p);

    for (const item of parallaxItems) {
      const rect = item.parentElement.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - innerHeight / 2) / (innerHeight / 2 + rect.height / 2);
      item.style.transform = `translate3d(0, ${clamp(progress, -1, 1) * Number(item.dataset.parallax) * 100}%, 0)`;
    }
  }
  requestAnimationFrame(renderScroll);
}
requestAnimationFrame(renderScroll);

const toggle = document.querySelector(".menu-toggle");
const panel = document.querySelector(".menu-panel");
function closeMenu() {
  document.body.classList.remove("menu-open");
  toggle.setAttribute("aria-expanded", "false");
  panel.setAttribute("aria-hidden", "true");
  lenis?.start();
}
toggle.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  toggle.setAttribute("aria-expanded", String(open));
  panel.setAttribute("aria-hidden", String(!open));
  if (open) lenis?.stop(); else lenis?.start();
});
panel.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

const foldCard = document.querySelector("[data-fold-card]");
const cardName = document.querySelector("[data-card-name]");
const cardStatus = document.querySelector("[data-card-status]");
const inviteTriggers = [...document.querySelectorAll("[data-invite-name]")];
let cardOpenTimer;

function openPersonalInvite(name, { scroll = true } = {}) {
  if (!c.guests.includes(name)) return;

  clearTimeout(cardOpenTimer);
  foldCard.classList.remove("is-open");
  inviteTriggers.forEach((trigger) => {
    if (trigger.matches("button")) trigger.setAttribute("aria-pressed", String(trigger.dataset.inviteName === name));
  });
  cardName.textContent = name;
  foldCard.setAttribute("aria-label", `Personal invitation for ${name}`);
  cardStatus.textContent = `${name}, this one has your name on it.`;

  const personalizedUrl = new URL(location.href);
  personalizedUrl.searchParams.set("guest", name);
  personalizedUrl.hash = "personal-invitation";
  history.replaceState(null, "", `${personalizedUrl.pathname}${personalizedUrl.search}${personalizedUrl.hash}`);

  if (scroll) {
    if (lenis) lenis.scrollTo(foldCard, { offset: -105, duration: 1.15 });
    else foldCard.scrollIntoView({ behavior: "auto", block: "start" });
  }
  cardOpenTimer = setTimeout(() => foldCard.classList.add("is-open"), reducedMotion ? 0 : 260);
}

inviteTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openPersonalInvite(trigger.dataset.inviteName);
  });
});

const guestFromUrl = new URLSearchParams(location.search).get("guest");
if (guestFromUrl && c.guests.includes(guestFromUrl)) openPersonalInvite(guestFromUrl);

if (!reducedMotion && matchMedia("(pointer:fine)").matches) {
  const cursor = document.querySelector(".cursor");
  let mx = -100, my = -100, cx = mx, cy = my;
  addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
  const cursorLoop = () => {
    cx += (mx - cx) * .18; cy += (my - cy) * .18;
    cursor.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`;
    requestAnimationFrame(cursorLoop);
  };
  requestAnimationFrame(cursorLoop);
  document.querySelectorAll("a,button").forEach((el) => {
    el.addEventListener("pointerenter", () => cursor.classList.add("is-active"));
    el.addEventListener("pointerleave", () => cursor.classList.remove("is-active"));
  });
}

addEventListener("resize", () => riveInstances.forEach((rive) => rive.resizeDrawingSurfaceToCanvas()), { passive: true });
addEventListener("load", () => {
  setTimeout(() => document.body.classList.add("is-loaded"), reducedMotion ? 0 : 1350);
});
