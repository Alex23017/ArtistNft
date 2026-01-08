import { API_VARIABLES } from '../variables.js'
import { getResource } from '../api'

export async function getProfile() {
  const jwt = localStorage.getItem('jwt')
  if (!jwt) {
    console.error('JWT отсутствует')
    return []
  }
  try {
    const res = await getResource(`${API_VARIABLES.BASE_URL}/api/orders?populate=*`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    })
    return res
  } catch (error) {
    console.error('Error fetching profile:', error)
  }
}
