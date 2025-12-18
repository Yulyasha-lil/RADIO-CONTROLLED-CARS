// scripts/cover.js
document.addEventListener('DOMContentLoaded', function() {
    const cover = document.querySelector('.cover');
    const header = document.querySelector('.header');
    
    function adjustCoverHeight() {
      if (cover) {
        // Получаем высоту header
        const headerHeight = header ? header.offsetHeight : 0;
        // Рассчитываем доступную высоту
        const availableHeight = window.innerHeight - headerHeight - 40; // 40px - отступы
        
        // Устанавливаем минимальную высоту
        cover.style.minHeight = availableHeight + 'px';
        
        // На мобильных устройствах ограничиваем максимальную высоту
        if (window.innerWidth <= 768) {
          cover.style.maxHeight = '85vh';
        } else {
          cover.style.maxHeight = '90vh';
        }
      }
    }
    
    // Вызываем при загрузке и изменении размера окна
    adjustCoverHeight();
    window.addEventListener('resize', adjustCoverHeight);
  });
  