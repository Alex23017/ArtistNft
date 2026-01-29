import { getCardArts, getCardById } from '../../api/service/cardArts';
import { API_VARIABLES } from '../../api/variables';
import CardArts from '../../../html/components/arts/CardArts.html';
import gsap from 'gsap';

export function renderOffer(dataToRender) {
  const container = document.querySelector('.arts__body');

  if (!container || !dataToRender) return;

  dataToRender.forEach((item, index) => {
    const imgUrl = `${API_VARIABLES.IMG_URL}${item.imgArts[0].url}`;
    const offerCard = CardArts({
      title: item.title,
      text: item.info,
      img: imgUrl,
      price: item.price,
      background: item.background,
      bigSize: item.bigSize,
    });

    offerCard.onclick = () => {
      window.location.href = `selectArts.html?id=${item.documentId}`;
    };

    if (index === dataToRender.length - 2) {
      offerCard.classList.add('max-sm:!max-h-[199px]', 'overflow-hidden');
    }

    if (item.bigSize) {
      const cards = offerCard.querySelectorAll('.card__img');
      container.classList.add('flex-row-reverse');
      cards.forEach(card => {
        card.classList.add('!max-w-[730px]');
        card.classList.add('max-lg:!max-h-[199px]');
      });
    }

    container.appendChild(offerCard);
  });
}

const params = new URLSearchParams(window.location.search);
const cardId = params.get('id');

if (cardId) {
  const cardArtsSelect = await getCardById(cardId);
  renderOffer(cardArtsSelect);
} else {
  const data = await getCardArts();
  renderOffer(data);
}

gsap.fromTo(
  '.containercardsarts',
  { opacity: 0, x: -500 },
  {
    x: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: '.artshero__container',
      start: '200',
      end: '500',
      scrub: 4,
    },
  }
);
