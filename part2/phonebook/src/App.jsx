import { useState, useEffect } from 'react'
import personsService from './services/Persons'
import DeleteButton from './components/DeleteButton'
import ErrorMessage from './components/ErrorMessage'

const Filter = ({value, onChange}) => {
  return (
    <>
      Filter shown with:
      <input value={value} onChange={onChange}/>
    </>
  )
}

const Form = ({onSubmit, newName, newNumber, newNameChanged, newNumberChanged}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        Name: <input 
          value={newName} 
          onChange={newNameChanged}
        /><br/>
        Number: <input
          value={newNumber}
          onChange={newNumberChanged}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({personsToShow, onDeleteClicked}) => {
  return (
    <ul>
      {personsToShow.map((person) => <Person key={person.id} name={person.name} number={person.number} id={person.id} onDeleteClicked={onDeleteClicked}/>)}
    </ul>
  )
}

const Person = ({name, number, id, onDeleteClicked}) => {
  return (
    <li>{name} {number} <DeleteButton onClick={() => onDeleteClicked(name, id)}/></li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorMessageType, setErrorMessageType] = useState('success')

  useEffect(() => {
    personsService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    const filterPersons = persons.filter((person) => person.name === newName)
    const person = filterPersons.length ? filterPersons[0] : null
    if(person) {
      if(confirm(`${person.name} already exists, would you like to update the phone number?`)) {
        personsService
          .update(person.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson ))
          })
          .catch(error => {
            setErrorMessageType('error')
            setErrorMessage(
              `${newPerson.name} has already been deleted from the phonebook.`
            )
          })
      }
    } else {  
      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    setErrorMessage(
      `Person ${newPerson.name} has been added to the phonebook.`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    setNewName('')
    setNewNumber('')
  }

  const newNameChanged = (event) => {
    setNewName(event.target.value)
  }

  const newNumberChanged = (event) => {
    setNewNumber(event.target.value)
  }

  const filterChanged = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter ? persons.filter((person) => person.name.toLowerCase().includes(filter)) : persons

  const onDeleteClicked = (name, id) => {
    if (confirm(`Do you wish to delete ${name}?`)) {
      personsService.deletePerson(id)
        .then(response => {
          setPersons(persons.filter(p => p.id != id))
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage message={errorMessage} errorType={errorMessageType} />
      <Filter value={filter} onChange={filterChanged} />
      <h3>Add a new</h3>
      <Form onSubmit={addPerson} newName={newName} newNumber={newNumber} newNameChanged={newNameChanged} newNumberChanged={newNumberChanged} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onDeleteClicked={onDeleteClicked} />
    </div>
  )
}

export default App