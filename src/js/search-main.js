import { fetchImages } from './pixabay-api.js';
import { renderGallery } from './render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const form = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loaderTop = document.querySelector('#loader-top');
const loaderBottom = document.querySelector('#loader-bottom');
const loadMoreBtn = document.querySelector('#load-more');

let query = "";
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  query = event.target.elements.query.value.trim();
  
  if (query === "") return;

  page = 1;
  galleryContainer.innerHTML = "";
  loadMoreBtn.style.display = "none";
  loaderTop.style.display = "block";
  loaderBottom.style.display = "none";
  try {
    const data = await fetchImages(query, page);
    loaderTop.style.display = "none";
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message: "Sorry, there are no images matching your search query. Please try again!",
    position: 'topRight',
    backgroundColor: '#EF4040',
    messageColor: '#FFFFFF',
    icon: 'fa-solid fa-circle-xmark',
          iconColor: '#FFF',
          maxWidth: '432px',
          class: 'custom-toast',
      });
      return;
    }

    renderGallery(data.hits);
    lightbox.refresh();
    checkLoadMoreStatus();
  } catch (error) {
    loaderTop.style.display = "none";
    console.error(error);
  }
});
loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  loaderBottom.style.display = "block";
  loadMoreBtn.style.display = "none";
  loaderTop.style.display = "none";

  try {
    const data = await fetchImages(query, page);
    renderGallery(data.hits);
    lightbox.refresh();
    loaderBottom.style.display = "none";

    smoothScroll();
    
    checkLoadMoreStatus();
  } catch (error) {
    loaderBottom.style.display = "none";
    console.error(error);
  }
});

function checkLoadMoreStatus() {
  if (page * 40 >= totalHits) {
    loadMoreBtn.style.display = "none";
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight'
    });
  } else {
    loadMoreBtn.style.display = "block";
  }
}
function smoothScroll() {
  const card = document.querySelector(".gallery-item");
  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
  }
}