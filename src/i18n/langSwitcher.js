import i18next from './index';

export function initLangSwitcher() {
  const containerLang = document.querySelectorAll('.dropdown-language');
  containerLang.forEach(container => {
    container.addEventListener('click', e => {
      const item = e.target.closest('.dropdown-language-item');
      const burgerMenuClose = document.querySelector(".burger__menu")
      if (!item) return;
      e.preventDefault();

      const lang = item.dataset.language;
      
      i18next.changeLanguage(lang).then(() => {
        localStorage.setItem('lang', lang);
        document.querySelector('.btn-language').textContent = lang.toUpperCase();
        burgerMenuClose.classList.remove("open")
        location.reload();
      });
    });
  });
}
