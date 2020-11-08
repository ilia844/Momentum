// DOM Elements
const time = document.querySelector('.time'),
    date = document.querySelector('.date'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus'),
    updateImageBtn = document.querySelector('.update-image-btn'),
    quoteInfo = document.querySelector('.quote-info'),
    blockqoute = document.querySelector('.blockquote'),
    figcaption = document.querySelector('.figcaption'),
    updateQuoteBtn = document.querySelector('.update-quote-btn'),
    city = document.querySelector('.city'),
    sunTime = document.querySelector('.sun-time');

// Global Variables
let images = [];
let currentImage = 0;

const APIKey = 'cbffa54cce6bc3ab77ac029e2047544d';

// Show Time
function showDateTime() {
    // let today = new Date(2020, 9, 10, 15, 45, 6);
    let today = new Date(),
    month = today.getMonth(),
    day = today.getDate(),
    weekDay = today.getDay(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

    // Output time
    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    // Output date
    date.innerHTML = `${getWeekDay(weekDay)}, ${day} ${getMonthName(month)}`;

    // Check Next Hour And Period Of Day
    if (min == 0 && sec == 0) {
        if ([6, 12, 18, 24].includes(hour)) {
            setBgGreet();
        } else {
            updateImage();
        }
    }

    setTimeout(showDateTime, 1000);
}

// Add Zeros
function addZero(number) {
    return (parseInt(number, 10) < 10 ? '0' : '') + number;
}

// Get Day Of Week From Number
function getWeekDay(day) {
    const daysOfWeek = ['Sunday', 'Mondey', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[day];
}

// Get Month Name From Month Number
function getMonthName(monthNum) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNum];
} 


//// Work With Images
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
// Generate Array Of Path To Images
function generateImagesArray(interval) {
    images = [];
    currentImage = 0;
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    let index;
    while (arr.length > 0) {
        index = getRandomInt(arr.length);
        images.push(`/images/${interval}/${addZero(arr[index])}.jpg`);
        arr.splice(index, 1);
    }
}
// Update Image
function updateImage() {
    if (currentImage === images.length - 1) {
        currentImage = 0;
    } else {
        currentImage++;
    }
    document.body.style.backgroundImage = `url(${images[currentImage]})`;
}
////

// Set Background and Greeting
function setBgGreet() {
    // let today = new Date(2020, 9, 10, 15, 45, 6);
    let today = new Date(),
        hour = today.getHours();

    if (isMorning(hour)) {
        generateImagesArray('morning');
        updateImage();
        greeting.textContent = 'Good Morning, ';
        document.querySelector('.main-info').style.textShadow = '0 0 5px white';
    } else if (isAfternoon(hour)) {
        generateImagesArray('afternoon');
        updateImage();
        greeting.textContent = 'Good Afternoon, ';
        document.querySelector('.main-info').style.textShadow = '0 0 5px white';
    } else if (isEvening(hour)) {
        generateImagesArray('evening');
        updateImage();
        greeting.textContent = 'Good Evening, ';
        document.body.style.color = 'white';
        document.querySelector('.main-info').style.textShadow = '0 0 5px black';
    } else if (isNight(hour)) {
        generateImagesArray('night');
        updateImage();
        greeting.textContent = 'Good Night, ';
        document.body.style.color = 'white';
        document.querySelector('.main-info').style.textShadow = '0 0 5px black';
    }
}

// Is Period Of Day
function isMorning(hour) {
    if (hour >= 6 && hour < 12) {
        return true;
    } else return false;
}

function isAfternoon(hour) {
    if (hour >= 12 && hour < 18) {
        return true;
    } else return false;
}

function isEvening(hour) {
    if (hour >= 18 && hour < 24) {
        return true;
    } else return false;
}

function isNight(hour) {
    if (hour = 24 || hour < 6) {
        return true;
    } else return false;
}



// Set Name
function setName(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        if (e.target.innerText === '' || e.target.textContent.trim() === '') {
            getName();
        } else {
            localStorage.setItem('name', e.target.innerText);
        }
    }
}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Clear Name
function clearName(e) {
    name.textContent = "";
}

