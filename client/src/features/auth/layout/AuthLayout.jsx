import React from 'react'
import { Outlet } from 'react-router-dom'
import './AuthLayout.scss'

const AuthLayout = () => {
    return (
        <div className='auth-layout-container'>
            <div className='body'>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout