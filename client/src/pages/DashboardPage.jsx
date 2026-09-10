import React from 'react'
import { useAuth, UserButton } from '@clerk/react'
import { Navigate } from 'react-router-dom'

function DashboardPage() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />
  }

  return (
    <div>
      <UserButton />
     <h1>Dashboard Page</h1> 
    </div>
  )
}

export default DashboardPage