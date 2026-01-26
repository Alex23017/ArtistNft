import 'bootstrap/js/dist/dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/base/reset.scss';
import '../styles/base/main.scss';
import '../styles/tailwind.css';

import { ScrollSmoother, ScrollTrigger } from 'gsap/all';
import { gsap } from 'gsap';
import { initLangSwitcher } from '../i18n/langSwitcher';
import { updateContent } from '../i18n/updateContent';

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

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

// i18n мова

document.addEventListener('DOMContentLoaded', () => {
  updateContent();
  initLangSwitcher();
});

// parallax

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  if (window.innerWidth > 1024) {
    ScrollSmoother.create({
      content: '.main',
      smooth: 2.5,
      effects: true,
    });
  }
});

// navigate

const svgLast = `<svg class="icon navigate__logo w-[7px] h-[8px]">
      <use href="#icon-arrowNavigate"></use>
    </svg>`;
const svgNext = `<svg class="icon navigate__logo w-[7px] h-[8px]">
      <use href="#icon-arrowNavigate"></use>
    </svg>`;

function currentPage(page, lastPage = '', nextPage = '', arrowLast = '', arrowCur = '') {
  const navigate = document.querySelector('.navigate__page');

  let last = window.location.pathname;
  let current = window.location.pathname;
  const lastName = lastPage.split('/').pop();
  console.log('lastName: ', lastName);

  if (last.includes(page)) {
    last = lastPage;
  }
  if (current.includes(page)) {
    current = nextPage;
  }

  const location = window.location.pathname.includes(page);
  if (location) {
    navigate.innerHTML = `
    <a class="hover:text-ui-primary -tracking-[0.5px]" href="/index.html">Main page</a>
    ${arrowLast}
    <a class="hover:text-ui-primary -tracking-[0.5px] [.wrapper-auction_&]:max-2xl:-ml-[9px]" href="${last}">${lastName}</a>
    ${arrowCur}
    <a class="hover:text-ui-primary -tracking-[0.5px]" href="">${current}</a>
    `;
  }
}

currentPage('auction', '', 'Auction', svgLast,);
currentPage('selectArts', 'html/pages/NFT', 'Name of product', svgLast, svgNext);
