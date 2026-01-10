if (document.querySelector('[data-component="burger"]')) {
  import('/styles/components/burger.scss')
}

const burger = document.getElementById('burger')
const menuBurger = document.querySelector('.burger__menu')

burger.addEventListener('click', e => {
  const openMenu = e.target.closest('.burger__icon')
  if (!openMenu) return
  menuBurger.classList.toggle('open')
  document.body.classList.toggle('open')
})
