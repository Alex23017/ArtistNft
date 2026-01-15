if (document.querySelector('[data-component="homeNftSwiper"]')) {
  import('/styles/components/home/homeNftSwiper.scss');
  import('/styles/base/reset.scss');
}
import 'swiper/css';
import 'swiper/css/pagination';
import { API_VARIABLES } from '../../api/variables.js';
import HomeNftSwiperCard from '../../../html/components/home/HomeNftSwiperCard.html';
import { getHomeNft } from '../../api/service/homeNftSwiper.js';

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

const data = await getHomeNft();
export function renderOffer() {
  const container = document.querySelector('.homenft__wrapper');
  if (!container) return;
  data.forEach(item => {
    const imgUrl = `${API_VARIABLES.IMG_URL}${item.img[0].url}`;
    const offerCard = HomeNftSwiperCard({
      title: item.title,
      img: imgUrl,
      price: item.price,
      info: item.info,
      background: item.background,
    });

    container.appendChild(offerCard);
  });
}
renderOffer();
sliderInit();
