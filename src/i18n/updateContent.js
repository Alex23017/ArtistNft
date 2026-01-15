import i18next from './index';

export function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;

    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = i18next.t(key);
      return;
    }
    const span = el.querySelector('span');
    if (span) {
      span.innerHTML = i18next.t(key);
    } else {
      el.innerHTML = i18next.t(key);
    }
  });
}
