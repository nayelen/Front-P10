import { BASE_URL } from '../../../main'
import { FieldForm } from '../../components/FieldForm/FieldForm'
import { Header } from '../../components/Header/Header'
import { optionsFetch } from '../../functions/Fetch'
import { Home } from '../Home/Home'
import './Register.css'

export const RegisterPage = () => {
  const divApp = document.querySelector('#app')
  divApp.innerHTML = ''
  Header(divApp)

  const registerDiv = document.createElement('div')
  registerDiv.className = 'registerDiv'
  const h2 = document.createElement('h2')
  h2.textContent = 'Regístrate'

  registerDiv.appendChild(h2)

  register(registerDiv)
  divApp.append(registerDiv)
}

const register = (elementoPadre) => {
  const form = document.createElement('form')
  form.innerHTML = `
  ${FieldForm('Nombre: ')}
  ${FieldForm('Email:  ')}
  ${FieldForm('Password:')}
  <button>Enviar</button>
  `

  elementoPadre.append(form)
  form.addEventListener('submit', submit)
}

const submit = async (e) => {
  e.preventDefault()

  const objetoEnvio = {
    name: e.srcElement[0].value,
    email: e.srcElement[1].value,
    password: e.srcElement[2].value
  }

  try {
    const response = await optionsFetch(
      BASE_URL + '/users/register',
      'POST',
      objetoEnvio
    )
    console.log(response)

    if (response.status === 400) {
      const registerDiv = document.querySelector('.registerDiv')
      const pError = document.createElement('p')
      pError.classList.add('error')
      pError.textContent = 'Email o contraseña no válidas'
      registerDiv.append(pError)
      return
    }
    const pError = document.querySelector('.error')
    if (pError) {
      pError.remove()
    }

    const loginResponse = await optionsFetch(
      BASE_URL + '/users/login',
      'POST',
      {
        email: objetoEnvio.email,
        password: objetoEnvio.password
      }
    )
    console.log(loginResponse)

    if (!loginResponse.token) {
      throw new Error('Error al iniciar sesión')
    }

    localStorage.setItem('token', loginResponse.token)
    localStorage.setItem('user', JSON.stringify(loginResponse.user))
    console.log(loginResponse)

    Home()
    location.reload()
  } catch (error) {
    console.error('El registro ha fallado', error.message)
  }
}
