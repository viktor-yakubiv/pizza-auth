const API_BASE = 'https://pizza-tele.ga/api/v1'
const store = localStorage.store ? JSON.parse(localStorage.store) : null

export {
  API_BASE,
  store,
}

export default {
  store,
}
