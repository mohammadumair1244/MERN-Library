import { StarIcon } from '@heroicons/react/solid'
import { Button, Col, Row } from 'antd'
import { collection, getDocs, query } from 'firebase/firestore'
import { orderBy } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Reviews from '../components/Reviews'
import { db } from '../firebase'

const BookDetails = () => {
    const [book, setbook] = useState({})
    const [reviews, setreviews] = useState([])
    const location = useLocation()
    useEffect(() => {
        async function getReviews(params) {
            try {
                const reviewDocs = await getDocs(collection(db, `books/${location.state.id}/reviews`))
                console.log(reviewDocs.docs)
                setreviews(reviewDocs.docs?.map(doc => ({ id: doc.id, ...doc.data() })))
            } catch (error) {
                console.log(error)
            }
        }
        setbook({ ...location.state })
        getReviews()
    }, [location])

    return (
        <div className='border min-h-screen p-5 flex flex-col space-y-10'>
            <h3 className='text-xl underline underline-offset-4 my-2 font-semibold'>
                Books Details.</h3>
            <Row className="px-5">
                <Col className=''>
                    <img src={book?.imageDownloadUrl} className="w-52 h-52" />
                    {
                        <div className='flex w-full justify-center mt-2 space-x-1'>
                            {
                                Array(5).fill(0).map((item, index) => (
                                    index <= 2
                                        ? (<StarIcon key={index} className='h-7 text-yellow-300'></StarIcon>)
                                        : (<StarIcon key={index} className='h-7'></StarIcon>)
                                ))
                            }
                        </div>
                    }
                </Col>
                <Col xs={8} className=' flex w-full flex-col space-y-4 p-5'>
                    <h1 className='text-xl font-semibold'>{book.title}</h1>
                    <p className='text-base'><span className='font-semibold'>Genre:</span> {book?.genre}</p>
                    <p className='text-base'><span className='font-semibold'>Language:</span> {book?.language}</p>
                    <p className='text-base'><span className='font-semibold'>Edition:</span> {book?.edition}</p>
                    <p className='text-base'><span className='font-semibold'>Number of pages:</span> {book?.numberOfPages}</p>
                    <p className='text-base'><span className='font-semibold'>Volume:</span> {book?.volume}</p>
                </Col>
                <Col xs={8} className=' flex w-full flex-col space-y-4 p-5'>
                    <p className='text-base'><span className='font-semibold'>Author:</span> {book?.authorName}</p>
                    <p className='text-base'><span className='font-semibold'>Email:</span> {book?.author_email}</p>
                    <p className='text-base'><span className='font-semibold'>Author Rating:</span></p>
                    <div className='flex w-full justify-center mt-2 space-x-1'>
                        {
                            Array(5).fill(0).map((item, index) => (
                                index <= 3
                                    ? (<StarIcon key={index} className='h-7 text-yellow-300'></StarIcon>)
                                    : (<StarIcon key={index} className='h-7'></StarIcon>)
                            ))
                        }
                    </div>
                    <Button size='large' className='bg-blue-400' type="primary">
                        <a href={book?.fileDownloadUrl}>Download Book</a></Button>

                </Col>
            </Row>
            <h3 className='mt-10 text-xl underline underline-offset-4 my-2 font-semibold'>
                Books Reviews.</h3>
            <Row className='px-5 w-full'>
                <Col xs={24}>
                    <Reviews reviews={reviews} />
                </Col>
            </Row>
        </div>
    )
}

export default BookDetails