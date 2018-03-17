import { Component } from '../lib'

import { isEqualPaths, extractUrlParams } from '../lib/utils'

const ANY_PATH = '*'

class Router extends Component {
  constructor({ routes, ...transferProps }) {
    super(transferProps)
    this.state = {
      activeRoute: null,
      activeComponent: null,
      routes,
    }

    this.host = document.createElement('div')

    window.addEventListener('hashchange', this.handleUrlChange.bind(this))

    if (window.location.hash === '') {
      window.location.hash = '#/'
    } else {
      this.handleUrlChange()
    }
  }

  // eslint-disable-next-line class-methods-use-this
  get path() {
    return window.location.hash.slice(1)
  }

  handleUrlChange() {
    const { path } = this
    const { routes, activeRoute } = this.state
    let nextRoute = routes.find(({ href }) => isEqualPaths(href, path))

    // looking for any route
    if (!nextRoute) {
      nextRoute = routes.find(({ href }) => href === ANY_PATH)
    }

    if (nextRoute && activeRoute !== nextRoute) {
      if (nextRoute.redirectTo) {
        this.handleRedirect(nextRoute.redirectTo)
        return
      }

      if (nextRoute.onEnter) {
        this.handleOnEnter(nextRoute, path)
        return
      }

      this.applyRoute(nextRoute, path)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handleRedirect(url) {
    window.location.hash = url
  }

  handleOnEnter(nextRoute, url) {
    const { href } = nextRoute
    const params = extractUrlParams(href, url)

    nextRoute.onEnter(params, this.handleRedirect, nextRoute, this.props)
  }

  applyRoute(route) {
    const { href, component: RouteComponent } = route
    const { activeComponent } = this.state

    const componentInstance = new RouteComponent({
      params: extractUrlParams(href, this.path),
      replace: this.handleRedirect,
    })

    if (activeComponent) {
      activeComponent.unmount()
    }

    this.updateState({
      activeRoute: route,
      activeComponent: componentInstance,
    })
  }

  render() {
    return this.state.activeComponent.update({
      route: this.state.activeRoute,
      ...this.props,
    })
  }
}

const redirect = (url) => {
  window.location.hash = `#${url}`
}

export default Router
export { redirect }
