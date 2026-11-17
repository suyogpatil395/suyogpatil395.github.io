// Static site generator: content/site.mjs + src/* → dist/
// Usage: node build.mjs   (no dependencies)
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import * as C from "./content/site.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, "dist");
const ICONS = JSON.parse(fs.readFileSync(path.join(ROOT, "src/icons.json"), "utf8"));
const { site, hero, about, education, experience, skills, certifications, contact, moreRepos, projects } = C;

// ---------- helpers ----------
const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const md = (s = "") => esc(s)
  .replace(/`([^`]+)`/g, "<code>$1</code>")
  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  .replace(/\*(.+?)\*/g, "<em>$1</em>");
const plain = (s = "") => String(s).replace(/[*`]/g, "");
const icon = (name, cls = "") => {
  if (name === "sun") return `<svg class="i i-sun ${cls}" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/></g></svg>`;
  if (name === "moon") return `<svg class="i i-moon ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1z"/></svg>`;
  const d = ICONS[name]; if (!d) throw new Error("Missing icon: " + name);
  return `<svg class="i i-${name} ${cls}" viewBox="0 0 ${d[0]} ${d[1]}" aria-hidden="true"><path d="${d[2]}"/></svg>`;
};
const write = (rel, html) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };
const copyDir = (src, dst) => {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    if (e.name === ".DS_Store") continue;
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    e.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
};
const hash = (s) => crypto.createHash("sha1").update(s).digest("hex").slice(0, 10);
const minCss = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,>])\s*/g, "$1").replace(/;}/g, "}").trim();
const media = (p, f) => `/projects/${p.slug}/${f}`;
// Read image dimensions (GIF / WebP / SVG / PNG) without dependencies
function imgSize(p, f) {
  const file = path.join(ROOT, "static/projects", p.slug, f);
  try {
    if (f.endsWith(".svg")) {
      const s = fs.readFileSync(file, "utf8"); const vb = s.match(/viewBox="[\d.\-]+ [\d.\-]+ ([\d.]+) ([\d.]+)"/);
      if (vb) return [Math.round(+vb[1]), Math.round(+vb[2])];
      const w = s.match(/width="([\d.]+)"/), h = s.match(/height="([\d.]+)"/); if (w && h) return [Math.round(+w[1]), Math.round(+h[1])];
    }
    const b = fs.readFileSync(file);
    if (b.toString("ascii", 0, 3) === "GIF") return [b.readUInt16LE(6), b.readUInt16LE(8)];
    if (b.toString("ascii", 1, 4) === "PNG") return [b.readUInt32BE(16), b.readUInt32BE(20)];
    if (b.toString("ascii", 0, 4) === "RIFF") {
      const k = b.toString("ascii", 12, 16);
      if (k === "VP8X") return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
      if (k === "VP8 ") return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
      if (k === "VP8L") { const n = b.readUInt32LE(21); return [1 + (n & 0x3fff), 1 + ((n >> 14) & 0x3fff)]; }
    }
  } catch {}
  return [1200, 700];
}
const poster = (p, f) => (f.endsWith(".gif") ? media(p, f.replace(/\.gif$/, "-poster.webp")) : media(p, f));

// ---------- build assets ----------
fs.rmSync(OUT, { recursive: true, force: true });
copyDir(path.join(ROOT, "static"), OUT);
const fontsCss = fs.readFileSync(path.join(ROOT, "src/fonts.css"), "utf8");
const css = minCss(fontsCss + "\n" + fs.readFileSync(path.join(ROOT, "src/styles.css"), "utf8"));
const js = fs.readFileSync(path.join(ROOT, "src/app.js"), "utf8");
const cssFile = `assets/site.${hash(css)}.css`, jsFile = `assets/app.${hash(js)}.js`;
write(cssFile, css); write(jsFile, js);

// ---------- shared layout ----------
const NAV = [["#about", "About"], ["#education", "Education"], ["#experience", "Experience"], ["#projects", "Projects"], ["#skills", "Skills"], ["#contact", "Contact"]];

