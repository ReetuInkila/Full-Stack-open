import { useState, useEffect } from 'react'
import axios from 'axios'
import Selection from './Selection'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            find countries <input value={filter} onChange={handleFilterChange} />
            <Selection filter={filter} countries={countries} />
        </div>
    )
}

export default App
