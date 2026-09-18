import React, { useEffect, useMemo } from 'react'
import { useAuth, useUser } from '@clerk/react'
import { Navigate, useNavigate } from 'react-router-dom'
import { getProfile, createProfile } from '../lib/profileService'
import { createSupabaseClient } from '../lib/supabase'

function AuthRedirectPage() {
  const { isLoaded, isSignedIn, userId, getToken } = useAuth()
  const { user } = useUser()

  const supabase = useMemo(
    () => createSupabaseClient(getToken),
    [getToken]
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !userId || !user) return

    async function resolveUser() {
      try {
        const profile = await getProfile(supabase, userId)

        if (!profile) {
          await createProfile(
            supabase,
            userId,
            user.firstName
          )

          navigate('/choose-role', { replace: true })
          return
        }

        if (!profile.role) {
          navigate('/choose-role', { replace: true })
          return
        }

        if (profile.role === 'candidate') {
          navigate('/dashboard', { replace: true })
          return
        }

        if (profile.role === 'interviewer') {
          navigate('/interviewer/dashboard', { replace: true })
          return
        }

      } catch (error) {
        console.error('Error resolving user:', error)
      }
    }

    resolveUser()
  }, [isLoaded, isSignedIn, userId, user, supabase, navigate])

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />
  }

  return <div>Loading your InterviewIQ experience...</div>
}

export default AuthRedirectPage