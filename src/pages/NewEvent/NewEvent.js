import { BASE_URL } from '../../../main'
import { FieldForm } from '../../components/FieldForm/FieldForm'
import { Profile } from '../../components/Profile/Profile'
import { optionsFetch } from '../../functions/Fetch'
import { Home } from '../Home/Home'
import './NewEvent.css'
import Swal from 'sweetalert2'

export const NewEvent = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  Profile()

  const user = JSON.parse(localStorage.getItem('user'))

  const res = await fetch(BASE_URL + '/events')
  const event = await res.json()
  console.log(res)
  formEvent(main)
}

const formEvent = (elementoPadre) => {
  const form = document.createElement('form')
  form.innerHTML = `
  ${FieldForm('Nombre del Evento')}
  ${FieldForm('Fecha del Evento')}
  ${FieldForm('Imagen del Evento', 'file', 'multipart/form-data')}
  ${FieldForm('Lugar del Evento')}
  ${FieldForm('Descripción del Evento')}
  <button>Enviar</button>
  `
  form.addEventListener('submit', postEvent)
  elementoPadre.append(form)
}

const postEvent = async (e) => {
  e.preventDefault()

  const formData = new FormData()

  const event = {
    name: e.target[0].value,
    date: e.target[1].value,
    place: e.target[3].value,
    description: e.target[4].value
  }

  for (const key in event) {
    formData.append(key, event[key])
  }

  const fileInput = e.target[2]
  formData.append('img', fileInput.files[0])
  console.log(event)

  try {
    const response = await optionsFetch(
      BASE_URL + '/events',
      'POST',
      formData,
      {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    )

    const eventPublicated = response
    console.log(eventPublicated)

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Evento Creado!',
      showConfirmButton: false,
      timer: 1500
    })
    Home()
  } catch (error) {
    console.error('Error al publicar el evento', error.message)
  }
}