function head({ title, description, url, image = "/og.png", extraHead = "" }) {
  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="keywords" content="${esc(site.keywords)}">
<meta name="author" content="${esc(site.name)}">
<link rel="canonical" href="${site.url}${url}">
<meta name="theme-color" content="#0A0A0D">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${site.url}${url}">
<meta property="og:image" content="${site.url}${image}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${site.url}${image}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<script>(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;}}catch(e){}})();</script>
<link rel="preload" href="/fonts/bricolage-grotesque-latin.woff2" as="font" type="font/woff2" crossorigin>
<style>${css}</style>
${extraHead}
</head>`;
}

function nav(home) {
  const pre = home ? "" : "/";
  return `<a class="skip" href="#main">Skip to content</a>
<header class="nav"><div class="container"><nav class="nav-inner" aria-label="Primary">
  <a class="brand" href="/"><span class="brand-mark" aria-hidden="true">SP</span><span class="brand-name">${esc(site.name)}</span></a>
  <div class="nav-links" id="nav-links">${NAV.map(([h, l]) => `<a href="${pre}${h}">${l}</a>`).join("")}</div>
  <div class="nav-actions">
    <button class="icon-btn theme-btn" type="button" aria-label="Switch to light theme">${icon("moon")}${icon("sun")}</button>
    <a class="btn btn-primary btn-sm nav-resume" href="${site.resume}" download="Suyog_Patil_Resume.pdf" aria-label="Download resume">${icon("download")}<span>Resume</span></a>
    <button class="icon-btn menu-btn" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav-links">${icon("bars")}</button>
  </div>
</nav></div></header>`;
}

const footer = () => `<footer class="footer"><div class="container footer-inner">
  <span>© <span data-year>${new Date().getFullYear()}</span> ${esc(site.name)}</span>
  <div class="footer-links">
    <a href="${site.linkedin}" target="_blank" rel="noopener">${icon("linkedin-in")} LinkedIn</a>
    <a href="${site.github}" target="_blank" rel="noopener">${icon("github")} GitHub</a>
  </div>
</div></footer>`;

const scripts = `<script src="/${jsFile}" defer></script>`;

// ---------- HOME ----------
function projectCard(p, i) {
  const coverGif = media(p, p.cover + ".gif"), coverPoster = media(p, p.cover + "-poster.webp");
  const isSvg = !fs.existsSync(path.join(ROOT, "static/projects", p.slug, p.cover + ".gif"));
  const coverImg = isSvg
    ? `<img src="${media(p, p.cover + ".svg")}" alt="${esc(p.coverAlt)}" loading="lazy" decoding="async" width="1200" height="675">`
    : `<img src="${coverPoster}" data-poster="${coverPoster}" data-gif="${coverGif}" alt="${esc(p.coverAlt)}" loading="lazy" decoding="async" width="1200" height="675" style="view-transition-name:cover-${p.slug}">`;
  const pts = p.points.slice(0, p.featured ? 5 : 3);
  return `<article class="card proj reveal${p.featured ? " featured" : ""}" data-filter="${p.filter}" style="--accent:${p.accent}">
  <div class="pc-cover">${coverImg}
    <span class="pc-num">0${i + 1}</span>${p.featured ? `<span class="pc-badge">Flagship</span>` : ""}
    <span class="pc-live">Live preview</span>
  </div>
  <div class="pc-body">
    <span class="pc-cat">${esc(p.category)}</span>
    <h3><a href="/projects/${p.slug}/">${esc(p.title)}</a></h3>
    <p class="pc-pitch">${md(p.pitch)}</p>
    <ul class="pc-points">${pts.map((t) => `<li>${icon("circle-check")}${md(t)}</li>`).join("")}</ul>
    <div class="tag-row">${p.tech.slice(0, p.featured ? 8 : 5).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
    <div class="pc-foot">
      <span class="pc-cta">Case study ${icon("arrow-right")}</span>
      <div class="pc-links">
        ${p.demo ? `<a class="pc-demo" href="${p.demo}" target="_blank" rel="noopener">${icon("play")} Live demo</a>` : ""}
        <a class="icon-btn" href="${p.repo}" target="_blank" rel="noopener" aria-label="${esc(p.short)} on GitHub">${icon("github")}</a>
      </div>
    </div>
  </div>
</article>`;
}

function home() {
  const filters = [["all", "All"], ["ai", "Generative AI"], ["data", "Data Engineering"], ["bi", "BI & Analytics"]];
  const nFor = (f) => (f === "all" ? projects.length : projects.filter((p) => p.filter === f).length);
  const ld = { "@context": "https://schema.org", "@type": "Person", name: site.name, url: site.url, email: `mailto:${site.email}`,
    jobTitle: "Data Engineer · AI Engineer", sameAs: [site.linkedin, site.github],
    alumniOf: { "@type": "CollegeOrUniversity", name: "R. C. Patel Institute of Technology" },
    knowsAbout: ["Generative AI", "LLM Agents", "MCP", "RAG", "Prompt Engineering", "Azure Data Factory", "SQL", "Python", "Semantic Layer"] };

  return `${head({ title: site.title, description: site.description, url: "/",
    extraHead: `<link rel="preload" as="image" type="image/webp" imagesrcset="/img/hero-scene-640.webp 640w, /img/hero-scene-860.webp 860w, /img/hero-scene.webp 1247w" imagesizes="(max-width: 960px) 90vw, 560px" fetchpriority="high">
<script type="application/ld+json">${JSON.stringify(ld)}</script>` })}
<body>
${nav(true)}
<main id="main">

<section class="hero" aria-label="Intro">
  <div class="dot-grid"></div><div class="glow glow-peach"></div><div class="glow glow-violet"></div>
  <div class="container">
    <div class="hero-grid">
      <div>
        <div class="status-pill rise"><span class="pulse"></span><b>${esc(hero.status)}</b></div>
        <h1 class="rise d1">Suyog <em>Patil</em></h1>
        <p class="role-line rise d1"><span class="role-pre">Your next</span> <span><span class="typed" data-roles='${esc(JSON.stringify(hero.roles))}'>${esc(hero.roles[0])}</span><span class="caret" aria-hidden="true"></span></span></p>
        <p class="headline rise d2">${md(hero.headline)}</p>
        <p class="lead rise d2">${md(hero.sub)}</p>
        <div class="btn-row rise d3">
          <a class="btn btn-primary" href="#projects">View Projects ${icon("arrow-right")}</a>
          <a class="btn btn-ghost" href="${site.resume}" download="Suyog_Patil_Resume.pdf">${icon("download")} Download Resume</a>
        </div>
        <div class="hero-social rise d4">
          <a class="icon-btn" href="${site.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon("linkedin-in")}</a>
          <a class="icon-btn" href="${site.github}" target="_blank" rel="noopener" aria-label="GitHub">${icon("github")}</a>
          <a class="icon-btn" href="mailto:${site.email}" aria-label="Email">${icon("envelope")}</a>
          <span class="divider"></span><span>2+ years · Gen AI, LLM agents &amp; data pipelines</span>
        </div>
      </div>

      <div class="hero-visual rise d2">
        <div class="hv-glow" aria-hidden="true"></div><div class="hv-ring" aria-hidden="true"></div>
        <picture>
          <source srcset="/img/hero-scene-640.webp 640w, /img/hero-scene-860.webp 860w, /img/hero-scene.webp 1247w" sizes="(max-width: 960px) 90vw, 560px" type="image/webp">
          <img class="hv-person" src="/img/hero-scene.png" width="1247" height="1193" alt="Pixel-art portrait of Suyog Patil at his desk" fetchpriority="high" decoding="async">
        </picture>
        <div class="hv-card hv-pipe" aria-hidden="true">
          <span class="kicker">Data pipeline</span>
          <div class="pipe-row">
            <span class="pipe-node">${icon("database")}</span><span class="pipe-line"></span>
            <span class="pipe-node">${icon("cloud")}</span><span class="pipe-line"></span>
            <span class="pipe-node">${icon("snowflake")}</span><span class="pipe-line"></span>
            <span class="pipe-node hot">${icon("chart-simple")}</span>
          </div>
        </div>
        <div class="hv-card hv-mcp" aria-hidden="true">
          <div class="mcp-top"><span class="kicker">One MCP connector</span><span class="mcp-ok">${icon("check")} RLS</span></div>
          <div class="mcp-list"><span>Claude</span><span>ChatGPT</span><span>Gemini</span><span>Grok</span></div>
        </div>
        <div class="float-chip chip-a" aria-hidden="true"><div class="ic">${icon("trophy")}</div><div><b>400+</b><span>dashboards built</span></div></div>
        <div class="float-chip chip-b" aria-hidden="true"><div class="ic">${icon("wand-magic-sparkles")}</div><div><b>v1.0 → v1.7</b><span>Analytics Studio</span></div></div>
      </div>
    </div>

    <div class="stats rise d4" role="list">
      ${hero.stats.map((s) => `<div class="stat" role="listitem"><div class="stat-num">${s.text ? esc(s.text) : `<span data-count="${s.value}">${s.value}</span>${s.suffix ? `<sup>${s.suffix}</sup>` : ""}`}</div><div class="stat-label">${esc(s.label)}${s.note ? `<span class="stat-note">${esc(s.note)}</span>` : ""}</div></div>`).join("")}
    </div>
  </div>
</section>

<section class="section" id="about" aria-labelledby="about-h">
  <div class="container about-grid">
    <div class="portrait reveal">
      <div class="portrait-frame">
        <img class="p-dark" src="/img/profile-dark.webp" width="720" height="900" alt="Pixel-art portrait of Suyog Patil" loading="lazy" decoding="async">
        <img class="p-light" src="/img/profile-light.webp" width="720" height="900" alt="" aria-hidden="true" loading="lazy" decoding="async">
      </div>
      <div class="float-chip chip-a chip-az" aria-hidden="true"><div class="ic">${icon("microsoft")}</div><div><b>Azure</b><span>Data Engineer</span></div></div>
      <div class="float-chip chip-b chip-ai" aria-hidden="true"><div class="ic">${icon("brain")}</div><div><b>Gen AI</b><span>LLM agents · MCP</span></div></div>
    </div>
    <div class="about-copy">
      <div class="label reveal">About me</div>
      <h2 id="about-h" class="reveal d1">Useful AI, on <em>trustworthy</em> data.</h2>
      ${about.paragraphs.map((p, i) => `<p class="reveal d${Math.min(i + 1, 4)}">${md(p)}</p>`).join("")}
      <div class="facts reveal">${about.facts.map((f) => `<div class="fact">${icon(f.icon)}<span>${esc(f.k)}</span><b>${esc(f.v)}</b></div>`).join("")}</div>
      <div class="btn-row reveal">
        <a class="btn btn-ghost btn-sm" href="${site.linkedin}" target="_blank" rel="noopener">${icon("linkedin-in")} LinkedIn</a>
        <a class="btn btn-ghost btn-sm" href="${site.github}" target="_blank" rel="noopener">${icon("github")} GitHub</a>
      </div>
    </div>
  </div>
</section>

<section class="section" id="education" aria-labelledby="edu-h" style="padding-top:0">
  <div class="container">
    <div class="head reveal"><div class="label">Education</div><h2 id="edu-h">Engineering <em>foundations.</em></h2></div>
    <div class="card edu reveal">
      <div class="edu-ic">${icon("graduation-cap")}</div>
      <div><h3>${esc(education.degree)}</h3><p>${esc(education.institute)}</p></div>
      <div class="edu-meta">
        <div class="edu-pill"><span>CGPA</span><b>${esc(education.cgpa)}</b></div>
        <div class="edu-pill"><span>Graduated</span><b>${esc(education.graduated)}</b></div>
      </div>
    </div>
  </div>
</section>

<section class="section" id="experience" aria-labelledby="exp-h" style="padding-top:0">
  <div class="container">
    <div class="head reveal"><div class="label">Experience</div><h2 id="exp-h">Where I've <em>shipped.</em></h2><p>AI products, agentic analytics, cloud pipelines and BI platforms used by 50+ clients.</p></div>
    <div class="timeline">
      ${experience.map((e) => `<div class="tl-item reveal">
        <span class="tl-dot" aria-hidden="true"></span>
        <article class="card tl-card">
          <div class="tl-top">
            <div><h3>${esc(e.role)}</h3><div class="tl-co">${esc(e.company)}</div></div>
            <div class="tl-when"><span>${icon("calendar")} ${esc(e.dates)}</span><span>${icon(e.location === "Remote" ? "house" : "building-columns")} ${esc(e.location)}</span></div>
          </div>
          <ul class="tl-list">${e.bullets.map(([b, t]) => `<li>${b ? `<b>${esc(b)}:</b> ` : ""}${md(t)}</li>`).join("")}</ul>
          <div class="tag-row">${e.tags.map((t) => `<span class="tag tag-peach">${esc(t)}</span>`).join("")}</div>
        </article>
      </div>`).join("")}
    </div>
  </div>
</section>

<section class="section" id="projects" aria-labelledby="proj-h" style="padding-top:0">
  <div class="container">
    <div class="head-row">
      <div class="head reveal"><div class="label">Featured projects</div><h2 id="proj-h">The <em>project library.</em></h2><p>Hover a card to watch it run. Open any project to explore its architecture as a live, clickable flow.</p></div>
      <div class="chips reveal" role="group" aria-label="Filter projects">${filters.map(([f, l], i) => `<button class="chip-btn${i === 0 ? " active" : ""}" type="button" data-filter="${f}" aria-pressed="${i === 0}">${l} <small>${nFor(f)}</small></button>`).join("")}</div>
    </div>
    <div class="lib-count" aria-live="polite">${projects.length} projects</div>
    <div class="proj-grid">${projects.map(projectCard).join("")}</div>

    <div class="more reveal">
      <div class="more-head"><h3>${icon("github")} More on GitHub</h3><a class="btn btn-ghost btn-sm" href="${site.github}?tab=repositories" target="_blank" rel="noopener">All repositories ${icon("arrow-up-right-from-square")}</a></div>
      <div class="more-row">${moreRepos.map((r) => `<a class="card repo" href="https://github.com/suyogpatil395/${r.name}" target="_blank" rel="noopener">
        <div class="repo-top"><b>${esc(r.label || r.name)}</b>${icon("arrow-up-right-from-square")}</div>
        <p>${esc(r.desc)}</p>
        <div class="tag-row">${r.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </a>`).join("")}</div>
    </div>
  </div>
</section>

<section class="section" id="skills" aria-labelledby="skills-h" style="padding-top:0">
  <div class="container">
    <div class="head reveal"><div class="label">Skills</div><h2 id="skills-h">The <em>toolkit.</em></h2></div>
    <div class="skill-grid">${skills.map((g) => `<div class="card skill reveal">
      <div class="skill-h"><div class="ic">${icon(g.icon)}</div><div><h3>${esc(g.title)}</h3><small>${g.items.length} skills</small></div></div>
      <div class="tag-row">${g.items.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
    </div>`).join("")}</div>
    <div id="certifications" class="cert-grid">${certifications.map((c) => `<div class="card cert reveal"><div class="ic">${icon(c.icon)}</div><div><span>Certification</span><b>${esc(c.name)}${c.issuer ? ` · ${esc(c.issuer)}` : ""}</b></div></div>`).join("")}</div>
  </div>
</section>

<section class="section" id="contact" aria-labelledby="contact-h" style="padding-top:0">
  <div class="container">
    <div class="contact reveal">
      <div class="dot-grid"></div>
      <div class="label" style="position:relative">Contact</div>
      <h2 id="contact-h" style="position:relative">Let's build something <em>useful.</em></h2>
      <p style="position:relative">${esc(contact.line)}</p>
      <div class="btn-row" style="position:relative">
        <a class="btn btn-primary" href="mailto:${site.email}">${icon("envelope")} Email me</a>
        <a class="btn btn-ghost" href="${site.linkedin}" target="_blank" rel="noopener">${icon("linkedin-in")} LinkedIn</a>
        <a class="btn btn-ghost" href="${site.github}" target="_blank" rel="noopener">${icon("github")} GitHub</a>
        <a class="btn btn-ghost" href="${site.resume}" download="Suyog_Patil_Resume.pdf">${icon("download")} Download Resume</a>
      </div>
      <a class="contact-mail" href="mailto:${site.email}" style="position:relative">${icon("envelope")} ${esc(site.email)}</a>
    </div>
  </div>
</section>
</main>
${footer()}
${scripts}
</body></html>`;
}

// ---------- PROJECT PAGE ----------
function projectPage(p, i) {
  const prev = projects[(i - 1 + projects.length) % projects.length], next = projects[(i + 1) % projects.length];
  const coverIsGif = fs.existsSync(path.join(ROOT, "static/projects", p.slug, p.cover + ".gif"));
  const heroImg = coverIsGif
    ? `<img src="${media(p, p.cover + "-poster.webp")}" data-gif="${media(p, p.cover + ".gif")}" alt="${esc(p.coverAlt)}" width="1200" height="675" fetchpriority="high" decoding="async" style="view-transition-name:cover-${p.slug}">`
    : `<img src="${media(p, p.cover + ".svg")}" alt="${esc(p.coverAlt)}" width="1200" height="675" fetchpriority="high">`;
  const desc = plain(p.pitch);

  return `${head({ title: `${p.title} · ${site.name}`, description: desc, url: `/projects/${p.slug}/`,
    extraHead: `<link rel="preload" as="image" href="${coverIsGif ? media(p, p.cover + "-poster.webp") : media(p, p.cover + ".svg")}" fetchpriority="high">` })}
<body>
${nav(false)}
<main id="main" style="--accent:${p.accent}">

<section class="pp-hero">
  <div class="dot-grid"></div><div class="glow glow-peach"></div>
  <div class="container">
    <a class="back" href="/#projects">${icon("arrow-left")} All projects</a>
    <div class="pp-grid">
      <div>
        <span class="pc-cat">Project 0${i + 1} · ${esc(p.category)}</span>
        <h1>${esc(p.title)}</h1>
        <p class="pp-lead">${md(p.pitch)}</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="#flow">${icon("play")} Watch it run</a>
          ${p.demo ? `<a class="btn btn-ghost" href="${p.demo}" target="_blank" rel="noopener">${icon("wand-magic-sparkles")} Try the live demo</a>` : ""}
          <a class="btn btn-ghost" href="${p.repo}" target="_blank" rel="noopener">${icon("github")} GitHub</a>
        </div>
      </div>
      <div class="pp-media">${heroImg}</div>
    </div>
    <div class="pp-stats">${p.stats.map((s) => `<div class="pp-stat reveal"><b>${esc(s.v)}</b><span>${esc(s.l)}</span></div>`).join("")}</div>
  </div>
</section>

<section class="pp-section" id="flow" aria-labelledby="flow-h">
  <div class="container">
    <div class="flow reveal" style="--accent:${p.accent}">
      <div class="dot-grid"></div>
      <div class="flow-top">
        <div class="flow-title"><span class="live">Live architecture</span><h2 id="flow-h">How it works, step by step</h2></div>
        <div class="flow-ctrl">
          <button class="icon-btn flow-prev" type="button" aria-label="Previous step">${icon("arrow-left")}</button>
          <button class="icon-btn flow-play" type="button" aria-label="Play flow">${icon("play")}${icon("pause")}</button>
          <button class="icon-btn flow-next" type="button" aria-label="Next step">${icon("arrow-right")}</button>
          <span class="flow-count" aria-live="polite"></span>
          <button class="icon-btn flow-restart" type="button" aria-label="Replay from the start">${icon("rotate")}</button>
        </div>
      </div>
      <div class="flow-track" style="--n:${p.flow.length}">
        ${p.flow.map((n, k) => `<button class="fn" type="button" data-t="${esc(n.t)}" data-s="${esc(n.s)}" data-d="${esc(n.d)}" aria-label="Step ${k + 1}: ${esc(n.t)}">
          <span class="fn-ic">${icon(n.icon)}<span class="fn-num">${k + 1}</span></span>
          <span class="fn-txt"><span class="fn-t">${esc(n.t)}</span><span class="fn-s">${esc(n.s)}</span><span class="fn-d">${esc(n.d)}</span></span>
        </button>`).join("")}
      </div>
      <div class="flow-panel" aria-live="polite"><div class="fp-ic"></div><div class="fp-body"></div></div>
      <div class="flow-progress" aria-hidden="true"><i></i></div>
      <p class="flow-hint">Click any step, or use ← → to walk through the flow.</p>
    </div>
  </div>
</section>

<section class="pp-section" aria-labelledby="ps-h" style="padding-top:24px">
  <div class="container">
    <h2 id="ps-h" class="sr-only">Problem and solution</h2>
    <div class="ps-grid">
      <div class="card ps problem reveal"><div class="ps-h"><div class="ic">${icon("triangle-exclamation")}</div><h3>The problem</h3></div>${p.problem.map((t) => `<p>${md(t)}</p>`).join("")}</div>
      <div class="card ps solution reveal d1"><div class="ps-h"><div class="ic">${icon("lightbulb")}</div><h3>The solution</h3></div>${p.solution.map((t) => `<p>${md(t)}</p>`).join("")}</div>
    </div>
  </div>
</section>

<section class="pp-section" aria-labelledby="built-h">
  <div class="container">
    <div class="head reveal"><div class="label">What I built</div><h2 id="built-h">Under the <em>hood.</em></h2></div>
    <div class="built-grid">${p.built.map(([t, d], k) => `<div class="card built reveal"><span class="bn">${String(k + 1).padStart(2, "0")}</span><h3>${esc(t)}</h3><p>${md(d)}</p></div>`).join("")}</div>
  </div>
</section>

<section class="pp-section" aria-labelledby="steps-h">
  <div class="container">
    <div class="head reveal"><div class="label">Process</div><h2 id="steps-h">Step by <em>step.</em></h2></div>
    <ol class="steps reveal">${p.steps.map(([t, d]) => `<li><b>${esc(t)}</b><span>${md(d)}</span></li>`).join("")}</ol>
  </div>
</section>

<section class="pp-section" aria-labelledby="res-h">
  <div class="container">
    <div class="card results reveal">
      <div><div class="label">Results</div><h2 id="res-h" style="font-size:clamp(1.8rem,3.4vw,2.4rem)">What <em>changed.</em></h2></div>
      <ul>${p.results.map((r) => `<li>${icon("circle-check")}<span>${md(r)}</span></li>`).join("")}</ul>
    </div>
  </div>
</section>

<section class="pp-section" aria-labelledby="gal-h">
  <div class="container">
    <div class="head reveal"><div class="label">Screenshots & diagrams</div><h2 id="gal-h">See it in <em>action.</em></h2><p>From the project repository. Tap any image to enlarge<span class="m-only">, swipe for more</span>.</p></div>
    <div class="gallery">${p.media.map((m) => `<figure class="g-item reveal${(([w, h]) => (h > w * 0.9 ? " tall" : ""))(imgSize(p, m.src))}" data-full="${media(p, m.src)}" data-alt="${esc(m.alt)}" data-cap="${esc(m.cap)}">
      <button class="g-frame" type="button" style="--ar:${imgSize(p, m.src).join(" / ")}" aria-label="Enlarge image: ${esc(m.cap)}"><img src="${media(p, m.src)}" alt="${esc(m.alt)}" loading="lazy" decoding="async" width="${imgSize(p, m.src)[0]}" height="${imgSize(p, m.src)[1]}"><span class="g-zoom">${icon("magnifying-glass")}</span></button>
      <figcaption>${esc(m.cap)}</figcaption>
    </figure>`).join("")}</div>
  </div>
</section>

<section class="pp-section" aria-labelledby="tech-h">
  <div class="container">
    <div class="head reveal" style="margin-bottom:24px"><div class="label">Tech stack</div><h2 id="tech-h">Built <em>with.</em></h2></div>
    <div class="tag-row tech-row reveal">${p.tech.map((t) => `<span class="tag tag-peach">${esc(t)}</span>`).join("")}</div>
    <div class="pp-links reveal">
      <a class="btn btn-primary" href="${p.repo}" target="_blank" rel="noopener">${icon("github")} View the repository</a>
      ${p.demo ? `<a class="btn btn-ghost" href="${p.demo}" target="_blank" rel="noopener">${icon("wand-magic-sparkles")} Try the live demo</a>` : ""}
    </div>
  </div>
</section>

<section class="pp-section" aria-label="More projects">
  <div class="container pn-grid">
    <a class="card pn reveal" href="/projects/${prev.slug}/"><span>${icon("arrow-left")} Previous project</span><b>${esc(prev.title)}</b></a>
    <a class="card pn next reveal" href="/projects/${next.slug}/"><span>Next project ${icon("arrow-right")}</span><b>${esc(next.title)}</b></a>
  </div>
</section>
</main>

<dialog class="lightbox" aria-label="Image viewer">
  <div class="lb-img"><img src="data:," alt=""></div>
  <div class="lb-bar"><span class="lb-cap"></span><div class="lb-nav">
    <button class="icon-btn lb-prev" type="button" aria-label="Previous image">${icon("arrow-left")}</button>
    <button class="icon-btn lb-next" type="button" aria-label="Next image">${icon("arrow-right")}</button>
    <button class="icon-btn lb-close" type="button" aria-label="Close">${icon("xmark")}</button>
  </div></div>
</dialog>
${footer()}
${scripts}
</body></html>`;
}

// ---------- 404 ----------
const notFound = () => `${head({ title: `Page not found · ${site.name}`, description: site.description, url: "/404.html" })}
<body>${nav(false)}
<main id="main"><section class="hero" style="min-height:80vh;display:grid;place-items:center;text-align:center"><div class="dot-grid"></div><div class="glow glow-peach"></div>
<div class="container" style="position:relative"><div class="label">404</div><h1>Lost in the <em>pipeline.</em></h1><p class="lead" style="margin:0 auto 32px">This page doesn't exist. Let's get you back.</p>
<div class="btn-row" style="justify-content:center"><a class="btn btn-primary" href="/">${icon("house")} Home</a><a class="btn btn-ghost" href="/#projects">Projects ${icon("arrow-right")}</a></div></div></section></main>
${footer()}${scripts}</body></html>`;

// ---------- write pages ----------
write("index.html", home());
projects.forEach((p, i) => write(`projects/${p.slug}/index.html`, projectPage(p, i)));
write("404.html", notFound());
const today = new Date().toISOString().slice(0, 10);
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${["/", ...projects.map((p) => `/projects/${p.slug}/`)].map((u) => `  <url><loc>${site.url}${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
write(".nojekyll", "");

// ---------- privacy guard: fail the build if a banned word appears ----------
const BANNED = [/foodbot/i, /tandoor tales/i, /wok street/i, /9370817592|93708 17592/];
const scan = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? scan(path.join(dir, e.name)) : [path.join(dir, e.name)]));
const hits = scan(OUT).filter((f) => /\.(html|css|js|xml|txt)$/.test(f) && !f.endsWith("demo.html")).flatMap((f) => {
  const t = fs.readFileSync(f, "utf8"); return BANNED.filter((r) => r.test(t)).map((r) => `${path.relative(OUT, f)}: ${r}`);
});
if (hits.length) { console.error("Privacy check failed:\n" + hits.join("\n")); process.exit(1); }
console.log(`Built ${2 + projects.length} pages → dist/ (privacy check passed)`);
