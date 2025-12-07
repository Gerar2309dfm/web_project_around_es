// Función para abrir modal
function openModal(modal) {
  modal.classList.add('popup_is-opened');
}

// Función para cerrar modal
function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
}

// Cerrar modal con ESC
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    const opendModal = document.querySelector('.popup_is-opened');
    if (opendModal) {
      closeModal(opendModal);
    }
  }
});

// Cerrar modal al hacer clic en el overlay
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
});

// Exportar las funciones
export { openModal, closeModal };