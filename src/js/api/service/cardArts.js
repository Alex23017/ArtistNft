import { API_VARIABLES } from '../variables.js';
import { getPublicResource } from '../api.js';

export async function getCardArts() {
  try {
    const currentLang = localStorage.getItem('lang') || 'en';
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const limit = isMobile ? 6 : 10;
    const cardsNftApi = `/api/home-nfts?populate=*&locale=${currentLang}&pagination[limit]=${limit}`;
    const res = await getPublicResource(`${API_VARIABLES.BASE_URL}${cardsNftApi}`);

    return res.data;
  } catch (error) {
    console.error('Error fetching cardArts:', error);
  }
}

export async function getCardById(id) {
  if (!id) return null;
  try {
    const currentLang = localStorage.getItem('lang') || 'en';
    const res = await getPublicResource(`${API_VARIABLES.BASE_URL}/api/home-nfts/${id}?populate=*&locale=${currentLang}`);

    return res.data;
  } catch (error) {
    return console.log(error);
  }
}
