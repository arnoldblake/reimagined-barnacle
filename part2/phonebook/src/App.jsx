import { useState, useEffect } from 'react'
import personsService from './services/Persons'
import DeleteButton from './components/DeleteButton'

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
    if(persons.filter((person) => person.name === newName).length > 0) {
      alert(`${newName} already exists`)
    } else {  
      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
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
      <Filter value={filter} onChange={filterChanged}/>
      <h3>Add a new</h3>
      <Form onSubmit={addPerson} newName={newName} newNumber={newNumber} newNameChanged={newNameChanged} newNumberChanged={newNumberChanged}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onDeleteClicked={onDeleteClicked}/>
    </div>
  )
}

export default App