import { clearChildren } from '../lib/utils'
import Router from './Router'
import routes from './routes'

import './style/index.css'

import config from './config'
import setup from './setup'


const root = clearChildren(document.getElementById('root'))

if (config.store) {
  const router = new Router(routes)
  root.appendChild(router.host)
} else {
  setup(root)
}
