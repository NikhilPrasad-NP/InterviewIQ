import React, { useMemo, useState } from 'react'
import { useAuth } from '@clerk/react'
import { useNavigate } from 'react-router-dom'
import { updateProfileRole } from '../lib/profileService'
import { createSupabaseClient } from '../lib/supabase'

function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState(null)
  const { userId, getToken } = useAuth()
  const navigate = useNavigate()

  const supabase = useMemo(
    () => createSupabaseClient(getToken),
    [getToken]
  )

  async function handleContinue() {
    if (!selectedRole || !userId) return

    try {
      await updateProfileRole(
        supabase,
        userId,
        selectedRole
      )

      if (selectedRole === 'candidate') {
        navigate('/dashboard', { replace: true })
      }

      if (selectedRole === 'interviewer') {
        navigate('/interviewer/dashboard', { replace: true })
      }
    } catch (error) {
      console.error('Error updating role:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A1832] flex items-center justify-center px-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#F6FAFD]">
            How will you use InterviewIQ?
          </h1>

          <p className="mt-3 text-[#B3CFE5]">
            Choose how you want to use the platform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <button
            onClick={() => setSelectedRole('candidate')}
            className={`rounded-2xl border p-8 text-left transition ${selectedRole === 'candidate'
              ? 'border-[#4A7FA7] bg-[#1A3D63]'
              : 'border-[#1A3D63] bg-[#0D1B38] hover:border-[#4A7FA7]'
              }`}
          >
            <h2 className="text-2xl font-semibold text-[#F6FAFD]">
              Candidate
            </h2>

            <p className="mt-3 text-[#B3CFE5]">
              Practice realistic AI-powered interviews and improve your
              interview skills.
            </p>
          </button>

          <button
            onClick={() => setSelectedRole('interviewer')}
            className={`rounded-2xl border p-8 text-left transition ${selectedRole === 'interviewer'
              ? 'border-[#4A7FA7] bg-[#1A3D63]'
              : 'border-[#1A3D63] bg-[#0D1B38] hover:border-[#4A7FA7]'
              }`}
          >
            <h2 className="text-2xl font-semibold text-[#F6FAFD]">
              Interviewer
            </h2>

            <p className="mt-3 text-[#B3CFE5]">
              Conduct interviews and evaluate candidates.
            </p>
          </button>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="rounded-xl bg-[#4A7FA7] px-8 py-3 font-medium text-white transition hover:bg-[#1A3D63] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoleSelectionPage