// ============================================================
// ALL SITE COPY LIVES HERE. Edit text in this file only.
// Facts come from PORTFOLIO_BRIEF.md, the resume, and each repo's README.
// Never add client / company brand names (privacy rule).
// ============================================================

export const site = {
  url: "https://suyogpatil395.github.io",
  name: "Suyog Patil",
  title: "Suyog Patil · AI Engineer & Data Engineer",
  description:
    "Suyog Patil builds Generative AI analytics products, LLM agents (MCP, Claude) and data pipelines on Azure, Rill and Sigma.",
  keywords:
    "Generative AI Engineer, AI Engineer, Data Scientist, LLM, RAG, MCP, Agentic AI, Claude, Prompt Engineering, Azure Data Factory, SQL, Python",
  email: "suyog.patil.work@outlook.com",
  linkedin: "https://linkedin.com/in/suyog-patil-0089241b2",
  github: "https://github.com/suyogpatil395",
  resume: "/resume.pdf",
};

export const hero = {
  status: "Open to AI Engineer, Gen AI Engineer & Data Scientist roles",
  roles: ["AI Engineer", "Gen AI Engineer", "Data Scientist", "Data Engineer"],
  headline: "Building AI-powered analytics products, LLM agents and data pipelines.",
  sub: "I design and ship Gen AI products on governed data. LLMs plan, semantic layers guarantee the numbers, and clients get answers in seconds instead of waiting hours for a report.",
  stats: [
    { value: 400, suffix: "+", label: "dashboards built" },
    { value: 50, suffix: "+", label: "clients served" },
    { value: 4, suffix: "", label: "AI assistants served by one MCP connector", note: "Claude · ChatGPT · Gemini · Grok" },
    { text: "v1.0 → v1.7", label: "Analytics Studio releases shipped" },
  ],
};

export const about = {
  paragraphs: [
    "I'm a **Data Engineer with 2+ years of experience** building **Generative AI products, LLM agents and data pipelines**.",
    "I built **Analytics Studio** end to end. It is a fully AI-powered reporting product: people describe a report in plain English and get live KPIs, charts, comparisons and forecasts. **Claude does the planning, MCP tool calls fetch the data, and a governed semantic layer keeps every number correct.**",
    "I also built the agentic layer that lets clients query their data from **Claude, ChatGPT, Gemini and Grok**. I own two BI platforms (**Rill Data** and **Sigma Computing**) serving **50+ clients**, and I build cloud pipelines on **Microsoft Azure**.",
    "My focus: make AI useful *and* trustworthy on real business data.",
  ],
  facts: [
    { icon: "briefcase", k: "Experience", v: "2+ years" },
    { icon: "bullseye", k: "Target roles", v: "Data Scientist · AI Engineer · Gen AI Engineer" },
    { icon: "database", k: "Also open to", v: "Data Engineer" },
  ],
};

export const education = {
  institute: "R. C. Patel Institute of Technology, Shirpur, India",
  degree: "B.Tech in Mechanical Engineering, Minor in Computer Science",
  cgpa: "7.1",
  graduated: "Jul 2024",
};

export const experience = [
  {
    role: "Data Engineer",
    company: "Innodata India Pvt. Ltd.",
    dates: "Oct 2025 – Nov 2026",
    location: "Remote",
    bullets: [
      ["AI product development (Analytics Studio)", "Built a fully AI-powered self-serve reporting product end to end: problem definition, UX, the LLM/data boundary and releases v1.0 → v1.7. Clients describe a report in plain English and get live KPIs, charts and insights in seconds. This moved the data team from one-off reports to data modeling."],
      ["Agentic AI", "Built an MCP server and Claude agent skills (router, metric dictionary) that let clients query their data from **Claude, ChatGPT, Gemini and Grok** with verified answers. Tool calls per question dropped from about 9 to 2."],
      ["Microsoft Azure", "Built an **Azure Data Factory** pipeline on **ADLS Gen2** (Get Metadata → ForEach → If Condition → Copy). It routes only Fact files to the reporting team, runs automatically on **Event Grid** storage events, and is secured with managed identity, RBAC and ACLs."],
      ["Rill Data (platform owner)", "Migrated client reporting to Rill on DuckDB: source pipelines from POS MySQL, SQL models, metrics views, row-level security and Slack alerts. Used **Claude Code** to speed up model development and validation."],
      ["Sigma Computing (admin, 100% ownership)", "Built **400+ dashboards for 50+ clients** on MySQL and Snowflake with Custom SQL (CTEs, window functions), governed data models and row-level security."],
      ["Day to day", "Gathered client requirements, answered ad-hoc business questions, ran SQL data-quality checks (duplicates, freshness, reconciliation) and evaluated LLM outputs for accuracy and instruction-following."],
    ],
    tags: ["Generative AI", "LLM Agents", "MCP", "Claude", "Claude Code", "Azure Data Factory", "Rill", "Sigma", "SQL", "Python"],
  },
  {
    role: "Associate Software Engineer",
    company: "YBB India Pvt. Ltd.",
    dates: "Nov 2024 – Oct 2025",
    location: "Surat",
    bullets: [
      [null, "Designed an Employee Attendance Database and Management System with schema and business logic for shifts, leaves, holidays, overtime and exceptions."],
      [null, "Automated ETL and HR reporting with Python and SQL, improving HR productivity by **90%**. Built Power BI dashboards that improved decision-making speed by **25%**."],
    ],
    tags: ["SQL", "Python", "ETL", "Power BI", "Database Design"],
  },
];

