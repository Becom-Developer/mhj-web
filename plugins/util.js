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
  inject('selectChronology', (word) => {
    const cond = {
      raiwa: { era: '令和', start: 2019, end: 2022 },
      heisei: { era: '平成', start: 1989, end: 2019 },
      syouwa: { era: '昭和', start: 1926, end: 1989 },
      taisyou: { era: '大正', start: 1912, end: 1926 },
      meizi: { era: '明治', start: 1868, end: 1912 },
    }
    const options = []
    let conut = cond[word].start
    let jaYear = 1
    while (conut <= cond[word].end) {
      options.push({
        value: `${conut}-${cond[word].era}${jaYear}`,
        text: `${conut}年(${cond[word].era}${jaYear}年)`,
      })
      conut = conut + 1
      jaYear = jaYear + 1
    }
    return options
  })
  inject('selectHD', async () => {
    const list = await app.$webapi(['chronology', 'list', {}])
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
