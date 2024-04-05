import { LoginPage } from '../../pages/Login/Login'
import { routes } from '../../utils/data'
import './Header.css'

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
