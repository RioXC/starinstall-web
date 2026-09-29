/* StarInstall — legal page (tabs via #legal, #privacy, #cookies, #terms) */
(function () {
  var S = {lang: initialLang(), ck: load("si_ck")};
  var app = document.getElementById("app");

  function tab() { var i = LEGAL_IDS.indexOf((location.hash || "#legal").slice(1)); return i < 0 ? 0 : i; }

  function render() {
    var lang = S.lang, D = L[lang], t = T[lang], ti = tab(), doc = D.docs[ti];
    document.documentElement.lang = lang;
    document.title = "StarInstall · " + doc.t;
    var h = headerHTML(lang, null, t.nav.quote, "index.html");
    h += '<main style="background:#F5F2EC"><div class="wrap"><div class="lhead"><a href="index.html" style="font-weight:600">' + esc(D.back) + '</a><h1 style="margin-top:16px">' + esc(D.heading) + '</h1><p class="dim" style="color:#4B5766;margin-top:6px">' + esc(D.updated) + '</p></div>';
    h += '<nav class="ltabs" aria-label="' + esc(D.heading) + '">' + D.docs.map(function (d, i) { return '<a href="#' + LEGAL_IDS[i] + '"' + (i === ti ? ' aria-current="page"' : '') + '>' + esc(d.t) + '</a>'; }).join("") + '</nav>';
    h += '<article class="ldoc"><h2>' + esc(doc.t) + '</h2><p>' + esc(doc.intro) + '</p>';
    if (ti === 0) {
      h += '<section class="idbox"><h3>' + esc(D.idTitle) + '</h3><dl>' +
        '<div><dt>' + esc(D.ids[1]) + '</dt><dd>StarInstall</dd></div>' +
        '<div><dt>' + esc(D.ids[5]) + '</dt><dd><a href="' + waLink("") + '" target="_blank" rel="noopener"><b>' + esc(D.wa) + '</b></a></dd></div>' +
        '</dl></section>';
    }
    h += doc.s.map(function (x) { return '<section><h3>' + esc(x.h) + '</h3><p>' + esc(x.p) + '</p></section>'; }).join("");
    h += '</article></div></main>';
    h += footerHTML(lang, t.foot.tag, t.foot.disc, t.foot.tm, t.foot.rights, t.foot.ckLink, "");
    if (!S.ck) h += cookieHTML(t.foot, "");
    app.innerHTML = h;
  }

  app.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-lang],[data-ck],[data-ck-open]");
    if (!b) return;
    if (b.hasAttribute("data-lang")) { S.lang = b.getAttribute("data-lang"); store("si_lang", S.lang); }
    else if (b.hasAttribute("data-ck")) { S.ck = b.getAttribute("data-ck"); store("si_ck", S.ck); applyCookieChoice(S.ck); }
    else if (b.hasAttribute("data-ck-open")) { S.ck = null; }
    render();
  });
  window.addEventListener("hashchange", function () { render(); window.scrollTo(0, 0); });
  if (S.ck) applyCookieChoice(S.ck);
  render();
})();
