import 'swiper/css';
import 'swiper/css/pagination';
import { API_VARIABLES } from '../../api/variables.js';
import HomeNftSwiperCard from '../../../html/components/home/HomeNftSwiperCard.html';
import { getCardById } from '../../api/service/cardArts.js';
import { getHomeNft } from '../../api/service/homeNftSwiper.js';
import gsap from 'gsap';

// АНИМАЦИИ ГСАП
gsap.fromTo(
  '.homenft__container',
  { x: 500, opacity: 0 },
  {
    opacity: 1,
    x: 0,
    scrollTrigger: {
      trigger: '.biography__container',
      start: '1400',
      end: '100',
      scrub: 4,
    },
  }
);

async function sliderInit() {
  const slider = document.querySelector('.mySwiperHomeNft');
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
    centeredSlides: true,
    spaceBetween: 300,
    speed: 600,
    slidesPerView: 'auto',

    navigation: {
      nextEl: '.swiper__homenft-next',
      prevEl: '.swiper__homenft-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 46,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 28,
      },
      1420: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}

export function renderOffer(dataToRender) {
  const container = document.querySelector('.homenft__wrapper');

  if (!container) return;

  dataToRender.forEach(item => {
    const imgUrl = `${API_VARIABLES.IMG_URL}${item.img[0].url}`;
    const offerCard = HomeNftSwiperCard({
      title: item.title,
      img: imgUrl,
      price: item.price,
      info: item.info,
      background: item.background,
    });

    offerCard.onclick = () => {
      window.location.href = `html/pages/selectArts.html?id=${item.documentId}`;
    };
    container.appendChild(offerCard);
  });
}
const params = new URLSearchParams(window.location.search);
const cardId = params.get('id');
if (cardId) {
  const selectCard = await getCardById(cardId);
  renderOffer(selectCard);
} else {
  const data = await getHomeNft();
  renderOffer(data);
  sliderInit();
}
