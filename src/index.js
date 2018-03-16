import { clearChildren } from './utils'
import Router from './framework/Router'
import routes from './routes'

const router = new Router(routes)

const root = clearChildren(document.getElementById('root'))

root.appendChild(router.host)
