import { Component } from '../../lib'
import './LoginForm.css'

class LoginForm extends Component {
  constructor() {
    super()

    this.host = document.createElement('div')
    this.host.classList.add('form-login-container')
  }

  render() {
    return `
      <h3>Pizza App</h3>
      <form>
        <input name="login">
        <input type="password" name="password">
      </form>

      <a href='#/'>Home page</a>
    `
  }
}

export default LoginForm
