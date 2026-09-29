/* StarInstall — shared helpers: language, header, footer, cookie banner, WhatsApp */
var WA_NUMBER = "34679629071";
var LANGS = ["es", "en", "de", "nl", "fr"];
var LANG_NAMES = {es: "Español", en: "English", de: "Deutsch", nl: "Nederlands", fr: "Français"};
var X = {
es: {waQuote: "Hola StarInstall, quiero un presupuesto.", waInstaller: "Hola StarInstall, soy instalador y quiero recibir trabajos.", waEnd: "Ahora os envío las fotos o vídeos.",
  photosInfo: "Al enviar se abrirá WhatsApp con tus datos. Adjunta ahí de 3 a 5 fotos o un vídeo corto: tejado o vehículo, dónde irá el router y el recorrido del cable.",
  submit: "Continuar en WhatsApp", okT: "¡Ya casi está!", okB: "Se ha abierto WhatsApp con tus datos. Envía el mensaje y adjunta tus fotos o vídeos: te respondemos con un precio cerrado en menos de {h} h.", reopen: "Abrir WhatsApp de nuevo",
  legalLinks: ["Aviso legal", "Política de privacidad", "Política de cookies", "Condiciones del servicio"]},
en: {waQuote: "Hi StarInstall, I'd like a quote.", waInstaller: "Hi StarInstall, I'm an installer and I'd like to receive jobs.", waEnd: "I'll send the photos or videos next.",
  photosInfo: "When you submit, WhatsApp will open with your details. Attach 3–5 photos or a short video there: roof or vehicle, router location and cable route.",
  submit: "Continue on WhatsApp", okT: "Almost done!", okB: "WhatsApp has opened with your details. Send the message and attach your photos or videos: we'll reply with a fixed price within {h} hours.", reopen: "Open WhatsApp again",
  legalLinks: ["Legal notice", "Privacy policy", "Cookie policy", "Terms of service"]},
de: {waQuote: "Hallo StarInstall, ich möchte ein Angebot.", waInstaller: "Hallo StarInstall, ich bin Installateur und möchte Aufträge erhalten.", waEnd: "Fotos oder Videos schicke ich gleich.",
  photosInfo: "Nach dem Absenden öffnet sich WhatsApp mit Ihren Angaben. Hängen Sie dort 3–5 Fotos oder ein kurzes Video an: Dach oder Fahrzeug, Router-Standort und Kabelweg.",
  submit: "Weiter zu WhatsApp", okT: "Fast geschafft!", okB: "WhatsApp wurde mit Ihren Angaben geöffnet. Senden Sie die Nachricht und hängen Sie Ihre Fotos oder Videos an: Sie erhalten innerhalb von {h} Stunden einen Festpreis.", reopen: "WhatsApp erneut öffnen",
  legalLinks: ["Impressum", "Datenschutzerklärung", "Cookie-Richtlinie", "AGB"]},
nl: {waQuote: "Hallo StarInstall, ik wil graag een offerte.", waInstaller: "Hallo StarInstall, ik ben installateur en wil graag klussen ontvangen.", waEnd: "Foto's of video's stuur ik zo.",
  photosInfo: "Na het versturen opent WhatsApp met je gegevens. Voeg daar 3 tot 5 foto's of een korte video toe: dak of voertuig, plek van de router en kabelroute.",
  submit: "Verder in WhatsApp", okT: "Bijna klaar!", okB: "WhatsApp is geopend met je gegevens. Verstuur het bericht en voeg je foto's of video's toe: binnen {h} uur krijg je een vaste prijs.", reopen: "WhatsApp opnieuw openen",
  legalLinks: ["Juridische informatie", "Privacybeleid", "Cookiebeleid", "Algemene voorwaarden"]},
fr: {waQuote: "Bonjour StarInstall, je souhaite un devis.", waInstaller: "Bonjour StarInstall, je suis installateur et je souhaite recevoir des chantiers.", waEnd: "Je vous envoie les photos ou vidéos.",
  photosInfo: "À l'envoi, WhatsApp s'ouvrira avec vos informations. Joignez-y 3 à 5 photos ou une courte vidéo : toit ou véhicule, emplacement du routeur et passage du câble.",
  submit: "Continuer sur WhatsApp", okT: "C'est presque fini !", okB: "WhatsApp s'est ouvert avec vos informations. Envoyez le message et joignez vos photos ou vidéos : nous vous répondons avec un prix ferme sous {h} h.", reopen: "Rouvrir WhatsApp",
  legalLinks: ["Mentions légales", "Politique de confidentialité", "Politique de cookies", "Conditions générales"]}
};
var LEGAL_IDS = ["legal", "privacy", "cookies", "terms"];

function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[c]; }); }
function waLink(text) { return "https://wa.me/" + WA_NUMBER + (text ? "?text=" + encodeURIComponent(text) : ""); }

function initialLang() {
  var q = null;
  try { q = new URLSearchParams(location.search).get("lang"); } catch (e) {}
  if (q && LANGS.indexOf(q) >= 0) return q;
  var saved = load("si_lang");
  if (saved && LANGS.indexOf(saved) >= 0) return saved;
  var navs = (navigator.languages || [navigator.language || "es"]);
  for (var i = 0; i < navs.length; i++) { var c = String(navs[i]).slice(0, 2).toLowerCase(); if (LANGS.indexOf(c) >= 0) return c; }
  return "es";
}

