import "./Users.css";
import { BASE_URL } from "../../../main";
import { Profile } from "../../components/Profile/Profile";

export const Users = async () => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  Profile()

  try {
    const response = await fetch(BASE_URL + "/users")
    const users = await response.json()
    console.log(users)
    selectUser(users, main);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
}

const selectUser = (users, elementoPadre) => {
  const inputsDiv = document.createElement("div");
  inputsDiv.className = "inputContainer";
  const select = document.createElement("select")
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Selecciona el usuario";
  select.appendChild(defaultOption);
  const divData = document.createElement("div")
  divData.className = "data";

  for (const user of users) {
    const option = document.createElement("option")
    option.textContent = user.name;
    option.value = user._id;
    select.appendChild(option);
  }
  select.addEventListener("change", (event) => {
    const selectedUsertId = event.target.value;
    console.log(selectedUsertId)
    if (selectedUsertId) {
      showInfo(selectedUsertId);
    }
  });

  inputsDiv.append(select, divData)
  elementoPadre.append(inputsDiv)
}

const showInfo = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(BASE_URL + `/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });
    console.log(response)

    if (!response.ok) {
      throw new Error("Error al obtener datos del usuario");
    }

    const user = await response.json();
    console.log(user)

    const divData = document.querySelector(".data");
    divData.innerHTML = "";

    const userList = document.createElement("ul");
    userList.className = "user_list";
    const userItem = document.createElement("li");
    userItem.textContent = "Nombre: " + user.name;
    const emailUser = document.createElement("p");
    emailUser.textContent = "Email: " + user.email;
    userItem.appendChild(emailUser);

    if (user.events && user.events.length > 0) {
      const eventsList = document.createElement("ul");
      eventsList.textContent = "Eventos inscritos: ";
      for (const event of user.events) {
        console.log("ID de evento:", event._id);

        try {
          const eventResponse = await fetch(BASE_URL + `/events/${event._id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!eventResponse.ok) {
            throw new Error("Error al obtener detalles del evento");
          }
          const eventData = await eventResponse.json();
          const eventItem = document.createElement("li");
          eventItem.textContent = eventData.name;
          eventsList.appendChild(eventItem);

        } catch (error) {
          console.error("Error al obtener detalles del evento:", error);
        }
      }
      userItem.appendChild(eventsList);
    }

    userList.appendChild(userItem);
    divData.appendChild(userList);

  } catch (error) {
    console.error("Error al obtener información del usuario:", error);
  }
}