import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);

      return data;
    })
    .catch(error => {
      console.log(error);
      if (error.message === '404') {
        Notify.failure('Oops, there is no country with that name');
      }
    });
}
