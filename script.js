(() => {
  "use strict";
  document.documentElement.classList.add("has-js");
  const menu = document.querySelector(".menu");
  const nav = document.querySelector("#navigation");
  if (menu && nav) {
    const close = () => { menu.setAttribute("aria-expanded", "false"); nav.classList.remove("open"); };
    menu.addEventListener("click", () => {
      const open = menu.getAttribute("aria-expanded") !== "true";
      menu.setAttribute("aria-expanded", String(open)); nav.classList.toggle("open", open);
    });
    nav.addEventListener("click", event => { if (event.target.closest("a")) close(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") { close(); menu.focus(); } });
    document.addEventListener("click", event => { if (!event.target.closest(".header")) close(); });
    window.matchMedia("(max-width: 700px)").addEventListener("change", close);
  }
  const config = window.INDOFREQ_SITE || {};
  let url;
  try { url = new URL(config.apkUrl); } catch { return; }
  const path = /^\/[^/]+\/[^/]+\/releases\/(?:download\/[^/]+|latest\/download)\/[^/]+\.apk$/i;
  if (url.protocol !== "https:" || url.hostname !== "github.com" || url.port || url.username || url.password || url.search || url.hash || !path.test(url.pathname)) return;
  document.querySelectorAll("[data-apk-hero], [data-apk-download]").forEach(link => { link.href = url.href; link.hidden = false; });
  const fallback = document.querySelector("[data-apk-fallback]");
  if (fallback) fallback.hidden = true;
  const status = document.querySelector("[data-apk-status]");
  if (status) status.textContent = ["Direct download from GitHub Releases", config.apkVersion, config.apkSize].filter(value => typeof value === "string" && value.trim()).join(" · ");
})();
