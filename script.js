/* =========================================================
   ARU's Pond — script.js  (순수 JavaScript)
   ---------------------------------------------------------
   ✏️ 직접 바꿀 곳은 맨 위 [1] 연락처, [2] 작업물 목록 두 군데뿐입니다.
   ========================================================= */

/* [1] 연락처 ------------------------------------------------
   주소를 따옴표 안에 붙여 넣으세요. 비워두면 버튼을 눌러도 이동하지 않습니다. */
const CONTACT = {
  youtube: "",        // 예: "https://www.youtube.com/@내채널"
  instagram: "",      // 예: "https://www.instagram.com/내계정"
  mail: "sohee3276@gmail.com",
};

/* [2] 작업물 목록 -------------------------------------------
   - thumb   : 카드에 보이는 이미지 (assets/images/ 안)
   - video   : 영상 파일 경로 (assets/videos/ 안에 mp4를 넣고 파일명 입력)
   - youtube : 유튜브 영상 주소 (video 대신 써도 됨. 둘 다 비면 이미지가 크게 보임)
   - vertical: 세로 영상이면 true                                         */
const WORKS = {
  video: {
    title: "Video Works",
    items: [
      { id: "nespresso", title: "NESPRESSO", thumb: "./assets/images/thumb-nespresso.jpg", video: "", youtube: "" },
      { id: "starbucks", title: "STARBUCKS", thumb: "./assets/images/thumb-starbucks.jpg", video: "", youtube: "" },
      { id: "promotion", title: "PROMOTION", thumb: "./assets/images/thumb-promotion.jpg", video: "", youtube: "" },
      { id: "busan", title: "BUSAN", thumb: "./assets/images/thumb-busan.jpg", video: "", youtube: "", vertical: true },
    ],
  },
  design: {
    title: "Design Works",
    items: [
      { id: "aru", title: "ARU", thumb: "./assets/images/work-aru.png", image: "./assets/images/work-aru.png" },
    ],
  },
  motion: {
    title: "Motion Works",
    items: [
      { id: "character-intro", title: "CHARACTER INTRO", thumb: "./assets/images/thumb-character-intro.jpg", video: "./assets/videos/character-intro.mp4" },
    ],
  },
};

/* ===================== 아래부터는 동작 코드 ===================== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const views = { main: $("#mainView"), gallery: $("#galleryView"), detail: $("#detailView") };

/* 모든 작업물을 순서대로 한 줄로 (상세 화면의 이전/다음 이동용) */
const ALL = Object.entries(WORKS).flatMap(([cat, data]) => data.items.map((it) => ({ ...it, cat, catTitle: data.title })));

