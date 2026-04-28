import { fetchImages } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const searchTerm = event.currentTarget.elements.query.value.trim();

  if (searchTerm === '') {
    iziToast.error({ message: 'Lütfen bir arama terimi girin!' });
    return;
  }

  fetchImages(searchTerm)
    .then(data => {
      console.log('Gelen Veri:', data);

      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
    })
    .catch(error => console.log('Hata:', error));
});
