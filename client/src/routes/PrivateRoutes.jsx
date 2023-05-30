import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useStateContext } from '../config/Context'

const PrivateRoutes = ({children}) => {
    const location = useLocation()
    const {currentUser} = useStateContext()
  return (
    <>
    {currentUser ? (
        children
    ): (
        <Navigate to={'/account'} state={{from: location}}/>
    )}
    </>
  )
}

export default PrivateRoutes