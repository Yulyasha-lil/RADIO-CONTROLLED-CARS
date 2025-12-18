// Добавить в начало файла events.js
const isMobile = () => window.innerWidth <= 768;

// Если есть функционал, который нужно адаптировать для мобильных
document.addEventListener('DOMContentLoaded', function() {
  // Пример: уменьшаем количество карточек для мобильных
  if (isMobile()) {
    console.log('Мобильное устройство обнаружено');
    // Можно добавить мобильную логику
  }
});

class EventsManager {
    constructor() {
        this.events = [];
        this.filteredEvents = [];
        this.currentFilter = 'all';
        this.eventsList = document.getElementById('events-list');
        this.loadingElement = document.getElementById('loading');
        this.filterButtons = document.querySelectorAll('.filter__button');
        
        this.init();
    }

    async init() {
        await this.loadEvents();
        this.renderEvents();
        this.setupEventListeners();
    }

    async loadEvents() {
        try {
            this.showLoading(true);
            const response = await fetch('./data/events.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.events = data.events;
            this.filteredEvents = [...this.events];
        } catch (error) {
            console.error('Ошибка загрузки мероприятий:', error);
            this.showError();
        } finally {
            this.showLoading(false);
        }
    }

    showLoading(show) {
        if (this.loadingElement) {
            this.loadingElement.style.display = show ? 'block' : 'none';
        }
    }

    showError() {
        this.eventsList.innerHTML = `
            <li class="error-message">
                <p>Не удалось загрузить мероприятия. Пожалуйста, попробуйте позже.</p>
            </li>
        `;
    }

    filterEvents(category) {
        this.currentFilter = category;
        
           
        this.filterButtons.forEach(button => {
            if (button.dataset.filter === category) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        if (category === 'all') {
            this.filteredEvents = [...this.events];
        } else {
            this.filteredEvents = this.events.filter(event => 
                event.category === category
            );
        }

        this.renderEvents();
    }

    createEventCard(event) {
        return `
            <li class="event__card-item" data-id="${event.id}">
                <div class="card__image-container">
                    <img 
                        class="card__image" 
                        src="${event.image}" 
                        alt="${event.alt}"
                        loading="lazy"
                    >
                    <span class="card__category">${event.category}</span>
                </div>
                <div class="event__card-content">
                    <h3 class="event__card-title">${event.title}</h3>
                    <div class="event__card-date">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        ${event.date}
                    </div>
                    <div class="event__card-location">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        ${event.location}
                    </div>
                </div>
                <button 
                    class="event__button" 
                    type="button" 
                    data-action="open-modal"
                    data-event-id="${event.id}"
                    aria-label="Подробнее о мероприятии ${event.title}">
                    <span>Подробнее</span>
                </button>
            </li>
        `;
    }

    renderEvents() {
        if (this.filteredEvents.length === 0) {
            this.eventsList.innerHTML = `
                <li class="no-events">
                    <p>Нет мероприятий в выбранной категории.</p>
                </li>
            `;
            return;
        }

        const eventsHTML = this.filteredEvents
            .map(event => this.createEventCard(event))
            .join('');
        
        this.eventsList.innerHTML = eventsHTML;
        
             
        this.addEventCardListeners();
    }

    addEventCardListeners() {
        const buttons = document.querySelectorAll('[data-action="open-modal"]');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const eventId = parseInt(e.currentTarget.dataset.eventId);
                this.openEventModal(eventId);
            });
        });
    }

    openEventModal(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;

             
        const modal = document.getElementById('event-modal');
        const overlay = document.getElementById('modal-overlay');
        
        document.getElementById('modal-image').src = event.image;
        document.getElementById('modal-image').alt = event.alt;
        document.getElementById('modal-title').textContent = event.title;
        document.getElementById('modal-category').textContent = event.category;
        document.getElementById('modal-date').textContent = event.date;
        document.getElementById('modal-location').textContent = event.location;
        document.getElementById('modal-description').textContent = event.description;

         
        const registerButton = document.getElementById('modal-register');
        registerButton.onclick = () => {
            alert(`Регистрация на мероприятие: ${event.title}\nДата: ${event.date}\nМы свяжемся с вами для подтверждения.`);
        };

          
        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    setupEventListeners() {
        
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                this.filterEvents(filter);
            });
        });

          
        const closeModal = () => {
            const modal = document.getElementById('event-modal');
            const overlay = document.getElementById('modal-overlay');
            
            modal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        document.getElementById('modal-close').addEventListener('click', closeModal);
        document.getElementById('modal-overlay').addEventListener('click', closeModal);

<<<<<<< HEAD
          Escape
=======
        
>>>>>>> 98988c7b30211cf55d80b5d867b06955457c4933
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.getElementById('event-modal');
                if (modal.classList.contains('active')) {
                    closeModal();
                }
            }
        });
    }
}

   
document.addEventListener('DOMContentLoaded', () => {
    new EventsManager();
});
