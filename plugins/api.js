export default function ({ app }, inject) {
  const url = 'https://mhj-api.becom.co.jp/mhj.cgi'
  inject('apiPeriodList', (qParams) => {
    return app.$axios.$post(url, {
      path: 'period',
      method: 'list',
      apikey: 'becom',
      params: qParams,
    })
  })
  inject('apiPeriodInsert', (qParams) => {
    return app.$axios.$post(url, {
      path: 'period',
      method: 'insert',
      apikey: 'becom',
      params: qParams,
    })
  })
  inject('apiPeriodUpdate', (qParams) => {
    return app.$axios.$post(url, {
      path: 'period',
      method: 'update',
      apikey: 'becom',
      params: qParams,
    })
  })
  inject('apiPeriodTypeList', () => {
    return app.$axios.$post(url, {
      path: 'periodtype',
      method: 'list',
      apikey: 'becom',
      params: {},
    })
  })
  inject('apiPeriodTypeInsert', (qParams) => {
    return app.$axios.$post(url, {
      path: 'periodtype',
      method: 'insert',
      apikey: 'becom',
      params: qParams,
    })
  })
  inject('apiPeriodTypeUpdate', (qParams) => {
    return app.$axios.$post(url, {
      path: 'periodtype',
      method: 'update',
      apikey: 'becom',
      params: qParams,
    })
  })
  inject('apiUserList', () => {
    return app.$axios.$post(url, {
      path: 'user',
      method: 'list',
      apikey: 'becom',
      params: {},
    })
  })
  inject('apiUserInsert', (qParams) => {
    return app.$axios.$post(url, {
      path: 'user',
      method: 'insert',
      apikey: 'becom',
      params: qParams,
    })
  })
  inject('apiUserUpdate', (qParams) => {
    return app.$axios.$post(url, {
      path: 'user',
      method: 'update',
      apikey: 'becom',
      params: qParams,
    })
  })
}

// import qs from 'qs'
// paramsSerializer: (params) =>
// qs.stringify(params, { arrayFormat: 'repeat' }),
// })
