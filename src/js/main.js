// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/js/dist/dropdown'
import '../styles/base/main.scss'
import '../styles/base/reset.scss'

const components = import.meta.glob('./components/*.js')


document.querySelectorAll('[data-component]').forEach(el => {
  const name = el.dataset.component
  if (!name) return

  const importPath = `./components/${name}.js`
  if (components[importPath]) {
    components[importPath]().catch(err => {
      console.warn(`Ошибка загрузки компонента ${name}:`, err)
    })
  } else {
    console.warn(`Компонент ${name}.js не найден`)
  }
})

// PRELOAD

// window.addEventListener('load', () => {
//   const preload = document.querySelector('.preload')
//   if (preload) {
//     setTimeout(() => {
//       preload.classList.remove('loading')
//       document.body.classList.remove('loading')
//     }, 500)
//   }
// })

