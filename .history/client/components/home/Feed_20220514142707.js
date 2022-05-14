import { BsStars } from 'react-icons/bs'
import TweetBox from './TweetBox'
import Post from '../Post'
import { useContext } from 'react'
import { TwitterContext } from '../../context/TwitterContext'

const style = {
    wrapper: `flex-[2]  border-[#38444d] text-white  `,
    header: ` top-0  z-10 p-4 flex justify-between items-center `,
    headerTitle: `text-xl font-bold text-white `,
    
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