/* ---------- 글자 하나씩 나타나기 ---------- */
function splitLetters(el) {
  let i = 0;
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        // 단어 단위로 묶어서 줄바꿈이 단어 중간에서 일어나지 않게
        const frag = document.createDocumentFragment();
        child.textContent.split(/( )/).forEach((part) => {
          if (!part) return;
          if (part === " ") { frag.appendChild(document.createTextNode(" ")); return; }
          const word = document.createElement("span");
          word.className = "word";
          [...part].forEach((char) => {
            const s = document.createElement("span");
            s.className = "ch";
            s.textContent = char;
            s.style.setProperty("--i", i++);
            word.appendChild(s);
          });
          frag.appendChild(word);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1 && !child.classList.contains("ch") && !child.classList.contains("word")) {
        walk(child);
      }
    });
  };
  walk(el);
}
function playLetters(el, text) {
  if (text !== undefined) el.textContent = text;
  el.classList.remove("is-in");
  splitLetters(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-in")));
}
const SECTIONS = ["home", "work", "contact"];

function showView(name) {
  Object.entries(views).forEach(([key, el]) => el.classList.toggle("is-active", key === name));
  document.body.classList.toggle("is-sub", name !== "main"); // 하위 화면에서는 상단 메뉴 숨김
  if (name !== "detail") stopMedia();
}

function stopMedia() {
  $("#detailMedia").innerHTML = "";
}

/* ---------- 갤러리 ---------- */
function renderGallery(cat) {
  const data = WORKS[cat];
  playLetters($("#galleryTitle"), data.title);
  $$(".tabs__item").forEach((t) => {
    const on = t.dataset.cat === cat;
    t.classList.toggle("is-active", on);
    if (on) t.setAttribute("aria-current", "page"); else t.removeAttribute("aria-current");
  });
  const grid = $("#galleryGrid");
  grid.innerHTML = "";
  data.items.forEach((item, idx) => {
    const isMovie = item.video || item.youtube || cat !== "design";
    const card = document.createElement("a");
    card.className = "work-card";
    card.href = `#${cat}/${item.id}`;
    card.style.setProperty("--i", idx);
    card.innerHTML = `
      <div class="work-card__media ${item.vertical || cat === "design" ? "is-contain" : ""}">
        <img src="${item.thumb}" alt="${item.title}" loading="lazy" />
        ${isMovie ? '<span class="work-card__play" aria-hidden="true"></span>' : ""}
      </div>
      <span class="work-card__title">${item.title}</span>`;
    grid.appendChild(card);
  });
}

/* ---------- 상세 ---------- */
function youtubeEmbed(url) {
  const m = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}?rel=0` : "";
}

function renderDetail(cat, id) {
  const item = WORKS[cat]?.items.find((it) => it.id === id);
  if (!item) return false;

  // 이전 / 다음 작업 (전체 작업을 한 바퀴로 연결)
  const idx = ALL.findIndex((it) => it.cat === cat && it.id === id);
  const prev = ALL[(idx - 1 + ALL.length) % ALL.length];
  const next = ALL[(idx + 1) % ALL.length];
  $("#detailPrev").href = `#${prev.cat}/${prev.id}`;
  $("#detailNext").href = `#${next.cat}/${next.id}`;
  $("#detailPrevName").textContent = prev.title;
  $("#detailNextName").textContent = next.title;
  $("#detailCat").textContent = WORKS[cat].title;
  $("#detailCount").textContent = `${idx + 1} / ${ALL.length}`;

  playLetters($("#detailTitle"), item.title);
  // 같은 화면에서 다른 작업으로 넘어갈 때도 등장 애니메이션 다시 재생
  ["#detailMedia", "#detailCat", ".pager"].forEach((s) => {
    const el = $(s);
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "";
  });
  $("#detailBack").setAttribute("href", `#${cat}`);
  const box = $("#detailMedia");
  box.classList.toggle("is-vertical", !!item.vertical);

  if (item.video) {
    box.innerHTML = `<video src="${item.video}" poster="${item.thumb}" controls playsinline preload="metadata"></video>`;
  } else if (item.youtube && youtubeEmbed(item.youtube)) {
    box.innerHTML = `<iframe src="${youtubeEmbed(item.youtube)}" title="${item.title}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else {
    box.innerHTML = `<img src="${item.image || item.thumb}" alt="${item.title}" />`;
  }
  return true;
}

/* ---------- 주소(#) 기반 화면 전환: 브라우저 뒤로가기도 동작 ---------- */
let lastMainSection = "home";

function route() {
  const hash = decodeURIComponent(location.hash.replace("#", ""));
  const [cat, id] = hash.split("/");

  if (WORKS[cat] && id && renderDetail(cat, id)) {
    showView("detail");
    window.scrollTo(0, 0);
  } else if (WORKS[cat]) {
    renderGallery(cat);
    showView("gallery");
    window.scrollTo(0, 0);
  } else {
    const wasHidden = !views.main.classList.contains("is-active");
    showView("main");
    const target = SECTIONS.includes(hash) ? hash : null;
    if (target) {
      const el = document.getElementById(target);
      // 하위 화면에서 돌아올 땐 즉시, 메인에서는 부드럽게 이동
      requestAnimationFrame(() => el.scrollIntoView({ behavior: wasHidden ? "auto" : "smooth" }));
      lastMainSection = target;
    }
  }
  updateNav();
}
window.addEventListener("hashchange", route);

/* 같은 메뉴를 다시 눌러도 이동하도록 */
$$(".nav__item").forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = a.dataset.nav;
    if (location.hash === `#${target}`) {
      e.preventDefault();
      route();
    }
  });
});

