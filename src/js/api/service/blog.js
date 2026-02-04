import { getPublicResource, postPublicResource } from '../api.js';
import { API_VARIABLES } from '../variables.js';

export async function getCardBlog() {
  try {
    const currentLang = localStorage.getItem('lang') || 'en';
    const blogApi = `/api/forums?populate=*&locale=${currentLang}`;
    const res = await getPublicResource(`${API_VARIABLES.BASE_URL}${blogApi}`);

    return res.data;
  } catch (error) {
    console.error('Error fetching homeNft:', error);
  }
}

const postQuestionForm = '/api/forums';

export async function postQuestionBlog(dataForm) {
  try {
    const res = await postPublicResource(`${API_VARIABLES.BASE_URL}${postQuestionForm}`, {
      data: dataForm,
    });

    return res;
  } catch (error) {
    console.error('Error fetching postQuestionForm:', error);
  }
}
