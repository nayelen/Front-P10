import { printEvents } from '../Home/Home'
import { BASE_URL } from '../../../main'
import { Profile } from '../../components/Profile/Profile'

export const Events = async () => {
  const main = document.querySelector('main')

  main.innerHTML = ''

  Profile(main)

  const user = JSON.parse(localStorage.getItem('user'))

  const res = await fetch(BASE_URL + `/users/${user._id}`)

  const usuario = await res.json()

  const events = usuario.events

  console.log(events)

  printEvents(events, main)
}
