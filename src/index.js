import { clearChildren } from '../lib/utils'

import './style/index.css'

import {
  API_BASE,
  store,
  routes,
  token,
  persistToken,
} from './config'
import setup from './setup'

import Api from './Api'
import App from './App'


const rootElement = clearChildren(document.getElementById('root'))

if (store) {
  const api = new Api(API_BASE, {
    store,
    token,
    onAuthorized: persistToken,
  })
  const app = new App({ api, routes })

  rootElement.appendChild(app.host)
} else {
  setup(rootElement)
}
