import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'

export default [
  {
    href: '/',
    component: Dashboard,
  },
  {
    href: '/logout',
    onEnter: (params, redirect, nextRoute, props) => {
      const { api } = props
      api.logout()
      redirect('/login')
    },
  },
  {
    href: '/login',
    component: LoginForm,
  },
  {
    href: '/register',
    component: RegistrationForm,
  },
]
