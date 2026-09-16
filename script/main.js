/**
 * @file main.js
 * @description Orquesta la inicialización de la página, manejo de la animación de carga (loader)
 * y la interacción de cambio de variante (Original, Zero, Light) entre navbar y footer.
 */

const BRAND_IMAGES = {
  "coca-cola": "./images/coke-original.webp",
  "coca-cola-zero": "./images/coke-zero.webp",
  "coca-cola-light": "./images/coke-light.webp"
};

// Elementos del DOM
const container = document.querySelector(".container");
const sideImage = document.querySelector(".side-content-image");
const navLinks = document.querySelectorAll("[data-brand-link]");
const loader = document.querySelector(".loader");
const player = document.querySelector("dotlottie-player");

const boton1 = document.querySelector("#boton1");
const boton2 = document.querySelector("#boton2");
const boton3 = document.querySelector("#boton3");

let isAppStarted = false;

function hideLoaderAndStart() {
  if (isAppStarted) return;
  isAppStarted = true;

  if (loader && !loader.classList.contains("hidden")) {
    loader.classList.add("hidden");
  }
  document.body.classList.add("is-loaded");
}

if (player) {
  player.addEventListener("complete", hideLoaderAndStart);
  player.addEventListener("error", hideLoaderAndStart);
} else {
  hideLoaderAndStart();
}

// Fallback de seguridad tras 5 segundos
setTimeout(hideLoaderAndStart, 5000);

function switchBrand(brandKey) {
  const imageSrc = BRAND_IMAGES[brandKey];
  if (!imageSrc) return;

  // Actualizar únicamente la imagen principal de la lata
  if (sideImage) {
    sideImage.src = imageSrc;
    sideImage.alt = `Lata de ${brandKey}`;

    // Reiniciar la animación de la lata al cambiar
    sideImage.style.animation = "none";
    void sideImage.offsetWidth;
    sideImage.style.animation = "";
  }

  // Actualizar clase activa en los botones del footer
  if (boton1) boton1.classList.toggle("is-active", brandKey === "coca-cola");
  if (boton2) boton2.classList.toggle("is-active", brandKey === "coca-cola-zero");
  if (boton3) boton3.classList.toggle("is-active", brandKey === "coca-cola-light");
}

function bindInteractions() {
  // Interacciones del Navbar y Footer deshabilitadas
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });
}

function init() {
  switchBrand("coca-cola");
  bindInteractions();
}

init();
