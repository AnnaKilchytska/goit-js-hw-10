import './css/styles.css';
import fetchCountries from './fetchCountries';
const debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const query = e.target.value.trim();

  if (query !== '' && query !== ' ') {
    fetchCountries(query)
      .then(createMarkup)
      .catch(error => {
        // console.log(error.message);
        if (error.message === '404') {
          Notify.failure('Oops, there is no country with that name');
        }
      });
  }
}

function createMarkup(data) {
  // console.log(data.length);
  let markup = '';
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  if (data.length >= 2 && data.length <= 10) {
    countryList.innerHTML = '';
    // console.log(data.length);
    markup = data
      .map(country => {
        // console.log(country.flags.svg);
        // console.log(country.name.official);

        return `<li class="country-item">
        <img class="list-image" src=${country.flags.svg} />
        <p class="list-name">${country.name.official}</p>
        </li>`;
      })
      .join('');

    countryList.innerHTML = markup;
  } else if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (data.length === 1) {
    countryInfo.innerHTML = '';
    const [country] = data;
    // console.log(country);
    markup = `<div class="country-item">
        <img class="list-image" src=${country.flags.svg} />
        <h2 class="list-name">${country.name.official}</h2>
        </div>
        <ul>
        <li><span class="info-heading">Capital:</span> ${country.capital}</li>
        <li><span class="info-heading">Population:</span> ${
          country.population
        }</li>
        <li><span class="info-heading">Languages:</span> ${Object.values(
          country.languages
        )}</li>
        </ul>
        `;

    countryInfo.innerHTML = markup;
  }
}
