import React from 'react'

const Weather = (props) => {
    return (
        <div>
            <h1>Weather in {props.capital}</h1>
        </div>
    );
};

export default Weather;