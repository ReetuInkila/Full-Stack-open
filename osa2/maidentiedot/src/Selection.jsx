import { useState, useEffect } from 'react'
import Country from './Country'

const Selection = (props) => {
    const [filteredCountries, setFilteredCountries] = useState(props.countries);
    const[selecteCountry, setSelectedCountry] = useState(null);


    useEffect(() => {
        const filtered = props.countries.filter(country => country.name.common.toUpperCase().includes(props.filter.toUpperCase()));
        setFilteredCountries(filtered);

        if(filtered.length==1){
            setSelectedCountry(filtered[0])
        }else{
            setSelectedCountry(null)
        }
    }, [props.filter])

    const handleSelect = (country) => { 
        setSelectedCountry(country)
    }


    if(selecteCountry){
        return <Country country={selecteCountry}/>
    }else if(filteredCountries.length>10){
        return <p>Too many matches, specify another filter</p>
    }else if(filteredCountries.length>1){
        return(
            <div>
                {filteredCountries.map((c, i) => 
                    <div key={i}>
                        <p>{c.name.common}</p><button onClick={() => handleSelect(c)}>show</button>
                    </div>
                )}
            </div>
        )
    }

}

export default Selection
