/* Dganit's fruit desserts – vanilla JS, no build step. Data comes from data/desserts.js (window.SITE). */
(function () {
  "use strict";

  var SITE = window.SITE;
  var PRICE = SITE.price;
  var MAX_QTY = 99;
  var MIN_ADVANCE_DAYS = SITE.advanceDays; // orders need to be placed this many days ahead

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var qty = {}; // dessert id -> quantity

  function el(tag, props, children) {
    var node = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      if (k === "text") node.textContent = props[k];
      else if (k === "class") node.className = props[k];
      else node.setAttribute(k, props[k]);
    });
    (children || []).forEach(function (c) { node.appendChild(c); });
    return node;
  }

  /* ---------- price everywhere ---------- */
  document.querySelectorAll("[data-price]").forEach(function (n) { n.textContent = PRICE; });

  /* ---------- dessert cards ---------- */
  var grid = $("#dessert-grid");
  grid.textContent = "";
  SITE.desserts.forEach(function (d) {
    var badge = el("span", { class: "card-badge", id: "badge-" + d.id, "aria-hidden": "true" });
    var img = el("img", { src: d.image, alt: d.alt || d.name, loading: "lazy", width: "600", height: "600" });
    var btn = el("button", { type: "button", class: "btn btn-outline", "data-add": d.id, text: "הוסף להזמנה" });
    btn.setAttribute("aria-label", "הוסף להזמנה: " + d.name);
    var card = el("article", { class: "card" }, [
      el("div", { class: "card-photo" }, [img, badge]),
      el("div", { class: "card-body" }, [
        el("h3", { text: d.name }),
        el("p", { text: d.description }),
        el("p", { class: "card-price", text: PRICE + " ₪" }),
        btn,
      ]),
    ]);
    grid.appendChild(el("li", {}, [card]));
  });

  /* ---------- quantity rows in the form ---------- */
  var qtyList = $("#qty-list");
  SITE.desserts.forEach(function (d) {
    qty[d.id] = 0;
    var input = el("input", {
      type: "number", class: "qty-input", id: "qty-" + d.id, min: "0", max: String(MAX_QTY),
      value: "0", inputmode: "numeric", "aria-label": "כמות: " + d.name,
    });
    var minus = el("button", { type: "button", class: "qty-btn", "data-step": "-1", "data-id": d.id, text: "−" });
    var plus = el("button", { type: "button", class: "qty-btn", "data-step": "1", "data-id": d.id, text: "+" });
    minus.setAttribute("aria-label", "הפחת " + d.name);
    plus.setAttribute("aria-label", "הוסף " + d.name);
    qtyList.appendChild(el("div", { class: "qty-row" }, [
      el("span", { class: "qty-name", text: d.name }),
      el("div", { class: "qty-ctrl" }, [plus, input, minus]),
    ]));
  });

  function setQty(id, n) {
    n = Math.max(0, Math.min(MAX_QTY, parseInt(n, 10) || 0));
    qty[id] = n;
    $("#qty-" + id).value = n;
    var badge = $("#badge-" + id);
    badge.textContent = n;
    badge.classList.toggle("on", n > 0);
    updateTotal();
  }

  function countText(n) { return n === 1 ? "קינוח אחד" : n + " קינוחים"; }

  function totals() {
    var count = 0;
    SITE.desserts.forEach(function (d) { count += qty[d.id]; });
    return { count: count, sum: count * PRICE };
  }

  function updateTotal() {
    var t = totals();
    $("#total-output").textContent = t.sum + " ₪";
    $("#total-detail").textContent = t.count
      ? countText(t.count) + " × " + PRICE + " ₪"
      : "לא נבחרו קינוחים";
    if (t.count) clearError("items");
  }

  qtyList.addEventListener("click", function (e) {
    var b = e.target.closest("[data-step]");
    if (!b) return;
    setQty(b.dataset.id, qty[b.dataset.id] + parseInt(b.dataset.step, 10));
  });
  qtyList.addEventListener("input", function (e) {
    if (e.target.classList.contains("qty-input")) setQty(e.target.id.replace("qty-", ""), e.target.value);
  });
  // Don't rewrite the field while the user is typing; normalise on blur.
  qtyList.addEventListener("change", function (e) {
    if (e.target.classList.contains("qty-input")) setQty(e.target.id.replace("qty-", ""), e.target.value);
  });

  /* ---------- "add to order" buttons + toast ---------- */
  var toast = $("#toast");
  var toastTimer;
  function showToast(name) {
    toast.textContent = "";
    toast.appendChild(el("span", { text: "נוסף להזמנה: " + name }));
    toast.appendChild(el("a", { href: "#order", text: "לטופס ההזמנה ←" }));
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 4500);
  }
  grid.addEventListener("click", function (e) {
    var b = e.target.closest("[data-add]");
    if (!b) return;
    var d = SITE.desserts.filter(function (x) { return x.id === b.dataset.add; })[0];
    setQty(d.id, qty[d.id] + 1);
    showToast(d.name + " (" + qty[d.id] + ")");
  });
  toast.addEventListener("click", function (e) { if (e.target.closest("a")) toast.hidden = true; });

  /* ---------- gallery + lightbox ---------- */
  var galleryGrid = $("#gallery-grid");
  var lightbox = $("#lightbox");
  var lightboxImg = $("#lightbox-img");
  SITE.gallery.forEach(function (g) {
    var img = el("img", { src: g.image, alt: g.alt, loading: "lazy" });
    var b = el("button", { type: "button", "aria-label": "הגדלת תמונה: " + g.alt }, [img]);
    b.addEventListener("click", function () {
      lightboxImg.src = g.image;
      lightboxImg.alt = g.alt;
      if (lightbox.showModal) lightbox.showModal();
      else lightbox.setAttribute("open", "");
    });
    galleryGrid.appendChild(el("li", {}, [b]));
  });
  // Click on the dark backdrop closes it.
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) lightbox.close(); });

  /* ---------- date: min = today (+ advance notice) ---------- */
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function isoDate(dt) { return dt.getFullYear() + "-" + pad(dt.getMonth() + 1) + "-" + pad(dt.getDate()); }
  var minDate = new Date();
  minDate.setDate(minDate.getDate() + MIN_ADVANCE_DAYS);
  $("#f-date").min = isoDate(minDate);
  $("#min-date-text").textContent = formatDate(isoDate(minDate));

  /* ---------- validation ---------- */
  var errors = {
    name: "נא למלא שם", phone: "נא למלא מספר טלפון תקין, למשל 050-1234567",
    items: "נא לבחור לפחות קינוח אחד", date: "נא לבחור תאריך רצוי",
  };
  function setError(key, msg) {
    var p = $("#err-" + key);
    p.textContent = msg;
    var field = key === "items" ? $("#qty-list").closest("fieldset") : $("#f-" + key);
    field.setAttribute("aria-invalid", "true");
  }
  function clearError(key) {
    var p = $("#err-" + key);
    if (!p) return;
    p.textContent = "";
    var field = key === "items" ? $("#qty-list").closest("fieldset") : $("#f-" + key);
    field.removeAttribute("aria-invalid");
  }
  ["name", "phone", "date"].forEach(function (k) {
    $("#f-" + k).addEventListener("input", function () { clearError(k); });
  });

  function normalizePhone(raw) {
    var p = raw.replace(/[\s\-().]/g, "");
    if (p.indexOf("+972") === 0) p = "0" + p.slice(4);
    else if (p.indexOf("972") === 0) p = "0" + p.slice(3);
    return /^0\d{8,9}$/.test(p) ? p : null;
  }
  function formatDate(iso) { var s = iso.split("-"); return s[2] + "/" + s[1] + "/" + s[0]; }

  function buildMessage(v) {
    var lines = ["שלום דגנית, אשמח להזמין קינוחי פירות 🍓", ""];
    lines.push("שם: " + v.name);
    lines.push("טלפון: " + v.phone);
    lines.push("תאריך רצוי: " + formatDate(v.date));
    lines.push("", "ההזמנה:");
    var count = 0;
    SITE.desserts.forEach(function (d) {
      if (qty[d.id] > 0) {
        count += qty[d.id];
        lines.push("• " + d.name + " – " + qty[d.id] + " יח׳ (" + qty[d.id] * PRICE + " ₪)");
      }
    });
    lines.push("", "סה״כ: " + countText(count) + ", " + count * PRICE + " ₪");
    if (v.notes) lines.push("", "הערות: " + v.notes);
    return lines.join("\n");
  }
  // exposed for manual testing from the console
  window.__buildOrderMessage = buildMessage;

  var form = $("#order-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var status = $("#send-status");
    status.textContent = "";
    var first = null;
    function fail(key, msg, focusEl) { setError(key, msg); if (!first) first = focusEl; }

    var name = $("#f-name").value.trim();
    var phone = normalizePhone($("#f-phone").value);
    var date = $("#f-date").value;

    ["name", "phone", "items", "date"].forEach(clearError);
    if (!name) fail("name", errors.name, $("#f-name"));
    if (!phone) fail("phone", errors.phone, $("#f-phone"));
    if (!totals().count) fail("items", errors.items, qtyList.querySelector(".qty-btn"));
    if (!date) fail("date", errors.date, $("#f-date"));
    else if (date < $("#f-date").min) fail("date", "נא לבחור תאריך החל מ-" + formatDate($("#f-date").min) + " (הזמנה שבוע מראש)", $("#f-date"));
    if (first) { first.focus(); return; }

    var msg = buildMessage({ name: name, phone: phone, date: date, notes: $("#f-notes").value.trim() });
    var url = "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(msg);
    var w = window.open(url, "_blank");
    if (w) w.opener = null; // (the "noopener" feature would make window.open always return null)
    status.textContent = "";
    status.appendChild(document.createTextNode(w ? "נפתח וואטסאפ עם ההודעה – נא ללחוץ שם על שליחה. " : "לחצו כדי לפתוח את ההודעה בוואטסאפ: "));
    status.appendChild(el("a", { href: url, target: "_blank", rel: "noopener", text: "פתיחה בוואטסאפ" }));
  });

  updateTotal();
})();
