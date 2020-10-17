import "./pages/main.css";

import Header from './js/components/Header';

const headerItem = document.querySelector(".header");

const header = new Header(headerItem, 'dark', 'Andrey');

header.render();