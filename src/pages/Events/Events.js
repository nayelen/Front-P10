import Swal from 'sweetalert2'
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

export const cancelEvent = async (idEvent) => {
  const user = JSON.parse(localStorage.getItem('user'))

  const objetoFinal = JSON.stringify({
    events: [idEvent]
  })

  const swalAlert = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  swalAlert
    .fire({
      title: 'Cancelar asistencia?',
      text: 'Ya no podrás ir al evento',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar asistencia',
      cancelButtonText: 'No, Espera!',
      reverseButtons: true
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          BASE_URL + `/users/${user._id}/events/${idEvent}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: objetoFinal
          }
        )
        if (res.ok) {
          const index = user.events.indexOf(idEvent)
          if (index !== -1) {
            user.events.splice(index, 1)
            localStorage.setItem('user', JSON.stringify(user))
            swalAlert.fire({
              title: 'Cancelada!',
              text: 'Tu asistencia ha sido eliminada!',
              icon: 'success'
            })
            Events()
          }
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalAlert.fire({
          title: 'Esperamos',
          text: 'Todavía puedes asistir al evento :)',
          icon: 'error'
        })
      }
    })
}
