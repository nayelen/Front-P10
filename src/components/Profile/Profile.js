import { routesProfile } from '../../utils/data'
import './Profile.css'

export const Profile = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const user = JSON.parse(localStorage.getItem('user'))

  const aside = document.createElement('aside')

  for (const route of routesProfile) {
    const a = document.createElement('a')
    a.href = '#'
    a.className = 'linkProfile'

    if (route.text === 'Mis Eventos') {
      a.textContent = route.text
      a.addEventListener('click', async () => {
        const { Events } = await import('../../pages/Events/Events')
        main.innerHTML = ''
        await Events()
      })
    } else if (
      user.rol === 'admin' &&
      (route.text === 'Crea un Evento' ||
        route.text === 'Asistentes de un Evento' ||
        route.text === 'Borrar un Evento' ||
        route.text === 'Datos Usuario')
    ) {
      a.textContent = route.text
      a.addEventListener('click', route.page)
    } else if (
      user.rol !== 'admin' &&
      route.text !== 'Crea un Evento' &&
      route.text !== 'Asistentes de un Evento' &&
      route.text !== 'Borrar un Evento' &&
      route.text !== 'Datos Usuario'
    ) {
      a.textContent = route.text
      a.addEventListener('click', route.page)
    } else {
      continue
    }
    aside.appendChild(a)
  }
  main.append(aside)
}
