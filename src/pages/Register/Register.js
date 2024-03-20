import { BASE_URL } from "../../../main";
import { LoginPage } from "../Login/Login";
import "./Register.css";


export const RegisterPage = () => {
  const divApp = document.querySelector('#app');
  divApp.innerHTML = "";

  const registerDiv = document.createElement("div");
  registerDiv.className = "registerDiv";
  const h2 = document.createElement("h2");
  h2.textContent = "Regístrate"

  registerDiv.appendChild(h2);

  register(registerDiv);
  divApp.append(registerDiv);
}

const register = (elementoPadre) => {
  const form = document.createElement("form");
  const inputName = document.createElement("input");
  const inputEmail = document.createElement("input");
  const inputPassword = document.createElement("input");
  const button = document.createElement("button");

  inputName.placeholder = "Enter your name";
  inputEmail.placeholder = "Enter your email";
  inputPassword.placeholder = "Enter your password";
  // inputPasswordConfirmation.placeholder = "Confirm your password";
  button.textContent = "Register";
  button.className = "btnRegister";

  // if (inputPassword.value !== inputPasswordConfirmation.value) {
  //   const p = document.createElement("p");
  //   p.textContent = "La contraseña no coincide";
  //   form.append(p);
  // }

  elementoPadre.append(form);
  form.append(inputName, inputEmail, inputPassword, button);
  form.addEventListener("submit", submit);

}
const submit = async (e, form) => {
  e.preventDefault();

  const objetoEnvio = {
    name: e.srcElement[0].value,
    email: e.srcElement[1].value,
    password: e.srcElement[2].value,
  }

  const newUser = JSON.stringify(objetoEnvio);

  const res = await fetch(BASE_URL + "/users/register", {
    method: "POST",
    body: newUser,
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.status === 400) {
    const form = document.querySelector("form")
    const pError = document.createElement("p");
    pError.classList.add("error");
    pError.textContent = "Email o contraseña no válidas";
    form.append(pError);
    return
  }
  const pError = document.querySelector(".error");
  if (pError) {
    pError.remove();
  }

  const respuestaFinal = await res.json();
  localStorage.setItem("token", respuestaFinal.token);
  localStorage.setItem("user", JSON.stringify(respuestaFinal.user))
  LoginPage()
}