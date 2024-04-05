import { BASE_URL } from '../../../main'
import { FieldForm } from '../../components/FieldForm/FieldForm'
import { Header } from '../../components/Header/Header'
import { optionsFetch } from '../../functions/Fetch'
import './Login.css'

export const LoginPage = () => {
  const divApp = document.querySelector('#app')
  divApp.innerHTML = ''
  Header(divApp)
  const loginDiv = document.createElement('div')
  const h2 = document.createElement('h2')
  h2.textContent = 'Identifícate'

  loginDiv.appendChild(h2)
  loginDiv.className = 'loginDiv'

  login(loginDiv)
  divApp.appendChild(loginDiv)
}

const login = (elementoPadre) => {
  const form = document.createElement('form')
  form.innerHTML = `
  ${FieldForm('Email: ')}
  ${FieldForm('Password:')}
  <button>Enviar</button>
  `
  elementoPadre.append(form)
  form.addEventListener('submit', submit)
}

const submit = async (e) => {
  e.preventDefault()

  const user = {
    email: e.srcElement[0].value,
    password: e.srcElement[1].value
  }
  console.log(user)
  try {
    const res = await optionsFetch(BASE_URL + '/users/login', 'POST', user)

    if (res.status === 400) {
      const loginDiv = document.querySelector('.loginDiv')
      const pError = document.createElement('p')
      pError.textContent = 'Usuario o contraseña incorrectos'
      pError.className = 'error'
      loginDiv.append(pError)
      return
    }
    const pError = document.querySelector('.error')
    if (pError) {
      pError.remove()
    }

    const respuestaFinal = res

    console.log(respuestaFinal)

    localStorage.setItem('token', respuestaFinal.token)
    localStorage.setItem('user', JSON.stringify(respuestaFinal.user))
    window.location.href = '/Home'
  } catch (error) {
    console.error('El login ha fallado', error.message)
  }
}
