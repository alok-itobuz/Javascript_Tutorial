'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

const userData = [];
const workoutType = {
  RUNNING: 'running',
  CYCLING: 'cycling',
};
let lat = null,
  lng = null,
  map = null;

function addMarker(map, coords) {
  L.marker(coords)
    .addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();
}

function viewPerticularInMap(map, coords) {
  map.setView(coords, 17);
}

function appendCard(data) {
  const { id, date, type, distance, duration, cadence } = data;
  const html = `
  <li class="workout workout--running" data-id="${id}">
        <h2 class="workout__title">${
          type === workoutType.RUNNING ? 'Running' : 'Cycling'
        } on ${date}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            type === workoutType.RUNNING ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${duration}</span>
          <span class="workout__unit">min</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${(distance / duration).toFixed(
            1
          )}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">${
            type === workoutType.RUNNING ? '🦶🏼' : '⛰'
          }</span>
          <span class="workout__value">${cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;
  containerWorkouts.insertAdjacentHTML('beforeend', html);
}

function validateInput(inputValue) {
  const regex = /^[0-9]+$/;
  const isMatching = regex.test(inputValue);
  console.log(isMatching, inputValue);

  return isMatching ? inputValue : null;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const type = inputType.value;
  const distance = validateInput(inputDistance.value);
  const duration = validateInput(inputDuration.value);
  const cadence = validateInput(inputCadence.value);

  if (!distance || !duration || !cadence) {
    alert('Input should be numbers only.');
    return;
  }

  const newData = {
    id: new Date().getTime(),
    date: new Date().toString().split(' ').slice(1, 3).join(' '),
    type,
    distance,
    duration,
    cadence,
    latitude: lat,
    longitude: lng,
  };
  userData.push(newData);
  appendCard(newData);
  form.classList.add('hidden');
  addMarker(map, [lat, lng]);
});

containerWorkouts.addEventListener('click', function (e) {
  if (!e.target.closest('li')) return;
  const currentLi = e.target.closest('li');
  const currentData = userData.find(d => d.id == currentLi.dataset.id);
  console.log({ currentData });
  const { latitude, longitude } = currentData;
  viewPerticularInMap(map, [latitude, longitude]);
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const { latitude, longitude } = position.coords;

      const coords = [latitude, longitude];

      // the id of map container element should be passed inside the L.map('')
      map = L.map('map').setView(coords, 17);

      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('click', function (e) {
        console.log(e);
        lat = e.latlng.lat;
        lng = e.latlng.lng;
        form.classList.remove('hidden');
      });
    },
    function (error) {
      console.log(error);
    }
  );
}
