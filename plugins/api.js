export default function ({ app }, inject) {
  const url = 'https://mhj-api.becom.co.jp/mhj.cgi'
  inject('webapi', (qParams) => {
    return app.$axios.$post(url, {
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
