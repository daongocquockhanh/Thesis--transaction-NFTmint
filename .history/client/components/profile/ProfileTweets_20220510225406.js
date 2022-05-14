import { useEffect, useContext, useState } from 'react'
import { TwitterContext } from '../../context/TwitterContext'
import Post from '../Post'

const style = {
    wrapper: `no-scrollbar`,
    header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
    headerTitle: `text-xl font-bold`,
}

const tweets = [
    {
        displayName: 'Khanh',
        username: 'dnqkhanh',
        isProfileImageNft: false,
        text: 'Hello',
        avatar: 'https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg'
    }
]

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
                    userName={'dnqkhanh'}
                    text={tweet.text}
                    avatar={tweet.avatar}
                    timestamp={tweet.timestamp}
                    isProfileImageNft={tweet.isProfileImageNft}
                />
            ))}
        </div>
    )
}

export default ProfileTweets