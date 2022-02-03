export const state = () => ({
  userList: [],
  userInput: { loginid: '', password: '' },
  userDetail: {},
  periodTypeList: [],
  periodTypeInput: { title: '' },
  periodTypeDetail: {},
})

export const mutations = {
  addPeriodType(state, data) {
    state.periodTypeDetail = data
  },
  inputTitle(state, str) {
    state.periodTypeInput.title = str
  },
  addPeriodTypeList(state, list) {
    state.periodTypeList = list
  },
  addUserList(state, list) {
    state.userList = list
  },
  addUserDetail(state, data) {
    state.userDetail = data
  },
  inputLoginid(state, str) {
    state.userInput.loginid = str
  },
  inputPassword(state, str) {
    state.userInput.password = str
  },
}