export const skills = [
  { title: "Generative AI & LLMs", icon: "brain", items: ["LLM Agents", "Agentic AI", "RAG", "Prompt Engineering", "MCP (Model Context Protocol)", "Tool / Function Calling", "Claude", "Claude Code", "ChatGPT", "Gemini", "LLM Evaluation", "Hallucination Guardrails", "Token Optimization"] },
  { title: "Data Science & ML", icon: "chart-line", items: ["Python", "Pandas", "NumPy", "Scikit-learn", "EDA", "Feature Engineering", "Anomaly Detection"] },
  { title: "Data Engineering", icon: "database", items: ["SQL (CTEs, Window Functions, Joins)", "ETL / ELT", "Data Modeling", "Star Schema", "Semantic Layer", "Data Quality", "Row-Level Security", "MySQL", "DuckDB", "Snowflake", "SQL Server"] },
  { title: "Cloud, BI & Tools", icon: "cloud", items: ["Microsoft Azure (Data Factory, ADLS Gen2, Event Grid, RBAC)", "Rill Data", "Sigma Computing", "Power BI", "Git", "GitHub", "npm", "Excel"] },
];

export const certifications = [
  { name: "Data Analytics Job Simulation", issuer: "Deloitte", icon: "award" },
  { name: "Analyzing and Visualizing Data in Looker", issuer: null, icon: "chart-pie" },
];

export const contact = {
  line: "Open to Data Scientist, AI Engineer and Gen AI Engineer roles. Let's talk.",
};

// More on GitHub (other public repos; descriptions from GitHub)
export const moreRepos = [
  { name: "Smart-inquiry-automation", desc: "n8n workflow: form submissions → Slack notification, with an If condition that auto-creates a LinkedIn post for partnership or media inquiries.", tags: ["n8n", "Automation", "Slack"] },
  { name: "STOCK-MARKET-PRICE-PREDICTON-AND-FORECASTING-USING-LSTM", label: "Stock Price Forecasting (LSTM)", desc: "Stock market price prediction and forecasting with an LSTM model.", tags: ["Python", "LSTM", "Forecasting"] },
  { name: "-ICC-Men-s-T20-Cricket-World-Cup-Data-Analytics", label: "T20 World Cup Analytics", desc: "Power BI dashboard on T20 World Cup data to analyse match statistics and pick an ideal playing XI.", tags: ["Power BI", "Data Analytics"] },
  { name: "75-Days-Data-Challenge", label: "75-Days Data Challenge", desc: "A 75-day daily challenge sharpening Power BI and data analysis skills, shared with the LinkedIn community.", tags: ["Power BI", "Data Analysis"] },
  { name: "FRIDAY_Digital_Assistant", label: "FRIDAY Digital Assistant", desc: "A Python voice assistant that searches Wikipedia, plays music, opens Google and YouTube, and sends emails.", tags: ["Python", "Assistant"] },
];

// ============================================================
// PROJECTS: keep this exact order.
// flow = the animated, clickable architecture on each project page.
// ============================================================
const gh = (r) => `https://github.com/suyogpatil395/${r}`;

