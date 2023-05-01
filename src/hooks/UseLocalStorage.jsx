import React from 'react'

function UseLocalStorage() {

    const setLoggedInUser=(token)=>{
        window.localStorage.setItem("token",token)
    }


    const getLoggedInUser=()=>{
       return window.localStorage.getItem("token")
    }

    const logoutUser=()=>{
        window.localStorage.removeItem("token")
    }
  return (
    {
        setLoggedInUser,
        getLoggedInUser,
        logoutUser
    }
  )
}

export default UseLocalStorage