import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, updateCurrentUser, updateProfile } from 'firebase/auth'
import { Alert, Button, Input, Select, Switch } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserType } from '../slices/userSlice'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
const Signup = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [alertMessage, setalertMessage] = useState(null)
    const [state, setstate] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        password: ""
    })
    useEffect(() => {
        if (user.userAuth) {
            navigate("/", { replace: true })
        }
    }, [user.userAuth])

    useEffect(() => {
        setTimeout(() => {
            setalertMessage(null)
        }, 5000);
    }, [alertMessage])

    const signupUser = async (e) => {
        e.preventDefault()
        const { password, ...stateData } = state
        try {
            const data = await createUserWithEmailAndPassword(auth, state.email, state.password)
            if (user.userType === "User") {
                await setDoc(doc(db, "users", data.user.uid), {
                    ...stateData,
                    userType: user.userType,
                    timestamp: serverTimestamp()
                })
                console.log(auth.currentUser)
                await updateProfile(auth.currentUser, {
                    displayName: "User"
                })
            }
            else {
                await setDoc(doc(db, "authors", data.user.uid), {
                    ...stateData,
                    userType: user.userType,
                    timestamp: serverTimestamp()
                })
                console.log(auth.currentUser)
                await updateProfile(auth.currentUser, {
                    displayName: "Author"
                })
            }
            setalertMessage({
                type: "success",
                message: "User Created successfully. Redirecting ..."
            })
            setTimeout(() => {
                navigate("/", { replace: true })
            }, 6000);
        } catch (error) {
            console.log(error)
            setalertMessage({
                type: "failed",
                message: error.message
            })
        }
    }
    const changeHandler = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    }
    const changeUser = () => {
        dispatch(setUserType({
            type: user.userType === "User" ? "Author" : "User"
        }))
    }
    return (
        <div className='flex w-full h-screen flex-col justify-center items-center'>
            {
                alertMessage?.type === "success" && (<Alert type='success' message={alertMessage.message} />)}
            {alertMessage?.type === "failed" && (<Alert
                type='error' message={alertMessage.message}
            />)
            }
            <h1 className='text-4xl'>Libray</h1>
            <h1 className='text-4xl'>Signup</h1>
            <h4 className='text-xl my-4'>{user.userType} Account</h4>
            <Switch className='bg-blue-400' checked={user.userType === "User" ? false : true} onChange={changeUser} size="default" />
            <p className='text-lg my-2'>Switch to {user.userType === "User" ? "Author" : "User"} account</p>
            <form className='flex flex-col w-1/2 my-10 space-y-4' onSubmit={signupUser}>

                <div className='flex w-full justify-center'>
                    <label className='w-1/4 font-semibold text-lg'>First Name: </label>
                    <Input className='rounded' type={"text"} required name="firstName" value={state.firstName} onChange={changeHandler} />
                </div>

                <div className='flex w-full justify-center'>
                    <label className='w-1/4 font-semibold text-lg'>Last Name: </label>
                    <Input className='rounded' type={"text"} required name="lastName" value={state.lastName} onChange={changeHandler} />
                </div>
                <div className='flex w-full justify-center'>
                    <label className='w-1/4 font-semibold text-lg'>Email: </label>
                    <Input className='rounded' type={"email"} required name="email" value={state.email} onChange={changeHandler} />
                </div>
                <div className='flex w-full justify-center'>
                    <label className='w-1/4 font-semibold text-lg'>Gender: </label>
                    <Select className='flex-1 rounded' value={state.gender} onChange={(e) => setstate({ ...state, gender: e })} >
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
                </div>
                <div className='flex w-full justify-center'>
                    <label className='w-1/4 font-semibold text-lg'>Password: </label>
                    <Input.Password className='rounded' required name="password" value={state.password} onChange={changeHandler} />
                </div>
                <div className='flex w-full justify-center'>
                    <Button className='bg-blue-400 text-lg font-semibold p-1 px-3 rounded'
                        size='large' type="primary" htmlType='submit'>Signup</Button>
                </div>
                <div className='w-full text-center'>
                    <p className='text-lg font-semibold'>Already have an account. <Link to={"/login"}>Log In</Link> </p>
                </div>
            </form>
        </div>
    )
}

export default Signup