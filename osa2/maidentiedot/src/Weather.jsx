import React from 'react'
import axios from 'axios'

const Weather = (props) => {
    const [weather, setWeather] = React.useState(null);
    const api_key = import.meta.env.VITE_SOME_KEY

    React.useEffect(()=>{
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${props.coords[0]}&lon=${props.coords[1]}&appid=${api_key}`)
            .then(response => {
                setWeather(response.data)
            })
    },[props])

    if(weather){
        return (
            <div>
                <h1>Weather in {props.capital}</h1>
                <p>temperature {(weather.main.temp-273.15).toFixed(2)} Celcius</p>
                <img alt="weather logo" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                <p>wind {weather.wind.speed} m/s</p> 
            </div>
        ); 
    }
    
};

export default Weather;