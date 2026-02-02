const containerQuestion = document.querySelectorAll('.forum__question');

containerQuestion.forEach(container =>
  container.addEventListener('click', e => {
    const answer = e.target.closest('.question__item-view');
    if (!answer) return;
    const openAnswers = container.querySelector('.open__answers');
    openAnswers.classList.toggle('open');

    if (openAnswers.classList.contains('open')) {
      answer.textContent = 'Hide answers (23)';
    } else {
      answer.textContent = answer.dataset.text;
    }
  })
);
