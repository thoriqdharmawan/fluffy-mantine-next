import {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction
} from "react";


export type Global = {
  selectedCompany: string | undefined
}

interface GlobalContext {
  global: Global,
  setGlobal: Dispatch<SetStateAction<Global>>
}

const GlobalContext = createContext<any>(undefined)

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [global, setGlobal] = useState<Global>({
    selectedCompany: undefined
  })

  return (
    <GlobalContext.Provider value={{ value: global, setValue: setGlobal }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => {
  return useContext(GlobalContext)
}
