import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const ShowWeather = ({country}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        weatherService
          .getWeather(country.capital)
          .then(weather => {
            setWeather(weather)
          })
          .catch(error => {
            console.log('houston we have a problem')
          })
      }, [])

    if (!weather) {
        return null
    }

    return (
        <>
            <h3>Weather of {country.capital}</h3>
            The temperature is {weather.current.temp_f} F. Nice!
        </>
    )
}

export default ShowWeather