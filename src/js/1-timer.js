// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
const ref = {
  dayPickerEl: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

const { daysEl, hoursEl, minutesEl, secondsEl } = ref;

let userSelectedDate = null;
ref.startButton.disabled = true;
ref.startButton.classList.add('disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);

    if (selectedDates[0] <= new Date()) {
      ref.startButton.classList.add('disabled');
      ref.startButton.disabled = true;
      return iziToast.show({
        title: 'Please choose a date in the future',
        color: 'red',
        position: 'topRight',
      });
    } else {
      ref.startButton.disabled = false;
      ref.startButton.classList.remove('disabled');
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr(ref.dayPickerEl, options);

ref.startButton.addEventListener('click', e => {
  //   console.log('button was pressed');
  ref.startButton.disabled = true;
  ref.startButton.classList.add('disabled');
  ref.dayPickerEl.disabled = true;

  const timerId = setInterval(() => {
    const currentDate = new Date();
    const diff = userSelectedDate - currentDate;

    if (diff <= 0) {
      clearInterval(timerId);
      ref.dayPickerEl.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(diff);

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
    // !version2
    // const parsedTime = convertMs(diff);
    // console.log(parsedTime);
    // updateTimerDisplay(parsedTime);
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// !version 2
// function updateTimerDisplay({ days, hours, minutes, seconds }) {
//   const { daysEl, hoursEl, minutesEl, secondsEl } = ref;

//   daysEl.textContent = String(days).padStart(2, '0');
//   hoursEl.textContent = String(hours).padStart(2, '0');
//   minutesEl.textContent = String(minutes).padStart(2, '0');
//   secondsEl.textContent = String(seconds).padStart(2, '0');
// }
