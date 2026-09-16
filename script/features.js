/**
 * @file features.js
 * @description Encapsula la lógica de actualización de la interfaz de usuario (funcionalidades),
 * tales como actualizar las clases activas en los enlaces/botones y modificar el contenido textual y visual del producto.
*/

export function updateActiveUI(brandKey, { stripItems, navLinks, logo }) {
    stripItems.forEach((item) => {
        item.classList.toggle("is-active", item.dataset.brand === brandKey);
    });

    navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.brandLink === brandKey);
    });

    logo.classList.toggle("is-active", logo.dataset.brandLink === brandKey);
}

export function updateBrandContent(brand, { container, titleLogo, titleType, title, copy, sideImage, brandKey }) {
    if (container) {
        container.dataset.brand = brandKey;
    }
    document.body.dataset.brand = brandKey;

    if (titleLogo && brand.titleLogo) {
        titleLogo.src = brand.titleLogo;
        titleLogo.alt = `Logo ${brand.title}`;
    }

    if (titleType && brand.titleType) {
        titleType.src = brand.titleType;
        titleType.alt = `Tipo ${brand.title}`;
    }

    if (title && brand.title) {
        title.innerHTML = brand.title;
    }

    if (copy && brand.copy) {
        copy.textContent = brand.copy;
    }

    if (brand.image && sideImage) {
        sideImage.src = brand.image;
        sideImage.alt = `Lata de ${brand.title}`;

        // Reiniciar la animación downToUpRotate
        sideImage.style.animation = "none";
        void sideImage.offsetWidth;
        sideImage.style.animation = "";
    }
}
