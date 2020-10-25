const errorMessages = {
  valueMissing: "Это обязательное поле",
  tooShort2: "Должно быть от 2 до 30 символов",
  tooShort6: "Должно быть от 6 до 30 символов",
  typeMismatch: "Здесь должен быть email",
};

const formSelectors = {
  button: ".button",
  buttonActive: "popup__button_active",
  input: ".input",
};

const apiKey = "393933fc023c43db92ea162494a5ec25";

const emailExp = /[\w\-]+(\.[\w\-]+)*@([\w\-]+\.)+([A-Z]|[a-z])+/;

const months = {
  "01": "января",
  "02": "февраля",
  "03": "марта",
  "04": "апреля",
  "05": "мая",
  "06": "июня",
  "07": "июля",
  "08": "августа",
  "09": "сентября",
  "10": "октября",
  "11": "ноября",
  "12": "декабря",
};

export { errorMessages, formSelectors, apiKey, emailExp, months };