/* ---------- 메뉴: 현재 섹션 표시 + 스크롤 시 배경 ---------- */
function updateNav() {
  const nav = $("#nav");
  nav.classList.toggle("is-scrolled", window.scrollY > 40 || !views.main.classList.contains("is-active"));

  let current = "work";
  if (views.main.classList.contains("is-active")) {
    const mid = window.innerHeight * 0.4;
    current = SECTIONS.find((id) => {
      const r = document.getElementById(id).getBoundingClientRect();
      return r.top <= mid && r.bottom > mid;
    }) || lastMainSection;
  }
  $$(".nav__item").forEach((a) => a.classList.toggle("is-current", a.dataset.nav === current));
}
window.addEventListener("scroll", updateNav, { passive: true });

/* ---------- 스크롤 힌트: 조금 내리면 사라짐 ---------- */
const hint = $(".scroll-hint");
window.addEventListener("scroll", () => hint && hint.classList.toggle("is-hidden", window.scrollY > 80), { passive: true });

/* ---------- 푸터 연도 자동 ---------- */
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- HOME: 아루 손 흔들기 ---------- */
const aru = $(".home__aru");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// (손 흔들기는 CSS 스프라이트 애니메이션으로 처리)

/* ---------- WORK: 화면에 들어오면 타이틀·아루 등장 ---------- */
const workSection = $("#work");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      // 들어올 때마다 다시 재생: 화면에 보이면 켜고, 완전히 벗어나면 초기화
      if (en.intersectionRatio >= 0.3) en.target.classList.add("is-visible");
      else if (en.intersectionRatio < 0.08) en.target.classList.remove("is-visible");
    }),
    { threshold: [0, 0.08, 0.3] }
  );
  io.observe(workSection);
  io.observe($("#contact"));
} else {
  workSection.classList.add("is-visible");
  $("#contact").classList.add("is-visible");
}

/* CONTACT: 버튼에 따라 아루가 바뀜 (마우스 올리면 미리보기, 누르면 그 모습 유지) */
const contactAru = $("#contactAru");
const POSE_LABEL = {
  letter: "편지를 들고 있는 아루",
  youtube: "유튜브 아이콘을 들고 있는 아루",
  instagram: "인스타그램 아이콘을 들고 있는 아루",
  mail: "메일 봉투를 들고 있는 아루",
};
let lockedPose = "letter";
function setPose(pose) {
  const current = $(".aru-pose.is-active", contactAru);
  if (current && current.dataset.pose === pose) return;
  $$(".aru-pose", contactAru).forEach((img) => img.classList.toggle("is-active", img.dataset.pose === pose));
  contactAru.setAttribute("aria-label", POSE_LABEL[pose]);
  contactAru.classList.remove("is-hop");
  void contactAru.offsetWidth;
  contactAru.classList.add("is-hop");
}
$$(".contact__btn").forEach((btn) => {
  const pose = btn.dataset.pose;
  btn.addEventListener("mouseenter", () => setPose(pose));
  btn.addEventListener("focus", () => setPose(pose));
  btn.addEventListener("click", () => { lockedPose = pose; setPose(pose); });
});
$(".contact__list").addEventListener("mouseleave", () => setPose(lockedPose));
contactAru.addEventListener("animationend", (e) => {
  if (e.animationName === "hop") contactAru.classList.remove("is-hop");
});

/* ---------- CONTACT ---------- */
function setupLink(btn, url) {
  if (url) {
    btn.href = url;
  } else {
    btn.removeAttribute("target");
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      btn.classList.remove("is-shake");
      void btn.offsetWidth; // 애니메이션 재시작
      btn.classList.add("is-shake");
    });
  }
}
setupLink($("#btnYoutube"), CONTACT.youtube);
setupLink($("#btnInstagram"), CONTACT.instagram);

/* MAIL: 첫 클릭 → 버튼 글자가 메일 주소로 바뀜 / 한 번 더 클릭 → 메일 쓰기 창 */
const mailBtn = $("#btnMail");
$("#mailText").textContent = CONTACT.mail;
function setMailOpen(open) {
  mailBtn.classList.toggle("is-open", open);
  mailBtn.setAttribute("aria-label", open ? `${CONTACT.mail} 로 메일 보내기` : "메일 주소 보기");
}
mailBtn.addEventListener("click", () => {
  if (mailBtn.classList.contains("is-open")) {
    window.location.href = `mailto:${CONTACT.mail}`;
  } else {
    setMailOpen(true);
  }
});
document.addEventListener("click", (e) => {
  if (!e.target.closest("#btnMail")) setMailOpen(false);
});

