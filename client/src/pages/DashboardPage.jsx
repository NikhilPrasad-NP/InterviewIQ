import React, { useEffect } from 'react'
import { useAuth, UserButton, useUser } from '@clerk/react'
import { Navigate } from 'react-router-dom'
import { getProfile, createProfile } from '../lib/profileService'

function DashboardPage() {
  const { isLoaded, isSignedIn, userId } = useAuth()
  const { user } = useUser()


  useEffect(() => {
    if (!isLoaded || !isSignedIn || !userId|| !user) return

    async function loadProfile() {
      try {
        const profile = await getProfile(userId)

        console.log("Profile:", profile)
        console.log("First name:", user.firstName)
      } catch (error) {
        console.error("Error loading profile:", error)
      }
    }

    loadProfile()
  }, [isLoaded, isSignedIn, userId, user])


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