const headerArts = document.querySelector('.header');

if (window.location.pathname.endsWith('/arts.html')) {
  headerArts.style.marginTop = '0px';
}
if (window.location.pathname.endsWith('/selectArts.html')) {
  headerArts.style.marginTop = '0px';
}
const page = window.location.pathname;

function updateActive(path, className) {
  const element = document.querySelector(className);
  if (className && page.includes(path)) {
    element.classList.add('active');
  }
}
updateActive('auction', '.nav__items-auction');
updateActive('arts', '.nav__items-arts');
updateActive('index', '.nav__items-main');
updateActive('pricing', '.nav__items-pricing');
updateActive('contacts', '.nav__items-contacts');
