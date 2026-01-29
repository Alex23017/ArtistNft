import { API_VARIABLES } from '../../api/variables';
import SelectArtsCard from '../../../html/components/arts/SelectArtsCard.html';
import { getCardById } from '../../api/service/cardArts';

async function initSelectPage() {
  const params = new URLSearchParams(window.location.search);
  const cardId = params.get('id');

  if (!cardId) return;

  const cardArtsSelect = await getCardById(cardId);

  if (cardArtsSelect) {
    const container = document.querySelector('.container__selectarts');
    if (!container) return;
    container.innerHTML = '';

    const imgUrl = `${API_VARIABLES.IMG_URL}${cardArtsSelect.img[0].url}`;
    const offerCard = SelectArtsCard({
      title: cardArtsSelect.title,
      text: cardArtsSelect.info,
      img: imgUrl,
      price: cardArtsSelect.price,
      background: cardArtsSelect.background,
      bigSize: cardArtsSelect.bigSize,
    });
    offerCard.onclick = () => {
      window.location.href = `payment.html?id=${cardArtsSelect.documentId}`;
    };
    container.appendChild(offerCard);
  }
}

initSelectPage();
