import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import useAuthStore from '../store/authStore'
import NoResults from './NoResults'
import { IUser } from '../types'

interface IProps {
    isPostingComment: Boolean,
    comment: string,
    setComment: Dispatch<SetStateAction<string>>
    addComment: (e: React.FormEvent) => void,
    comments: IComment[]
}

interface IComment {
    comment: string;
    length?: number;
    _key: string;
    postedBy: { _ref: string, _id: string }
}

function Comments({ comment, setComment, addComment, comments, isPostingComment }: IProps) {
  const { userProfile, allUsers } = useAuthStore()  

  return (
    <div className='border-y-2 border-gray-200 bg-[#F8F8F8] lg:pb-0 pb-[100px]'>
        <div className='overflow-scroll lg:h-[475px] ml-6 mt-4'>
            {comments?.length ? (
                comments.map((item, idx) => (
                    <>
                        {allUsers.map((user: IUser) => (
                            user._id === (
                                item.postedBy._id
                                || item.postedBy._ref
                            ) && (
                                <div className='p-2 items-center' key={idx}>
                                    <Link href={`/profile/${user._id}`}>
                                        <div className='flex items-start gap-3 mb-2 cursor-pointer'>
                                            <div className='w-12 h-12'>
                                                <Image src={user.image} width={48} height={48} className='rounded-full' alt="user profile" layout='responsive'/>
                                            </div>

                                            <p className='flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary'>
                                                {user.userName}{' '}
                                                <GoVerified className='text-blue-400' />
                                            </p>

                                        </div>
                                    </Link>

                                    <div>
                                        <p>{item.comment}</p>
                                    </div>
                                </div>
                            )
                        ))}
                    </>
                ))
            ) : (
                <NoResults text="No comments yet!"/>
            )}
        </div>

        {userProfile && (
            <div className='absolute bottom-0 left-0 px-2 pb-6 md:px-10'>
                <form onSubmit={addComment} className="flex gap-4">
                    <input value={comment} onChange={(e) => {setComment(e.target.value)}} placeholder="Add Comment" className='bg-primary px-6 py-4 font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'/>
                    <button onClick={addComment} className='text-gray-400'>
                        {isPostingComment ? 'Commenting...' : 'Comment'}
                    </button>
                </form>
            </div>
        )}
    </div>
  )
}

export default Comments