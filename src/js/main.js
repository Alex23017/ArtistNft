import 'bootstrap/js/dist/dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/base/reset.scss';
import '../styles/tailwind.css';
import '../styles/base/main.scss';

import '../i18n';
import { initLangSwitcher } from '../i18n/langSwitcher';
import { updateContent } from '../i18n/updateContent';

// загрузка компонентів

const modules = import.meta.glob('./components/**/*.js');

document.querySelectorAll('[data-component]').forEach(async el => {
  const name = el.dataset.component;
  const match = Object.keys(modules).find(path => path.endsWith(`/${name}.js`));
  if (!match) {
    console.warn(`Компонент "${name}" не знайдено`);
    return;
  }
  try {
    await modules[match]();
  } catch (err) {
    console.error(`помилка завантаження компонента ${name}:`, err);
  }
});

// прелоадер

window.addEventListener('load', () => {
  const preload = document.querySelector('.preload');
  if (preload) {
    setTimeout(() => {
      document.body.classList.remove('loading');
      preload.remove();
    }, 500);
  }
});

// i18n мова
document.addEventListener('DOMContentLoaded', () => {
  updateContent();
  initLangSwitcher();
});
