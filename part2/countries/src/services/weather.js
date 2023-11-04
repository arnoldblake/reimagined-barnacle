import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API

const baseUrl = 'http://api.weatherapi.com/v1/current.json'

const getWeather = (city) => {
    const request = axios.get(`${baseUrl}?key=${API_KEY}&q=${city}&aqi=no`)
    return request.then(response => response.data)
}

export default { getWeather }