import { BASE_URL } from "../../../main";
import { Home } from "../Home/Home";
import "./Login.css";

export const LoginPage = () => {
  const divApp = document.querySelector("#app");
  divApp.innerHTML = "";

  const loginDiv = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.textContent = "Identifícate"

  loginDiv.appendChild(h2);
  loginDiv.className = "loginDiv";

  login(loginDiv);
  divApp.appendChild(loginDiv);
};

const login = (elementoPadre) => {
  const form = document.createElement("form");

  const inputEmail = document.createElement("input");
  const inputPassword = document.createElement("input");
  const button = document.createElement("button");

  inputEmail.placeholder = "Introduce tu email";
  inputPassword.placeholder = "*****";
  inputPassword.type = "password";
  button.textContent = "Login";
  button.className = "btnLogin"

  elementoPadre.append(form);
  form.append(inputEmail, inputPassword, button);

  form.addEventListener("submit", submit)
}

const submit = async (e) => {
  e.preventDefault();

  const user = JSON.stringify({
    email: e.srcElement[0].value,
    password: e.srcElement[1].value,
  })
  console.log(user);

  const res = await fetch(BASE_URL + "/users/login", {
    method: "POST",
    body: user,
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (res.status === 400) {
    const pError = document.createElement("p")
    pError.textContent = "Usuario o contraseña incorrectos"
    pError.className = "error";
    form.append(pError)
    return;
  }
  const pError = document.querySelector(".error")
  if (pError) {
    pError.remove();
  }

  const respuestaFinal = await res.json();

  console.log(respuestaFinal)

  localStorage.setItem("token", respuestaFinal.token);
  localStorage.setItem("user", JSON.stringify(respuestaFinal.user))
  location.reload();
  Home()
};