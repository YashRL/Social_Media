import React from 'react'
import '../pages.css'
import { useUserAuth } from "../../context/UserAuthContext"
import MainProfile from './MainProfile/MainProfile'

function Profile() {

    const { user } = useUserAuth();
    return (
        <div className='profilePage'>
            <MainProfile user={user} />
        </div>
    )
}

export default Profile