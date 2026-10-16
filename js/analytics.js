/*
 * Google Analytics 4, loaded ONLY after the visitor accepts (no cookies / no tracking before that).
 * The Measurement ID lives in data/desserts.js (SITE.analyticsId). Leave it empty to disable everything.
 */
(function () {
  "use strict";
  var ID = window.SITE && window.SITE.analyticsId;
  if (!ID) return;

  var KEY = "dd-analytics-consent"; // "yes" | "no"
  var loaded = false;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* private mode: just don't remember */ } }

  function load() {
    if (loaded) return;
    loaded = true;
    window["ga-disable-" + ID] = false;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ID);
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", ID, { anonymize_ip: true });
  }

  // Public helper used by app.js; does nothing until consent was given.
  window.track = function (name, params) { if (loaded) gtag("event", name, params || {}); };

  // Count taps on the call / WhatsApp links anywhere on the page.
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href");
    if (href.indexOf("tel:") === 0) window.track("click_call", { location: a.closest("nav, header, footer, section") ? (a.closest("nav, header, footer, section").className || "page") : "page" });
    else if (href.indexOf("wa.me") !== -1) window.track("click_whatsapp", { location: a.closest("nav, header, footer, section") ? (a.closest("nav, header, footer, section").className || "page") : "page" });
  });

  var banner;
  function closeBanner() {
    if (banner) { banner.remove(); banner = null; }
    document.body.classList.remove("has-consent-banner");
  }
  function openBanner() {
    if (banner) return;
    var text = document.createElement("p");
    text.id = "consent-text";
    text.textContent = "האתר משתמש ב-Google Analytics (עוגיות) כדי לספור ביקורים בצורה אנונימית ולשפר את האתר. מאשרים?";
    var yes = document.createElement("button");
    yes.type = "button"; yes.className = "btn btn-primary btn-small"; yes.textContent = "מאשר/ת";
    var no = document.createElement("button");
    no.type = "button"; no.className = "btn btn-outline btn-small"; no.textContent = "לא, תודה";
    var row = document.createElement("div");
    row.className = "consent-actions"; row.appendChild(yes); row.appendChild(no);
    banner = document.createElement("div");
    banner.className = "consent-banner";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-labelledby", "consent-text");
    banner.appendChild(text); banner.appendChild(row);
    document.body.appendChild(banner);
    document.body.classList.add("has-consent-banner");
    yes.addEventListener("click", function () { write("yes"); closeBanner(); load(); });
    no.addEventListener("click", function () {
      write("no"); closeBanner();
      if (loaded) window["ga-disable-" + ID] = true; // stop sending if it was on before
    });
  }

  var saved = read();
  if (saved === "yes") load();
  else if (saved !== "no") openBanner();

  // Footer link lets visitors change their mind.
  var link = document.getElementById("privacy-settings");
  if (link) {
    link.hidden = false;
    link.addEventListener("click", function () { closeBanner(); openBanner(); });
  }
})();
