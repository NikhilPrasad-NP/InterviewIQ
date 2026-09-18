import { SignUp } from '@clerk/react'
import React from 'react'

function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUp forceRedirectUrl="/auth" />
    </div>
  )
}

export default RegisterPage