/* ---------- 상세 화면: 키보드 ← → / 모바일 스와이프로 이동 ---------- */
document.addEventListener("keydown", (e) => {
  if (!views.detail.classList.contains("is-active")) return;
  if (e.target.closest("video, iframe")) return;
  if (e.key === "ArrowLeft") location.hash = $("#detailPrev").getAttribute("href");
  if (e.key === "ArrowRight") location.hash = $("#detailNext").getAttribute("href");
});
let touchX = null;
$("#detailMedia").addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
$("#detailMedia").addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  touchX = null;
  if (Math.abs(dx) < 60) return;
  location.hash = $(dx < 0 ? "#detailNext" : "#detailPrev").getAttribute("href");
}, { passive: true });

/* ---------- 메인: 스크롤하면 글자·요소가 나타남 (들어올 때마다) ---------- */
// 화면 밖에서는 즉시 투명하게 되돌려 두기 (다음에 들어올 때 처음부터 페이드 인)
function resetFade(el) {
  el.classList.add("no-anim");
  el.classList.remove("is-in");
  void el.offsetWidth;
  el.classList.remove("no-anim");
}
$$(".work__title, .contact__title").forEach((el) => splitLetters(el));
// 큰 제목만 페이드 인 (소개 문구·툴·버튼은 그대로 보임)
$(".home__title").classList.add("reveal");
if ("IntersectionObserver" in window) {
  const revealIO = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      // 들어올 때마다 다시 페이드 인, 화면 밖으로 나가면 초기화
      if (en.isIntersecting && en.intersectionRatio >= 0.2) {
        if (en.target === $(".home__title") && document.body.classList.contains("is-loading")) return; // 로딩 중엔 대기
        en.target.classList.add("is-in");
      }
      else if (!en.isIntersecting) resetFade(en.target);
    }),
    { threshold: [0, 0.2] }
  );
  $$(".split:not(#galleryTitle):not(#detailTitle):not(.contact__title), .reveal").forEach((el) => revealIO.observe(el));
} else {
  $$(".split, .reveal").forEach((el) => el.classList.add("is-in"));
}

/* ---------- CONTACT 진입: 구름이 걷히는 스크롤 효과 ---------- */
const cover = $("#cloudCover");
const contactEl = $("#contact");
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // 부드럽게 시작·끝
const clamp01 = (v) => Math.min(1, Math.max(0, v));
/* 레이어마다 걷히는 타이밍·방향을 다르게 (앞쪽 구름이 먼저, 뒤쪽 구름이 나중에) */
const CLOUD_LAYERS = [
  { el: $(".cc--center-left"),  from: 0.1,  to: 0.7,  dx: -85, dy: 10, scale: 0.3, blur: 10, flipX: true },
  { el: $(".cc--center-right"), from: 0.12, to: 0.72, dx: 90,  dy: 8,  scale: 0.3, blur: 10, flipX: true },
  { el: $(".cc--mid-left"),  from: 0.2,  to: 0.85, dx: -75, dy: 6,  scale: 0.25, blur: 8 },
  { el: $(".cc--mid-right"), from: 0.24, to: 0.88, dx: 80,  dy: 8,  scale: 0.25, blur: 8 },
];
let targetP = 0;
let currentP = 0;
let cloudLoop = null;
let contactRevealed = false;

