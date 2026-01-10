import 'bootstrap/js/dist/dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/base/reset.scss'
import '../styles/tailwind.css'
import '../styles/base/main.scss'

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

// window.addEventListener('load', () => {
//   const preload = document.querySelector('.preload')
//   if (preload) {
//     setTimeout(() => {
//       document.body.classList.remove('loading')
//       preload.remove()
//     }, 500)
//   }
// })
