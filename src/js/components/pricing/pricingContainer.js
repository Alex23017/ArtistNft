import 'swiper/css';
import 'swiper/css/pagination';
import { API_VARIABLES } from '../../api/variables.js';
import PricingCard from '../../../html/components/pricing/PricingCard.html';
import { getPricing } from '../../api/service/pricing.js';

async function sliderInit() {
  const slider = document.querySelector('.mySwiperPricing');
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
    spaceBetween: 32,
    speed: 600,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    slidesPerView: 3,

    navigation: {
      nextEl: '.swiper__pricing-next',
      prevEl: '.swiper__pricing-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      370: {
        slidesPerView: 1,
        watchSlidesProgress: true,
        spaceBetween: 5,
      },
      900: {
        slidesPerView: 2,
        watchSlidesProgress: true,
        spaceBetween: 32,
      },
      1080: {
        slidesPerView: 3,
        watchSlidesProgress: true,
        spaceBetween: 32,
      },
    },
  });
}

export function renderOffer(dataToRender) {
  const container = document.querySelector('.pricing__wrapper');

  if (!container) return;

  dataToRender.forEach(item => {
    const imgUrl = `${API_VARIABLES.IMG_URL}${item.img[0].url}`;
    const offerCard = PricingCard({
      caption: item.caption,
      img: imgUrl,
      duration: item.duration,
      textOne: item.textOne,
      textTwo: item.textTwo,
      textThree: item.textThree,
      textFour: item.textFour,
      price: item.price,
    });

    // offerCard.onclick = () => {
    //   window.location.href = `html/pages/selectArts.html?id=${item.documentId}`;
    // };
    container.appendChild(offerCard);
  });
}
// const params = new URLSearchParams(window.location.search);
// const cardId = params.get('id');
// if (cardId) {
//   const selectCard = await getCardById(cardId);
//   renderOffer(selectCard);
// } else {
//   const data = await getHomeNft();
//   renderOffer(data);
//   sliderInit();
// }
const data = await getPricing();
console.log('data: ', data);
sliderInit();
// renderOffer(data);
