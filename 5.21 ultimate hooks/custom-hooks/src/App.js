import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  let token = null

  // const setToken = newToken => {
  //   token = `bearer ${newToken}`;
  // };

  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }
    getAll()
  }, [baseUrl])



  const create = async (resource) => {
    console.log('create runs')
    const config = {
      headers: { Authorization: token },
    }
  
    const response = await axios.post(baseUrl, resource, config)
    setResources([...resources, response.data])
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  console.log('App runs')
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.reset()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    name.reset()
    number.reset()
  }

  const removeReset = (obj) => {
    // eslint-disable-next-line no-unused-vars
    const { reset, ...noReset } = obj
    return noReset
  }

  console.log('notes:', notes)
  console.log('persons:', persons)
  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...removeReset(content)} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...removeReset(name)} /> <br/>
        number <input {...removeReset(number)} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App