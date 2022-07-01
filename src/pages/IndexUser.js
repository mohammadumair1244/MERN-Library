import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { Button } from 'antd'
import { ReloadOutlined } from "@ant-design/icons"
import BookCards from '../components/BookCards'
import { db } from '../firebase'
import { setUserData } from '../slices/userSlice'
const IndexUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const [books, setbooks] = useState([])
    const [refresh, setrefresh] = useState(false)
    const { userData } = user
    useEffect(() => {
        if (!user.userAuth) {
            navigate("/login", { replace: true })
        }
        else {
            async function getUserData(params) {
                try {
                    const userDoc = await getDoc(doc(db, `users/${user.userAuth.uid}`))
                    dispatch(setUserData({
                        userData: {
                            id: userDoc.id,
                            ...userDoc.data(),
                            timestamp: Date.now()
                        }
                    }))
                } catch (error) {
                    console.log(error)
                }
            }
            getUserData()
            setrefresh(false)
        }
    }, [user.userAuth])
    useEffect(() => {
        async function getBooks(params) {
            try {
                const bookDocs = await
                    getDocs(query(collection(db, "books"),
                        orderBy("timestamp", "desc")))
                setbooks(bookDocs.docs?.map(book => ({ id: book.id, ...book.data() })))
            } catch (error) {
                console.log(error)
            }
        }
        getBooks()
    }, [refresh])

    return (
        <div className='min-h-screen p-4 bg-slate-100'>
            <h1 className='text-2xl text-center font-semibold'>Welcome {userData?.firstName} {userData?.lastName}</h1>
            <Button icon={<ReloadOutlined />} className="bg-blue-400 " onClick={() => setrefresh(!refresh)}>Refresh</Button>
            <h3 className='text-xl underline underline-offset-4 my-2 font-semibold'>Recently uploaded books.</h3>
            <BookCards books={books} />

        </div>
    )
}

export default IndexUser