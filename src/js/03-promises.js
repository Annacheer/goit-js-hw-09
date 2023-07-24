import Notiflix from 'notiflix'; 
const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
     setTimeout(() => {
  if (shouldResolve) {
    // Fulfill
    resolve({ position, delay });
  } else {
    // Reject
    reject({ position, delay });
  }
    }, delay);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const firstDelay = Number(formData.get('delay'));
  const step = Number(formData.get('step'));
  const amount = Number(formData.get('amount'));

  for (let i = 0; i < amount; i += 1) {
    const currentDelay = firstDelay + i * step;

    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
});