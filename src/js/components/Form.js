export default class Form {
  constructor(type, form) {
    this.type = type;
    this.form = form;
  }

  setServerError = () => {};

  _validateInputElement = (evt) => {
    if (!evt.target.value) {
      console.log('0');
    }
  };

  _validateForm = (evt) => {
    evt.preventDefault();
  };

  _clear = () => {};

  _getInfo = () => {};

  setEventListeners = () => {
    const elements = [...this.form.elements];

    elements.forEach((element) => {
      if (element.type !== "submit") {
        element.addEventListener("keyup", this._validateInputElement);
      }
    });

    this.form.addEventListener("submit", this._validateForm);
  };
}
