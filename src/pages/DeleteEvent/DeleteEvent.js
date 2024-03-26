import Swal from 'sweetalert2'
import { BASE_URL } from "../../../main";
import { Profile } from "../../components/Profile/Profile";
import { Home } from "../Home/Home";
import "./DeleteEvent.css";


export const DeleteEvent = async () => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  Profile()

  const response = await fetch(BASE_URL + "/events")
  const events = await response.json()
  console.log(events)
  selectEvents(events, main);

}

const selectEvents = (events, elementoPadre) => {
  const inputsDiv = document.createElement("div");
  inputsDiv.className = "inputContainer";
  const select = document.createElement("select")
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Selecciona el evento";
  select.appendChild(defaultOption);
  const divData = document.createElement("div")
  divData.className = "data";
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Borrar Evento"

  for (const event of events) {
    const option = document.createElement("option")
    option.textContent = event.name + ": " + event.date;
    option.value = event._id;
    select.appendChild(option);
  }
  select.addEventListener("change", (event) => {
    const selectedEventId = event.target.value;
    console.log(selectedEventId)
    showInfo(selectedEventId)
    if (selectedEventId) {
      btnDelete.addEventListener("click", () => {
        deleteEvent(selectedEventId)

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Evento Eliminado",
          showConfirmButton: false,
          timer: 1500
        });
        Home()
      });
    }
  });
  inputsDiv.append(select, btnDelete, divData)
  elementoPadre.append(inputsDiv)
}

const deleteEvent = async (idEvent) => {
  await fetch(BASE_URL + `/events/${idEvent}`, {
    method: "DELETE",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
}

const showInfo = async (idEvent) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(BASE_URL + `/events/${idEvent}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });
    console.log(response)

    if (!response.ok) {
      throw new Error("Error al obtener datos del evento");
    }

    const event = await response.json();

    const divData = document.querySelector(".data");
    divData.innerHTML = "";

    const eventList = document.createElement("ul");
    eventList.className = "event_list";

    const eventItem = document.createElement("li");
    eventItem.textContent = "Evento: " + event.name;
    const dateEvent = document.createElement("p");
    dateEvent.textContent = "Fecha: " + event.date;
    const imageEvent = document.createElement("img");
    imageEvent.src = event.img;

    eventItem.append(dateEvent, imageEvent);
    eventList.appendChild(eventItem);

    divData.appendChild(eventList);

  } catch (error) {
    console.error("Error al obtener datos del evento:", error);
  }
}