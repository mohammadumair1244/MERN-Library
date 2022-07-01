import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import IndexAuthor from './IndexAuthor'
import IndexUser from './IndexUser'

const Index = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    useEffect(() => {
        if (!user.userAuth) {
            navigate("/login", { replace: true })
        }
    }, [user.userAuth])
    return (
        <div>
            {
                user?.userType === "User" ? <IndexUser /> : <IndexAuthor />
            }
        </div>
    )
}

export default Index