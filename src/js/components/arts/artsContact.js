import { postComment } from '../../api/service/comment';

// переключение инпутов
export function switchText(container, target, atr) {
  const containerItems = document.querySelectorAll(container);
  containerItems.forEach(containerBtn => {
    containerBtn.addEventListener('click', e => {
      const item = e.target.closest(target);
      if (!item) return;
      e.preventDefault();
      const items = item.dataset[atr];
      if (!items) return;
      const button = containerBtn.querySelector('button');
      if (button) {
        button.textContent = items;
      }
    });
  });
}

switchText('.dropdown-clothes', '.dropdown-clothes-item', 'clothes');
switchText('.dropdown-size', '.dropdown-size-item', 'size');

const colors = [
  { name: 'red', hex: '#CA3838' },
  { name: 'orange', hex: '#EB8032' },
  { name: 'yellow', hex: '#FFDA57' },
  { name: 'green', hex: '#79CE60' },
  { name: 'acva', hex: '#60CEB4' },
  { name: 'blue', hex: '#41D4F4' },
  { name: 'blueDark', hex: '#4153F4' },
  { name: 'purple', hex: '#6541F4' },
  { name: 'pink', hex: '#B041F4' },
  { name: 'pinkDark', hex: '#C45297' },
  { name: 'redDark', hex: '#A14051' },
  { name: 'white', hex: '#FFFFFF' },
  { name: 'grey', hex: '#CFCFCF' },
  { name: 'brown', hex: '#4A3221' },
  { name: 'black', hex: '#000000' },
];

const container = document.querySelector('.color__radio-body');
const containerRadio = document.querySelector('.color__radio');

// РЕНДЦЕР РАДИО ИНПУТОВ
const radio = colors
  .map(color => {
    return `<input name="color" value=${color.name} type="radio" class="relative 
  cursor-pointer  opacity-0 z-[999] scale-150" border-4  border-transparent group-hover:border-white />`;
  })
  .join('');
containerRadio.insertAdjacentHTML('beforeend', radio);

// РЕНДЦЕР ЦВЕТОВ
const html = colors
  .map((color, index) => {
    const offset = index * 8;
    const bgOffset = 18 - index * 8;
    const z = index + 1;
    const last = index === colors.length - 1;

    return `
    <div class="wrapper-${color.name} flex items-center relative">
      <div
        class="${color.name}  [&.white]:max-sm:ml-[86px] group [&.active]:border-white color relative border-4 hover:z-[100] transition-all hover:scale-110 border-transparent hover:border-white min-w-[32px] h-[32px] rounded-full"
        style="background-color: ${color.hex}; left: -${offset}px; z-index:${z}"
        data-color=${color.name}></div>
      <div
        class="${color.name}--black [&.redDark--black]:max-sm:hidden pointer-events-none position: ${last ? 'hidden' : ''} absolute z-[1] min-w-[32px] h-[32px] bg-ui-backgroundBody rounded-full"
        style="left: ${bgOffset}px; z-index:${z}"
      ></div>
    </div>
  `;
  })
  .join('');

container.innerHTML = html;

// ВЫБОР ЦВЕТА + КЛАСС АКТИВ ДЛЯ ХОВЕРА
const radioChange = document.querySelectorAll('input[name="color"]');
const colorCurrent = document.querySelectorAll('.color');
radioChange.forEach(rad => {
  rad.addEventListener('change', e => {
    colorCurrent.forEach(col => {
      col.classList.remove('active');
      if (rad.value === col.dataset.color) {
        col.classList.add('active');
      }
    });
  });
});

// ФОРМА + ВАЛИДАЦИЯ НА ПОСТ СТРАПИ
const form = document.querySelector('.artscontact__form');
form.addEventListener('submit', async e => {
  let hasError = false;
  e.preventDefault();

  const formData = new FormData(form);

  const colorForPost = formData.get('color');
  const type = document.querySelector('.dropdown-clothes button').textContent.trim();
  const size = document.querySelector('.dropdown-size button').textContent.trim();
  const comment = document.querySelector('.contact__comment');
  const check = document.querySelector('.arts__check-input');
  const error = document.querySelector('.arts__check-error');
  error.textContent = '';

  if (!colorForPost) {
    hasError = true;
    error.textContent = 'Выберите цвет одежды!!!';
  }
  const commentValue = comment.value.trim();
  if (commentValue.length < 10) {
    comment.value = '';
    comment.placeholder = 'Ведите более 10 символов!!!';
    error.textContent = 'Ведите более 10 символов!!!';
    hasError = true;
  }
  if (!check.checked) {
    hasError = true;
    error.textContent = 'Согласитесь с условиями пользования!!!';
  }

  if (!hasError) {
    const dataForm = {
      color: colorForPost,
      type,
      comment: commentValue,
      size,
    };
    console.log('dataForm: ', dataForm);
    error.style.color = 'green';
    error.style.textDecoration = 'none';
    error.textContent = 'Форма успешно отправлена';
    setTimeout(() => {
      error.textContent = '';
    }, 2000);
    postComment(dataForm);
    form.reset();
  }
});
