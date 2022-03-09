function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    console.log('+', position, delay);
  } else {
    console.log('-', position, delay);
    // Reject
  }
}

function repeat(delay, step, amount) {
  setTimeout(() => {
  for (let i = 0; i <= amount; i += 1) {
    console.log(i);
    
        
      if (i < amount) {
        timerId = setInterval(() => {
createPromise(i, delay + i * step);
  }, step); } else {clearInterval(timerId);}
      
    };
    }, delay);
}

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount }
  } = event.currentTarget;

  repeat(delay.value, step.value, amount.value);

  event.currentTarget.reset();
}