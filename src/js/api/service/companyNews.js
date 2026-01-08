import { API_VARIABLES } from '../variables.js'
import { getPublicResource } from '../api'
// import { skeleton } from '../../components/skeleton.js';
export async function getCompanyNews() {
  try {
    const res = await getPublicResource(`${API_VARIABLES.BASE_URL}/api/company-news?populate=*`)
    // if (res) {
    //   skeleton('.news__container', '.skeleton__card')
    // }
    return res.data
  } catch (error) {
    console.error('Error fetching company news:', error)
  }
}
