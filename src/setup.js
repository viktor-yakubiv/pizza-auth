import { API_BASE } from './config'

const storeApiListUrl = `${API_BASE}/store/list`

const template = `
  <form class="store-selection-form">
    <p class="form-group">
      <label for="store">Store</label>
      <select id="store" name="store"></select>
    <p class="form-group">
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Enter your store password"
      >
  </form>
`

const processConfig = (event) => {
  event.preventDefault()

  const { target: form } = event

  localStorage.store = JSON.stringify({
    id: +form.store.value,
    password: form.password.value,
  })

  window.location.reload()
}


const setup = (rootElement) => {
  rootElement.innerHTML = 'Loading...'

  fetch(storeApiListUrl).then(r => r.json()).then((stores) => {
    rootElement.innerHTML = template

    const storeSelect = rootElement.querySelector('select')
    stores.forEach(store => storeSelect.insertAdjacentHTML(
      'beforeend',
      `<option value="${store.id}">${store.name}</option>`,
    ))

    rootElement.querySelector('form').addEventListener('submit', processConfig)
  })
}

export default setup