var I = {
  logo: '<svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#F2A541"/><path d="M5 24l7.5-8.5 4 4 3-3L27 24" stroke="#0E1B2B" stroke-width="2.4" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="M11 10.5a8 8 0 0 1 10 0M13.8 13.6a3.6 3.6 0 0 1 4.4 0" stroke="#0E1B2B" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',
  wa: function (s) { return '<svg class="ico" style="width:' + (s || 22) + 'px;height:' + (s || 22) + 'px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 8 19.3z"/><path d="M9 8.5c.2 3.3 3.2 6.3 6.5 6.5l1-1.8-2.2-1.1-1 .9c-1-.4-1.9-1.3-2.3-2.3l.9-1-1.1-2.2z"/></svg>'; },
  cam: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
  check: function (c) { return '<svg class="ico" style="width:20px;height:20px" viewBox="0 0 24 24" fill="none" stroke="' + (c || 'currentColor') + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7"/></svg>'; },
  shield: '<svg class="ico" style="width:16px;height:16px" viewBox="0 0 24 24" fill="none" stroke="#F2A541" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-4.5"/></svg>',
  shieldBig: '<svg class="ico" style="width:30px;height:30px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-4.5"/></svg>',
  globe: '<svg class="ico" style="width:20px;height:20px" viewBox="0 0 24 24" fill="none" stroke="#A9B6C4" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
  arrow: '<svg class="ico" style="width:18px;height:18px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  chev: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
  pin: '<svg class="ico" style="width:14px;height:14px" viewBox="0 0 24 24" fill="none" stroke="#8A4F06" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  tag: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/></svg>',
  tool: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0 5 5l-8.9 8.9a2.1 2.1 0 0 1-3-3z"/><path d="M14.7 6.3L17 4l3 3-2.3 2.3"/></svg>',
  biz: '<svg class="ico" style="width:26px;height:26px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-5h6v5M9 11h.01M15 11h.01"/></svg>',
  van: '<svg class="ico" style="width:26px;height:26px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 16V7h12l4 4h4v5h-2M9 16h6M4 16H2"/><path d="M14 7v4h4"/><circle cx="6.5" cy="16.5" r="2"/><circle cx="17.5" cy="16.5" r="2"/></svg>',
  boat: '<svg class="ico" style="width:26px;height:26px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v13"/><path d="M12 4l7 10h-7M12 7l-5 7h5"/><path d="M3 17h18l-2.5 4h-13z"/></svg>',
  home: '<svg class="ico" style="width:26px;height:26px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12l8-6 8 6"/><path d="M4 11v9h12v-9"/><path d="M20 20V6M17 7.5a4 4 0 0 1 6 0"/></svg>',
  alert: '<svg class="ico" style="width:20px;height:20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>'
};

function headerHTML(lang, nav, quoteLabel, homeHref) {
  var n = nav ? '<nav class="nav" aria-label="Menu">' + nav.map(function (x) { return '<a href="' + x[0] + '">' + esc(x[1]) + '</a>'; }).join("") + '</nav>' : '<div style="flex:1"></div>';
  var l = '<div class="langs" role="group" aria-label="Language">' + LANGS.map(function (c) {
    return '<button type="button" data-lang="' + c + '" aria-pressed="' + (c === lang) + '" aria-label="' + LANG_NAMES[c] + '" lang="' + c + '">' + c.toUpperCase() + '</button>';
  }).join("") + '</div>';
  var q = quoteLabel ? '<a class="hcta" href="' + homeHref + '#quote">' + esc(quoteLabel) + '</a>' : '';
  return '<header class="hdr"><div class="wrap"><a class="brand" href="' + homeHref + '#top">' + I.logo + '<span>StarInstall</span></a>' + n + l + q + '</div></header>';
}

function footerHTML(lang, tag, disc, tm, rights, ckLink, legalHref) {
  var links = X[lang].legalLinks.map(function (t, i) { return '<a href="' + legalHref + '#' + LEGAL_IDS[i] + '">' + esc(t) + '</a>'; }).join("");
  return '<footer><div class="wrap">' +
    '<div class="fbrand"><b>StarInstall</b><span>' + esc(tag) + '</span><span class="dim" style="font-size:13px">' + esc(tm) + '</span></div>' +
    '<nav class="flinks" aria-label="Legal">' + links + '<button type="button" data-ck-open>' + esc(ckLink) + '</button></nav>' +
    '<div class="fbottom"><p class="disc">' + esc(disc) + '</p><p class="dim">© ' + new Date().getFullYear() + ' StarInstall. ' + esc(rights) + '</p></div>' +
    '</div></footer>';
}

function cookieHTML(foot, legalHref) {
  return '<div class="ck" role="dialog" aria-label="Cookies"><p>' + esc(foot.ckTxt) + ' <a href="' + legalHref + '#cookies"><b>' + esc(foot.ckMore) + '</b></a></p>' +
    '<div class="two"><button type="button" data-ck="none">' + esc(foot.ckRej) + '</button><button type="button" data-ck="all">' + esc(foot.ckAcc) + '</button></div></div>';
}

/* Called once the visitor has chosen. Load analytics / ad pixels here only when choice === "all". */
function applyCookieChoice(choice) {
  if (choice === "all") {
    /* e.g. Google Ads / Meta Pixel snippets go here */
  }
}
