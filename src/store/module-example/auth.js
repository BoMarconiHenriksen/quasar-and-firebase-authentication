import { firebaseAuth } from 'boot/firebase'
import { Loading } from 'quasar'

const state = {
  loggedIn: false
}

const mutations = {
  setLoggedIn (state, value) {
    state.loggedIn = value
  }
}

const actions = {
  async registerUser ({ commit }, payload) {
    Loading.show()
    try {
      const response = await firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      console.log('response: ', response)
    } catch (error) {
      console.log('error.message: ', error.message)
    }
  },
  async loginUser ({ commit }, payload) {
    Loading.show()
    try {
      const response = await firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      console.log('response: ', response)
    } catch (error) {
      console.log('error.message: ', error.message)
    }
  },
  logoutUser () {
    firebaseAuth.signOut()
  },
  loggedInOrLoggedOut ({ commit }) {
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide()
      if (user) {
        commit('setLoggedIn', true)
      } else {
        commit('setLoggedIn', false)
      }
    })
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
