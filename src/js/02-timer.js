import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

const myInput = document.querySelector("input#datetime-picker");
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const timer = document.querySelector(".timer");
const fields = document.querySelectorAll(".field");
const values = document.querySelectorAll(".value");
startBtn.disabled = true;
let timerId = null;

timer.style.display = "flex";
fields.forEach(field => {
  field.style.flexDirection = "column";
  field.style.display = "flex";
  field.style.margin = "20px";
  field.style.alignItems = "center";
  field.style.fontWeight = "bold";
});
values.forEach(value => {
  value.style.fontSize = "30px";
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let currentDate = new Date();
    if (selectedDates[0] <= currentDate) {
      Report.failure(
'Please choose a date in the future',
'',
'Okay',
);
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;

      const handleClickStart = () => {
        timerId = setInterval(() => {
        currentDate = new Date();
        const balanceTime = convertMs(selectedDates[0].getTime() - currentDate.getTime());
        days.textContent = addLeadingZero(balanceTime.days);
        hours.textContent = addLeadingZero(balanceTime.hours);
        minutes.textContent = addLeadingZero(balanceTime.minutes);
        seconds.textContent = addLeadingZero(balanceTime.seconds);    
        }, 1000);
      startBtn.removeEventListener("click", handleClickStart);
      startBtn.disabled = true;
      myInput.disabled = true;
      };

      startBtn.addEventListener("click", handleClickStart);
    };
  },
};

const fp = flatpickr(myInput, options);

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
};

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
};
