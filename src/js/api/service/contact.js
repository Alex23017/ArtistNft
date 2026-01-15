import { API_VARIABLES } from '../variables.js';
import { postPublicResource } from '../api.js';

const postQuestionForm = '/api/questions';

export async function postQuestion(dataForm) {
  try {
    const res = await postPublicResource(`${API_VARIABLES.BASE_URL}${postQuestionForm}`, {
      data: dataForm,
    });
    // if (res) {
    //   skeleton('.news__container', '.skeleton__card')
    // }
    return res;
  } catch (error) {
    console.error('Error fetching postQuestionForm:', error);
  }
}