export const projects = [
  {
    slug: "azure-data-pipeline-secure-file-routing",
    title: "Azure Data Pipeline: Secure File Routing",
    short: "Azure Data Pipeline",
    category: "Data Engineering",
    filter: "data",
    pitch: "An Azure Data Factory pipeline that gives every team only the files it is allowed to see.",
    repo: gh("azure-data-pipeline-secure-file-routing"),
    accent: "#5FCBF2",
    icon: "cloud",
    cover: "01-pipeline-flow",
    coverAlt: "Animated pipeline: Get Metadata lists the container, ForEach loops, If Condition keeps only Fact files, Copy writes them to the reporting folder",
    points: [
      "Only Fact files reach the reporting team; payroll and personal data never leave the source.",
      "Get Metadata → ForEach → If Condition `startswith(name,'Fact')` → Copy.",
      "Event-driven: an Event Grid storage trigger runs it on every new Fact file.",
      "Managed identity (no secrets) plus RBAC + ACLs per team folder.",
    ],
    tech: ["Azure Data Factory", "ADLS Gen2", "Event Grid", "Managed Identity", "RBAC/ACL", "Azure CLI"],
    stats: [
      { v: "3 → 2", l: "files listed → Fact files copied (real run)" },
      { v: "< 1 s", l: "cost of skipping a non-Fact file" },
      { v: "0", l: "secrets: managed identity auth" },
    ],
    problem: [
      "A company drops all of its data files into **one storage container**: aggregated sales facts, order facts, model features, **payroll** and **personal data**.",
      "Giving the reporting team access to the whole container exposes salaries and personal data. Copying the right files by hand every day does not scale and is easy to get wrong.",
    ],
    solution: [
      "An Azure Data Factory pipeline, `OnlySelectedFiles`, that **lists** every file in the source container, **checks** each name against a rule (starts with `Fact`), and **copies** only matching files to a reporting folder.",
      "It runs **automatically** whenever a new Fact file arrives, and relies on **storage permissions** so each team can open only its own folder. The same pattern extends to any number of teams: `Fact_*` to Analytics, `DS_*` to Data Science.",
    ],
    built: [
      ["Pipeline", "Get Metadata (`childItems`) → ForEach → If Condition `@startswith(item().name,'Fact')` → Copy data. The False branch stays empty, so non-Fact files never leave the source."],
      ["Parameterised datasets", "One dataset with a `p_file_n` parameter handles every file; the loop hands it the name at run time with `@item().name`."],
      ["Event trigger", "Storage event trigger on Event Grid: *Blob created*, path begins with `/raw/blobs/Fact`, ends with `.csv`, so copies in `/reporting` never re-fire it."],
      ["Security", "ADLS Gen2 linked service with system-assigned **managed identity**. One Entra ID group per team; `--x` on the container root and `r-x` access + default ACLs on each team folder. No broad Storage Blob Data Reader role (RBAC is checked before ACLs)."],
      ["Scale to many teams", "`pl_route_files_by_team`: Filter before the loop, parallel ForEach (batch 10), and a Switch on prefix, so adding a team is one new case. Binary datasets copy CSV, Parquet or JSON as-is."],
      ["Real run logs", "Activity runs exported from ADF (`adf-activity-runs-2026-11-05.csv`) are in the repo."],
    ],
    flow: [
      { icon: "hard-drive", t: "Source container", s: "all raw files · restricted", d: "Every file lands here: Fact_Sales.csv, Fact_Orders.csv, DS_ChurnFeatures.parquet, Employee_Salary.csv, Customer_PII.csv. Teams have no permission on raw/." },
      { icon: "bolt", t: "Event Grid trigger", s: "Blob created · begins with Fact", d: "A storage event trigger starts the pipeline the moment a matching file lands. Filter: path begins with /raw/blobs/Fact, ends with .csv, ignore empty blobs." },
      { icon: "magnifying-glass", t: "Get Metadata", s: "childItems", d: "Lists every file in the container (name + type) without copying anything. In the real run: 3 files listed in 5 s." },
      { icon: "rotate", t: "ForEach", s: "each file", d: "Runs the inner activities once per file. Items = @activity('Get Metadata').output.childItems. Inside, item() is the current file." },
      { icon: "shield-halved", t: "If Condition", s: "startswith(name,'Fact')", d: "The security rule. True → copy. False → nothing, so payroll and PII never leave the source. A skipped file costs under a second." },
      { icon: "cloud-arrow-up", t: "Copy data", s: "CopyFactData", d: "Source and sink datasets take p_file_n = @item().name, so the file keeps its original name. In the real run: 2 Fact files copied, 1 file kept back." },
      { icon: "users", t: "Reporting team", s: "read-only · own folder", d: "ACLs give the team r-x on its own folder only (access + default ACL, so tomorrow's files inherit it). RBAC is never granted at container level." },
    ],
    steps: [
      ["Linked service & datasets", "ADLS Gen2 via managed identity; a folder dataset to list files and parameterised file datasets for source and sink."],
      ["List", "Get Metadata returns `childItems` for the container."],
      ["Loop & check", "ForEach over the list; If Condition applies `startswith(item().name,'Fact')`."],
      ["Copy", "Copy data in the True branch writes the file to the reporting folder."],
      ["Automate", "Storage event trigger on Event Grid runs `pl_copy_single_fact_file` with `p_file_name = @triggerBody().fileName`."],
      ["Secure", "Entra ID groups + ADLS Gen2 ACLs per team folder; no broad RBAC roles."],
    ],
    results: [
      "Real debug run (exported log): **3 files listed, 2 Fact files copied, 1 file skipped**.",
      "A skipped file costs **under a second**, so filtering is cheap.",
      "Sequential ForEach took 38 s for 3 files; running it in parallel would cut that to about 16 s.",
      "Each team can open only its own folder; non-Fact files never leave the source.",
    ],
    media: [
      { src: "01-pipeline-flow.gif", alt: "How the pipeline processes a container", cap: "Pipeline flow" },
      { src: "02-event-trigger-automation.gif", alt: "Event trigger automation: a new Fact file starts the pipeline", cap: "Event-driven automation" },
      { src: "03-team-access-control.gif", alt: "Team access control with RBAC and ACLs", cap: "Per-team access control" },
      { src: "04-adf-studio-walkthrough.gif", alt: "Building the OnlySelectedFiles pipeline in Azure Data Factory Studio, activity by activity", cap: "ADF Studio walkthrough" },
      { src: "01-pipeline-canvas.webp", alt: "Pipeline canvas in ADF Studio", cap: "Pipeline canvas" },
      { src: "02-if-condition-expression.webp", alt: "If Condition expression startswith(item().name,'Fact')", cap: "If Condition expression" },
      { src: "03-copy-activity-general.webp", alt: "Copy activity General tab", cap: "Copy activity settings" },
      { src: "04-copy-activity-source-parameter.webp", alt: "Copy source with dataset parameter", cap: "Dataset parameter p_file_n" },
      { src: "05-debug-run-2-files.webp", alt: "Debug run with 2 files", cap: "Debug run: 2 files" },
      { src: "06-debug-run-3-files.webp", alt: "Debug run with 3 files", cap: "Debug run: 3 files" },
    ],
  },

  {
    slug: "analytics-studio",
    title: "Analytics Studio: AI Report Builder",
    short: "Analytics Studio",
    category: "Generative AI",
    filter: "ai",
    featured: true,
    pitch: "Describe a report in plain language → get live KPIs, charts and tables in seconds, with numbers you can trust.",
    repo: gh("analytics-studio"),
    demo: "/projects/analytics-studio/demo.html",
    accent: "#FF9F6B",
    icon: "wand-magic-sparkles",
    cover: "architecture-flow",
    coverAlt: "Animated architecture: a new report goes through token rules, one LLM call, validator, engine, MCP and metrics views with RLS, then deep-dive, insights, renderer and delivery",
    points: [
      "LLM as planner, not calculator: Claude returns a JSON report spec; **the AI never writes SQL and never sees raw data**.",
      "MCP tools under each user's own login, so row-level security always holds.",
      "Hallucination guardrails: every measure and dimension is validated against the live catalog.",
      "Token optimization: plan caching and zero-token local edits; most follow-ups use no LLM call.",
      "Shipped v1.0 → v1.7 as a versioned npm package.",
    ],
    tech: ["Claude", "LLM", "MCP", "RAG-style grounding", "Prompt Engineering", "JavaScript", "npm", "Semantic Layer"],
    stats: [
      { v: "1", l: "LLM call per new report" },
      { v: "0", l: "AI calls for edits & drill-downs" },
      { v: "v1.0 → v1.7", l: "releases shipped" },
      { v: "5", l: "export formats" },
    ],
    problem: [
      "Every custom report took **hours of analyst work**, and every small change (\"add AOV\", \"compare with last month\") restarted the loop.",
      "The data team became a **report factory**, the same KPI was rebuilt in many reports so **numbers drifted**, and BI tools were too complex for clients to self-serve.",
    ],
    solution: [
      "**One prompt replaces hours of report building.** A client types *\"Revenue by channel for the last 30 days vs previous period\"*, uploads a requirement file or pastes a screenshot, and gets live KPIs, charts and tables from their own data, with comparisons, drill-down and \"what changed\" insights.",
      "Three responsibilities, cleanly separated: the **LLM plans** WHAT to show, the **semantic layer** defines WHAT THE NUMBERS MEAN and who can see them, and the **app** decides HOW to fetch, combine, check and draw. Because the LLM only plans, it can't invent a revenue formula, leak another client's data or run an expensive query.",
    ],
    built: [
      ["AI product design", "Defined the product from scratch: problem, users, UX, the AI/data boundary and the roadmap. Shipped v1.0 → v1.7."],
      ["Report spec", "A JSON \"report spec\" is the contract between the LLM and the app (kpi, chart, table and join blocks). It can be validated, diffed, cached, edited locally, saved and scheduled. SQL from an LLM can do none of that safely."],
      ["Planner & grounding", "RAG-style prompt: rules + a compact catalog (names and one-line descriptions, never data) + the request. In edit mode the current spec is sent so the model returns a small change."],
      ["MCP integration", "All data goes through `list / get / query_metrics_view` under each user's own credentials, so **row-level security** always applies. Results are cached per session."],
      ["Validation layer", "Every plan is checked field by field against the live catalog. Unknown fields are dropped, a pie for a trend becomes a line, limits are clamped, and every repair is shown to the user."],
      ["Deep-dive agent", "Verifies join keys on real data (match rate ≥ 50%) before merging two views, e.g. revenue + recipe cost = profit and margin, with **null-safe** calculations (missing ≠ 0)."],
      ["Analysis & delivery", "Period comparisons, drill-down, insights, targets, forecasts, KPI alerts; exports (Excel, CSV, PDF, Power BI, HTML) and scheduled reports to email, Slack and Google Sheets."],
      ["Distribution", "A versioned **npm** package behind a tiny loader, so every client gets new versions instantly with no redeploys."],
    ],
    flow: [
      { icon: "user", t: "Plain-English request", s: "\"Revenue by channel, last 30 days vs previous\"", d: "The user types a request, uploads a requirement file or pastes a screenshot of a report they like." },
      { icon: "bolt", t: "Token rules", s: "0 tokens for edits & repeats", d: "Is this a small edit (make it a pie, top 5, last month) or a request already planned? Apply it locally from the plan cache. No AI call." },
      { icon: "brain", t: "AI planner (Claude)", s: "returns a JSON report spec", d: "Prompt = rules + compact catalog (names + descriptions, never data) + request. The only step that costs tokens, used once per new report. The AI never writes SQL." },
      { icon: "shield-halved", t: "Validator", s: "hallucination guardrails", d: "Every view, measure and dimension is checked against the live catalog. Invalid parts are repaired or dropped and the repair is shown, never silently guessed." },
      { icon: "layer-group", t: "MCP · semantic layer", s: "query_metrics_view · RLS", d: "The engine resolves half-open date ranges and runs one query per block (plus comparisons) in parallel through MCP, under the user's own login." },
      { icon: "diagram-project", t: "Deep-dive & insights", s: "verified joins · what changed", d: "Join blocks query both views at the shared grain and merge only if keys really match. Insights (KPI movement, biggest driver, concentration, best day) come free from fetched results." },
      { icon: "chart-column", t: "Render & deliver", s: "KPIs · charts · exports · schedules", d: "KPI tiles, SVG charts and sortable tables. Drill-down re-runs the same spec with a filter (no AI). Export to 5 formats or schedule to email, Slack, Google Sheets." },
    ],
    steps: [
      ["Token rules", "Small edits and repeated requests are handled locally (no AI)."],
      ["Planner", "One LLM call returns a JSON report spec grounded on the compact catalog."],
      ["Validator", "Checks each block against the live catalog; repairs or drops invalid parts."],
      ["Engine", "Half-open date ranges; one query per block plus comparison, in parallel via MCP."],
      ["Deep-dive", "Join blocks merge only when key match rate is high enough; calculations are null-safe."],
      ["Insights", "KPI movement, biggest driver, concentration, best period, join health."],
      ["Render & deliver", "KPIs, charts, tables, drill-down; export or schedule."],
    ],
    results: [
      "Reports became **self-serve**: the data team moved from building one-off reports to **infrastructure and data modeling**.",
      "**Only one step costs tokens**, and it is skipped for edits, drill-downs, re-runs and repeated requests.",
      "Shipped **v1.0 → v1.7** to every client instantly through npm versioning.",
      "No \"AI made up a number\" bugs: all numbers come from the semantic layer.",
    ],
    media: [
      { src: "demo-walkthrough.gif", alt: "Demo recording: typing a requirement, building the preview, changing it to a pie and filtering through the assistant, then a channel report with comparison and the export options", cap: "Demo walkthrough" },
      { src: "architecture-flow.gif", alt: "Animated architecture with three requests flowing through it", cap: "Architecture in motion" },
      { src: "request-walkthrough.gif", alt: "Inside one request: the compact catalog sent to the LLM, the JSON report spec it returns, the validator checks and five parallel MCP queries", cap: "Inside one request" },
      { src: "architecture.webp", alt: "Architecture: user → studio app (token rules, AI planner, validator, engine, deep-dive, insights, renderer, delivery) → MCP → data platform", cap: "Architecture" },
      { src: "s-channel.webp", alt: "Revenue by channel report", cap: "Revenue by channel vs previous period" },
      { src: "s-profit.webp", alt: "Profit by product joined report", cap: "Profit by product (verified join)" },
      { src: "s-items.webp", alt: "Top selling items report", cap: "Top selling items" },
      { src: "s-trend.webp", alt: "Daily revenue trend", cap: "Daily trend this month" },
      { src: "s-branch.webp", alt: "Branch-wise revenue table", cap: "Branch table with per-row comparison" },
      { src: "s-edit.webp", alt: "Pie chart after a local edit", cap: "Local edit \"make it a pie\" (no AI call)" },
    ],
  },

  {
    slug: "rill-client-analytics-platform",
    title: "Rill Client Analytics Platform",
    short: "Rill Analytics Platform",
    category: "BI as Code",
    filter: "bi",
    pitch: "BI as code on Rill + DuckDB: source pipelines → SQL models → metrics views → dashboards, with row-level security and alerts. Built AI-ready.",
    repo: gh("rill-client-analytics-platform"),
    accent: "#B7A6FF",
    icon: "layer-group",
    cover: "explore-dashboard",
    coverAlt: "Animated explore dashboard: comparison on, leaderboard filter, time range change, then a client login sees only its own restaurant through row-level security",
    points: [
      "Product ownership for **50+ restaurant clients**, from requirements to production rollout.",
      "SQL models at a known grain: separate bill and bill-line facts to avoid the **fan-out trap**.",
      "Metrics views (semantic layer) define each KPI once.",
      "Row-level security, Slack/email alerts and pre-deploy data-quality checks.",
      "AI-ready: powers Analytics Studio and the agentic skills over MCP.",
    ],
    tech: ["Rill", "DuckDB", "SQL", "MySQL", "Semantic Layer", "RLS", "MCP", "Claude Code"],
    stats: [
      { v: "50+", l: "restaurant clients" },
      { v: "4", l: "data-quality checks before every deploy" },
      { v: "1 row", l: "to onboard or offboard a client user" },
    ],
    problem: [
      "Reports were built by hand (SQL + Excel) for each client, and the **same KPI was calculated differently** in different reports.",
      "Owners waited for an analyst for simple questions, one shared database made client access risky, and data problems were found by clients.",
    ],
    solution: [
      "Migrated client reporting to **Rill on DuckDB**: BI as code, where every source, model, metrics view, dashboard and alert is a YAML or SQL file reviewed in Git, with dashboards that load in seconds.",
      "Every client uses the **same layered template**, so a new client is mostly configuration, not new code. That's how 50+ clients stayed maintainable.",
    ],
    built: [
      ["Source pipelines", "Raw data landed as-is from the **POS MySQL** database on a refresh schedule; no business logic, so every number traces back to source."],
      ["SQL models at a known grain", "`stg_orders` (one bill), `orders_enriched` (one bill + branch, city, restaurant) and `item_sales` (one bill line, item vs modifier). De-duplication with `QUALIFY ROW_NUMBER()` and a business-date rule (a 1 AM bill belongs to yesterday)."],
      ["Metrics views (semantic layer)", "Each KPI defined once: net revenue, orders, AOV, cancellations, delivery time, items vs modifiers. Business rules (completed orders only, net of discounts) live inside the measure."],
      ["Row-level security", "One `row_filter` per metrics view plus a small `user_access` mapping: each client, and each user within a client, sees only their own restaurants on every query."],
      ["Alerts", "YAML alerts with a cron schedule: duplicate order IDs (hourly, Slack), data freshness (Slack) and branch target achieved (email)."],
      ["Data-quality checks", "Duplicates, revenue reconciliation, orphan keys and freshness/sanity checks run before every deploy, expecting 0 rows."],
      ["AI-ready", "Clear names, descriptions, grains and RLS attributes so LLM agents answer from governed metrics. Used **Claude Code** for model development and validation."],
    ],
    flow: [
      { icon: "database", t: "POS MySQL", s: "sources · land raw data", d: "Raw tables land as-is on a refresh schedule (orders, order items, branches, products, user access). No business logic here, so any number can be traced back to the source." },
      { icon: "code", t: "SQL models · DuckDB", s: "clean · de-dup · set the grain", d: "stg_orders → orders_enriched (one row = one bill) and item_sales (one row = one bill line). Two fact tables on purpose: joining bills to lines would count each bill 2–4 times (the fan-out trap)." },
      { icon: "layer-group", t: "Metrics views", s: "the semantic layer", d: "Measures, dimensions, time column and security in business language. Net revenue means one thing in every dashboard, alert, export and AI agent." },
      { icon: "lock", t: "Row-level security", s: "row_filter per user", d: "Each signed-in email maps to restaurant ids. Rill applies the filter on every query (dashboards, pivots, exports, APIs). Onboarding a user = editing one CSV row." },
      { icon: "chart-line", t: "Explore dashboards", s: "compare · filter · pivot", d: "Time comparison, leaderboards that become filters, pivots for item vs modifier analysis, and CSV/Excel export." },
      { icon: "bolt", t: "Alerts & checks", s: "Slack · email · 0-row checks", d: "Duplicate orders, freshness and target-achieved alerts, plus four data-quality checks that must return 0 rows before every deploy." },
      { icon: "robot", t: "AI-ready over MCP", s: "Analytics Studio · agentic skills", d: "The same governed metrics views power Analytics Studio and the agentic analytics skills, so AI answers match the dashboards." },
    ],
    steps: [
      ["Requirements", "KPIs and definitions (does revenue include tax?), branches, users, targets."],
      ["Connect", "POS MySQL sources."],
      ["Model", "Clean, de-duplicate, business-day rule."],
      ["Metrics view", "Measures, dimensions, security."],
      ["Dashboards", "Sensible defaults: last 4 weeks, comparison on."],
      ["Validate", "Reconciliation checks against the POS."],
      ["Alerts", "Duplicates, freshness, targets."],
      ["Rollout", "Map users, walkthrough, launch."],
    ],
    results: [
      "**Self-serve dashboards** on governed metrics: owners filter, compare and drill themselves.",
      "**One definition per KPI** across every dashboard, alert, export and AI agent.",
      "Alerts and checks catch data problems **before clients do**.",
      "A new client is **configuration, not new code**.",
    ],
    media: [
      { src: "explore-dashboard.gif", alt: "Explore dashboard with comparison, leaderboard filter, time range and row-level security", cap: "Explore dashboard" },
      { src: "architecture.webp", alt: "Five-stage architecture: sources, models, metrics views, dashboards, consumers", cap: "Architecture" },
      { src: "pipeline-flow.svg", alt: "Animated pipeline: sources → models → metrics views → dashboards → alerts", cap: "Pipeline, file by file" },
      { src: "semantic-layer.webp", alt: "Raw tables → metrics view → dashboards, pivots, alerts, exports, APIs, AI agents", cap: "The semantic layer" },
      { src: "rls-flow.svg", alt: "Row-level security: each email maps to restaurant ids; the row filter returns only those rows", cap: "Row-level security" },
      { src: "alerts-flow.svg", alt: "Three alerts: duplicate orders, data freshness, target achieved", cap: "Alerts" },
      { src: "checks-terminal.svg", alt: "Terminal running the four data-quality checks, all returning 0 rows", cap: "Data-quality checks" },
      { src: "delivery-flow.svg", alt: "8-step client delivery flow", cap: "How each client was delivered" },
      { src: "menu-pivot.webp", alt: "Pivot: quantity sold as item vs as modifier by category", cap: "Menu pivot" },
    ],
  },

  {
    slug: "agentic-analytics-skills",
    title: "Agentic Analytics Skills (MCP + Agent Skills)",
    short: "Agentic Analytics Skills",
    category: "Agentic AI",
    filter: "ai",
    pitch: "Makes restaurant analytics answerable from any AI assistant: securely, consistently, in the format each client asks for.",
    repo: gh("agentic-analytics-skills"),
    accent: "#F472B6",
    icon: "robot",
    cover: "skill-architecture",
    coverAlt: "Animated skill architecture: a question loads the skill progressively, routes to one metrics view through MCP and row-level security, and returns a reconciled table",
    points: [
      "One MCP server works in **Claude, ChatGPT, Gemini, Grok** and any MCP client.",
      "MCP gives an AI *access*; the skill gives it *judgement*.",
      "Router, measure dictionary, token rules and locked output formats.",
      "About 2 tool calls per question instead of about 9.",
      "RLS in the semantic layer, OAuth per user, no access logic in prompts.",
    ],
    tech: ["MCP", "Agent Skills", "Claude", "ChatGPT", "Gemini", "Grok", "Agentic AI", "Prompt Engineering", "RLS"],
    stats: [
      { v: "4+", l: "AI tools served by one connector" },
      { v: "~2 vs ~9", l: "tool calls per question" },
      { v: "0", l: "access logic in prompts" },
    ],
    problem: [
      "Clients requested reports and the data team built them in a BI tool. Every AI tool needed its own integration.",
      "AI answers were inconsistent: wrong measures, wrong days, raw JSON. *Is \"sales\" gross or net? Is \"yesterday\" UTC or the restaurant's business day?* Every guess is a chance to be confidently wrong, and a different AI tool guesses differently.",
    ],
    solution: [
      "**One MCP server** on top of a governed semantic layer, plus **analytics skills** that turn the data team's knowledge into rules the agent follows every time.",
      "Clients ask their own AI assistant in plain language; the skill routes the question to one metrics view, applies the governed measure and filters, and returns a formatted, self-checked table. **The answer is the same in every AI tool.**",
    ],
    built: [
      ["One connector, every AI tool", "The same remote MCP server and skill files serve Claude (custom connector), ChatGPT (custom MCP connector), Gemini (CLI `mcpServers`), Grok (xAI remote MCP tool) and any MCP client. The data team maintains one integration."],
      ["Skill anatomy", "Frontmatter (decides when the skill loads), scope, token rules, **router** (one question → one metrics view), **measure dictionary** (gross vs net, edge cases), locked output formats and worked examples."],
      ["Progressive loading", "The agent always sees the short description, reads the core rules per question, and opens reference files only when needed."],
      ["Locked output", "One-line answer first, then the table sorted by the main measure with a Total row; comparisons add Previous and Δ%; a **self-check** re-queries if rows don't sum to the total."],
      ["Security", "OAuth per user on the MCP server; row-level security in the semantic layer filters every query; tools accept measures, dimensions and filters, never raw SQL or customer records."],
      ["Two ready-to-use skills", "`restaurant-analytics` (sales, orders, channels, payments, items, modifiers, top sellers) and `menu-combinations` (which Base + Topping + Filling combinations sold, with quantity and revenue reconciled)."],
    ],
    flow: [
      { icon: "users", t: "Client asks", s: "Claude · ChatGPT · Gemini · Grok", d: "\"Net sales by branch last week vs previous\": in any language, in the AI tool the client already uses." },
      { icon: "file-lines", t: "Skill loads", s: "progressive: description → rules → refs", d: "The frontmatter description decides when the skill triggers. Core rules load per question; reference files only when needed." },
      { icon: "diagram-project", t: "Router", s: "one question → one metrics view", d: "Revenue, orders, AOV, channels → orders_metrics; payment methods → payments_metrics; items → item_sales_metrics; toppings → item_options_metrics; top sellers → best_sellers_metrics." },
      { icon: "book-open", t: "Measure dictionary", s: "business words → exact measures", d: "\"net sales\" → net_revenue on completed orders; \"sales\" → gross_revenue; store-local business dates, never UTC. Token rules: ≤ 2 queries, small limits, no raw rows." },
      { icon: "lock", t: "MCP server · RLS", s: "OAuth per user", d: "query_metrics_view runs as the signed-in user. Row-level security in the semantic layer returns only this client's rows, in every AI tool." },
      { icon: "check", t: "Self-check", s: "rows must sum to the total", d: "If the breakdown doesn't reconcile, the agent re-queries. If a view errors, it says so plainly: no silent fallback, no guess." },
      { icon: "table", t: "Verified answer", s: "one line + table + total + follow-up", d: "The same answer and format in Claude, ChatGPT, Gemini and Grok, in about 2 tool calls instead of about 9." },
    ],
    steps: [
      ["Trigger", "The skill's description matches the question."],
      ["Route", "Pick ONE metrics view."],
      ["Translate", "Dictionary maps words to measures and default filters."],
      ["Query", "≤ 2 queries through MCP under the user's own login."],
      ["Check", "Breakdown must sum to the total, or re-query."],
      ["Answer", "One line + table + total + one follow-up."],
    ],
    results: [
      "**4+ AI tools** served by **one connector**.",
      "**1 skill = consistent answers** in every tool.",
      "About **2 tool calls per question instead of about 9**, with the governed net-sales measure and store-local business dates. *(Token figures in the README are illustrative.)*",
      "**0 access logic in prompts**: security lives below every tool.",
    ],
    media: [
      { src: "skill-architecture.gif", alt: "Animated skill architecture: progressive loading, routing, MCP and RLS, reconciled answer", cap: "Skill architecture" },
      { src: "hero.svg", alt: "Client data → governed layer (metrics views, RLS, MCP server, analytics skill) → Claude, ChatGPT, Gemini, Grok", cap: "Agentic analytics overview" },
      { src: "with-vs-without.svg", alt: "Same question with and without the skill: ~9 tool calls and a wrong measure vs ~2 tool calls and a reconciled table (illustrative)", cap: "With vs without the skill (illustrative)" },
      { src: "skill-anatomy.svg", alt: "Skill anatomy: frontmatter, scope, token rules, router, dictionary, output formats, references", cap: "Skill anatomy" },
      { src: "menu-combinations-flow.gif", alt: "Menu combinations method: group, pivot, count, reconcile quantity and revenue", cap: "Menu combinations method" },
      { src: "rls.svg", alt: "Row-level security: each user's login applies a row filter", cap: "Row-level security" },
    ],
  },

  {
    slug: "sigma-computing-analytics-platform",
    title: "Sigma Computing Analytics Platform",
    short: "Sigma Computing Platform",
    category: "Business Intelligence",
    filter: "bi",
    pitch: "A complete, practical guide to Sigma Computing, from running it end to end as admin for 50+ clients.",
    repo: gh("sigma-computing-analytics-platform"),
    accent: "#60A5FA",
    icon: "chart-pie",
    cover: "workbook-demo",
    coverAlt: "Animated Sigma-style workbook: branch and date controls update KPIs and charts, RLS switches the view for another brand, and a target-achieved alert appears",
    points: [
      "Sigma admin with **100% platform ownership**.",
      "**400+ dashboards** for **50+ restaurant clients**.",
      "Live connections to MySQL (POS) and Snowflake.",
      "Governed data models with relationships, metrics, custom SQL and RLS.",
      "Controls, conditional alerts and scheduled exports.",
    ],
    tech: ["Sigma Computing", "SQL", "MySQL", "Snowflake", "Data Modeling", "RLS"],
    stats: [
      { v: "400+", l: "dashboards built" },
      { v: "50+", l: "restaurant clients" },
      { v: "100%", l: "platform ownership" },
    ],
    problem: [
      "**50+ multi-branch restaurant brands** needed reliable, always-current reporting, each seeing only its own data.",
      "Restaurant owners check sales many times a day, so stale extracts and duplicate BI pipelines weren't acceptable, and 400+ dashboards had to stay maintainable.",
    ],
    solution: [
      "Sigma Computing on **live connections** to MySQL (POS) and Snowflake: every filter and formula compiles to SQL in the warehouse, so dashboards always show current data.",
      "Everything client-specific lives in **user attributes, team access and the data model's filters**. Dashboards are shared templates, so improving one template improves it for every client.",
    ],
    built: [
      ["Connections", "MySQL (POS) and Snowflake with read-only service users, SSL, and *Can use* only for builders; viewers only ever touch data models."],
      ["Governed data models", "One element per grain (bills, bill lines, payments), **relationships** (many-to-one, joined only when used), **metrics** defined once (Net revenue, Orders, AOV, Discount %, Cancel rate) and custom SQL elements."],
      ["Row-level security", "User attributes (`restaurant`, `branch`) in an RLS column or custom SQL filter, applied in the data model so every workbook inherits it; column-level security for cost columns."],
      ["Optimised custom SQL", "Filter first, aggregate each grain separately (no fan-out), join aggregates not raw rows, controls inside SQL, `NULLIF` on divisors."],
      ["Workbooks & controls", "Template pages (Overview, Branches, Channels, Menu, Payments, Delivery) with synced date-range, restaurant, branch and channel controls; input tables for targets."],
      ["Alerts & exports", "Conditional alerts (target achieved, discrepancy, drop) and scheduled exports to email, Slack and Google Sheets."],
      ["Administration & governance", "Teams, workspaces, folders, permissions, account types, onboarding and offboarding."],
    ],
    flow: [
      { icon: "database", t: "MySQL · Snowflake", s: "live connections", d: "The POS database and the analytics warehouse, queried live. No extracts: dashboards show what's in the database now." },
      { icon: "key", t: "Connections & access", s: "read-only service users · SSL", d: "Only builders get Can use on a connection. Viewers only ever touch governed data models, never raw tables." },
      { icon: "layer-group", t: "Data model", s: "relationships · metrics · custom SQL", d: "One element per grain, many-to-one relationships joined only when used, and metrics defined once, so 400+ dashboards use the same number." },
      { icon: "lock", t: "RLS via user attributes", s: "restaurant · branch", d: "CurrentUserAttributeText('restaurant') in an RLS column or custom SQL filter, filtered to True, hidden and published. Every downstream workbook inherits it." },
      { icon: "chart-pie", t: "Workbooks & controls", s: "template pages · synced controls", d: "KPI row first, trend second, breakdowns third, detail last. Date range, restaurant, branch and channel controls re-query live." },
      { icon: "bolt", t: "Alerts & exports", s: "target · discrepancy · drop", d: "Conditional alerts send only when true (target achieved, POS discrepancy, sharp drop); scheduled exports to email, Slack, Google Sheets." },
      { icon: "users", t: "50+ clients", s: "each sees only their brand", d: "Built once on the template model, then configured per client: that's how 400+ dashboards stayed maintainable." },
    ],
    steps: [
      ["Requirements", "KPIs, branches, users, targets."],
      ["Connect", "MySQL / Snowflake."],
      ["Data model", "Elements, relationships, metrics."],
      ["Security", "User attributes, RLS, CLS, teams."],
      ["Workbook", "Template pages, controls, custom SQL."],
      ["Validate", "Matches the POS? If not, back to the model."],
      ["Automate", "Schedules, target and discrepancy alerts."],
      ["Handover", "Walkthrough, access, support."],
    ],
    results: [
      "**400+ dashboards** for **50+ clients** on shared templates.",
      "**One definition per metric**: change it once and every dashboard updates.",
      "Live queries: **no refresh lag** and no duplicate pipelines just for BI.",
      "Every client sees **only its own rows**, enforced in the data model.",
    ],
    media: [
      { src: "workbook-demo.gif", alt: "Sigma-style workbook: controls update KPIs, RLS switches the view, a target alert appears (illustrative, synthetic)", cap: "Workbook demo (illustrative)" },
      { src: "architecture.svg", alt: "Sources (MySQL, Snowflake) → Sigma (data models, workbooks, RLS, alerts) → people", cap: "Architecture" },
      { src: "relationships.svg", alt: "ERD: orders many-to-one to branches; branches to restaurants; order_items to orders", cap: "Relationships" },
      { src: "join-lookup-union.svg", alt: "Join adds columns; lookup adds a few columns keeping row count; union stacks rows", cap: "Joins, lookups & unions" },
      { src: "controls.svg", alt: "Date range, list values, segmented and top N controls", cap: "Controls" },
      { src: "rls.svg", alt: "User attributes feed an RLS filter in the data model", cap: "Row-level security" },
      { src: "alerts.svg", alt: "Schedule → check condition → send only if true", cap: "Alerts" },
      { src: "delivery-workflow.svg", alt: "8-step delivery: requirements, connect, data model, security, workbook, validate, automate, handover", cap: "Delivery playbook" },
    ],
  },
];
