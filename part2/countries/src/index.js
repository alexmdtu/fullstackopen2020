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
      filteredCountries.map(country => <CountryAndButton key={country.name} country={country} />)
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

const CountryAndButton = ({ country }) => {
  const [showCountry, setShowCountry] = useState(false)

  const handleShowClick = () => {
    setShowCountry(!showCountry)
  }

  if (showCountry) {
    return (
      <>
        <p>
          {country.name}
          <button onClick={handleShowClick}>hide</button>
        </p>
        <Country country={country} />
      </>
    )
  }

  return (
    <>
      <p>
        {country.name}
        <button onClick={handleShowClick}>show</button>
      </p>
    </>
  )
}

const Country = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data.current)
      })
  }, [api_key, country.capital])

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={country.name} width='200px' />
      <h3>Weather in {country.capital}</h3>
      <h4>temperature: {weather.temperature} ˚C</h4>
      {/* {console.log(weather.weather_icons ? weather.weather_icons[0] : 'init not done')} */}
      <img src={weather.weather_icons ? weather.weather_icons[0] : ''} alt='a weather icon' width='100px' />
      <h4>wind: {weather.wind_speed} mph direction {weather.wind_dir}</h4>
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
