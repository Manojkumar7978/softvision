import React, {  createContext,useState } from 'react'

export let myContext=createContext()


export default function Context({children}) {
    let [userData,setUserData]=useState(null)

  return (
    <myContext.Provider value={{userData,setUserData}}>
        {children}
    </myContext.Provider>
  )
}
