/* StarInstall — landing page */
(function () {
  var CFG = {daysMin: 2, daysMax: 7, replyH: 24, warrantyM: 12, prices: {roof: 150, pole: 250, veh: 290, boat: 390, biz: 690}};
  var S = {lang: initialLang(), country: null, form: {name: "", phone: "", loc: "", job: "", kit: "", consent: false}, tried: false, sent: false, waUrl: "", ck: load("si_ck")};
  var app = document.getElementById("app");

  function tr() {
    var lang = S.lang, ctry = S.country || LANGC[lang];
    var dA = CFG.daysMin, dB = CFG.daysMax;
    var dr = dA === dB ? String(dA) : (lang === "fr" ? dA + " à " + dB : dA + "–" + dB);
    var t = fill(T[lang], {d: dr, h: CFG.replyH, w: CFG.warrantyM, i: T[lang].cin[ctry]});
    t.form.locPh = t.form.locPh.replace("{x}", C[ctry].loc);
    t.x = JSON.parse(JSON.stringify(X[lang]).replace(/\{h\}/g, CFG.replyH));
    return {t: t, ctry: ctry};
  }

  function validate(t) {
    var f = S.form, E = t.form.err, e = {};
    if (!f.name.trim()) e.name = E.req;
    var dg = f.phone.replace(/\D/g, "");
    if (!f.phone.trim()) e.phone = E.req; else if (dg.length < 9) e.phone = E.phone;
    if (!f.loc.trim()) e.loc = E.req;
    if (!f.job) e.job = E.job;
    if (!f.kit) e.kit = E.kit;
    if (!f.consent) e.consent = E.consent;
    return e;
  }

  function field(id, key, label, type, ph, e, auto) {
    return '<div class="field' + (e[key] ? ' bad' : '') + '"><label for="' + id + '">' + esc(label) + '</label>' +
      '<input id="' + id + '" name="' + key + '" type="' + type + '" autocomplete="' + auto + '" value="' + esc(S.form[key]) + '"' + (ph ? ' placeholder="' + esc(ph) + '"' : '') + (e[key] ? ' aria-invalid="true" aria-describedby="' + id + '-e"' : '') + '>' +
      (e[key] ? '<span class="emsg" id="' + id + '-e">' + esc(e[key]) + '</span>' : '') + '</div>';
  }

  function render() {
    var R = tr(), t = R.t, lang = S.lang, ctry = R.ctry;
    document.documentElement.lang = lang;
    document.title = "StarInstall · " + t.hero.h1;
    var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute("content", t.hero.sub);
    var e = S.tried ? validate(t) : {};
    var hasErr = Object.keys(e).length > 0;
    var gal = {farm: t.trust.caps[0], cabin: t.trust.caps[1], boat: t.trust.caps[2], van: t.trust.caps[3]};
    var waQuote = waLink(t.x.waQuote);
    var h = "";

    h += headerHTML(lang, [["#how", t.nav.how], ["#prices", t.nav.prices], ["#faq", t.nav.faq], ["#areas", t.nav.areas]], t.nav.quote, "");

    /* hero */
    h += '<main><section class="hero" id="top"><div class="wrap"><div>' +
      '<span class="eyebrow">' + I.shield + esc(t.hero.eyebrow) + '</span>' +
      '<h1>' + esc(t.hero.h1) + '</h1><p class="sub">' + esc(t.hero.sub) + '</p>' +
      '<div class="ctas"><a class="btn btn-acc" href="' + waQuote + '" target="_blank" rel="noopener">' + I.wa() + '<span>' + esc(t.hero.wa) + '</span></a>' +
      '<a class="btn btn-ghost" href="#quote">' + I.cam + '<span>' + esc(t.hero.form) + '</span></a></div>' +
      '<p class="nokit">' + esc(t.form.noKit) + ' <a href="https://www.starlink.com/" target="_blank" rel="noopener">' + esc(t.form.noKitLink) + '&nbsp;↗</a></p>' +
      '<ul class="points">' + t.hero.points.map(function (p) { return '<li>' + I.check("#F2A541") + '<span>' + esc(p) + '</span></li>'; }).join("") + '</ul></div>' +
      '<div class="photos">' +
      '<figure><img src="img/farm.jpg" alt="' + esc(gal.farm) + '" style="object-position:30% 50%" fetchpriority="high"><figcaption class="cap"><span>' + esc(gal.farm) + '</span></figcaption></figure>' +
      '<figure><img src="img/cabin.jpg" alt="' + esc(gal.cabin) + '" style="object-position:60% 50%" loading="lazy"><figcaption class="cap"><span>' + esc(gal.cabin) + '</span></figcaption></figure>' +
      '<figure><img src="img/boat.jpg" alt="' + esc(gal.boat) + '" style="object-position:55% 35%" loading="lazy"><figcaption class="cap"><span>' + esc(gal.boat) + '</span></figcaption></figure>' +
      '</div></div></section>';

    /* segments */
    var segKeys = ["biz", "veh", "boat", "pole"], segIco = [I.biz, I.van, I.boat, I.home];
    h += '<section class="sec g" id="services"><div class="wrap"><h2>' + esc(t.seg.title) + '</h2><p class="lead">' + esc(t.seg.intro) + '</p><div class="grid4">' +
      t.seg.items.map(function (s, i) {
        var m = money(lang, CFG.prices[segKeys[i]]);
        return '<article class="card"><div style="display:flex;align-items:center;gap:14px"><div class="iconbox">' + segIco[i] + '</div><h3>' + esc(s.t) + '</h3></div><p>' + esc(s.b) + '</p>' +
          '<div class="seg-foot"><span class="price">' + esc(m.pre + " " + m.num) + '</span><a class="more" href="#quote">' + esc(t.seg.cta) + I.arrow + '</a></div></article>';
      }).join("") + '</div></div></section>';

    /* how */
    var stepIco = [I.cam, I.tag, I.tool];
    h += '<section class="sec w" id="how"><div class="wrap"><h2>' + esc(t.how.title) + '</h2><ol class="steps">' +
      t.how.steps.map(function (s, i) { return '<li><div class="stepico">' + stepIco[i] + '</div><div><span class="stepn">0' + (i + 1) + '</span><h3>' + esc(s.t) + '</h3><p>' + esc(s.b) + '</p></div></li>'; }).join("") +
      '</ol></div></section>';

    /* prices */
    var rowKeys = ["roof", "pole", "veh", "biz"];
    h += '<section class="sec g" id="prices"><div class="wrap split"><div><h2>' + esc(t.price.title) + '</h2><p class="lead">' + esc(t.price.intro) + '</p>' +
      '<p class="note">' + I.cam + '<span>' + esc(t.price.note) + '</span></p></div>' +
      '<div class="ptable"><div class="phead"><span>' + esc(t.price.colJob) + '</span><span>' + esc(t.price.colPrice) + '</span></div><ul>' +
      t.price.rows.map(function (r, i) { var m = money(lang, CFG.prices[rowKeys[i]]); return '<li><div><div class="t">' + esc(r.t) + '</div><div class="d">' + esc(r.d) + '</div></div><div class="pnum"><small>' + esc(m.pre) + '</small><b>' + esc(m.num) + '</b></div></li>'; }).join("") +
      '</ul></div></div></section>';

    /* quote form */
    var f = t.form, jobs = ["a", "b", "c", "d", "e", "f", "g"];
    h += '<section class="sec w" id="quote"><div class="wrap split"><div><h2>' + esc(f.title) + '</h2><p class="lead">' + esc(f.intro) + '</p>' +
      '<ol class="flist">' + t.how.steps.map(function (s, i) { return '<li><span class="n">' + (i + 1) + '</span><span style="padding-top:3px;font-weight:600">' + esc(s.t) + '</span></li>'; }).join("") + '</ol></div><div class="formcard">';
    if (S.sent) {
      h += '<div class="success" role="status"><h3>' + esc(t.x.okT) + '</h3><p>' + esc(t.x.okB) + '</p>' +
        '<a class="btn btn-acc" href="' + esc(S.waUrl) + '" target="_blank" rel="noopener">' + I.wa() + esc(t.x.reopen) + '</a>' +
        '<button type="button" class="linkbtn" data-reset>' + esc(f.again) + '</button></div>';
    } else {
      h += '<form id="qform" novalidate>' + (hasErr ? '<div class="alert" role="alert">' + I.alert + '<span>' + esc(f.err.summary) + '</span></div>' : '') +
        '<div class="fgrid">' + field("f-name", "name", f.name, "text", f.namePh, e, "name") + field("f-phone", "phone", f.phone, "tel", "", e, "tel") + field("f-loc", "loc", f.loc, "text", f.locPh, e, "postal-code") +
        '<div class="field' + (e.job ? ' bad' : '') + '"><label for="f-job">' + esc(f.job) + '</label><select id="f-job" name="job"' + (e.job ? ' aria-invalid="true"' : '') + '><option value="">' + esc(f.jobPh) + '</option>' +
        jobs.map(function (k) { return '<option value="' + k + '"' + (S.form.job === k ? ' selected' : '') + '>' + esc(f.jobs[k]) + '</option>'; }).join("") + '</select>' + (e.job ? '<span class="emsg">' + esc(e.job) + '</span>' : '') + '</div></div>' +
        '<fieldset class="' + (e.kit ? 'bad' : '') + '"><legend class="legend">' + esc(f.kit) + '</legend><div class="radios">' +
        [["yes", "a"], ["no", "b"], ["coming", "c"]].map(function (k) { return '<label><input type="radio" name="kit" value="' + k[0] + '"' + (S.form.kit === k[0] ? ' checked' : '') + '><span>' + esc(f.kits[k[1]]) + '</span></label>'; }).join("") + '</div>' +
        '<div class="callout" id="kitno"' + (S.form.kit === "no" ? '' : ' hidden') + '><span>' + esc(f.noKitBody) + '</span><a href="https://www.starlink.com/" target="_blank" rel="noopener">' + esc(f.noKitLink) + '&nbsp;↗</a></div>' +
        (e.kit ? '<span class="emsg">' + esc(e.kit) + '</span>' : '') + '</fieldset>' +
        '<div class="info">' + I.wa(24) + '<span>' + esc(t.x.photosInfo) + '</span></div>' +
        '<div class="field' + (e.consent ? ' bad' : '') + '"><div class="consent"><input id="f-consent" name="consent" type="checkbox"' + (S.form.consent ? ' checked' : '') + '><label for="f-consent" style="font-weight:400;font-size:14px">' +
        esc(f.consent.split("{p}")[0]) + '<a href="legal.html#privacy" target="_blank">' + esc(f.consentLink) + '</a>' + esc(f.consent.split("{p}")[1] || "") + '</label></div>' + (e.consent ? '<span class="emsg">' + esc(e.consent) + '</span>' : '') + '</div>' +
        '<button type="submit" class="btn btn-acc">' + I.wa() + '<span>' + esc(t.x.submit) + '</span></button></form>';
    }
    h += '</div></div></section>';

    /* trust */
    var fig = function (src, cap, pos) { return '<figure><img src="img/' + src + '.jpg" alt="' + esc(cap) + '" loading="lazy" style="object-position:' + pos + '"><figcaption class="cap"><span>' + esc(cap) + '</span></figcaption></figure>'; };
    h += '<section class="sec g" id="trust"><div class="wrap"><h2>' + esc(t.trust.title) + '</h2>' +
      '<div class="gallery">' + fig("farm", gal.farm, "30% 50%") + fig("cabin", gal.cabin, "60% 50%") + fig("boat", gal.boat, "55% 35%") + fig("van", gal.van, "50% 55%") + '</div>' +
      '<div class="badges"><div class="badge dark"><div class="medal">' + CFG.warrantyM + I.check() + '</div><div><h3>' + esc(t.trust.guarT) + '</h3><p>' + esc(t.trust.guarB) + '</p></div></div>' +
      '<div class="badge"><div class="shield">' + I.shieldBig + '</div><div><h3>' + esc(t.trust.insT) + '</h3><p>' + esc(t.trust.insB) + '</p></div></div></div>' +
      '<h3 class="sub3">' + esc(t.trust.revT) + '</h3><div class="grid3">' +
      t.trust.promises.map(function (p) { return '<article class="card"><div class="check">' + I.check() + '</div><h3 style="font-size:19px">' + esc(p.t) + '</h3><p>' + esc(p.b) + '</p></article>'; }).join("") +
      '</div></div></section>';

    /* faq */
    h += '<section class="sec w" id="faq"><div class="wrap split faqs"><div><h2>' + esc(t.faq.title) + '</h2><p class="lead">' + esc(f.or) + ' <a href="' + waQuote + '" target="_blank" rel="noopener"><b>' + esc(f.orWa) + '</b></a></p></div><div class="faq">' +
      t.faq.items.map(function (q, i) { return '<details' + (i === 0 ? ' open' : '') + '><summary><span>' + esc(q.q) + '</span>' + I.chev + '</summary><p>' + esc(q.a) + '</p></details>'; }).join("") +
      '</div></div></section>';

    /* coverage */
    var regs = C[ctry].r;
    h += '<section class="sec g" id="areas"><div class="wrap split cov"><div><h2>' + esc(t.area.title) + '</h2><p class="lead">' + esc(t.area.intro) + '</p>' +
      '<div style="margin-top:20px"><span style="font-weight:700;font-size:15px;color:#0E1B2B">' + esc(t.area.pick) + '</span><div class="ctabs" role="group" aria-label="' + esc(t.area.pick) + '">' +
      CORDER.map(function (k) { return '<button type="button" data-country="' + k + '" aria-pressed="' + (k === ctry) + '">' + esc(t.cn[k]) + '</button>'; }).join("") + '</div></div>' +
      '<p class="lead" style="font-size:15px;color:#15212E">' + esc(t.area.more) + ' <a href="' + waQuote + '" target="_blank" rel="noopener"><b>WhatsApp</b></a></p></div>' +
      '<div class="country"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px 12px"><h3>' + esc(t.cn[ctry]) + '</h3><span class="nat">' + I.check() + esc(t.area.badge) + '</span></div>' +
      '<span class="kicker">' + esc(t.area.regions.replace("{n}", regs.length)) + '</span><ul class="regions">' + regs.map(function (r) { return '<li>' + I.pin + esc(r) + '</li>'; }).join("") + '</ul></div></div></section>';

    /* recruit */
    h += '<section class="recruit" id="installers"><div class="wrap"><div><h2>' + esc(t.rec.title) + '</h2><p>' + esc(t.rec.body) + '</p></div>' +
      '<a class="btn btn-ink" href="' + waLink(t.x.waInstaller) + '" target="_blank" rel="noopener">' + esc(t.rec.cta) + I.arrow + '</a></div></section></main>';

    h += footerHTML(lang, t.foot.tag, t.foot.disc, t.foot.tm, t.foot.rights, t.foot.ckLink, "legal.html");
    h += S.ck ? '<a class="fab" href="' + waQuote + '" target="_blank" rel="noopener" aria-label="' + esc(t.waAria) + '">' + I.wa(30) + '</a>' : cookieHTML(t.foot, "legal.html");

    var y = window.scrollY;
    app.innerHTML = h;
    window.scrollTo(0, y);
  }

  function readForm() {
    var fm = document.getElementById("qform"); if (!fm) return;
    var el = function (n) { return fm.elements.namedItem(n); };
    S.form.name = el("name").value; S.form.phone = el("phone").value; S.form.loc = el("loc").value; S.form.job = el("job").value;
    var k = fm.querySelector('input[name=kit]:checked'); S.form.kit = k ? k.value : "";
    S.form.consent = el("consent").checked;
  }

  app.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-lang],[data-country],[data-ck],[data-ck-open],[data-reset]");
    if (!b) return;
    readForm();
    if (b.hasAttribute("data-lang")) { S.lang = b.getAttribute("data-lang"); S.country = null; store("si_lang", S.lang); }
    else if (b.hasAttribute("data-country")) { S.country = b.getAttribute("data-country"); }
    else if (b.hasAttribute("data-ck")) { S.ck = b.getAttribute("data-ck"); store("si_ck", S.ck); applyCookieChoice(S.ck); }
    else if (b.hasAttribute("data-ck-open")) { S.ck = null; }
    else if (b.hasAttribute("data-reset")) { S.sent = false; S.tried = false; S.form = {name: "", phone: "", loc: "", job: "", kit: "", consent: false}; }
    render();
  });

  app.addEventListener("change", function (ev) {
    if (ev.target.name === "kit") { var c = document.getElementById("kitno"); if (c) c.hidden = ev.target.value !== "no"; }
  });

  app.addEventListener("submit", function (ev) {
    if (ev.target.id !== "qform") return;
    ev.preventDefault();
    readForm();
    var R = tr(), t = R.t, f = t.form, e = validate(t);
    if (Object.keys(e).length) { S.tried = true; render(); var first = document.querySelector(".bad input,.bad select"); if (first) first.focus(); return; }
    var kitMap = {yes: "a", no: "b", coming: "c"};
    var msg = t.x.waQuote + "\n\n" +
      f.name + ": " + S.form.name + "\n" + f.phone + ": " + S.form.phone + "\n" + f.loc + ": " + S.form.loc + " (" + t.cn[R.ctry] + ")\n" +
      f.job + ": " + f.jobs[S.form.job] + "\n" + f.kit + " " + f.kits[kitMap[S.form.kit]] + "\n\n" + t.x.waEnd;
    S.waUrl = waLink(msg); S.sent = true;
    window.open(S.waUrl, "_blank", "noopener");
    render();
    var q = document.getElementById("quote"); if (q) q.scrollIntoView({block: "start"});
  });

  if (S.ck) applyCookieChoice(S.ck);
  render();
})();
