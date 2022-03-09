import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    console.log('+', position, delay);
  } else {
    Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    console.log('-', position, delay);
    // Reject
  }
}

let promptCounter = 2;

function repeat(delay, step, amount) {
  setTimeout(() => {
    createPromise(1, delay);
    const intervalId = setInterval(() => {
      if (promptCounter === Number(amount) + 1) {
        clearInterval(intervalId);
        return;
      }
      createPromise(promptCounter, Number(delay) + (promptCounter - 1) * step);          
      promptCounter += 1; 
    }, step);
  }, delay);
}

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  promptCounter = 2;
  const {
    elements: { delay, step, amount }
  } = event.currentTarget;

  repeat(delay.value, step.value, amount.value);

  event.currentTarget.reset();
}