import './styles.css';
import countryCardTpl from './tamplates/country-card.hbs';
import countryListTpl from './tamplates/country-list.hbs';
import { alert, error} from'@pnotify/core';
import"@pnotify/core/dist/PNotify.css";
import"@pnotify/core/dist/BrightTheme.css";

const debounce = require('lodash.debounce');
const messageNotification = 'Too many matchws found. Please enter a nore specific query!'
const refs ={
    cardContainer: document.querySelector('.js-card-container'),
    queryText: document.querySelector('.query-text')
} 

refs.queryText.addEventListener('input',debounce(onSearch,500))

function onSearch (e) {
        e.preventDefault();
        const searchQuery = e.target.value.trim();
        refs.queryText.value = ""
        fetchCountry (searchQuery)
            .then(pushNotification)
            .catch() //что добавить?
            // .finally(()=>refs.queryText.value="")
    }

function fetchCountry (name){
    const url = `https://restcountries.eu/rest/v2/name/${name}`;
    return fetch(url)
    .then(response=>response.json());
}

function renderCountryCard (country){
    const markup = countryCardTpl(country);
    refs.cardContainer.innerHTML = markup;
}

function renderCountryList(country){
    const listMarkup = countryListTpl(country);
    refs.cardContainer.innerHTML = listMarkup;
}

// function onFetchError(error) {
//     alert ('No county');
// }


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
    
// function clearCardContainer(){
//     refs.cardContainer.innerHTML = ''
// }
