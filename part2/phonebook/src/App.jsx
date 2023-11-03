import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

  const filterChanged = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter ? persons.filter((person) => person.name.toLowerCase().includes(filter)) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with:
      <input value={filter} onChange={filterChanged}/>
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
        {personsToShow.map((person, i) => <li key={i}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App