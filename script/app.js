const locationEl = document.querySelector(".content__location")
const imgEl = document.querySelector(".content__main img")
const tempEl = document.querySelector(".content__main p")
const textEl = document.querySelector(".content__text")
const timeEL = document.querySelector(".content__time")
const formEl = document.querySelector(".form")
const forecastEl = document.querySelector(".forecast")

const BASE_URL = ""



async function fetchWeather(city){
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=67da739cc15c4a0e92681234251501&q=${city}&days=10&aqi=yes&alerts=yes`)
    response
        .json()
        .then(res => {
            console.log(res);
            tempEl.textContent = res.current.temp_c + "°"
            imgEl.src = res.current.condition.icon
            textEl.textContent = res.current.condition.text
            locationEl.textContent = `${res.location.name}. ${res.location.country}`
            timeEL.textContent = res.location.localtime
            res.forecast.forecastday.forEach(item =>{
                const forecastItem = document.createElement("div")
                forecastItem.className = "forecast__item"
                forecastItem.innerHTML = `
                    <p>${item.date}</p>
                    <img src=${item.day.condition.icon} alt="">
                    <strong>${item.day.avgtemp_c}° <sub>${item.day.mintemp_c}°</sub></strong>
                   
                `
                forecastEl.appendChild(forecastItem)
            })
        })
}

window.onload = ()=> {
    fetchWeather("Tashkent")
}

formEl.addEventListener("submit", e => {
    e.preventDefault()
    fetchWeather(formEl.firstElementChild.value)
})