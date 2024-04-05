import Swal from 'sweetalert2'
import { optionsFetch } from './Fetch'
import { BASE_URL } from '../../main'
import { Home } from '../pages/Home/Home'
import { Events } from '../pages/Events/Events'

export const cancelEvent = async (idEvent) => {
  const user = JSON.parse(localStorage.getItem('user'))

  const objetoFinal = { events: [idEvent] }

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
        const res = await optionsFetch(
          BASE_URL + `/users/${user._id}/events/${idEvent}`,
          'DELETE',
          objetoFinal,
          { Authorization: `Bearer ${localStorage.getItem('token')}` }
        )

        const index = user.events.indexOf(idEvent)
        if (index !== -1) {
          user.events.splice(index, 1)
          localStorage.setItem('user', JSON.stringify(user))
          swalAlert.fire({
            title: 'Cancelada!',
            text: 'Tu asistencia ha sido eliminada!',
            icon: 'success'
          })
          window.location.href = '/Home'
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalAlert.fire({
          title: 'Esperamos',
          text: 'Todavía puedes asistir al evento :)',
          icon: 'error'
        })
        window.location.href = '/Home'
      }
    })
}
