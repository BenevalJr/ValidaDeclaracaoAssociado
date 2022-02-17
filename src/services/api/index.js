import axios from 'axios'
import { cBaseURL, cBaseURLDeclaracaoAssociado } from '@/services/consts'

const api = axios.create({
  baseURL: cBaseURL,

  headers: {
    'Content-Type': 'application/json'
  }
})

const apiDeclaracao = axios.create({
  baseURL: cBaseURLDeclaracaoAssociado,

  headers: {
    'Content-Type': 'application/json'
  }
})

const setToken = aToken => {
  api.defaults.headers.common.Authorization = aToken
}

export { api, apiDeclaracao, setToken }
export default api
