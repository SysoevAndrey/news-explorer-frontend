import '../pages/articles.css';

import Header from '../js/components/Header';

const headerItem = document.querySelector(".header");

const logout = () => {
  alert('Вы действительно хотите выйти?')
  console.log("logout");
};

const header = new Header(headerItem, 'light', 'Andrey', null, logout);

header.render();