function readScroll() {
  if (!views.main.classList.contains("is-active")) return;
  const vh = window.innerHeight;
  const top = contactEl.getBoundingClientRect().top;
  // CONTACT 위쪽이 화면 30% 지점 → 맨 위로 올라오는 동안 0 → 1 (그 전엔 구름이 꽉 덮고 있음)
  targetP = clamp01((vh * 0.3 - top) / (vh * 0.3));
  if (!cloudLoop) cloudLoop = requestAnimationFrame(stepClouds);
}
function applyClouds(p) {
  CLOUD_LAYERS.forEach((L) => {
    if (!L.el) return;
    const t = ease(clamp01((p - L.from) / (L.to - L.from)));
    const flip = (L.flip ? " scaleY(-1)" : "") + (L.flipX ? " scaleX(-1)" : "");
    L.el.style.transform = `translate(${L.dx * t}vw, ${L.dy * t}vh) scale(${1 + L.scale * t})${flip}`;
    L.el.style.opacity = (1 - t).toFixed(3);
    L.el.style.filter = t > 0.01 ? `blur(${(L.blur * t).toFixed(1)}px)` : "";
  });
  cover.style.setProperty("--fog", (1 - ease(clamp01((p - 0.15) / 0.6))).toFixed(3));
  cover.classList.toggle("is-gone", p > 0.995);
  // 구름이 반쯤 걷히면 타이틀·버튼이 페이드 인
  if (contactRevealed && p < 0.2) {
    contactRevealed = false;
    resetFade($(".contact__title"));
  }
  if (!contactRevealed && p > 0.55) {
    contactRevealed = true;
    $(".contact__title").classList.add("is-in");
  }
}
function stepClouds() {
  // 스크롤을 툭툭 끊어 해도 구름은 관성 있게 따라오도록
  currentP += (targetP - currentP) * 0.12;
  if (Math.abs(targetP - currentP) < 0.001) currentP = targetP;
  applyClouds(currentP);
  cloudLoop = currentP === targetP ? null : requestAnimationFrame(stepClouds);
}
window.addEventListener("scroll", readScroll, { passive: true });
window.addEventListener("resize", readScroll);
// 처음 들어왔을 때(예: 주소가 #contact)는 바로 그 상태로
(function initClouds() {
  const vh = window.innerHeight;
  currentP = targetP = clamp01((vh * 0.3 - contactEl.getBoundingClientRect().top) / (vh * 0.3));
  applyClouds(currentP);
})();

/* ---------- ESC로 하위 화면 닫기 ---------- */
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (views.detail.classList.contains("is-active")) location.hash = $("#detailBack").getAttribute("href");
  else if (views.gallery.classList.contains("is-active")) location.hash = "#work";
});

/* 첫 진입 */
route();

/* ---------- 로딩 화면: 이미지가 다 불러와지면 사라짐 ---------- */
(function loader() {
  const box = $("#loader");
  const bar = $("#loaderBar");
  const pct = $("#loaderPct");
  const homeTitle = $(".home__title");
  $$(".js-year").forEach((el) => (el.textContent = new Date().getFullYear()));
  document.body.classList.add("is-loading");
  resetFade(homeTitle);

  // 화면에 쓰이는 이미지 + 배경 이미지를 미리 불러오며 진행률 계산
  const srcs = new Set([...document.images].map((img) => img.src));
  ["cloud-left.png", "cloud-right.png", "aru-wave-sprite.png"].forEach((f) => srcs.add(new URL(`./assets/images/${f}`, location.href).href));
  const total = srcs.size || 1;
  let loaded = 0;
  let shown = 0;
  const MIN_TIME = 1200; // 너무 빨리 지나가지 않도록 최소 표시 시간
  const start = performance.now();

  srcs.forEach((src) => {
    const img = new Image();
    img.onload = img.onerror = () => loaded++;
    img.src = src;
  });

  function tick(now) {
    const real = loaded / total;
    const timeCap = Math.min(1, (now - start) / MIN_TIME);
    const goal = Math.min(real, timeCap) * 100;
    shown += (goal - shown) * 0.15;
    if (goal - shown < 0.5) shown = goal;
    bar.style.width = `${shown}%`;
    pct.textContent = Math.round(shown);
    if (shown >= 100) {
      // 로딩 화면이 통째로 위로 올라가며 HOME 등장
      setTimeout(() => {
        box.classList.add("is-done");
        document.body.classList.remove("is-loading");
        homeTitle.classList.add("is-in");
      }, 300);
      return;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  // 안전장치: 8초가 지나면 무조건 닫기
  setTimeout(() => { loaded = total; }, 8000);
})();