// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const formRef = document.querySelector('form');

formRef.addEventListener('submit', e => {
  e.preventDefault();

  const delay = e.target.elements.delay.value;
  const state = e.target.elements.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve();
      } else {
        reject();
      }
    }, delay);
  });
  promise
    .then(value => {
      iziToast.show({
        title: '',
        message: `✅ Fulfilled promise in ${delay}ms`,
        color: 'green', // Background color of the toast
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.show({
        title: '',
        message: `❌ Rejected promise in ${delay}ms`,
        color: 'red',
        position: 'topRight',
      });
    });
  formRef.reset();
});
