import { Component } from '../../lib'
import { redirect } from '../Router'

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.host = document.createElement('div')
    this.host.className = 'dashboard'
  }

  onBeforeUpdate(nextProps) {
    const { api } = nextProps

    if (!api.isAuthorized) {
      redirect('/login')
    }
  }

  render() {
    return 'Hello, World!'
  }
}

export default Dashboard
