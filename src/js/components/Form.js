import { emailExp } from "../constants/constants";

export default class Form {
  constructor(type, form, formSelectors, errorMessages, sendData) {
    this.type = type;
    this.form = form;
    this.formSelectors = formSelectors;
    this.errorMessages = errorMessages;
    this.sendData = sendData;
  }

  setServerError = (info) => {
    this.serverError = document.querySelector(this.formSelectors.serverError);
    this.serverError.textContent = info.message;
  };

  setInputError = (input) => {
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

    if (!emailExp.test(input.value) && input.type === "email") {
      input.setCustomValidity(this.errorMessages.typeMismatch);
      return false;
    }

    return input.checkValidity();
  };

  _validateForm = (evt) => {
    this.setInputError(evt.target);

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

    if (this.serverError) {
      this.serverError.textContent = "";
    }

    this.form.reset();
    this.setSubmitButtonState(false);
  };

  disableForm = (disabled) => {
    this.elements = [...this.form.elements];

    this.elements.forEach((element) =>
      disabled
        ? element.setAttribute("disabled", true)
        : element.removeAttribute("disabled")
    );
  };

  _getInfo = (evt) => {
    evt.preventDefault();

    this.disableForm(true);

    this.sendData(this.elements, this.type);
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
