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
  serverError: ".popup__server-error",
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

const endings = {
  1: "сохраннённая статья",
  2: "сохраннённых статьи",
  3: "сохраннённых статьи",
  4: "сохраннённых статьи",
  5: "сохраннённых статей",
  6: "сохраннённых статей",
  7: "сохраннённых статей",
  8: "сохраннённых статей",
  9: "сохраннённых статей",
  0: "сохраннённых статей",
};

export { errorMessages, formSelectors, apiKey, emailExp, months, endings };
