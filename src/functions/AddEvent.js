import { BASE_URL } from '../../main'
import { optionsFetch } from './Fetch'

export const addEvent = async (idEvent) => {
  const user = JSON.parse(localStorage.getItem('user'))

  user.events = [...user.events, idEvent]
  console.log(user.events)

  const objetoFinal = { events: [idEvent] }

  const res = await optionsFetch(
    BASE_URL + `/users/${user._id}`,
    'PUT',
    objetoFinal,
    { Authorization: `Bearer ${localStorage.getItem('token')}` }
  )

  const respuesta = res
  console.log(respuesta)

  localStorage.setItem('user', JSON.stringify(user))
}
