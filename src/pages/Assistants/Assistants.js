import { BASE_URL } from "../../../main";
import { Profile } from "../../components/Profile/Profile";
import "./Assistants.css";

export const Assistants = async () => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  Profile()

  const response = await fetch(BASE_URL + "/events")
  const events = await response.json()
  console.log(events)
  selectEvent(events, main);
}

const selectEvent = (events, elementoPadre) => {

  const select = document.createElement("select")
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Selecciona el evento";
  select.appendChild(defaultOption);
  const divData = document.createElement("div")
  divData.className = "data";

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
      showInfo(selectedEventId);
    }
  });

  elementoPadre.append(select, divData)
}

const showInfo = async (idEvent) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(BASE_URL + `/users/events/${idEvent}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });
    console.log(response)

    if (!response.ok) {
      throw new Error("Error al obtener usuarios por evento");
    }

    const users = await response.json();

    const divData = document.querySelector(".data");
    divData.innerHTML = "";

    const userList = document.createElement("ul");
    userList.className = "user_list";

    users.forEach(user => {
      const userItem = document.createElement("li");
      userItem.textContent = "Nombre: " + user.name;
      const emailUser = document.createElement("p");
      emailUser.textContent = "Email: " + user.email;
      userItem.appendChild(emailUser);
      userList.appendChild(userItem);
    });

    divData.appendChild(userList);

  } catch (error) {
    console.error("Error al obtener usuarios por evento:", error);
  }
}
