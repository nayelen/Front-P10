import { BASE_URL } from "../../../main";
import { FieldForm } from "../../components/FieldForm/FieldForm";
import { Profile } from "../../components/Profile/Profile";
import "./UpdateProfile.css";

export const UpdateProfile = async () => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  Profile()

  const user = JSON.parse(localStorage.getItem("user"));

  const res = await fetch(BASE_URL + `/users/${user._id}`);

  const usuario = await res.json();
  console.log(usuario);

  formUpdateUser(main)
}

const formUpdateUser = (elementoPadre) => {
  const form = document.createElement("form")
  form.innerHTML = `
  ${FieldForm("Actualiza tu Email")}
  ${FieldForm("Actualiza tu Password")}
  <button>Enviar</button>
  `

  form.addEventListener("submit", updateUser)
  elementoPadre.append(form);
}

const updateUser = async (e) => {
  e.preventDefault()
  const user = JSON.parse(localStorage.getItem("user"));

  const userUpdate = {
    email: e.target[0].value || user.email,
    password: e.target[1].value || user.password
  }


  const newUser = JSON.stringify(userUpdate);

  const res = await fetch(BASE_URL + `/users/${user._id}`, {
    method: "PUT",
    body: newUser,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  })

  const respuestaFinal = await res.json();
  console.log(respuestaFinal)

}