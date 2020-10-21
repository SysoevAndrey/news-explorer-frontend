export default class Form {
  constructor(type, form, formSelectors, errorMessages) {
    this.type = type;
    this.form = form;
    this.formSelectors = formSelectors;
    this.errorMessages = errorMessages;
  }

  setServerError = () => {};

  // -----------------------------------------------
  isValidate = (input) => {
    input.setCustomValidity("");
    if (input.validity.valueMissing) {
      input.setCustomValidity(this.errorMessages.valueMissing);
      return false;
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      if (input.validity.tooShort === 6) {
        input.setCustomValidity(this.errorMessages.tooShort6);
      } else {
        input.setCustomValidity(this.errorMessages.tooShort2);
      }
      return false;
    }

    if (input.validity.typeMismatch && input.type === "url") {
      input.setCustomValidity(this.errorMessages.typeMismatch);
      return false;
    }

    return input.checkValidity();
  }

  checkInputValidity = (input) => {
    const errorMessage = this.errorElements[input.id];

    const valid = this.isValidate(input);
    errorMessage.textContent = input.validationMessage;

    return valid;
  }

  setSubmitButtonState = (isValid) => {
    if (isValid) {
      this.button.classList.add(this.formSelectors.buttonActive);
      this.button.removeAttribute("disabled");
    } else {
      this.button.classList.remove(this.formSelectors.buttonActive);
      this.button.setAttribute("disabled", true);
    }
  }

  _validateInputElement = (evt) => {
    this.checkInputValidity(evt.target);

    if (this.inputs.every(this.isValidate)) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
    this.setSubmitButtonState(this.isValid);
  }
  // -----------------------------------------------

  _validateForm = (evt) => {
    evt.preventDefault();
  };

  _clear = () => {
    Object.values(this.errorElements).forEach(
      (error) => (error.textContent = "")
    );

    this.form.reset();
    this.setSubmitButtonState(false);
  };

  _getInfo = () => {};

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

    this.form.addEventListener("input", this._validateInputElement);
    this.form.addEventListener("submit", this._validateForm);
  };
}
