export const state = () => ({
  loggedIn: false,
  userInfo: {},
  backendUrl: 'https://splitter-api.vincentscode.de'
})

export const mutations = {
  setUserInfo(state, newUserInfo) {
    state.userInfo = newUserInfo
  },
  setLoggedIn(state, newState) {
    state.loggedIn = newState
  }
}