import React from 'react'
import SignupForm from '@/components/Modules/auth/SignupForm'

const Signup = () => {
    return (
        <div className="bg-muted flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">
                <SignupForm />
            </div>
        </div>
    )
}

export default Signup