// Set Focus
function setFocus(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        if (e.target.innerText === '' || e.target.innerText.trim() === '') {
            getFocus();
        } else {
            localStorage.setItem('focus', e.target.innerText);
        }
    }
}

// Clear Focus
function clearFocus(e) {
    focus.textContent = '';
    focus.focus();
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

function updateImageClick() {
    updateImage();
    updateImageBtn.disabled = true;
    setTimeout(() => {updateImageBtn.disabled = false}, 1000);
}

//// Work With Quotes
// Get Quote
async function getQuote() {
    const url = 'https://favqs.com/api/qotd';
    const response = await fetch(url);
    const data = await response.json();
    blockqoute.textContent = data.quote.body;
    figcaption.textContent = data.quote.author;
    updateQuoteBtn.disabled = true;
    setTimeout(() => {updateQuoteBtn.disabled = false}, 1000);
} 
// View Author
function viewAuthor() {
    figcaption.style.display = 'block';
}
// Hide Author
function hideAuthor() {
    figcaption.style.display = 'none';
}
//// 

//// Work With Weather
// Get Weather
async function getWeather() {
    const weatherIcon = document.querySelector('.weather-icon'),
        temperature = document.querySelector('.temperature'),
        weatherDescription = document.querySelector('.weather-description'),
        humidity = document.querySelector('.humidity'),
        wind = document.querySelector('.wind'),
        sunrise = document.querySelector('.sunrise'),
        sunset = document.querySelector('.sunset');

    getCity();    
    const cityName = city.innerText;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=en&appid=${APIKey}&units=metric`;
    try {
        const response = await fetch(url);
        const weatherData = await response.json();

        if (weatherData.name !== undefined) {
            city.textContent = weatherData.name;
        }
        weatherIcon.className = `weather-item weather-icon owf owf-${weatherData.weather[0].id}`;
        temperature.textContent = `${weatherData.main.temp}°C (${weatherData.main.feels_like})`;
        weatherDescription.textContent = weatherData.weather[0].description;
        humidity.textContent = `humidity: ${weatherData.main.humidity}%`;
        wind.textContent = `wind: ${weatherData.wind.speed} m/s`;
        sunTime.style.display = 'flex';
        sunrise.textContent = getTimeFromUnix(weatherData.sys.sunrise);
        sunset.textContent = getTimeFromUnix(weatherData.sys.sunset);
    } catch(e) {
        // alert(`City '${cityName}' cannot be fount`);
        clearWeatherInfo();
    }
}
// Set City
function setCity(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('city', e.target.innerText);
            getWeather();
            city.blur();
        }
    } else {
        if (e.target.innerText === '' || e.target.innerText.trim() === '') {
            getCity();
        } else {
            localStorage.setItem('city', e.target.innerText);
        }
    }
}
// Get City
function getCity() {
    if (localStorage.getItem('city') === null) {
        city.textContent = 'Minsk';
    } else {
        city.textContent = localStorage.getItem('city');
    }
}
// Clear Weather Information
function clearWeatherInfo() {
    const weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    humidity = document.querySelector('.humidity'),
    wind = document.querySelector('.wind');

    weatherIcon.className = `weather-item weather-icon owf`;
    temperature.textContent = '';
    weatherDescription.textContent = 'not found';
    humidity.textContent = '';
    wind.textContent = '';
    sunTime.style.display = 'none';
}
// Convert Unix To Readeble Time
function getTimeFromUnix(seconds) {
    const dateTime = new Date(seconds * 1000);

    return `${addZero(dateTime.getHours())}:${addZero(dateTime.getMinutes())}`;
}
//// 

//// Events 
document.addEventListener('DOMContentLoaded', getQuote);
document.addEventListener('DOMContentLoaded', getWeather);

name.addEventListener('focus', clearName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('focus', clearFocus)
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity)

quoteInfo.addEventListener('mouseover', viewAuthor);
quoteInfo.addEventListener('mouseout', hideAuthor);
updateQuoteBtn.addEventListener('click', getQuote)

updateImageBtn.addEventListener('click', updateImageClick);

// RUN
showDateTime();
setBgGreet();
getName();
getFocus();