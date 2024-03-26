import { Header } from './src/components/Header/Header';
import { Home } from './src/pages/Home/Home';
import './style.css'

export const BASE_URL = "http://localhost:3000/api/v1";

const divApp = document.querySelector('#app');

window.addEventListener('DOMContentLoaded', () => {
  let container = document.querySelector('#container_loader');
  container.style.visibility = 'hidden';
  container.style.opacity = "0";
})

Header(divApp)

const main = document.createElement("main")
main.className = "main";
divApp.append(main)

Home(main)

