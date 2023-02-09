import axios from "axios"
const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY

const getWeather = (lat, lon) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}`)
    return request.then(response => response.data)
}

export default { getWeather }
