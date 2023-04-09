import axios from 'axios';

export async function FetchApi(searchText, page) {
  const URL_BASE = 'https://pixabay.com/api/';
  const KEY = '33614397-1a0ce7cdeb863390e1bd0b922';

  const { data } = await axios.get(
    `${URL_BASE}?key=${KEY}&q=${searchText}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return data;
}
