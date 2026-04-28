export function fetchImages(searchTerm) {
  const API_KEY = '55547850-1cf2e31ffe100ace5c093135b';
  const BASE_URL = 'https://pixabay.com/api/';

  const params = new URLSearchParams({
    key: API_KEY,
    q: searchTerm,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return fetch(`${BASE_URL}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error('Ağ hatası oluştu!');
    }
    return response.json();
  });
}
