import React, { useState, useEffect } from "react"
import axios from "axios"

const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {

  const baseUrl = `https://restcountries.com/v2/name/${name}?fullText=true`
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return
    axios
      .get(baseUrl)
      .then((res) =>
        setCountry(res.data)
      )
      .catch((err) => console.log("an error", err))
  }, [baseUrl, name])

  return country
}

const Country = ({ country }) => {


  if (!country) {
    return null
  }

  if (country.message === 'Not Found') {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{ country[0].name } </h3>
      <div>capital { country[0].capital } </div>
      <div>population { country[0].population }</div>
      <img src={ country[0].flag } height="100" alt={ `flag of ${country[0].name}` } />
    </div>
  )
}

const App = () => {
  const nameInput = useField("text")
  const [name, setName] = useState("")
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={ fetch }>
        <input { ...nameInput } />
        <button>find</button>
      </form>

      <Country country={ country } />
    </div>
  )
}

export default App
