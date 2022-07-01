import { StarIcon } from '@heroicons/react/solid'
import { Card, Row, Col, Button } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import ReviewModal from './ReviewModal'

const BookCards = ({ books }) => {
    const navigate = useNavigate()
    const { userType } = useSelector(state => state.user)
    const [visible, setvisible] = useState(false)
    const [bookData, setbookData] = useState(null)
    function navigateToReviewPage(bookData) {
        navigate(`/books/${bookData.id}`, {
            state: bookData
        })
    }
    return (
        <div>
            <ReviewModal book={bookData} visible={visible} setvisible={setvisible} />
            <Row justify='space-between px-2'>
                <div>{
                    books.map(book => (
                        <Col key={book.id} className="my-4 cursor-pointer" >
                            <Card className=' border transition-transform hover:scale-105 rounded-lg flex flex-col justify-center items-center' size="default"
                                bordered={true} >
                                <img className='w-44 h-44 mx-auto'
                                    onClick={() => navigateToReviewPage(book)} src={book?.imageDownloadUrl} />
                                <h4 className="text-lg font-semibold">
                                    {book.title}
                                </h4>
                                <div className='flex justify-between space-x-2'>
                                    <p className="text-base font-semibold">Language:
                                        <span className='font-semibold text-green-500'>{book?.language}</span></p>
                                    <p className="text-base font-semibold">Genre:
                                        <span className='font-semibold text-green-500'>{book?.genre}</span></p>
                                </div>
                                <div className='flex space-x-1 mt-2'>
                                    {
                                        Array(5).fill(0).map((item, index) => (
                                            index <= 3
                                                ? (<StarIcon key={index} className='h-6 text-yellow-300'></StarIcon>)
                                                : (<StarIcon key={index} className='h-6'></StarIcon>)
                                        ))
                                    }
                                </div>
                                {userType === "User" && (

                                    <div className='flex justify-between mt-4'>
                                        <Button size='small' className='bg-blue-400' type="primary"><a href={book?.fileDownloadUrl}>Download Book</a></Button>
                                        <Button size='small' className='bg-orange-400' type="primary" onClick={() => {
                                            setbookData(book)
                                            setvisible(true)
                                        }}>Leave a Review</Button>
                                    </div>

                                )}

                            </Card>
                        </Col>

                    ))
                }</div>
            </Row>
        </div>
    )
}

export default BookCards