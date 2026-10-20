(() => {
  const B = {
    wa: "201285655805",
    n: "01285655805",
    tt: "https://www.tiktok.com/@beskostore",
    items: [
      { n: "تيشيرت كورة", d: "تشكيلات كورة جديدة", img: "p1" },
      { n: "تراكة رياضية", d: "شتوي ومريح", img: "p2" },
      { n: "ترنج رياضي قطن", d: "قطن مريح للتمرين", img: "p3" },
      { n: "تشكيلة ماركات", d: "أجدد الماركات", img: "p4" },
      { n: "ملابس رياضية نسائية", d: "تشكيلات حريمي", img: "p5" },
      { n: "عروض جملة", d: "أسعار جملة مش قطاعي", img: "p6" },
    ],
    faqs: [
      ["إزاي أطلب؟", "ابعتلنا القطعة والمقاس اللي عايزها على واتساب 01285655805 وهنرد عليك بالتفاصيل والمتاح."],
      ["بتوصلوا فين؟", "بنوصّل لكل مصر 🇪🇬 — من معرضنا في المنوفية، مدينة منوف، طريق برهيم."],
      ["إيه اللي بتبيعوه؟", "ملابس رياضية: تيشيرتات كورة، تراكات وترنجات رياضية، وتشكيلة ماركات — للرجالي والحريمي."],
      ["الأسعار فين؟", "الأسعار والمقاسات المتاحة بتيجي على واتساب مباشرة، وكلمنا وهنرد عليك."],
    ],
  };

  const $ = (s) => document.querySelector(s);
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wa = (t) => `https://wa.me/${B.wa}?text=${encodeURIComponent(t)}`;
  const hello = "أهلاً، عايز أسأل عن منتجات بيسكو ستور";

  ["#navWa", "#mWa", "#heroWa", "#shopWa", "#delWa"].forEach((s) => ($(s).href = wa(hello)));
  $("#fWa").href = wa(hello);
  $("#fWa").textContent = B.n;

  // 8-dot cluster (3x3 minus centre) — brand mark + loader
  const dots = (el) => {
    el.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      const d = document.createElement("i");
      if (i === 4) d.className = "skip";
      d.style.animationDelay = (i * 0.06).toFixed(2) + "s";
      el.appendChild(d);
    }
  };
  dots($("#ldots"));
  document.querySelectorAll(".dots-sm").forEach(dots);

  // products
  $("#grid").innerHTML = B.items
    .map(
      (it, i) => `<a class="pc rv" style="--d:${(i % 3) * 0.07}s" href="${B.tt}" target="_blank" rel="noopener">
      <span class="pc-img"><img src="img/${it.img}.jpg" alt="${it.n}" loading="lazy"></span>
      <span class="pc-meta"><h3>${it.n}</h3><span>${it.d}</span></span>
    </a>`
    )
    .join("");

  // faq
  $("#faqList").innerHTML = B.faqs
    .map(([q, a]) => `<details class="rv"><summary>${q}</summary><p>${a}</p></details>`)
    .join("");

  // drawer
  const menu = $("#menu"), burger = $("#burger");
  const setMenu = (open) => {
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    root.classList.toggle("lock", open);
  };
  burger.onclick = () => setMenu(!menu.classList.contains("open"));
  menu.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
  addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  // reveals
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (en) => en.forEach((x) => x.isIntersecting && (x.target.classList.add("in"), io.unobserve(x.target))),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
  } else document.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));

  // loading page → hero entrance
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    $("#loader").classList.add("gone");
    root.classList.remove("loading");
    root.classList.add("ready");
  };
  if (reduce) start();
  else {
    const min = new Promise((r) => setTimeout(r, 1200));
    const loaded = new Promise((r) => (document.readyState === "complete" ? r() : addEventListener("load", r)));
    Promise.all([min, loaded]).then(start);
    setTimeout(start, 4500);
  }
})();
