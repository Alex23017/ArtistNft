import { postQuestion } from '../../api/service/contact';

if (document.querySelector('[data-component="contact"]')) {
  import('/styles/components/home/contact.scss');
}

const contactForm = document.querySelector('.contact__form');
const btnForm = document.querySelector('.contact__button');
const checkBox = document.querySelector('.contact__check-input');
const checkBoxErrorMessage = document.querySelector('.contact__check-error');

const contactUsername = document.querySelector('.contact__username');
const contactMail = document.querySelector('.contact__email');
const contactTextArea = document.querySelector('.contact__question');

checkBox.addEventListener('click', () => {
  if (checkBox.checked) {
    checkBoxErrorMessage.textContent = '';
  }
});
btnForm.addEventListener('click', e => {
  e.preventDefault();

  let hasError = false;

  //  ВАЛИДАЦИЯ

  if (contactUsername.value.length < 3) {
    contactUsername.value = '';
    contactUsername.placeholder = 'Минимум 3 символа!';
    hasError = true;
  }
  if (contactTextArea.value.length < 20) {
    contactTextArea.value = '';
    contactTextArea.placeholder = 'Введите более 20 символов';
    hasError = true;
  }

  if (!contactMail.value.includes('@')) {
    contactMail.value = '';
    contactMail.placeholder = 'Неверный формат почты @';
    hasError = true;
  }
  if (!checkBox.checked) {
    checkBoxErrorMessage.textContent = 'Согласитесь с условиями пользования';
    checkBoxErrorMessage.style.color = 'green';
    hasError = true;
  }

  // ОТПРАВКА ЕСЛИ НЕТУ ОШИБОК НА СТРАПИ

  if (!hasError) {
    contactUsername.value = contactUsername.value.replace(/\s/g, '');
    contactMail.value = contactMail.value.replace(/\s/g, '');
    contactTextArea.value = contactTextArea.value.trim();
    checkBoxErrorMessage.textContent = 'Ваш вопрос успешно отправлен';
    checkBoxErrorMessage.style.color = 'green';

    // ФОРМА КОТОРАЯ ПОСТИТСЯ НА СТРАПИ

    const dataForm = {
      name: contactUsername.value,
      mail: contactMail.value,
      question: contactTextArea.value,
    };

    postQuestion(dataForm);
    contactForm.reset();
  }
});
