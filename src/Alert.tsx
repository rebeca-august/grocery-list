import React, { useEffect } from 'react'
import { Item } from './List'

type Props = {
  type: string
  msg: string
  removeAlert: () => void
  list: Item[]
}

const Alert = ({ type, msg, removeAlert, list }: Props) => {
  useEffect(() => {
    const id = setTimeout(() => {
      removeAlert()
    }, 2000)
    return () => {
      clearTimeout(id)
    }
  }, [list, removeAlert])
  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
