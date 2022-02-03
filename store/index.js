export const state = () => ({
  userList: [],
  userInput: { loginid: '', password: '' },
  userDetail: {},
})

export const mutations = {
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
