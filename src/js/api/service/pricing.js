import { API_VARIABLES } from '../variables.js';
import { getPublicResource } from '../api.js';

export async function getPricing() {
  try {
    const currentLang = localStorage.getItem('lang') || 'en';
    const homeNftApi = `/api/pricings?populate=*&locale=${currentLang}`;
    const res = await getPublicResource(`${API_VARIABLES.BASE_URL}${homeNftApi}`);

    return res.data;
  } catch (error) {
    console.error('Error fetching Pricing:', error);
  }
}
