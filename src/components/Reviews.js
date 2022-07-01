import { StarIcon, TrashIcon } from '@heroicons/react/solid'
import { Collapse, List } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Reviews = ({ reviews }) => {
    const { userData } = useSelector(state => state.user)
    useEffect(() => {
    }, [userData])

    return (
        <div className='w-1/2' >

            <List
                bordered={true}
                dataSource={reviews}
                renderItem={(item) => (
                    <List.Item key={item.id}>

                        <div className='flex flex-col'>
                            <div className='flex space-x-4'>
                                <img src={item?.authorImage} className="h-10 w-10 rounded-full" />
                                <div>
                                    <p className='text-sm'>{item?.reviewer_name}</p>
                                    <p className='text-xs'>{item?.reviewer_email}</p>
                                </div>

                            </div>
                            <div className='px-14 flex space-x-1'>
                                {
                                    Array(5).fill(0).map((item, index) => (
                                        index <= 3
                                            ? (<StarIcon key={index} className='h-4 text-yellow-300'></StarIcon>)
                                            : (<StarIcon key={index} className='h-4'></StarIcon>)
                                    ))
                                }
                            </div>
                            <div className='mt-2'>
                                <Collapse accordion>
                                    {
                                        Object.keys(item?.questions).map((question, index) => (
                                            <Collapse.Panel key={index} header={item.questions[question].question} extra={item.reviewer_email === userData.email && <TrashIcon className='text-red-500 h-6' />}>
                                                <p>{item.questions[question].answer}</p>
                                            </Collapse.Panel>
                                        ))
                                    }
                                </Collapse>
                            </div>
                        </div>
                    </List.Item>
                )}
            />
        </div>

    )
}

export default Reviews