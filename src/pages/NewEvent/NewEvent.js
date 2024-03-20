import { BASE_URL } from "../../../main";
import { FieldForm } from "../../components/FieldForm/FieldForm";
import { Profile } from "../../components/Profile/Profile";
import { Home } from "../Home/Home";
import "./NewEvent.css";
import Swal from 'sweetalert2'

export const NewEvent = async () => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  Profile()

  const user = JSON.parse(localStorage.getItem("user"));

  const res = await fetch(BASE_URL + "/events");
  const event = await res.json();
  console.log(res);
  formEvent(main)
}

const formEvent = (elementoPadre) => {
  const form = document.createElement("form")
  form.innerHTML = `
  ${FieldForm("Nombre del Evento")}
  ${FieldForm("Fecha del Evento")}
  ${FieldForm("Imagen del Evento")}
  ${FieldForm("Lugar del Evento")}
  ${FieldForm("Descripción del Evento")}
  <button>Enviar</button>
  `

  form.addEventListener("submit", postEvent)
  elementoPadre.append(form);
}

const postEvent = async (e) => {
  e.preventDefault();
  // recojo los datos del formulario
  const event = {
    name: e.target[0].value,
    date: e.target[1].value,
    img: e.target[2].value,
    place: e.target[3].value,
    description: e.target[4].value,
  }
  console.log(event)

  const newEvent = JSON.stringify(event);

  const response = await fetch(BASE_URL + "/events", {
    method: "POST",
    body: newEvent,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    }

  })
  const eventPublicated = await response.json();
  console.log(eventPublicated)

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Evento Creado!",
    showConfirmButton: false,
    timer: 1500
  });
  Home()
}
