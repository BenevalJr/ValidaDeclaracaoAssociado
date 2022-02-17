import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/services/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { apiversion: '' },
  mutations: {
    SET_INFOAPIVERSION: (aState, aValue) => {
      aState.apiversion = aValue
    }
  },
  actions: {
    checkAPIVersion(aContext) {
      console.log('get information "checkAPIVersion" ')
      return new Promise((resolve, reject) => {
        api
          .get('/status')
          .then(lResponse => {
            aContext.commit('SET_INFOAPIVERSION', lResponse.data.Version)
            console.log('lResponse.data: ' + lResponse.data)
            resolve({
              apiversion: lResponse.data.Version
            })
          })
          .catch(() => {
            aContext.commit('SET_INFOAPIVERSION', 'OffLine')
            reject({
              apiversion: 'OffLine'
            })
          })
      })
    }
  },
  getters: {
    ApiVersion: aState => {
      return aState.apiversion
    },
    ApiVersionOffLine: aState => {
      return aState.apiversion == 'OffLine'
    }
  },
  modules: {}
})
