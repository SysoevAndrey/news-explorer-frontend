import '../pages/articles.css';

import Header from '../js/components/Header';

const headerItem = document.querySelector(".header");

const header = new Header(headerItem, 'light', 'Andrey');

header.render();