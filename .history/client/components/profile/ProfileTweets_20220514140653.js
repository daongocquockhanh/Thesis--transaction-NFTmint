import { useEffect, useContext, useState } from 'react'
import { TwitterContext } from '../../context/TwitterContext'
import Post from '../Post'

const style = {
    wrapper: `no-scrollbar background-color: #0f0e13;
        background-image:
            radial-gradient(at 0% 0%, hsla(253, 16%, 7%, 1) 0, transparent 50%),
            radial-gradient(at 50% 0%, hsla(225, 39%, 30%, 1) 0, transparent 50%),
            radial-gradient(at 100% 0%, hsla(339, 49%, 30%, 1) 0, transparent 50%);`,
    header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
    headerTitle: `text-xl font-bold`,
}



const ProfileTweets = () => {
    const { currentUser, currentAccount } = useContext(TwitterContext)

    return (
        <div className={style.wrapper}>
            {currentUser.tweets?.map((tweet, index) => (
                <Post
                    key={index}
                    displayName={currentUser.name === 'Unnamed'
                        ? `${currentUser.walletAddress.slice(
                            0,
                            4,
                        )}...${currentUser.walletAddress.slice(41)}`
                        : currentUser.name}
                    userName={`${currentUser.walletAddress.slice(
                        0,
                        4,
                    )}...${currentUser.walletAddress.slice(41)}`}
                    text={tweet.tweet}
                    avatar={currentUser.profileImage}
                    timestamp={tweet.timestamp}
                    isProfileImageNft={currentUser.isProfileImageNft}
                />
            ))}
        </div>
    )
}

export default ProfileTweets