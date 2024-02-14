import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [filteredPersons, setFilteredPersons] = useState([]);

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {        
                setPersons(initialPersons)      
            })
    }, [])

    useEffect(() => {
        setFilteredPersons(persons)
    }, [persons])

    const addNumber = (event) => {
        event.preventDefault();
        const person = { name: newName, number: newNumber };
    
        const existingPerson = persons.find(p => p.name === newName);
        if (existingPerson) {
            if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
                personService
                    .update(existingPerson.id, person)
                    .then(updatedPerson => {
                        setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p));
                        setNewName('');
                        setNewNumber('');
                    })
            }
        } else {
            personService.create(person).then(newPerson => {    
                setPersons([...persons, newPerson]);
                setNewName('');
                setNewNumber('');
            });
        }
    }

    const handleNameChange = (event) => {   
        setNewName(event.target.value)  
    }

    const handleNumberChange = (event) => {   
        setNewNumber(event.target.value)  
    }

    const handleFilterChange = (event) => {   
        setFilter(event.target.value)  
        const filtered = persons.filter(person => person.name.toUpperCase().includes(event.target.value.toUpperCase()));
        setFilteredPersons(filtered);
    }

    const handleDelete = (person) => { 
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .del(person.id)
                .then(() => { 
                    const updatedPersons = persons.filter(p => p.id !== person.id);
                    setPersons(updatedPersons);
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={filter} onChange={handleFilterChange}/>

            <h2>Add a new</h2>
            <PersonForm 
                onSubmit={addNumber} 
                newName={newName} 
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            
            <h2>Numbers</h2>
            <Persons persons={filteredPersons} handleDelete={handleDelete}/>
        </div>
    )
}

const Filter = (props)=>(
    <div>
        filter shown whit
        <input value={props.value} onChange={props.onChange} />
    </div>
)

const PersonForm = (props)=>(
    <form onSubmit={props.onSubmit}>
        <div>
            name: 
            <input 
                value={props.newName}
                onChange={props.handleNameChange}
            />
        </div>
        <div>
            number: 
            <input 
                value={props.newNumber}
                onChange={props.handleNumberChange}
            />
        </div>
        <div>
            <button  type="submit">add</button>
        </div>
    </form>
)

const Persons = (props) => (
    <div>
        {props.persons.map((person) => 
            <div key={person.id}>
                <p>{person.name} {person.number}</p>
                <button onClick={() => props.handleDelete(person)}>delete</button>
            </div>
        )}
    </div>
)

export default App