import { Component } from '../../lib'
import { bindAll } from '../../lib/utils'
import './LoginForm.css'

class RegistrationForm extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      email: '',
      password: '',
      success: '',
      errors: [],
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
    const email = event.target.email.value
    const password = event.target.password.value
    const passwordRepeat = event.target['password-repeat'].value

    this.updateState({ username, email, password })

    if (passwordRepeat !== password) {
      this.updateState({
        errors: [
          'Passwords do not match',
        ],
      })
    } else {
      api.register(username, email, password).then((result) => {
        if (result.success) {
          this.updateState({
            success: 'Registration successful. You may login',
          })
        } else {
          this.updateState({
            errors: result.validations,
          })
        }
      })
    }
  }

  render() {
    const {
      username,
      email,
      password,
      success,
      errors,
    } = this.state

    return `
      <h1>Register</h1>

      <form action="#/register" method="post">
        <p class="form-success-message">
          ${success}

        <ul class="form-error-message">
          ${errors.map(e => `<li>${e}`).join('')}
        </ul>

        <p class="form-group">
          <label for="username">Username</label>
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
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value="${email}"
            placeholder="e.g. yakubiv@localhost"
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
          <label for="password-repeat">Password repeat</label>
          <input
            id="password-repeat"
            type="password"
            name="password-repeat"
            placeholder="e.g. ••••••••"
            minlength="8"
            required
          >

        <p class="form-group">
          <button type="submit">Register</button>
          <a href='#/login'>Login</a>
      </form>
    `
  }
}

export default RegistrationForm
