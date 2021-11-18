import React, { useEffect, useState } from "react";
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
const WEATHER_URL = `http://api.weatherstack.com/current?access_key=${api_key}`
// & query = New York

const CountryDetails = ({ country, handleBack }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios.get(WEATHER_URL + '&query=' + country.capital[0]).then(response => {
      setWeather(response.data)
    }).catch(error => {
      console.log(error)
    })
  }, [country.capital])
  return (
    <div>
      <h2>{ country.name.common }</h2>
      <p>capital { country.capital[0] }</p>
      <p>continent { country.continents[0] }</p>
      <h3>languages</h3>
      <ul>
        { Object.values(country.languages).map(language => <li key={ language }>{ language }</li>) }
      </ul>
      <div style={ { width: '200px', height: '200px' } }>
        <img src={ country.flags.svg } alt='flag' style={ { width: '100%', height: 'auto', display: 'block' } } />
      </div>
      <h3>weather in { country.capital[0] }</h3>
      { weather ?
        <div>
          <p><b>temperature:</b> { weather.current.temperature } Celcius</p>
          <div style={ { width: '150px', height: '150px' } }>
            <img src={ weather.current.weather_icons[0] } alt='weather' style={ { width: '100%', height: 'auto', display: 'block' } } />
          </div>
          <p><b>wind:</b> { weather.current.wind_speed } mph direction { weather.current.wind_dir } </p>
        </div>
        : <p>loading...</p> }
      <button onClick={ handleBack }>back</button>
    </div>
  )
}


function App () {
  const BASE_URL = 'https://restcountries.com/v3.1/all'
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [isDetails, setIsDetails] = useState(false)

  function refresh () {
    setIsDetails(false)
    setFilter('')
  }

  useEffect(() => {
    axios.get(BASE_URL).then(response => {
      setCountries(response.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <div>find countries <input value={ filter } onChange={ (e) => setFilter(e.target.value) } /></div>
      { isDetails ? <CountryDetails handleBack={ refresh } country={ isDetails } /> : countriesToShow.length > 10 ? <p>Too many matches, specify another filter</p> : countriesToShow.length === 1 ?
        <CountryDetails handleBack={ refresh } country={ countriesToShow[0] } /> :
        countriesToShow.map(country => <p key={ country.name.common }>
          { country.name.common } <button onClick={ () => setIsDetails(country) }>show</button>
        </p>)
      }
    </div>
  );
}

export default App;
