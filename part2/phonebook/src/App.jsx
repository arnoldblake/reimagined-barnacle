import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '999-999-9999',
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    if(persons.filter((person) => person.name === newName).length > 0) {
      alert(`${newName} already exists`)
    } else {  
      setPersons(persons.concat(newPerson))
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName} 
            onChange={newNameChanged}
          /><br/>
          number: <input
            value={newNumber}
            onChange={newNumberChanged}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, i) => <li key={i}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App