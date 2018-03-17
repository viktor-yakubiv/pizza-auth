import { Component } from '../lib'
import Router from './Router'

class App extends Component {
  constructor(props) {
    super(props)

    const { api, routes } = this.props

    this.router = new Router({ api, routes })
    this.host = this.router.host
  }

  render() {
    const { api } = this.props
    return this.router.update({ api, router: this.router })
  }
}

export default App
