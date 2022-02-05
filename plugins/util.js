export default function ({ app }, inject) {
  inject('selectPeriodType', async () => {
    const list = await app.$webapi(['periodtype', 'list', {}])
    const options = []
    if (!list) {
      return options
    }
    if ('error' in list) {
      return options
    }
    for (const row of list) {
      options.push({ value: row.id, text: row.title })
    }
    return options
  })
}
