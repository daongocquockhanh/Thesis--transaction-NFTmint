import { useState } from 'react'
import { BsCardImage, BsEmojiSmile } from 'react-icons/bs'
import { RiFileGifLine, RiBarChartHorizontalFill } from 'react-icons/ri'
import { IoMdCalendar } from 'react-icons/io'
import { MdOutlineLocationOn } from 'react-icons/md'
import { client } from '../../lib/client'
import { useContext } from 'react'
import { TwitterContext } from '../../context/TwitterContext'

const style = {
    wrapper: `px-5 flex flex-row  border-2 border-[#38444d] pb-5`,
    tweetBoxLeft: `mr-5`,
    tweetBoxRight: `flex-1`,
    profileImage: `height-12 w-12 rounded-full`,
    inputField: `w-full h-full outline-none bg-transparent text-lg`,
    formLowerContainer: `flex`,
    iconsContainer: `text-[#1d9bf0] flex flex-1 items-center`,
    icon: `mr-2`,
    submitGeneral: `px-7 py-2 rounded-3xl font-bold`,
    inactiveSubmit: `bg-[#196195] text-[#95999e]`,
    activeSubmit: `bg-[#1d9bf0] text-white`,
}

const TweetBox = () => {
    const [tweetMessage, setTweetMessage] = useState('')
    const { currentAccount, fetchTweets, currentUser } = useContext(TwitterContext)

    const postTweet = (event) =>{
        event.preventDefault()

        if (!tweetMessage) return
        const tweetId = `${currentAccount}_${Date.now()}`

        const tweetDoc = {
            _type: 'tweets',
            _id: tweetId,
            tweet: tweetMessage,
            timestamp: new Date(Date.now()).toISOString(),
            author: {
                _key: tweetId,
                _ref: currentAccount,
                _type: 'reference',
            },
        }
        await client.createIfNotExists(tweetDoc)

        await client
            .patch(currentAccount)
            .setIfMissing({ tweets: [] })
            .insert('after', 'tweets[-1]', [
                {
                    _key: tweetId,
                    _ref: tweetId,
                    _type: 'reference',
                },
            ])
            .commit()

        await fetchTweets()
        setTweetMessage('')
    }
    
    return (
        <div className={style.wrapper}>
            <div className={style.tweetBoxLeft}>
                <img
                    src='https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg'
                    alt="profile image"
                    className={
                         style.profileImage
                    }
                />
            </div>
            <div className={style.tweetBoxRight}>
                <form>
                    <textarea
                        className={style.inputField}
                        placeholder="What's happening?"
                        value={tweetMessage}
                        onChange={(e) => setTweetMessage(e.target.value)}
                    />
                    <div className={style.formLowerContainer}>
                        <div className={style.iconsContainer}>
                            <BsCardImage className={style.icon} />
                            <RiFileGifLine className={style.icon} />
                            <RiBarChartHorizontalFill className={style.icon} />
                            <BsEmojiSmile className={style.icon} />
                            <IoMdCalendar className={style.icon} />
                            <MdOutlineLocationOn className={style.icon} />
                        </div>
                        <button
                            type='submit'
                            onClick={event => postTweet(event)}
                            disabled={!tweetMessage}
                            className={`${style.submitGeneral} ${tweetMessage ? style.activeSubmit : style.inactiveSubmit
                                }`}
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TweetBox