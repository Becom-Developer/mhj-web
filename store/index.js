export const state = () => ({
  userList: [],
  userInput: { loginid: '', password: '' },
  userDetail: {},
  periodTypeList: [],
  periodTypeInput: { title: '' },
  periodTypeDetail: {},
})

export const mutations = {
  addPeriodTypeList(state, list) {
    state.periodTypeList = list
  },
  inputTitle(state, str) {
    state.periodTypeInput.title = str
  },
  addPeriodTypeDetail(state, data) {
    state.periodTypeDetail = data
  },
  addUserList(state, list) {
    state.userList = list
  },
  inputLoginid(state, str) {
    state.userInput.loginid = str
  },
  inputPassword(state, str) {
    state.userInput.password = str
  },
  addUserDetail(state, data) {
    state.userDetail = data
  },
}
