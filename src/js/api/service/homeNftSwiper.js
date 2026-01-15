import { API_VARIABLES } from '../variables.js';
import { getPublicResource } from '../api.js';
import { removeSkeleton } from '../../components/base/skeleton.js';

export async function getHomeNft() {
  try {
    const currentLang = localStorage.getItem('lang') || 'en';
    const homeNftApi = `/api/home-nfts?populate=*&locale=${currentLang}&pagination[limit]=6`;
    const res = await getPublicResource(`${API_VARIABLES.BASE_URL}${homeNftApi}`);
    if (res) {
      removeSkeleton();
    }
    return res.data;
  } catch (error) {
    console.error('Error fetching homeNft:', error);
  }
}
