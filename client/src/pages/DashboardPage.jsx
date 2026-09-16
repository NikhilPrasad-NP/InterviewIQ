import React, { useEffect, useMemo } from 'react'
import { useAuth, UserButton, useUser } from '@clerk/react'
import { Navigate } from 'react-router-dom'
import { getProfile, createProfile } from '../lib/profileService'
import { createSupabaseClient } from '../lib/supabase'

function DashboardPage() {
  const { isLoaded, isSignedIn, userId, getToken } = useAuth()
  const { user } = useUser()
  const supabase = useMemo(
    () => createSupabaseClient(getToken),
    [getToken]
  )



  useEffect(() => {
    if (!isLoaded || !isSignedIn || !userId || !user) return

    async function loadProfile() {
      try {
        const profile = await getProfile(supabase, userId)

        console.log("Profile:", profile)

        if (!profile) {
          const newProfile = await createProfile(supabase, userId, user.firstName)
          console.log("New profile created:", newProfile)
        }
      } catch (error) {
        console.error("Error loading profile:", error)
      }
    }

    loadProfile()
  }, [isLoaded, isSignedIn, userId, user, supabase])


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