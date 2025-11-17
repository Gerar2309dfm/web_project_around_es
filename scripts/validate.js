const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Función de Propósito Único: Muestra el mensaje de error y resalta el input
const showInputError = (formElement, inputElement, errorMessage, config) => {
console.log("Mostrando error", errorMessage)
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Función de Propósito Único: Oculta el mensaje de error y restablece el input
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

// Función de Propósito Único: Comprueba la validez y llama a mostrar/ocultar error
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    // Usamos el mensaje de error por defecto del navegador
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// Función de Propósito Único: Verifica si hay algún input inválido
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Función de Propósito Único: Alterna el estado del botón (activo/inactivo)
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// Función de Propósito Único: Agrega escuchadores a todos los inputs del formulario
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Estado inicial del botón
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// Función de Propósito Único: Habilitar la validación en todos los formularios
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    // Prevenir el envío por defecto (que recarga la página)
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
};

// Función de Propósito Único: Restablecer la validación de un formulario
const resetValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });

  // Desactivar el botón al abrir (Estado inicial por defecto)
  toggleButtonState(inputList, buttonElement, config);
};


// Iniciar el proceso de validación para todos los formularios
enableValidation(validationConfig);