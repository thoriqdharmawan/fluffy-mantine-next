import { createContext, useContext, useState } from 'react'

export const initialBillsState = {
  open: false,
  items: []
}

const BillsContext = createContext()

export const useBills = () => {
  return useContext(BillsContext)
}

export const BillsProvider = (props) => {
  const [bills, setBills] = useState(initialBillsState)

  const Open = () => {
    setBills((prev) => ({ ...prev, open: true }))
  }

  const Close = () => {
    setBills((prev) => ({ ...prev, open: false }))
  }

  const Toggle = () => {
    setBills((prev) => ({ ...prev, open: !prev.open }))
  }

  const value = { ...bills, Open, Close, Toggle }
  return <BillsContext.Provider value={value} {...props} />
}