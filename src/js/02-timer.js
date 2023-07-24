import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

const startButton = document.querySelector("[data-start]");
const dateTimePicker = document.querySelector("#datetime-picker");
const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");

  let countdownInterval;

  function updateTimer() {
    const targetDate = new Date(dateTimePicker.value).getTime();
    const currentDate = new Date().getTime();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      window.alert("Please choose a date in the future");
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
  }

  startButton.addEventListener("click", function () {
    const targetDate = new Date(dateTimePicker.value).getTime();
    const currentDate = new Date().getTime();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
        Notiflix.Notify.failure("Please choose a date in the future");
        return;
    }

    countdownInterval = setInterval(updateTimer, 1000);
    updateTimer();
    startButton.disabled = true;
  });

  dateTimePicker.addEventListener("change", function () {
  const targetDate = new Date(dateTimePicker.value).getTime();
  const currentDate = new Date().getTime();
  const timeDifference = targetDate - currentDate;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    startButton.disabled = true;
    Notiflix.Notify.failure("Please choose a date in the future");
    return;
  }

  startButton.disabled = false;
});


  flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const targetDate = selectedDates[0].getTime();
      const currentDate = new Date().getTime();
      const timeDifference = targetDate - currentDate;

      startButton.disabled = timeDifference <= 0;
    },
  });

