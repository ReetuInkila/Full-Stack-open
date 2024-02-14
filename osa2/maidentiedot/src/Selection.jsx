import { useState, useEffect } from 'react'
import Country from './Country'

const Selection = (props) => {
    const [filteredCountries, setFilteredCountries] = useState(props.countries);


    useEffect(() => {
        const filtered = props.countries.filter(country => country.name.common.toUpperCase().includes(props.filter.toUpperCase()));
        setFilteredCountries(filtered);

        console.log(filtered, props.filter)
    }, [props.filter])


    if(filteredCountries.length>10){
        return <p>Too many matches, specify another filter</p>
    }else if(filteredCountries.length>1){
        return(
            <div>
                {filteredCountries.map((c, i) => 
                    <p key={i}>{c.name.common}</p>
                )}
            </div>
        )
    }else if(filteredCountries.length==1){
        return <Country country={filteredCountries[0]}/>
    }

}

export default Selection
