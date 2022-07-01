import { Button } from 'antd'
import { signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { setUserAuth } from '../slices/userSlice'
const Navbar = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    useEffect(() => {

    }, [user.userAuth])
    const logOut = async () => {
        try {
            await signOut(auth)
            dispatch(setUserAuth({
                userAuth: null
            }))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='h-20 bg-zinc-900 w-full flex justify-between py-1 px-2'>
            <div className="flex justify-center items-center text-white text-2xl">
                <Link to="/">
                    <h1 className='text-white font-semibold'>
                        Umair Library
                    </h1>
                </Link>

            </div>

            <div className='flex justify-center items-center space-x-2'>

                {!user?.userAuth ? (
                    <>

                        <Link className='text-white text-lg' to="/login">
                            Login
                        </Link>
                        <Link className='text-white text-lg' to="/signup">Signup</Link>
                    </>
                ) :

                    <Button type="primary" onClick={logOut} className="bg-blue-400">Logout</Button>
                }
            </div>
        </div>
    )
}

export default Navbar