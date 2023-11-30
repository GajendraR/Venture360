

let countries = [
  "afghanistan", "albania", "algeria", "andorra", "angola", "antigua and barbuda", "argentina", "armenia",
  "australia", "austria", "azerbaijan", "bahamas", "bahrain", "bangladesh", "barbados", "belarus", "belgium",
  "belize", "benin", "bhutan", "bolivia", "bosnia and herzegovina", "botswana", "brazil", "brunei", "bulgaria",
  "burkina faso", "burundi", "cabo verde", "cambodia", "cameroon", "canada", "central african republic", "chad",
  "chile", "china", "colombia", "comoros", "congo (congo-brazzaville)", "costa rica", "croatia", "cuba", "cyprus",
  "czechia (czech republic)", "denmark", "djibouti", "dominica", "dominican republic", "ecuador", "egypt", "el salvador",
  "equatorial guinea", "eritrea", "estonia", "eswatini (fmr. swaziland)", "ethiopia", "fiji", "finland", "france",
  "gabon", "gambia", "georgia", "germany", "ghana", "greece", "grenada", "guatemala", "guinea", "guinea-bissau",
  "guyana", "haiti", "holy see", "honduras", "hungary", "iceland", "india", "indonesia", "iran", "iraq", "ireland",
  "israel", "italy", "jamaica", "japan", "jordan", "kazakhstan", "kenya", "kiribati", "korea, north", "korea, south",
  "kosovo", "kuwait", "kyrgyzstan", "laos", "latvia", "lebanon", "lesotho", "liberia", "libya", "liechtenstein",
  "lithuania", "luxembourg", "madagascar", "malawi", "malaysia", "maldives", "mali", "malta", "marshall islands",
  "mauritania", "mauritius", "mexico", "micronesia", "moldova", "monaco", "mongolia", "montenegro", "morocco",
  "mozambique", "myanmar (formerly burma)", "namibia", "nauru", "nepal", "netherlands", "new zealand", "nicaragua",
  "niger", "nigeria", "north macedonia", "norway", "oman", "pakistan", "palau", "palestine state", "panama", "papua new guinea",
  "paraguay", "peru", "philippines", "poland", "portugal", "qatar", "romania", "russia", "rwanda", "saint kitts and nevis",
  "saint lucia", "saint vincent and the grenadines", "samoa", "san marino", "sao tome and principe", "saudi arabia",
  "senegal", "serbia", "seychelles", "sierra leone", "singapore", "slovakia", "slovenia", "solomon islands", "somalia",
  "south africa", "south sudan", "spain", "sri lanka", "sudan", "suriname", "sweden", "switzerland", "syria", "tajikistan",
  "tanzania", "thailand", "timor-leste", "togo", "tonga", "trinidad and tobago", "tunisia", "turkey", "turkmenistan",
  "tuvalu", "uganda", "ukraine", "united arab emirates", "united kingdom", "united states of america", "uruguay", "uzbekistan",
  "vanuatu", "venezuela", "vietnam", "yemen", "zambia", "zimbabwe"
]


const countryInput = document.getElementById('countryInput');
const suggestionsContainer = document.getElementById('suggestions');
const submitButton = document.getElementById('submitButton');
const numbs = document.getElementById('totalcountry');

// Function to filter countries based on the user input and show suggestions
function filterCountries() {
    const filterValue = countryInput.value.trim().toLowerCase();
    const filteredCountries = countries.filter(country => country.toLowerCase().startsWith(filterValue));
    
    if (filterValue === ''|| !countryInput.classList.contains('focused')) {
      suggestionsContainer.style.display = 'none';
    } 
    else if (filteredCountries.length > 0) {
      suggestionsContainer.style.display = 'block';
      showSuggestions(filteredCountries.slice(0, 9)); 
    } 
    else {
      suggestionsContainer.style.display = 'none';
    }

}

// Function to display the filtered country suggestions
function showSuggestions(filteredCountries) {
    // Clear the current suggestions
    suggestionsContainer.innerHTML = '';

    // Show the suggestions container if there are matches
    if (filteredCountries.length > 0) {
        suggestionsContainer.style.display = 'block';

        // Add the filtered suggestions
        filteredCountries.forEach(country => {
            const suggestion = document.createElement('div');
            suggestion.classList.add('suggestion');
            suggestion.textContent = country;
            suggestion.addEventListener('click', () => {
                // Action to perform when a suggestion is selected
                countryInput.value=country;
                suggestionsContainer.style.display="none";
                // You can close the dropdown or perform other actions here
            });
            suggestionsContainer.appendChild(suggestion);
        });
    } else {
        // Hide the suggestions container if there are no matches
        suggestionsContainer.style.display = 'none';
    }
}

// Hide the suggestions container initially
suggestionsContainer.style.display = 'none';

function checkValidity() {
    const userInput = countryInput.value.trim().toLowerCase();
    const usernumber = numbs.value.trim();
    const isValidCountry = countries.some(country => country.toLowerCase() === userInput);
    const isValidnums =usernumber>= 1 && usernumber  <= 195;

    if (isValidCountry && isValidnums) {
        console.log('Valid country:', userInput);
        numbs.classList.remove('invalid-input');
        countryInput.classList.remove('invalid-input');
        window.location.href = `index1.html?country=${userInput}&number=${usernumber}`;
    } else {
        if (!isValidCountry) {
            countryInput.classList.add('invalid-input');
            console.log("false");
        }
        if (!isValidnums) {
            numbs.classList.add('invalid-input');
            console.log("false");
        }
        return;
    }

}

// Event listener for input changes
countryInput.addEventListener('input', () => {
    if (countryInput.value.length === 0) {
        // Hide the suggestions container if no input
        suggestionsContainer.style.display = 'none';
    } else if (countryInput.value.length === 1) {
        // Show the suggestions container when the first letter is typed
        suggestionsContainer.style.display = 'block';
    }
    filterCountries();
});

countryInput.addEventListener('focus',()=>{
    countryInput.classList.add('focused');
    filterCountries();
});
countryInput.addEventListener('blur',()=>{
    countryInput.classList.remove('focused');
    setTimeout(filterCountries,200);
});

submitButton.addEventListener('click', checkValidity);

