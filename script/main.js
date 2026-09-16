/**
 * @file main.js
 * @description Punto de entrada de la aplicación. Orquesta la inicialización de la página,
 * la selección de elementos del DOM, la vinculación de eventos de usuario y la coordinación entre módulos.
*/

import { brands } from './brands.js';
import { updateActiveUI, updateBrandContent } from './features.js';

// DOM Elements
const container = document.querySelector(".container");
const titleLogo = document.querySelector(".title-img-logo") || document.querySelector(".title-img img:first-child");
const titleType = document.querySelector(".title-img-type") || document.querySelector(".title-img img:last-child");
const title = document.querySelector(".main-content-title");
const copy = document.querySelector(".main-content-copy");
const sideImage = document.querySelector(".side-content-image");
const stripItems = document.querySelectorAll(".product-strip-item");
const navLinks = document.querySelectorAll("[data-brand-link]");
const logo = document.querySelector(".navbar-logo-img");
const loader = document.querySelector('.loader');
const player = document.querySelector('dotlottie-player');

let isAppStarted = false;

function hideLoaderAndStart() {
  if (isAppStarted) return;
  isAppStarted = true;

  if (loader && !loader.classList.contains('hidden')) {
    loader.classList.add('hidden');
  }
  document.body.classList.add('is-loaded');
}

if (player) {
  player.addEventListener('complete', hideLoaderAndStart);
  player.addEventListener('error', hideLoaderAndStart);
} else {
  hideLoaderAndStart();
}

// Fallback de seguridad: si no se completa la animación tras 5 segundos, ocultamos el loader y arrancamos de todos modos.
setTimeout(hideLoaderAndStart, 5000);

function switchBrand(brandKey) {
  const brand = brands[brandKey];
  if (!brand) return;

  updateBrandContent(brand, { container, titleLogo, titleType, title, copy, sideImage, brandKey });
  updateActiveUI(brandKey, { stripItems, navLinks, logo });
}

function bindInteractions() {
  stripItems.forEach((item) => {
    item.addEventListener("click", () => switchBrand(item.dataset.brand));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const brandKey = link.dataset.brandLink;
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (window.innerWidth <= 768 && targetSection) {
        event.preventDefault();
        targetSection.scrollIntoView({ behavior: "smooth" });
        updateActiveUI(brandKey, { stripItems, navLinks, logo });
      } else {
        event.preventDefault();
        switchBrand(brandKey);
      }
    });
  });

  // IntersectionObserver para actualizar el enlace activo del navbar según la sección visible al scrollear en móvil
  if ("IntersectionObserver" in window) {
    const mobileCards = document.querySelectorAll(".mobile-product-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const brandKey = entry.target.dataset.brand;
            if (brandKey) {
              updateActiveUI(brandKey, { stripItems, navLinks, logo });
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -50% 0px",
        threshold: 0.1
      }
    );

    mobileCards.forEach((card) => observer.observe(card));
  }
}

function init() {
  updateActiveUI("coca-cola", { stripItems, navLinks, logo });
  bindInteractions();
}

init();
