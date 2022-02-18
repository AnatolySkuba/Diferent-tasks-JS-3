import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const myInput = document.querySelector("input#datetime-picker");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const currentDate = new Date();
    if (selectedDates[0] <= currentDate) {window.alert('Please choose a date in the future')}
  },
};

const fp = flatpickr(myInput, options);

const date = new Date();
console.log("Date: ", date);