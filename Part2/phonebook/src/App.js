import React, { useState, useEffect } from "react"
import phonebookService from "./services/phonebookservice"

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with: <input value={ filter } onChange={ (e) => setFilter(e.target.value) } />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, setNewName, newNumber, setNewNumber }) => {
  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault()
        addPerson({ name: newName, number: newNumber })
        setNewName("")
        setNewNumber("")
      } }
    >
      <div>
        name: <input value={ newName } onChange={ (e) => setNewName(e.target.value) } />
      </div>
      <div>
        number: <input value={ newNumber } onChange={ (e) => setNewNumber(e.target.value) } />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      { persons.map(person => (
        <div key={ person.id } style={ { display: 'flex', gap: '10px' } }>
          <p >{ person.name } { person.number }</p>
          <button onClick={ () => onDelete(person.name, person.id) }>delete</button>
        </div>
      )) }
    </div>
  )
}
const Notification = ({ notify }) => {

  if (notify === null) {
    return null
  }
  const { status, message } = notify

  return (
    <div className={ 'message ' + status }>
      { message }
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState(null)



  useEffect(() => {
    phonebookService.getAll().then(persons => setPersons(persons)).catch(err => {
      handleNotification('error', "An error occurred while getting persons")
    })

  }, [])

  function handleNotification (status, message) {
    setNotification({ status, message })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }


  const addPerson = ({ name, number }) => {
    const person = persons.find((person) => person.name.toLowerCase() === name.toLowerCase())
    if (person) {
      if (person.number === number) {
        handleNotification('error', `${name} with ${number} is already added to phonebook`)
        return
      }
      const id = person.id
      const confirm = window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)
      if (confirm) {
        phonebookService.update(id, number, name).then(person => {
          setPersons(persons.map(psn => psn.id !== person.id ? psn : person))
          handleNotification('success', `${name} number updated to ${number}`)
        }).catch(err => handleNotification('error', err.response.data.error))
      }
      return
    }
    phonebookService.create(name, number).then(person => {
      setPersons(persons.concat(person))
      handleNotification('success', `Added ${name}`)
    }).catch(err => handleNotification('error', err.response.data.error))

    setNewName("")
    setNewNumber("")
  }

  const handleDelete = (name, id) => {
    const result = window.confirm(`Delete ${name}?`)
    if (result) {
      phonebookService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
        handleNotification('success', `${name} deleted`)
      }).catch(err => handleNotification('error', `${name} not in server refresh your page`))
    }
    return
  }

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notify={ notification } />

      <Filter filter={ filter } setFilter={ setFilter } />

      <h3>add a new</h3>
      <PersonForm
        addPerson={ addPerson }
        newName={ newName }
        setNewName={ setNewName }
        newNumber={ newNumber }
        setNewNumber={ setNewNumber }
      />
      <h2>Numbers</h2>
      <Persons persons={ personsToShow } onDelete={ handleDelete } />
    </div>
  )
}

export default App
