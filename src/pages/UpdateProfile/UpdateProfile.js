import { BASE_URL } from '../../../main'
import { FieldForm } from '../../components/FieldForm/FieldForm'
import { Profile } from '../../components/Profile/Profile'
import { optionsFetch } from '../../functions/Fetch'
import { Home } from '../Home/Home'
import Swal from 'sweetalert2'
import './UpdateProfile.css'

export const UpdateProfile = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  Profile()

  const user = JSON.parse(localStorage.getItem('user'))

  const res = await fetch(BASE_URL + `/users/${user._id}`)

  const usuario = await res.json()
  console.log(usuario)

  formUpdateUser(main)
}

const formUpdateUser = (elementoPadre) => {
  const form = document.createElement('form')
  form.innerHTML = `
  ${FieldForm('Actualiza tu Email')}
  ${FieldForm('Actualiza tu Password')}
  <button>Enviar</button>
  `
  form.addEventListener('submit', updateUser)
  elementoPadre.append(form)
}

const updateUser = async (e) => {
  e.preventDefault()
  const user = JSON.parse(localStorage.getItem('user'))

  const userUpdate = {
    email: e.target[0].value || user.email,
    password: e.target[1].value || user.password
  }
  const respuestaFinal = await optionsFetch(
    BASE_URL + `/users/${user._id}`,
    'PUT',
    userUpdate,
    {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  )
  console.log(respuestaFinal)
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Datos Actualizados!',
    showConfirmButton: false,
    timer: 1500
  })
  Home()
}
