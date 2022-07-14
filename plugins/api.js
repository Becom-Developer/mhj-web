export default function ({ app }, inject) {
  const authApiURL = process.env.authApiURL
  const zsearchApiURL = process.env.zsearchApiURL
  const mhjApiUrl = process.env.mhjApiUrl
  inject('authApi', (qParams) => {
    return app.$axios.$post(authApiURL, {
      resource: qParams[0],
      method: qParams[1],
      params: qParams[2],
      apikey: 'becom',
    })
  })
  inject('zsearchApi', (qParams) => {
    return app.$axios.$post(zsearchApiURL, {
      resource: qParams[0],
      method: qParams[1],
      params: qParams[2],
      apikey: 'becom',
    })
  })
  inject('webapi', (qParams) => {
    return app.$axios.$post(mhjApiUrl, {
      path: qParams[0],
      method: qParams[1],
      params: qParams[2],
      apikey: 'becom',
    })
  })
}

// import qs from 'qs'
// paramsSerializer: (params) =>
// qs.stringify(params, { arrayFormat: 'repeat' }),
// })
