function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

let intervalId = null;
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

function changeBackgroundColor() {
  const color = getRandomHexColor();
  document.body.style.backgroundColor = color;
}

startButton.addEventListener('click', () => {
  if (!intervalId) {
    intervalId = setInterval(changeBackgroundColor, 1000);
    startButton.setAttribute('disabled', 'true');
    stopButton.removeAttribute('disabled');
  }
});

stopButton.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  stopButton.setAttribute('disabled', 'true');
  startButton.removeAttribute('disabled');
});
