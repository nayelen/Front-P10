import { Assistants } from "../../pages/Assistants/Assistants";
import { DeleteEvent } from "../../pages/DeleteEvent/DeleteEvent";
import { Events } from "../../pages/Events/Events";
import { NewEvent } from "../../pages/NewEvent/NewEvent";
import { UpdateProfile } from "../../pages/UpdateProfile/UpdateProfile";
import { Users } from "../../pages/Users/Users";
import "./Profile.css";

const routesProfile = [
  {
    text: "Mis Eventos",
    page: null,
  },
  {
    text: "Actualiza tus datos",
    page: UpdateProfile,
  },
  {
    text: "Crea un Evento",
    page: NewEvent,
  },
  {
    text: "Borrar un Evento",
    page: DeleteEvent,
  },
  {
    text: "Asistentes de un Evento",
    page: Assistants,
  },
  {
    text: "Datos Usuario",
    page: Users,
  },
]

const initializeProfile = async () => {
  if (window.location.pathname === "Mi Perfil") {
    const { Events } = await import("../../pages/Events/Events");
    routesProfile[0].page = Events; // Ahora que Events está disponible, asignamos la función correspondiente en routesProfile
    Profile(); // Llamamos a Profile después de que Events se haya cargado
  }
};

initializeProfile();



export const Profile = () => {
  const main = document.querySelector("main");
  main.innerHTML = "";


  const user = JSON.parse(localStorage.getItem("user"))

  const aside = document.createElement("aside");

  for (const route of routesProfile) {
    const a = document.createElement("a");
    a.href = "#";
    a.className = "linkProfile";

    if (user.rol === "admin" && (route.text === "Crea un Evento" || route.text === "Asistentes de un Evento" || route.text === "Borrar un Evento" || route.text === "Datos Usuario")) {
      a.textContent = route.text;
      a.addEventListener("click", route.page);
    } else if (user.rol !== "admin" && route.text !== "Crea un Evento" && route.text !== "Asistentes de un Evento" && route.text !== "Borrar un Evento" && route.text !== "Datos Usuario") {
      a.textContent = route.text;
      a.addEventListener("click", route.page);
    } else {
      continue;
    }
    aside.appendChild(a);
  }
  main.append(aside);
}