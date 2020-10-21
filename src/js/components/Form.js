export default class Form {
  constructor(type, form, formSelectors, errorMessages) {
    this.type = type;
    this.form = form;
    this.formSelectors = formSelectors;
    this.errorMessages = errorMessages;
  }

  setServerError = (input) => {
    const errorMessage = this.errorElements[input.id];

    const valid = this._validateInputElement(input);
    errorMessage.textContent = input.validationMessage;

    return valid;
  };

  setSubmitButtonState = (isValid) => {
    if (isValid) {
      this.button.classList.add(this.formSelectors.buttonActive);
      this.button.removeAttribute("disabled");
    } else {
      this.button.classList.remove(this.formSelectors.buttonActive);
      this.button.setAttribute("disabled", true);
    }
  };

  _validateInputElement = (input) => {
    input.setCustomValidity("");
    if (input.validity.valueMissing) {
      input.setCustomValidity(this.errorMessages.valueMissing);
      return false;
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      if (input.name === "username") {
        input.setCustomValidity(this.errorMessages.tooShort2);
      } else {
        input.setCustomValidity(this.errorMessages.tooShort6);
      }
      return false;
    }

    if (input.validity.typeMismatch && input.type === "email") {
      input.setCustomValidity(this.errorMessages.typeMismatch);
      return false;
    }

    return input.checkValidity();
  };

  _validateForm = (evt) => {
    this.setServerError(evt.target);

    if (this.inputs.every(this._validateInputElement)) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
    this.setSubmitButtonState(this.isValid);
  };

  _clear = () => {
    Object.values(this.errorElements).forEach(
      (error) => (error.textContent = "")
    );

    this.form.reset();
    this.setSubmitButtonState(false);
  };

  _getInfo = (evt) => {
    evt.preventDefault();

    const elements = evt.target.elements;
    let data;

    switch (this.type) {
      case 'search':
        data = elements.search.value;
        break;
      case 'login':
        data = {
          email: elements.email.value,
          pass: elements.pass.value,
        };
        break;
      case 'signup':
        data = {
          email: elements.email.value,
          pass: elements.pass.value,
          name: elements.username.value,
        };
        break;
    }

    console.log(data);
  };

  setForm = (form) => {
    this.form = form;
  };

  removeEventListeners = () => {
    this.form.removeEventListener("input", this._validateInputElement);
    this._clear();
  };

  setEventListeners = () => {
    this.inputs = [...this.form.querySelectorAll(this.formSelectors.input)];

    this.errorElements = {};

    this.inputs.forEach(
      (input) =>
        (this.errorElements[input.id] = this.form.querySelector(
          `.popup__${input.name}-error`
        ))
    );

    this.button = this.form.querySelector(this.formSelectors.button);

    if (this.type !== "search") {
      this.form.addEventListener("input", this._validateForm);
    }

    this.form.addEventListener("submit", this._getInfo);
  };
}
