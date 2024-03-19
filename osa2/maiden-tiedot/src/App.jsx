import { useState, useEffect } from 'react'
import countriesService from '../services/countriesService'

function App() {

  const [initialCountries, setInitialCountries] = useState([])
  const [countries, setCountries] = useState([])
  const [singleCountry, setSingleCountry] = useState([])
  const [message, setMessage] = useState('')

  const handleClick = (name) => {
    setMessage('')
      countriesService.getOneCountry(name)
      .then((data) => {
        console.log(data)
        setCountries([data])
        setSingleCountry([data])
    })
  }

  const handleInput = (event) => {
    const regex = new RegExp(event.target.value, 'i')
    const foundCountries = countries.filter((country) => {
      return country.name.common.match(regex)
    })

    if (event.target.value === '') {
      countriesService.getCountries()
      .then((data) => {
        setMessage('')
        setInitialCountries(data)
        setCountries(data)
      })
    }
    else if (foundCountries.length >= 10 && event.target.value !== '') {
      setMessage('Too many matches please specify search more')
    }
    else if (foundCountries.length === 1) {
      setMessage('')
      countriesService.getOneCountry(foundCountries[0].name.common)
      .then((data) => {
        setCountries([data])
        setSingleCountry([data])
      })
    }
    else {
      setMessage('')
      setCountries(foundCountries)
    }
    
  }

  useEffect(() => {
    countriesService.getCountries()
    .then((data) => {
      setInitialCountries(data)
      setCountries(data)
    })
  }, [])

  const mapped = countries.map((country, i) => {
    return <div key={i}><p>{country.name.common}</p><button onClick={() => {handleClick(country.name.common)}}>show</button></div>
  })

  const single = singleCountry.map((country, i) => {
    return <div key={i}>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <ul>
        {Object.values(country.languages).map((value, i) => <li key={i}>{value}</li>)}
      </ul>
      <img src={country.flags.png} />
    </div>
  })

  return (
    <>
      <div>
        <input type='text' onChange={handleInput} />
        {message === '' && mapped.length > 1?mapped
        :message === '' && mapped.length === 1?single
        :message}
      </div>
    </>
  )
}

export default App
