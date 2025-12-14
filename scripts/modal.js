// Конфигурация модальных окон
const modalConfig = {
    closeOnBackdropClick: true,
    closeOnEscape: true
};

// Основной класс для управления модальными окнами
class ModalManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Используем делегирование событий для поддержки динамических элементов
        document.addEventListener('click', this.handleClick.bind(this));
        
        if (modalConfig.closeOnEscape) {
            document.addEventListener('keydown', this.handleKeydown.bind(this));
        }
        
        if (modalConfig.closeOnBackdropClick) {
            document.addEventListener('click', this.handleBackdropClick.bind(this));
        }
        
        console.log('ModalManager инициализирован');
    }
    
    // Обработчик кликов по кнопкам открытия
    handleClick(event) {
        const openButton = event.target.closest('[data-action="open-modal"]');
        
        if (openButton) {
            event.preventDefault();
            this.openModal(openButton);
        }
    }
    
    // Открытие модального окна
    openModal(button) {
        const dialog = button.nextElementSibling;
        
        if (dialog && dialog.tagName === 'DIALOG') {
            dialog.showModal();
            
            // Добавляем класс для анимации (опционально)
            dialog.classList.add('modal-open');
            
            // Сохраняем фокус для доступности
            setTimeout(() => {
                const firstFocusable = dialog.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            }, 10);
        } else {
            console.warn('Модальное окно не найдено после кнопки:', button);
        }
    }
    
    // Закрытие всех модальных окон
    closeAllModals() {
        document.querySelectorAll('dialog[open]').forEach(dialog => {
            dialog.close();
            dialog.classList.remove('modal-open');
        });
    }
    
    // Обработчик нажатия клавиш
    handleKeydown(event) {
        if (event.key === 'Escape') {
            this.closeAllModals();
        }
    }
    
    // Обработчик клика по фону
    handleBackdropClick(event) {
        if (event.target.tagName === 'DIALOG' && event.target.open) {
            const rect = event.target.getBoundingClientRect();
            
            // Проверяем, был ли клик вне содержимого диалога
            const isClickInDialog = (
                rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width
            );
            
            if (!isClickInDialog) {
                event.target.close();
                event.target.classList.remove('modal-open');
            }
        }
    }
    
    // Метод для ручного добавления обработчиков к новым элементам
    addModalToElement(button) {
        if (button.hasAttribute('data-modal-initialized')) {
            return;
        }
        
        button.setAttribute('data-modal-initialized', 'true');
        button.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal(button);
        });
    }
}

// Инициализация при загрузке страницы
let modalManager;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        modalManager = new ModalManager();
    });
} else {
    modalManager = new ModalManager();
}

// Экспорт для использования в других скриптах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ModalManager, modalManager };
} else {
    window.ModalManager = ModalManager;
    window.modalManager = modalManager;
}