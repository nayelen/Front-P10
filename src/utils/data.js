import { Profile } from '../components/Profile/Profile'
import { Assistants } from '../pages/Assistants/Assistants'
import { DeleteEvent } from '../pages/DeleteEvent/DeleteEvent'
import { Home } from '../pages/Home/Home'
import { LoginPage } from '../pages/Login/Login'
import { NewEvent } from '../pages/NewEvent/NewEvent'
import { RegisterPage } from '../pages/Register/Register'
import { UpdateProfile } from '../pages/UpdateProfile/UpdateProfile'
import { Users } from '../pages/Users/Users'

export const routes = [
  {
    text: 'Inicio',
    page: Home
  },
  {
    text: 'Mi Perfil',
    page: Profile
  },
  {
    text: 'Login',
    page: LoginPage
  },
  {
    text: 'Register',
    page: RegisterPage
  }
]
export const routesProfile = [
  {
    text: 'Mis Eventos',
    page: null
  },
  {
    text: 'Actualiza tus datos',
    page: UpdateProfile
  },
  {
    text: 'Crea un Evento',
    page: NewEvent
  },
  {
    text: 'Borrar un Evento',
    page: DeleteEvent
  },
  {
    text: 'Asistentes de un Evento',
    page: Assistants
  },
  {
    text: 'Datos Usuario',
    page: Users
  }
]
