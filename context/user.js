import { createContext, useContext, useState, useEffect } from 'react'
import client from '../apollo-client'
import { GET_LIST_USER_LOGIN } from '../services/users'

export const InitialUserState = {
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  emailVerified: false
}

const UserContext = createContext()

const getDataUser = async (uid) => {
  const { data } = await client.query({
    query: GET_LIST_USER_LOGIN,
    variables: {
      uid
    }
  })

  return data
}

export const useUser = () => {
  return useContext(UserContext)
}

export const UserProvider = (props) => {
  const [userState, setUserState] = useState(InitialUserState)

  useEffect(() => {
    if (userState.uid) {
      getDataUser(userState.uid).then(({ users }) => {
        setUserState((prev) => ({
          ...prev,
          displayName: users?.[0].name,
          companyId: users?.[0].companyId
        }))
      })
    }
  }, [userState.uid])


  const SetUser = (userCredential) => {
    setUserState({ ...userCredential })
  }

  const ResetUser = () => {
    setUserState(InitialUserState)
  }

  const value = { ...userState, SetUser, ResetUser }
  return <UserContext.Provider value={value} {...props} />
}