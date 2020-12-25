import galleryItems from './gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');
const lightboxWindow = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const closeModalBtn = document.querySelector('button[data-action="close-lightbox"]',);
const galleryMarkup = createGalleryMarkup(galleryItems);    

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
galleryContainer.addEventListener('click', onGalleryContainerClick);
lightboxOverlay.addEventListener('click', onBackdropClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
              <a class="gallery__link" href=${original}>
                <img
                  class="gallery__image"
                  src=${preview}
                  data-source=${original}
                  alt=${description}
                />
              </a>
            </li>`;
  })
    .join('');
}

function onGalleryContainerClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }
  lightboxWindow.classList.add('is-open');
  openImage(event);
  window.addEventListener('keydown', onKeyPress);
  closeModalBtn.addEventListener('click', closeModal);
}

function openImage(event) {
  lightboxImage.src = event.target.dataset.source;
  lightboxImage.alt = event.target.alt;
}

function closeModal() {
  lightboxWindow.classList.remove('is-open');
  lightboxImage.src = '';
  lightboxImage.alt = '';
  window.removeEventListener('keydown', onKeyPress);
  closeModalBtn.removeEventListener('click', closeModal);
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function onKeyPress(event) {
  const indexArray = galleryItems.map((item) => item.original);
  let index = indexArray.indexOf(lightboxImage.src);
  switch (event.code) {
    case 'Escape': closeModal(); break;
    case 'ArrowLeft': {
      if (index === 0) {
        index = galleryItems.length;
      }
      lightboxImage.src = galleryItems[index - 1].original;
      break;
    };
    case 'ArrowRight': {
      if (index === galleryItems.length - 1) {
        index = -1;
      }
      lightboxImage.src = galleryItems[index + 1].original;
      break;
    };
  }
}