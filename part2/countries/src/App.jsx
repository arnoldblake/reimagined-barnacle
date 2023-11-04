import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Country from './components/country'
import CountryDetail from './components/countryDetail'

function App() {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(countries => {
        setCountries(countries)
      })
  }, [])
  
    if (!countries) {
      return null
    }

  const onInputChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const countriesToShow = filter
      ? countries.filter((country) => country.name.common.toLowerCase().includes(filter))
      : countries

  return (
    <>
      <div>
        find countries
        <input value={filter} onChange={onInputChange}/>
          {
            countriesToShow.length > 10 
              ? <div>Too many countries to display</div>
              : countriesToShow.length === 1
                ? <CountryDetail c={countriesToShow[0]}/>
                : countriesToShow.map((c) => <Country key={c.ccn3} c={c} />)
          }
      </div>
    </>
  )
}

export default App
