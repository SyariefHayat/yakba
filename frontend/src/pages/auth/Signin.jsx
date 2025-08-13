import React from 'react'
import LoginForm from '@/components/Modules/auth/LoginForm'

const Signin = () => {
    return (
        <div className="bg-muted flex h-screen flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <LoginForm />
            </div>
        </div>
    )
}

export default Signin