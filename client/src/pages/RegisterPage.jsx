import { SignUp } from '@clerk/react'
import React from 'react'

function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUp forceRedirectUrl="/dashboard"/>
    </div>
  )
}

export default RegisterPage
