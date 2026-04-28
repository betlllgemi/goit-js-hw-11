export function renderGallery(images) {
  const gallery = document.querySelector(".gallery");
  
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
  </a>
  <div class="info">
    <div class="info-item"><b>Likes</b> <span>${likes}</span></div>
    <div class="info-item"><b>Views</b> <span>${views}</span></div>
    <div class="info-item"><b>Comments</b> <span>${comments}</span></div>
    <div class="info-item"><b>Downloads</b> <span>${downloads}</span></div>
  </div>
</li>
  `
    )
    .join("");

  gallery.insertAdjacentHTML('beforeend', markup);
}