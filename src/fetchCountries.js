export default 
const fetchCountries = fetch('https://restcountries.eu/rest/v2/name/ukraine?fullText=true')
console.log(fetchCountries)
// https://restcountries.eu/rest/v2/name/{name}?fullText=true