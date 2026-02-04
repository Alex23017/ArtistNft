import 'swiper/css';
import 'swiper/css/pagination';
import { getCardBlog, postQuestionBlog } from '../../api/service/blog.js';
import { API_VARIABLES } from '../../api/variables.js';
import CardBlog from '../../../html/components/blog/CardBlog.html';
import QuestionBlog from '../../../html/components/blog/QuestionBlog.html';

async function sliderInit() {
  const slider = document.querySelector('.swiperBlogCard');
  if (!slider) return;

  const [{ default: Swiper }, { Navigation, Pagination }] = await Promise.all([
    import('swiper'),
    import('swiper/modules'),
  ]);

  await import('swiper/css');
  await import('swiper/css/pagination');

  new Swiper(slider, {
    modules: [Navigation, Pagination],
    loop: true,
    spaceBetween: 30,
    speed: 600,
    slidesPerView: 3,

    navigation: {
      nextEl: '.swiper__homenft-next',
      prevEl: '.swiper__homenft-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    breakpoints: {
      320: {},
      1200: {},
      1420: {},
    },
  });
}
// РЕНДЕР КАРТОЧЕК ВОПРОСОВ
export function renderOffer(dataToRender) {
  const container = document.querySelector('.cardsblog-wrapper');

  if (!container) return;

  dataToRender.forEach(item => {
    const imgUrl = `${API_VARIABLES.IMG_URL}${item.img[0].url}`;
    const backgroundUrl = `${API_VARIABLES.IMG_URL}${item.background[0].url}`;
    const offerCard = CardBlog({
      img: imgUrl,
      name: item.name,
      questionTitle: item.questionTitle,
      questionText: item.questionText,
      date: item.date,
      background: backgroundUrl,
    });

    container.appendChild(offerCard);
  });
}
const data = await getCardBlog();
renderOffer(data);
sliderInit();

// РЕНДЕР ФОРУМ ВОПРОСОВ

export function renderOfferQuestion(dataToRender) {
  const container = document.querySelector('.question__wrapper');

  if (!container) return;
  dataToRender.forEach((item, index) => {
    const imgUrl = `${API_VARIABLES.IMG_URL}${item.img[0].url}`;
    const backgroundUrl = `${API_VARIABLES.IMG_URL}${item.background[0].url}`;
    const offerCard = QuestionBlog({
      img: imgUrl,
      name: item.name,
      questionTitle: item.questionTitle,
      questionText: item.questionText,
      date: new Date().toLocaleDateString('pt-BR'),
      background: backgroundUrl,
      countQuestion: index + 1,
    });

    container.appendChild(offerCard);
  });
}
renderOfferQuestion(data);

// ОТКРЫТЬ АНСВЕР ИЛИ ПОСМОТРЕТЬ ОТВЕТЫ

const containerQuestion = document.querySelectorAll('.forum__question');

containerQuestion.forEach(container =>
  container.addEventListener('click', e => {
    const view = e.target.closest('.question__item-view');
    if (!view) return;
    const openView = container.querySelector('.open__views');

    openView.classList.toggle('open');

    if (openView.classList.contains('open')) {
      view.textContent = 'Hide answers (23)';
    } else {
      view.textContent = view.dataset.text;
    }
  })
);

containerQuestion.forEach(container =>
  container.addEventListener('click', e => {
    const answer = e.target.closest('.question__item-answer');
    if (!answer) return;

    const openAnswers = container.querySelector('.open__answers');

    openAnswers.classList.toggle('open');
  })
);

// СТРЕЛОЧКА КЛИК В ВЕРХ
const arrowTop = document.querySelectorAll('.blog__navigate-top');
const arrowDown = document.querySelectorAll('.blog__navigate-down');

function arrowNavigateTop(arrows) {
  arrows.forEach(arrow =>
    arrow.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
      });
    })
  );
}
function arrowNavigateDown(arrows) {
  arrows.forEach(arrow =>
    arrow.addEventListener('click', () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
      });
    })
  );
}
arrowNavigateTop(arrowTop);
arrowNavigateDown(arrowDown);

// ОТПРАВКА ВОПРОСА

const formBlog = document.querySelector('#formBlog');
const nameBlog = document.querySelector('#nameBlogUser');
const questionBlog = document.querySelector('#questionBlog');
const buttonBlog = document.querySelector('#buttonBlog');

const authorInfo = data[0];

buttonBlog.addEventListener('click', e => {
  e.preventDefault();

  let hasError = false;

  //  ВАЛИДАЦИЯ

  if (nameBlog.value.length < 3) {
    nameBlog.value = '';
    nameBlog.placeholder = 'Минимум 3 символа!';
    hasError = true;
  }
  if (questionBlog.value.length < 20) {
    questionBlog.value = '';
    questionBlog.placeholder = 'Введите более 20 символов';
    hasError = true;
  }

  // ОТПРАВКА ЕСЛИ НЕТУ ОШИБОК НА СТРАПИ

  if (!hasError) {
    nameBlog.value = nameBlog.value.trim();
    questionBlog.value = questionBlog.value.trim();

    // ФОРМА КОТОРАЯ ПОСТИТСЯ НА СТРАПИ

    const dataForm = {
      img: authorInfo.img.map(image => image.id),
      name: nameBlog.value,
      questionTitle: questionBlog.value.trim(),
      questionText: questionBlog.value.trim(),
      date: new Date().toLocaleDateString('pt-BR'),
      background: authorInfo.background.map(bg => bg.id),
    };
    postQuestionBlog(dataForm);
    formBlog.reset();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
});
