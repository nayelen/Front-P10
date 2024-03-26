import { BASE_URL } from "../../../main";
import { Home } from "../Home/Home";
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

  inputName.placeholder = "Introduce tu nombre";
  inputEmail.placeholder = "Introduce tu email";
  inputPassword.placeholder = "Introduce tu password";
  button.textContent = "Regístrate";
  button.className = "btnRegister";

  elementoPadre.append(form);
  form.append(inputName, inputEmail, inputPassword, button);
  form.addEventListener("submit", submit);

}
const submit = async (e) => {
  e.preventDefault();

  const objetoEnvio = {
    name: e.srcElement[0].value,
    email: e.srcElement[1].value,
    password: e.srcElement[2].value,
  }

  const newUser = JSON.stringify(objetoEnvio);

  try {
    const response = await fetch(BASE_URL + "/users/register", {
      method: "POST",
      body: newUser,
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)
    if (!response.ok) {
      throw new Error("Error al registrar usuario");
    }
    const loginResponse = await fetch(BASE_URL + "/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: objetoEnvio.email,
        password: objetoEnvio.password,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    console.log(loginResponse)
    if (!loginResponse.ok) {
      throw new Error("Error al iniciar sesión");
    }

    if (response.status === 400) {
      const registerDiv = document.querySelector(".registerDiv")
      const pError = document.createElement("p");
      pError.classList.add("error");
      pError.textContent = "Email o contraseña no válidas";
      registerDiv.append(pError);
      return
    }
    const pError = document.querySelector(".error");
    if (pError) {
      pError.remove();
    }
    const loginSuccess = await loginResponse.json();
    const { token, user } = loginSuccess;
    console.log(loginSuccess);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    console.log(loginSuccess);

    Home()
    location.reload();
  } catch (error) {
    console.error("El registro ha fallado")
  }
}
