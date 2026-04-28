import axios from 'axios';

const API_KEY = '55547850-1cf2e31ffe100ace5c093135b';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  };

  const response = await axios.get('', { params });
  return response.data;
}