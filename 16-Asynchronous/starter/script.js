'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const url = 'https://restcountries.com/v3.1/name/portugal';

function getCountryData(country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const html = `
    <article class="country">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
          </div>
        </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
}

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');

/////////////////////////////
////// Chaining of request
/////////////////////////////

function renderCountry(data, className) {
  const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
          </div>
        </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

function getCountryAndNeighbour(country) {
  // AJAX call 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    // Render country 1
    renderCountry(data);

    // Get neighbout country
    const neighbour = data.borders?.[0];

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
}

// getCountryAndNeighbour('portugal');
// getCountryData('usa');
// getCountryData('germany');

//////////////////////////////////
/////////// Promise //////////////
//////////////////////////////////
function getCountryData2(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log(response);

      // if we return any promise from this callback function then only we can write another then method that receive the current return value of this function
      return response.json();
    })
    .then(function (data) {
      renderCountry(data[0]);
    });
}

// getCountryData2('portugal');

// Chaining of Promise to view the neighbouring countries
function getJSON(url, errMessage = 'Something went wrong') {
  return fetch(url).then(
    response => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);

      return response.json();
    }
    //   err => alert(err)
  );
}

function getCountryAndNeighbour2(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
      response => {
        if (!response.ok)
          throw new Error(`Country not found ${response.status}`);
        return response.json();
      }
      //   err => alert(err)
    )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0]?.borders?.[0];
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    // .then(response => response.json(), err => alert(err))
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => alert(err)) // It's the better way of error handling
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}

// organized
function getCountryAndNeighbourOrganized(country) {
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found!'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found!'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => alert(err))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}

btn.addEventListener('click', function () {
  getCountryAndNeighbourOrganized('portugal');
});
