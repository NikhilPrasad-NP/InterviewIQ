import React from 'react'
import { SignIn } from '@clerk/react'

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn forceRedirectUrl="/dashboard" />
    </div>
  )
}

export default LoginPage