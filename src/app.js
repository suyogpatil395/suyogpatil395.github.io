/* Suyog Patil · Portfolio — interactions (no dependencies) */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = { get: (k) => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };

  // ---------- Theme ----------
  const root = document.documentElement;
  $$(".theme-btn").forEach((b) => b.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next; store.set("theme", next);
    b.setAttribute("aria-label", next === "light" ? "Switch to dark theme" : "Switch to light theme");
    const meta = $('meta[name="theme-color"]'); if (meta) meta.content = next === "light" ? "#FBF7F2" : "#0A0A0D";
  }));

  // ---------- Nav ----------
  const nav = $(".nav");
  const onScroll = () => nav && nav.classList.toggle("scrolled", scrollY > 20);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const menu = $(".menu-btn");
  if (menu) {
    menu.addEventListener("click", () => { const o = nav.classList.toggle("open"); menu.setAttribute("aria-expanded", o); });
    $$(".nav-links a").forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); }));
  }
  const links = $$('.nav-links a[href^="#"], .nav-links a[href^="/#"]');
  const secs = links.map((a) => $(a.getAttribute("href").replace("/", ""))).filter(Boolean);
  if (secs.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href").endsWith("#" + e.target.id)));
    }), { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach((s) => io.observe(s));
  }

  // ---------- Reveal ----------
  const rev = $$(".reveal");
  if (reduce || !("IntersectionObserver" in window)) rev.forEach((e) => e.classList.add("visible"));
  else {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    rev.forEach((e) => io.observe(e));
  }

  // ---------- Count-up ----------
  $$("[data-count]").forEach((el) => {
    const end = +el.dataset.count; if (reduce) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now(), d = 1400;
      const tick = (t) => { const p = Math.min(1, (t - t0) / d); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
    io.observe(el);
  });

  // ---------- Typed roles ----------
  const typed = $(".typed");
  if (typed && !reduce) {
    const roles = JSON.parse(typed.dataset.roles || "[]"); let i = 0, j = roles[0].length, del = true;
    const step = () => {
      const w = roles[i];
      if (del) { j--; typed.textContent = w.slice(0, j); if (j === 0) { del = false; i = (i + 1) % roles.length; } setTimeout(step, 45); }
      else { j++; typed.textContent = roles[i].slice(0, j); if (j === roles[i].length) { del = true; setTimeout(step, 2200); } else setTimeout(step, 85); }
    };
    setTimeout(step, 2400);
  }

  // ---------- Card spotlight ----------
  $$(".card").forEach((c) => c.addEventListener("pointermove", (e) => {
    const r = c.getBoundingClientRect(); c.style.setProperty("--mx", `${e.clientX - r.left}px`); c.style.setProperty("--my", `${e.clientY - r.top}px`);
  }));

  // ---------- Project filters (library style) ----------
  const grid = $(".proj-grid");
  if (grid) {
    const count = $(".lib-count");
    $$(".chip-btn[data-filter]").forEach((b) => b.addEventListener("click", () => {
      $$(".chip-btn[data-filter]").forEach((x) => { x.classList.toggle("active", x === b); x.setAttribute("aria-pressed", x === b); });
      const f = b.dataset.filter; let n = 0;
      const apply = () => $$(".proj", grid).forEach((p) => { const show = f === "all" || p.dataset.filter === f; p.classList.toggle("is-hidden", !show); if (show) n++; });
      document.startViewTransition && !reduce ? document.startViewTransition(apply) : apply();
      if (count) count.textContent = `${n} project${n === 1 ? "" : "s"}`;
    }));
  }

  // ---------- Live covers: poster → GIF on hover / when visible on touch ----------
  const playGif = (img) => { if (img.dataset.gif && !img.dataset.on) { const g = new Image(); g.onload = () => { img.src = img.dataset.gif; img.dataset.on = "1"; }; g.src = img.dataset.gif; } };
  const stopGif = (img) => { if (img.dataset.on && img.dataset.poster) { img.src = img.dataset.poster; delete img.dataset.on; } };
  const touch = matchMedia("(hover: none)").matches;
  $$(".pc-cover img[data-gif]").forEach((img) => {
    const card = img.closest(".proj");
    if (reduce) return;
    if (touch) {
      const io = new IntersectionObserver(([e]) => (e.intersectionRatio > 0.6 ? playGif(img) : stopGif(img)), { threshold: [0, 0.6] });
      io.observe(img);
    } else {
      card.addEventListener("pointerenter", () => playGif(img));
      card.addEventListener("pointerleave", () => stopGif(img));
      card.addEventListener("focusin", () => playGif(img));
    }
  });
  // Project hero: swap poster to GIF after load (keeps LCP fast)
  const heroImg = $(".pp-media img[data-gif]");
  if (heroImg && !reduce) addEventListener("load", () => setTimeout(() => playGif(heroImg), 300));

  // ---------- Animated flow player ----------
  $$(".flow").forEach((flow) => {
    const nodes = $$(".fn", flow); if (!nodes.length) return;
    const panel = $(".flow-panel", flow), count = $(".flow-count", flow), play = $(".flow-play", flow), prog = $(".flow-progress i", flow);
    const DUR = 3600; let cur = -1, timer = null, playing = false, seen = false;
    flow.style.setProperty("--dur", DUR + "ms");
    const render = (i, animate = true) => {
      const prev = cur; cur = (i + nodes.length) % nodes.length;
      nodes.forEach((n, k) => {
        n.classList.toggle("active", k === cur); n.classList.toggle("done", k < cur);
        n.classList.remove("travel"); n.setAttribute("aria-current", k === cur ? "step" : "false");
      });
      if (animate && cur === prev + 1) { void nodes[cur].offsetWidth; nodes[cur].classList.add("travel"); }
      const n = nodes[cur];
      if (panel) {
        panel.querySelector(".fp-ic").innerHTML = n.querySelector(".fn-ic svg").outerHTML;
        const body = panel.querySelector(".fp-body"); const fresh = body.cloneNode(false);
        fresh.innerHTML = `<div class="fp-step">Step ${cur + 1} of ${nodes.length}</div><h4>${n.dataset.t}</h4><div class="fp-s">${n.dataset.s}</div><p class="fp-d">${n.dataset.d}</p>`;
        body.replaceWith(fresh);
      }
      if (count) count.innerHTML = `<b>${String(cur + 1).padStart(2, "0")}</b> / ${String(nodes.length).padStart(2, "0")}`;
      if (prog) { prog.style.animation = "none"; void prog.offsetWidth; prog.style.animation = ""; }
    };
    const stop = () => { playing = false; clearInterval(timer); flow.classList.remove("playing"); play && play.setAttribute("aria-label", "Play flow"); };
    const start = () => {
      if (reduce) return; playing = true; flow.classList.add("playing"); play && play.setAttribute("aria-label", "Pause flow");
      clearInterval(timer); timer = setInterval(() => render(cur + 1 >= nodes.length ? 0 : cur + 1), DUR);
      if (prog) { prog.style.animation = "none"; void prog.offsetWidth; prog.style.animation = ""; }
    };
    nodes.forEach((n, k) => {
      n.addEventListener("click", () => { stop(); render(k); });
      n.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); stop(); render(cur + 1); nodes[cur].focus(); }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); stop(); render(cur - 1); nodes[cur].focus(); }
      });
    });
    play && play.addEventListener("click", () => (playing ? stop() : (cur >= nodes.length - 1 && render(0), start())));
    $(".flow-restart", flow)?.addEventListener("click", () => { render(0, false); start(); });
    $(".flow-prev", flow)?.addEventListener("click", () => { stop(); render(cur - 1); });
    $(".flow-next", flow)?.addEventListener("click", () => { stop(); render(cur + 1); });
    render(0, false);
    if (!reduce && "IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !seen) { seen = true; start(); }
        else if (!e.isIntersecting && playing) stop();
      }, { threshold: 0.35 }).observe(flow);
    }
  });

  // ---------- Lightbox ----------
  const lb = $(".lightbox");
  if (lb) {
    const items = $$(".g-item"); let idx = 0;
    const img = $("img", lb), cap = $(".lb-cap", lb);
    const show = (i) => { idx = (i + items.length) % items.length; const it = items[idx]; img.src = it.dataset.full; img.alt = it.dataset.alt; cap.textContent = `${idx + 1} / ${items.length} · ${it.dataset.cap}`; };
    items.forEach((it, i) => {
      const open = () => { show(i); lb.showModal(); };
      it.querySelector(".g-frame").addEventListener("click", open);
    });
    $(".lb-prev", lb).addEventListener("click", () => show(idx - 1));
    $(".lb-next", lb).addEventListener("click", () => show(idx + 1));
    $(".lb-close", lb).addEventListener("click", () => lb.close());
    lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
    lb.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") show(idx + 1); if (e.key === "ArrowLeft") show(idx - 1); });
  }

  const y = $("[data-year]"); if (y) y.textContent = new Date().getFullYear();
})();
