import axios from 'axios';

// export async function getResource(url) {
//   const jwt = localStorage.getItem('jwt')
//   if (!jwt) throw new Error('JWT отсутствует')

//   try {
//     const res = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//         'Content-Type': 'application/json',
//       },
//     })
//     return res.data
//   } catch (error) {
//     const status = error.response?.status || 'NO_STATUS'
//     throw new Error(`Could not fetch ${url}, status: ${status}`)
//   }
// }

// export async function postResource(url, data = {}) {
//   const jwt = localStorage.getItem('jwt')
//   if (!jwt) throw new Error('JWT отсутствует')

//   try {
//     const res = await axios.post(url, data, {
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//         'Content-Type': 'application/json',
//       },
//     })
//     return res.data
//   } catch (error) {
//     const status = error.response?.status || 'NO_STATUS'
//     throw new Error(`Could not post to ${url}, status: ${status}`)
//   }
// }

export async function getPublicResource(url) {
  try {
    const res = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      validateStatus: status => status < 500,
    });
    if (res.status === 404) {
      return null;
    }
    return res.data;
  } catch (error) {
    const status = error.response?.status || 'NO_STATUS';
    throw new Error(`Could not fetch ${url}, status: ${status}`);
  }
}

export async function postPublicResource(url, data = {}) {
  try {
    const res = await axios.post(url, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return null;
  }
}

