import React from 'react'
import Weather from './Weather'

const Country = (props) => {
    return (
        <div>
            <h1>{props.country.name.common}</h1>
            <p>capital {props.country.capital[0]}</p>
            <p>area {props.country.area}</p>
            <b>languages</b>
            <ul>
                {Object.entries(props.country.languages).map(([key, value]) => (
                    <li key={key}>{value}</li>
                ))}
            </ul>
            <img style={{width:'200px'}} src={props.country.flags.svg} />
            <Weather capital={props.country.capital[0]} coods={props.country.capitalInfo.latlng}/>
        </div>
    );
};

export default Country;
