import React, { useState, useEffect, FormEvent } from 'react'
import List, { Item } from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  const list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(list)
  } else {
    return []
  }
}

function App() {
  const [item, setItem] = useState('')
  const [list, setList] = useState<Item[]>(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState<string | null>(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!item) {
      showAlert(true, 'danger', 'please insert value')
    } else if (item && isEditing) {
      setList(
        list.map((value) => {
          if (value.id === editID) {
            return { ...value, title: item }
          }
          return value
        }),
      )

      setItem('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'value changed')
    } else {
      showAlert(true, 'success', 'item added to the list')
      const newItem = { id: new Date().getTime().toString(), title: item }
      setList([...list, newItem])
      setItem('')
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    setList([])
    showAlert(true, 'danger', 'list empty')
  }

  const removeItem = (id: string) => {
    showAlert(true, 'danger', 'item removed')
    const updatedList = list.filter((item) => item.id !== id)
    setList(updatedList)
  }

  const editItem = (id: string) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    if (specificItem) {
      setItem(specificItem.title)
    }
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery List</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
