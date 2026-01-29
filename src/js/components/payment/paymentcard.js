import { API_VARIABLES } from '../../api/variables';
import SelectCard from '../../../html/components/payment/SelectCard.html';
import { getCardById } from '../../api/service/cardArts';

async function initSelectPage() {
  const params = new URLSearchParams(window.location.search);
  const cardId = params.get('id');

  if (!cardId) return;

  const cardArtsSelect = await getCardById(cardId);

  if (cardArtsSelect) {
    const container = document.querySelector('.paymentcard__container');
    if (!container) return;
    container.innerHTML = '';

    const imgUrl = `${API_VARIABLES.IMG_URL}${cardArtsSelect.img[0].url}`;
    const offerCard = SelectCard({
      title: cardArtsSelect.title,
      text: cardArtsSelect.info,
      img: imgUrl,
      price: cardArtsSelect.price,
      background: cardArtsSelect.background,
      bigSize: cardArtsSelect.bigSize,
    });
    container.appendChild(offerCard);
  }
}

// Выбор метода оплаты

const containerPayment = document.querySelector('.payment__choice-render');
const paymentCardPayPal = (containerPayment.innerHTML = `
<div class="label__card-number max-xl:max-w-full mt-[20px] flex flex-col max-w-[410px]">
          <label class="text-ui-secondary text-[14px] leading-[21px]" for="card">Card number</label>
          <input
            placeholder="0000 0000 0000 0000"
            class="mt-[6px] text-ui-secondary bg-ui-backgroundLanguage rounded-[9px] py-[21.5px] [&::placeholder]:pl-[32px] text-[16px] leading-[21px]"
            id="card"
            type="number"
          />
        </div>
        <div
          class="label__info max-sm:-ml-[2px] max-sm:justify-center max-sm:gap-[17px] mt-[17px] max-xl:max-w-full justify-between flex gap-[16px] max-w-[410px]"
        >
          <div class="label__info-data max-sm:max-w-[164px] flex flex-col">
            <label class="text-ui-secondary text-[14px] leading-[21px]" for="date">Date</label>
            <input
              placeholder="01/01"
              class="rounded-[9px] text-ui-secondary max-sm:w-full w-[197px] mt-[6px] bg-ui-backgroundLanguage py-[21.5px] [&::placeholder]:pl-[32px] text-[16px] leading-[21px]"
              type="number"
              id="date"
            />
          </div>
          <div class="label__info-ccv max-sm:max-w-[164px] max-xl:max-w-full flex flex-col">
            <label class="text-ui-secondary text-[14px] leading-[21px]" for="ccv">CCV</label>
            <input
              placeholder="000"
              class="rounded-[9px] text-ui-secondary max-sm:w-full w-[197px] mt-[6px] bg-ui-backgroundLanguage py-[21.5px] [&::placeholder]:pl-[32px] text-[16px] leading-[21px]"
              type="number"
              id="ccv"
            />
          </div>
        </div>
        <div class="label__card-name max-xl:max-w-full mt-[17px] flex flex-col max-w-[410px]">
          <label class="text-ui-secondary text-[14px] leading-[21px]" for="cardName"
            >Name on card</label
          >
          <input
            placeholder="Ivan Ivanov"
            class="rounded-[9px] mt-[6px] text-ui-secondary bg-ui-backgroundLanguage py-[21.5px] [&::placeholder]:pl-[32px] text-[16px] leading-[21px]"
            id="cardName"
            type="text"
          />
          <button
            class="button__payment max-sm:ml-[2px] max-sm:max-w-[343px] mt-[17px] py-[19px] rounded-[12px] bg-gradient-to-r from-ui-colorBlue to-ui-colorPurple text-ui-backgroundLanguage font-bold text-[18px] leading-[26.5px]"
          >
            Purchase
          </button>
</div>`);

const paymentCrypto = `
<div class="crypto__body">
<p
class="payment__crypto-text max-sm:ml-[4px] ml-[2px] mt-[19px] max-w-[396px] text-ui-secondary text-[14px]
 leading-[21px]">To purchase item by crypto you have to send money to this wallet.
  After 5 minute result will sent in your mail
  </p>
     <div class="payment__input-crypto max-sm:max-w-[343px] max-sm:ml-[2px] max-sm:mt-[19px] rounded-[12px] mt-[18px] max-w-[410px] relative bg-ui-backgroundLanguage">
        <input
          id="cryptoInput"
          readonly
          class="rounded-[12px] w-full h-[56px] [&::placeholder]:tracking-[0.3px] [&::placeholder]:text-[14px] bg-ui-backgroundLanguage [&::placeholder]:text-ui-primary [&::placeholder]:pl-[29px]"
          placeholder="EQBSSl0Xlo3...kkHTmFw5YVYOiWJ."
          data-copy="EQBSSl0Xlo3...kkHTmFw5YVYOiWJ."
          type="text"
        />
        <svg
          id="copyCrypto"
          class="icon crypto__copy max-sm:right-[22px] absolute right-[16px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] cursor-pointer text-ui-primary"
        >
          <use href="#icon-copy"></use>
        </svg>
       
      </div>
   <p class="crypto__mes ml-[5px] text-[14px] text-ui-secondary font-bold"></p>
    <div class="label__info-email max-sm:max-w-[345px] max-sm:mt-[20px] mt-[25px] flex flex-col">
            <label class="text-ui-secondary text-[14px] leading-[21px]" for="emailm">E-mail</label>
            <input
              placeholder="Your e-mail"
              class="rounded-[9px] text-ui-secondary max-sm:w-full max-w-[410px] mt-[6px] bg-ui-backgroundLanguage py-[21.5px] [&::placeholder]:pl-[32px] text-[16px] leading-[21px]"
              type="text"
              id="emailm"
            />
                <button
            class="button__payment max-sm:mt-[16px] mt-[22px] py-[19px] max-w-[410px] rounded-[12px] bg-gradient-to-r from-ui-colorBlue to-ui-colorPurple text-ui-backgroundLanguage font-bold text-[18px] leading-[26.5px]"
          >
            Check
          </button>
          </div>
</div>`;

const choicePayment = document.querySelector('.payment__method');
choicePayment.addEventListener('click', e => {
  const contactCheck = document.querySelector('.contact__check');
  const activePayment = e.target.closest('.payment__method-select');
  if (!activePayment) return;
  choicePayment.querySelector('.payment__method-select.active')?.classList.remove('active');
  contactCheck.style.marginBottom = '';
  activePayment.classList.add('active');

  if (
    choicePayment.querySelector('.payment__method-card.active') ||
    choicePayment.querySelector('.payment__method-paypal.active')
  ) {
    containerPayment.innerHTML = paymentCardPayPal;
  }
  if (choicePayment.querySelector('.payment__method-crypto.active')) {
    containerPayment.innerHTML = paymentCrypto;
    if (window.innerWidth < 380) {
      contactCheck.style.marginBottom = '0px';
    } else {
      contactCheck.style.marginBottom = '72px';
    }
  }
});

containerPayment.addEventListener('click', e => {
  const cryptoMes = document.querySelector('.crypto__mes');
  const copyIcon = e.target.closest('#copyCrypto');
  if (!copyIcon) return;
  const parent = copyIcon.closest('.payment__input-crypto');
  const cryptoInput = parent.querySelector('#cryptoInput');
  navigator.clipboard.writeText(cryptoInput.dataset.copy);

  cryptoMes.textContent = 'Copy Success';
  setTimeout(() => {
    cryptoMes.textContent = '';
  }, 1500);
});

// initSelectPage();
