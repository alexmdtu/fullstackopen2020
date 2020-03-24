import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ countries, filter }) => {
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter))

  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (filteredCountries.length > 1) {
    return (
      filteredCountries.map(country => <p key={country.name}>{country.name}</p>)
    )
  } else if (filteredCountries.length > 0) {
    return (
      <Country country={filteredCountries[0]} />
    )
  }
  return (
    <p></p>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width="200px" />
    </div>

  )
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
      <Countries countries={countries} filter={filter} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
