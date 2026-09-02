/* ============================================================
   Bonne fête maman — 50 ans
   ============================================================ */

// Change ces emoji si tu veux une autre ambiance
const EMOJIS = ["🌸", "🌷", "🦋", "✨", "💐", "🎂", "💗", "🌼", "🍃", "🎈"];
const NOMBRE_EMOJIS = 30;

const jardin = document.querySelector(".jardin");
const scene = document.getElementById("scene");
const enveloppe = document.getElementById("enveloppe");
const refermer = document.getElementById("refermer");
const fleur = document.getElementById("fleur");

const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)");

function hasard(min, max) {
  return Math.random() * (max - min) + min;
}

function piocheEmoji() {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

/* ---------- Les emoji qui tombent ---------- */

function semerEmojis() {
  jardin.replaceChildren();
  if (mouvementReduit.matches) return;

  const lot = document.createDocumentFragment();

  for (let i = 0; i < NOMBRE_EMOJIS; i++) {
    const grain = document.createElement("span");
    grain.className = "petale-vent";
    grain.textContent = piocheEmoji();
    grain.style.left = hasard(0, 100).toFixed(2) + "vw";
    grain.style.fontSize = hasard(0.9, 2.3).toFixed(2) + "rem";
    grain.style.opacity = hasard(0.45, 0.95).toFixed(2);
    grain.style.animationDuration = hasard(11, 23).toFixed(2) + "s";
    // Délai négatif: les emoji sont déjà répartis à l'écran au chargement
    grain.style.animationDelay = (-hasard(0, 23)).toFixed(2) + "s";
    grain.style.setProperty("--derive", hasard(-90, 90).toFixed(0) + "px");
    grain.style.setProperty("--tour", hasard(-360, 360).toFixed(0) + "deg");
    lot.appendChild(grain);
  }

  jardin.appendChild(lot);
}

/* ---------- Petite explosion à l'ouverture ---------- */

function eclat() {
  if (mouvementReduit.matches) return;

  const zone = enveloppe.getBoundingClientRect();
  const cx = zone.left + zone.width / 2;
  const cy = zone.top + zone.height / 2;

  for (let i = 0; i < 16; i++) {
    const bout = document.createElement("span");
    bout.className = "confetti";
    bout.textContent = piocheEmoji();
    bout.style.left = cx + "px";
    bout.style.top = cy + "px";

    const angle = (Math.PI * 2 * i) / 16 + hasard(-0.2, 0.2);
    const portee = hasard(110, 230);
    bout.style.setProperty("--dx", Math.cos(angle) * portee + "px");
    bout.style.setProperty("--dy", Math.sin(angle) * portee + "px");
    bout.style.setProperty("--rot", hasard(-200, 200).toFixed(0) + "deg");

    bout.addEventListener("animationend", () => bout.remove());
    document.body.appendChild(bout);
  }
}

/* ---------- Ouvrir et refermer ---------- */

function ouvrir() {
  if (scene.classList.contains("ouverte")) return;
  scene.classList.add("ouverte");
  enveloppe.setAttribute("aria-expanded", "true");
  eclat();
  window.setTimeout(() => fleur.focus(), 1000);
}

function fermer() {
  scene.classList.remove("ouverte");
  enveloppe.setAttribute("aria-expanded", "false");
  enveloppe.focus();
}

enveloppe.addEventListener("click", ouvrir);
refermer.addEventListener("click", fermer);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && scene.classList.contains("ouverte")) fermer();
});

semerEmojis();
mouvementReduit.addEventListener("change", semerEmojis);
