import routes from './routes'

const API_BASE = 'https://pizza-tele.ga/api/v1'
const store = localStorage.store ? JSON.parse(localStorage.store) : null
const { token } = localStorage
const persistToken = (t) => { localStorage.token = t }

export {
  API_BASE,
  store,
  routes,
  token,
  persistToken,
}

export default {
  store,
}
