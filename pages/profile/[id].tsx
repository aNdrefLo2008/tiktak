import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'

import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { IUser, Video } from '../../types'
import { BASE_URL } from '../../utils/utils'

interface IProps {
    data: {
        user: IUser,
        userVideos: Video[],
        userLikedVideos: Video[],
    }
}

function ProfilePage({ data }: IProps) {
  const [showUserVideos, setShowUserVideos] = useState(true)
  const [videosList, setVideosList] = useState<Video[]>([])

  const { user, userVideos, userLikedVideos } = data;

  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
  const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
  
  useEffect(() => {
    if(showUserVideos) {
        setVideosList(userVideos)
    } else {
        setVideosList(userLikedVideos)
    }
  }, [showUserVideos, userLikedVideos, userVideos])

  return (
    <div className='w-full'>
        <div className='items-center flex gap-6 md:gap-10 mb-4 bg-white w-full'>
            <div className='w-16 h-16 md:w-24 md:24'>
                <Image src={user.image} width={60} height={60} className='rounded-full' alt="user profile" layout='responsive'/>
            </div>

            <div className='flex flex-col justify-center'>
                <p className='justify-center md:text-xl tracking-wider flex gap-1 items-center font-bold text-primary lowercase'>
                    {user.userName.replaceAll(' ', '')} 
                    <GoVerified className='text-blue-400 '/>
                </p>
                <p className='-mb-8 capitalize md:text-xl text-gray-600 text-xs'>
                    {user.userName}
                </p>
            </div>
        </div>

        <div>
            <div className='flex gap-10 mb-10 mt-14 border-b-2 border-gray-200 bg-white w-full'>
                <p onClick={() => setShowUserVideos(true)} className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}>
                    Videos
                </p>
                <p onClick={() => setShowUserVideos(false)} className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}>
                    Liked
                </p>
            </div>

            <div className='flex gap-6 flex-wrap md:justify-start'>
                {videosList.length > 0 ? videosList.map((post: Video, idx: Number) => (
                    <VideoCard post={post} key={idx.toString()}/>
                )) : 
                <NoResults text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}/>}
            </div>
        </div>
    </div>
  )
}

export const getServerSideProps = async ({ params: { id }}: { 
    params: { id:string }
 }) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

    return {
        props: {
            data: res.data
        }
    }
}

export default ProfilePage