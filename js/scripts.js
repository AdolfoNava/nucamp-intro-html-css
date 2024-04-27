console.log(`javascript connected!`);

const carousel = new bootstrap.Carousel('#homeCarousel',{
    interval: 5000,
    pause: false
})

const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', () =>{
    if(faIcon.classList.contains('fa-pause')){
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    }else{
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
})

async function fetchWeather(){
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    let city = 'Chicago';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(url)
    .then((response) => response.json())
    .then((data) => {console.log(data);
        displayWeather(data)}).catch((error) => console.error(error));
}
fetchWeather();
function displayWeather(data){
    //const temperature = data.main.temp;
    //const description =  data.weather[0].description;
    //const icon = data.weather[0].icon;
    /*
        i id="weather-icon"></i>
        <span id="weather-temp"></span>
        <span id="weather-description" class="d-none d-lg-inline"></span>
    */
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    const imgCalled = document.querySelector('#weather-icon');
    imgCalled.appendChild(imgElement);
    const tempCalled = document.querySelector('#weather-temp');
    tempCalled.textContent = `${data.main.temp}\u00B0`;
    const descriptionCalled = document.querySelector('#weather-description');
    descriptionCalled.textContent = data.weather[0].description;
    //console.log(`${temperature} ${description} ${icon}`);
}