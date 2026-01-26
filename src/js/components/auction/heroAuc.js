const btn = document.querySelector('.action__button');
const currentPrice = document.querySelector('.auction__current-price');
let start = 100322;

btn.addEventListener('click', e => {
  const bidPrice = Number(document.querySelector('.input__bid').value);

  if (bidPrice > start) {
    start = bidPrice;
    let formatted = start.toLocaleString('ru-RU');
    currentPrice.innerHTML = `$${formatted}`;
  } else {
    let formatted = start.toLocaleString('ru-RU');
    currentPrice.innerHTML = `Ставка ниже текущей - $${formatted}`;
    setTimeout(() => {
      currentPrice.innerHTML = `$${formatted}`;
    }, 2000);
  }
});

// timer

const day = document.querySelector('.auction__timer-day');
const hour = document.querySelector('.auction__timer-hour');
const min = document.querySelector('.auction__timer-min');
const sec = document.querySelector('.auction__timer-sec');

function timerStart(duration) {
  function timer(time) {
    const dayTime = Math.floor(time / 86400);
    const hourTime = Math.floor((time % 86400) / 3600);
    const minTime = Math.floor((time % 3600) / 60);
    const secTime = Math.floor(time % 60);
    day.innerHTML = `${dayTime}d`;
    hour.innerHTML = `${hourTime}h`;
    min.innerHTML = `${minTime}m`;
    sec.innerHTML = `${secTime}s`;
  }
  timer(duration);

  const intervalTimer = setInterval(() => {
    duration--;
    if (duration < 0) {
      clearInterval(intervalTimer);
      return;
    }
    timer(duration);
  }, 1000);
}

timerStart(2481991);
