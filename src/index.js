import { clearChildren } from '../lib/utils'
import Router from './Router'
import routes from './routes'

import './style/index.css'

const router = new Router(routes)

const root = clearChildren(document.getElementById('root'))

root.appendChild(router.host)
