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

function Feed() {
   

    return (
        <div className={`${style.wrapper}`} >
            <div className={style.header}>
                <div className={style.headerTitle}>Home</div>
                <BsStars />
            </div>
        </div>
    )
}

export default Feed