import { API_VARIABLES } from '../variables.js'
import { getPublicResource } from '../api'

export async function getAllHotels() {
  try {
    const res = await getPublicResource(
      `${API_VARIABLES.BASE_URL}/api/hotels?populate[serviceLists][populate][list][populate][subServices]=*&populate[serviceLists][populate][position]=*&populate[serviceLists][populate][listPosition]=*`
    )

    return res.data
  } catch (error) {
    console.error('Error fetching hot deals:', error)
  }
}
export async function getHotelById(id) {
  if (!id) return null
  try {
    // const res = await getResource(`${API_VARIABLES.BASE_URL}/api/hotels/${id}?populate[serviceLists][populate][list][populate][subServices]=*&populate[serviceLists][populate][position]]=*&populate[serviceLists][populate][listPosition]=*`);
    const res = await getPublicResource(
      `${API_VARIABLES.BASE_URL}/api/list-hotels/${id}?populate[serviceLists][populate][list][populate][subServices]=*&populate[serviceLists][populate][position]=*&populate[serviceLists][populate][listPosition]=*`
    )

    return res.data
  } catch (error) {
    return null
  }
}

export async function getHotelByIdSearch(id) {
  if (!id) return
  try {
    const res = await getPublicResource(`${API_VARIABLES.BASE_URL}/api/result-searches/${id}?populate=*`)

    return res.data
  } catch (error) {
    return null
  }
}
