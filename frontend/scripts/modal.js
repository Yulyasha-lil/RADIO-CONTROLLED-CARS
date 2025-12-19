// Если есть modal.js, добавьте адаптивность
const modal = document.getElementById('event-modal');
const modalClose = document.getElementById('modal-close');

// Адаптивное закрытие по клику вне окна
document.addEventListener('click', function(e) {
  if (isMobile() && modal.classList.contains('active') && 
      !modal.contains(e.target) && 
      e.target.id !== 'modal-register') {
    closeModal();
  }
});

// Этот файл теперь минимален, так как основная логика в events.js
// Оставлен для обратной совместимости

console.log('Modal functionality loaded. Main logic is in events.js');