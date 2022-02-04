export const state = () => ({
  userList: [],
  userInput: { loginid: '', password: '' },
  userDetail: {},
  periodTypeList: [],
  periodTypeInput: { title: '' },
  periodTypeDetail: {},
  periodTypeOpt: [{ value: null, text: 'Please select an option' }],
  periodList: [],
  periodInput: {
    period_type_id: '',
    title: '',
    start_year: '',
    end_year: '',
    start_date: '',
    end_date: '',
  },
  periodDetail: {},
})

export const mutations = {
  addState(state, { stateKey, data }) {
    state[stateKey] = data
  },
  buildInput(state, { inputKey, row }) {
    for (const key in state[inputKey]) {
      if (key in row) {
        state[inputKey][key] = row[key]
      }
    }
  },
  clearInput(state, inputKey) {
    for (const key in state[inputKey]) {
      state[inputKey][key] = ''
    }
  },
  inputPeriod(state, { key, val }) {
    state.periodInput[key] = val
    if (key === 'start_date') {
      const year = val.slice(0, 4)
      state.periodInput.start_year = year
    }
    if (key === 'end_date') {
      const year = val.slice(0, 4)
      state.periodInput.end_year = year
    }
  },
}
