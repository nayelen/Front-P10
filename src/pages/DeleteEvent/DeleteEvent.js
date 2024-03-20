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
  const select = document.createElement("select")
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Selecciona el evento";
  select.appendChild(defaultOption);
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Borrar Evento"

  for (const event of events) {
    const option = document.createElement("option")
    option.textContent = event.name;
    option.value = event._id;
    select.appendChild(option);
  }
  select.addEventListener("change", (event) => {
    const selectedEventId = event.target.value;
    console.log(selectedEventId)
    if (selectedEventId) {
      btnDelete.addEventListener("click", () => {
        deleteEvent(selectedEventId)

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Evento Eliminado",
          showConfirmButton: false,
          timer: 1500
        });
        Home()
      });
    }
  });
  inputsDiv.append(select, btnDelete)
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
