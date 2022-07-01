import { Button, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { StarIcon } from "@heroicons/react/solid"
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
const ReviewModal = ({ book, visible, setvisible }) => {
    const { userData } = useSelector(state => state.user)
    const [stars, setstars] = useState(-1)
    const [questions, setquestions] = useState({
        question1: {
            question: "When did you start/finish reading this book?",
            answer: ""
        }, question2: {
            question: "What did you like/dislike about this book?",
            answer: ""
        }, question3: {
            question: "To whom you recommend this book?",
            answer: ""
        }, question4: {
            question: "What other similar books you recommend?",
            answer: ""
        }, question5: {
            question: "How many times you have read the book?",
            answer: ""
        }
    })
    const setEmpty = () => {
        setstars(-1);
        setquestions({
            question1: {
                question: "When did you start/finish reading this book?",
                answer: ""
            }, question2: {
                question: "What did you like/dislike about this book?",
                answer: ""
            }, question3: {
                question: "To whom you recommend this book?",
                answer: ""
            }, question4: {
                question: "What other similar books you recommend?",
                answer: ""
            }, question5: {
                question: "How many times you have read the book?",
                answer: ""
            }
        })
    }
    const okHandler = () => {
        setvisible(false)
    }
    const cancelHandler = () => {
        setEmpty()
        setvisible(false)
    }
    const changeHandler = (e, questionObj) => {
        const newQuestions = { ...questions, [questionObj]: { ...questions[questionObj], answer: e.target.value } }
        setquestions(newQuestions)
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, `books/${book.id}/reviews`), {
                stars,
                questions,
                reviewer_email: userData.email,
                reviewer_name: `${userData.firstName} ${userData.lastName}`,
                timestamp: serverTimestamp()
            })
            setEmpty()
            setvisible(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Modal visible={visible}
                title="Add a review"
                onOk={okHandler} onCancel={cancelHandler}>
                <form className='w-full mx-auto flex flex-col space-y-5'
                    onSubmit={submitHandler}>
                    <div>
                        <label>Rating</label>
                        <div className='flex space-x-1'>
                            {
                                Array(5).fill(0).map((item, index) => (
                                    index <= stars
                                        ? (<StarIcon key={index} onClick={() => setstars(index)} className='h-10 text-yellow-300'></StarIcon>)
                                        : (<StarIcon key={index} onClick={() => setstars(index)} className='h-10'></StarIcon>)
                                ))
                            }
                        </div>

                    </div>

                    <div className='flex w-full space-x-2 justify-between'>
                        <label className='w-1/2'>{questions.question1.question}</label>
                        <Input value={questions.question1.answer} onChange={(e) => changeHandler(e, "question1")} />
                    </div>
                    <div className='flex w-full space-x-2 justify-between'>
                        <label className='w-1/2'>{questions.question2.question}</label>
                        <Input value={questions.question2.answer} onChange={(e) => changeHandler(e, "question2")} />
                    </div>
                    <div className='flex w-full space-x-2 justify-between'>
                        <label className='w-1/2'>{questions.question3.question}</label>
                        <Input value={questions.question3.answer} onChange={(e) => changeHandler(e, "question3")} />
                    </div>
                    <div className='flex w-full space-x-2 justify-between'>
                        <label className='w-1/2'>{questions.question4.question}</label>
                        <Input value={questions.question4.answer} onChange={(e) => changeHandler(e, "question4")} />
                    </div>
                    <div className='flex w-full space-x-2 justify-between'>
                        <label className='w-1/2'>{questions.question5.question}</label>
                        <Input value={questions.question5.answer} onChange={(e) => changeHandler(e, "question5")} />
                    </div>
                    <div>
                        <Button type='primary' htmlType='submit'>
                            Submit Review
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default ReviewModal