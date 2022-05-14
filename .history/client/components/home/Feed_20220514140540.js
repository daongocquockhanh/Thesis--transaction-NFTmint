import { BsStars } from 'react-icons/bs'
import TweetBox from './TweetBox'
import Post from '../Post'
import { useContext } from 'react'
import { TwitterContext } from '../../context/TwitterContext'

const style = {
    wrapper: `flex-[2]  border-[#38444d] text-white 
    background-color: #0f0e13;
        background-image:
            radial-gradient(at 0% 0%, hsla(253, 16%, 7%, 1) 0, transparent 50%),
            radial-gradient(at 50% 0%, hsla(225, 39%, 30%, 1) 0, transparent 50%),
            radial-gradient(at 100% 0%, hsla(339, 49%, 30%, 1) 0, transparent 50%); `,
    header: ` top-0  z-10 p-4 flex justify-between items-center`,
    headerTitle: `text-xl font-bold `,
    
}



function Feed() {
    const { tweets } = useContext(TwitterContext)

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
                        displayName={tweet.author.name === 'Unnamed'
                            ? `${tweet.author.walletAddress.slice(
                                0,
                                4,
                            )}...${tweet.author.walletAddress.slice(41)}`
                            : tweet.author.name}
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