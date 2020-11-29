import './styles.css';
import countryCardTpl from './tamplates/country-card.hbs';
import countryListTpl from './tamplates/country-list.hbs';
import fetchCountry from './js/fetchCountries.js';
import { alert, error} from'@pnotify/core';
import"@pnotify/core/dist/PNotify.css";
import"@pnotify/core/dist/BrightTheme.css";

const debounce = require('lodash.debounce');
const messageNotification = 'Too many matches found. Please enter a more specific query!'
const refs ={
    cardContainer: document.querySelector('.js-card-container'),
    queryText: document.querySelector('.query-text')
} 

refs.queryText.addEventListener('input',debounce(onSearch,500))
function onSearch (e) {
        e.preventDefault();
        const searchQuery = e.target.value.trim();
        fetchCountry (searchQuery)
            .then(pushNotification)
            .catch(onFetchError) 
    }

function renderCountryCard (country){
    const markup = countryCardTpl(country);
    return refs.cardContainer.insertAdjacentHTML('beforeend',markup);
}

function renderCountryList(country){
    const listMarkup = countryListTpl(country);
    return refs.cardContainer.insertAdjacentHTML('beforeend',listMarkup);
}

function onFetchError(error) {
    alert ('No county');
}

function alertNotification(err){
error ({
    text: `${err}`,
  })
}

function pushNotification (data){    
    if (data.message) return alertNotification(data.message)
    if (data.length > 10) 
    return alertNotification(messageNotification)
    if (data.length === 1) 
    return renderCountryCard(data)
    if (data.length > 1)
    return renderCountryList(data)
}
    