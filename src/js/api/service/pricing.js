import { API_VARIABLES } from '../variables.js';
import { getPublicResource } from '../api.js';

export async function getPricing() {
  try {
    const currentLang = localStorage.getItem('lang') || 'en';
    const isMobile = window.innerWidth <= 640;
    const limit = isMobile ? 3 : 6;
    const sort = isMobile ? 'desc' : 'asc';
    const homeNftApi = `/api/pricings?populate=*&locale=${currentLang}&sort[0]=id:${sort}:asc&pagination[limit]=${limit}`;
    const res = await getPublicResource(`${API_VARIABLES.BASE_URL}${homeNftApi}`);

    return res.data;
  } catch (error) {
    console.error('Error fetching Pricing:', error);
  }
}
