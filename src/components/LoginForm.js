import { Component } from '../../lib'
import { bindAll } from '../../lib/utils'
import { redirect } from '../Router'
import './LoginForm.css'


class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      error: '',
    }

    bindAll(this, 'onSubmit')

    this.host = document.createElement('div')
    this.host.classList.add('form-login-container')
    this.host.addEventListener('submit', this.onSubmit)
  }

  onSubmit(event) {
    event.preventDefault()

    const { api } = this.props
    const username = event.target.username.value
    const password = event.target.password.value

    this.updateState({ username, password })

    api.login(username, password).then((success) => {
      if (success) redirect('/')
    }).catch((error) => {
      this.updateState({
        error: error.message,
      })
    })
  }

  onBeforeUpdate(nextProps) {
    const { api } = nextProps

    if (api.isAuthorized) {
      redirect('/')
    }
  }

  render() {
    const { username, password, error } = this.state

    return `
      <h1>Login</h1>

      <form action="#/login" method="post">
        <p class="form-error">
          ${error}

        <p class="form-group">
          <label for="username"></label>
          <input
            id="username"
            name="username"
            value="${username}"
            placeholder="e.g. yakubiv"
            minlength="2"
            maxlength="24"
            required
          >
        <p class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value="${password}"
            placeholder="e.g. ••••••••"
            minlength="8"
            required
          >

        <p class="form-group">
          <button type="submit">Login</button>
          <a href='#/register'>Register</a>
      </form>
    `
  }
}

export default LoginForm
