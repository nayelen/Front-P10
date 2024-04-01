import { Home } from '../../pages/Home/Home'
import { LoginPage } from '../../pages/Login/Login'
import { RegisterPage } from '../../pages/Register/Register'
import { Profile } from '../Profile/Profile'
import './Header.css'

const routes = [
  {
    text: 'Inicio',
    page: Home
  },
  {
    text: 'Mi Perfil',
    page: Profile
  },
  {
    text: 'Login',
    page: LoginPage
  },
  {
    text: 'Register',
    page: RegisterPage
  }
]
export const Header = (divApp) => {
  const header = document.createElement('header')
  header.innerHTML = ''

  const h1 = document.createElement('h1')
  h1.textContent = 'EVENTS VN'
  const nav = document.createElement('nav')

  for (const route of routes) {
    const aRoute = document.createElement('a')
    aRoute.href = '#'

    if (route.text === 'Login' && localStorage.getItem('token')) {
      aRoute.textContent = 'Logout'
      aRoute.addEventListener('click', () => {
        localStorage.clear()
        LoginPage()
      })
    } else if (!localStorage.getItem('token') && route.text === 'Mi Perfil') {
      continue
    } else {
      aRoute.textContent = route.text
      aRoute.addEventListener('click', route.page)
    }
    nav.appendChild(aRoute)
  }
  header.append(h1, nav)
  divApp.append(header)
}
