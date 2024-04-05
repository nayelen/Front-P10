import { BASE_URL } from '../../../main'
import './Home.css'
import { addEvent } from '../../functions/AddEvent'
import { cancelEvent } from '../../functions/CancelEvent'

export const Home = async () => {
  const main = document.querySelector('.main')
  main.innerHTML = ''

  const response = await fetch(BASE_URL + '/events')
  const events = await response.json()
  console.log(events)

  printEvents(events, main)
}

export const printEvents = (events, elementoPadre) => {
  console.log(elementoPadre)
  const divEvents = document.createElement('div')
  divEvents.className = 'events'

  for (const event of events) {
    const divEvent = document.createElement('div')
    const title = document.createElement('h2')
    const imgEvent = document.createElement('img')
    const date = document.createElement('h3')
    const place = document.createElement('p')
    const description = document.createElement('p')
    const divButtons = document.createElement('div')
    const attend = document.createElement('button')
    const cancel = document.createElement('button')

    cancel.addEventListener('click', () => {
      cancelEvent(event._id)
      attend.textContent = 'Inscríbete'
      attend.disabled = false
      cancel.style.display = 'none'
      cancel.textContent = ''
    })

    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.events?.includes(event._id)) {
      attend.textContent = 'Inscrito'
      attend.disabled = true
      cancel.textContent = 'Cancelar Asistencia'
      cancel.style.display = 'inline-block'
    } else {
      attend.textContent = 'Inscríbete'
      attend.disabled = false
      cancel.style.display = 'none'
    }

    attend.addEventListener('click', () => {
      addEvent(event._id)
      attend.textContent = 'Inscrito'
      attend.disabled = true
      cancel.textContent = 'Cancelar Asistencia'
      cancel.style.display = 'inline-block'
    })

    attend.className = 'attend'
    cancel.className = 'cancel'
    divEvent.className = 'event'
    divButtons.className = 'buttons'
    title.textContent = event.name
    imgEvent.src = event.img
    imgEvent.className = 'eventImg'
    date.textContent = event.date
    place.textContent = event.place
    place.className = 'place'
    description.textContent = event.description

    divEvent.append(title, imgEvent, date, place, description, divButtons)
    divButtons.append(attend, cancel)
    divEvents.append(divEvent)
  }
  elementoPadre.append(divEvents)
}
