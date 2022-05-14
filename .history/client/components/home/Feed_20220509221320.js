import { BsStars } from 'react-icons/bs'
import TweetBox from './TweetBox'
import Post from '../Post'
import { useContext } from 'react'
import { TwitterContext } from '../../context/TwitterContext'

const style = {
    wrapper: `flex-[2]  border-[#38444d]  `,
    header: ` top-0  z-10 p-4 flex justify-between items-center`,
    headerTitle: `text-xl font-bold `,
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

function Feed() {
   

    return (
        <div className={`${style.wrapper}`} >
            <div className={style.header}>
                <div className={style.headerTitle}>Home</div>
                <BsStars />
            </div>

            <TweetBox />
            {
                tweets.map((tweet, index) => (
                    <Post
                        key={index}
                        displayName={
                            tweet.author.name === 'Unnamed'
                                ? `${tweet.author.walletAddress.slice(
                                    0,
                                    4,
                                )}...${tweet.author.walletAddress.slice(41)}`
                                : tweet.author.name
                        }
                        userName={`${tweet.author.walletAddress.slice(
                            0,
                            4,
                        )}...${tweet.author.walletAddress.slice(41)}`}
                        text={tweet.tweet}
                        avatar={tweet.author.profileImage}
                        isProfileImageNft={tweet.author.isProfileImageNft}
                        timestamp={tweet.timestamp}
                    />
                )) 
            }
        </div>
    )
}

export default Feed