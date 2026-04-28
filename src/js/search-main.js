import { fetchImages } from './pixabay-api.js';
import { renderGallery } from './render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('#loader');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = event.target.elements.query.value.trim();

  if (query === '') {
    iziToast.warning({
      message: 'Lütfen bir arama terimi girin!',
      position: 'topRight',
    });
    return;
  }

  galleryContainer.innerHTML = '';
  loader.style.display = 'block';

  fetchImages(query)
    .then(data => {
      loader.style.display = 'none';

      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          backgroundColor: '#EF4040',
          messageColor: '#FFF',
          icon: 'fa-solid fa-circle-xmark',
          iconColor: '#FFF',
          maxWidth: '432px',
          class: 'custom-toast',
        });
        return;
      }

      renderGallery(data.hits);
      lightbox.refresh();

      form.reset();
    })
    .catch(error => {
      loader.style.display = 'none';
      console.error('Bir hata oluştu:', error);
      iziToast.error({
        message: 'Ağ hatası veya sunucu hatası oluştu!',
        position: 'topRight',
      });
    });
});
