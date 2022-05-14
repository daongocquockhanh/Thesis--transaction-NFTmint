import { TwitterContext } from '../context/TwitterContext'
import Link from 'next/link'
import SidebarOption from './SidebarOption'
import { useState, useContext } from 'react'
import { RiHomeSmileFill, RiHomeSmileLine } from 'react-icons/ri'
import { RiHandHeartFill, RiHandHeartLine } from 'react-icons/ri'
import { RiWechat2Fill, RiWechat2Line } from 'react-icons/ri'
import { RiNotification4Fill, RiNotification4Line } from 'react-icons/ri'
import { FiBell, FiMoreHorizontal } from 'react-icons/fi'
import { FaRegListAlt, FaHashtag, FaBell } from 'react-icons/fa'
import { CgMoreO } from 'react-icons/cg'
import { RiFileList2Fill } from 'react-icons/ri'
import { BsBookmark, BsBookmarkFill, BsPerson, BsPersonFill } from 'react-icons/bs'
import { GiAbstract016 } from 'react-icons/gi'
import { useRouter } from 'next/router'


const style = {
    wrapper: `flex-[0.86] px-8 flex flex-col text-white`,
    IconContainer: `text-5xl m-8`,
    tweetButton: `bg-[#faebd7] hover:bg-[#f5f5dc] flex items-center justify-center font-italic rounded h-[40px] mt-[10px] cursor-pointer text-black `,
    navContainer: `flex-1`,
    profileButton: `flex items-center mb-6 cursor-pointer hover:bg-[#333c45] rounded-[100px] p-2`,
    profileLeft: `flex item-center justify-center mr-4`,
    profileImage: `height-12 w-12 rounded-full`,
    profileRight: `flex-1 flex`,
    details: `flex-1`,
    name: `text-lg`,
    handle: `text-[#008080]`,
    moreContainer: `flex items-center mr-2`,
}

function Sidebar({ initialSelectedIcon = 'Home' }) {
    const [selected, setSelected] = useState(initialSelectedIcon)
    const { currentAccount, currentUser } = useContext(TwitterContext)
    const router = useRouter()

    return (

        <div className={style.wrapper}>
            <div className={style.IconContainer}>
                <GiAbstract016 />
            </div>
            <div className={style.navContainer}>
                <SidebarOption
                    Icon={selected === 'Home' ? RiHomeSmileFill : RiHomeSmileLine}
                    text='Home'
                    isActive={Boolean(selected === 'Home')}
                    setSelected={setSelected}
                    redirect={'/'}
                />
                <SidebarOption
                    Icon={selected === 'Community' ? RiHandHeartFill : RiHandHeartLine}
                    text='Community'
                    isActive={Boolean(selected === 'Community')}
                    setSelected={setSelected}
                />
                <SidebarOption
                    Icon={selected === 'Notifications' ? RiNotification4Fill : RiNotification4Line}
                    text='Notifications'
                    isActive={Boolean(selected === 'Notifications')}
                    setSelected={setSelected}
                />
                <SidebarOption
                    Icon={selected === 'Messages' ? RiWechat2Fill : RiWechat2Line}
                    text='Messages'
                    isActive={Boolean(selected === 'Messages')}
                    setSelected={setSelected}
                />
                <SidebarOption
                    Icon={selected === 'Bookmarks' ? BsBookmarkFill : BsBookmark}
                    text='Bookmarks'
                    isActive={Boolean(selected === 'Bookmarks')}
                    setSelected={setSelected}
                />
                <SidebarOption
                    Icon={selected === 'Lists' ? RiFileList2Fill : FaRegListAlt}
                    text='Lists'
                    isActive={Boolean(selected === 'Lists')}
                    setSelected={setSelected}
                />
                <SidebarOption
                    Icon={selected === 'Profile' ? BsPersonFill : BsPerson}
                    text='Profile'
                    isActive={Boolean(selected === 'Profile')}
                    setSelected={setSelected}
                    redirect={'/profile'}
                />
                <SidebarOption Icon={CgMoreO} text='More' setSelected={setSelected} />
                <div
                    onClick={() =>
                        router.push(`${router.pathname}/?mint=${currentAccount}`)
                    }
                    className={style.tweetButton}
                >
                    Mint
                </div>
            </div>
            <div className={style.profileButton}>
                <div className={style.profileLeft}>
                    <img
                        src={currentUser.profileImage}
                        alt='profile'
                        className={
                            currentUser.isProfileImageNft
                                ? `${style.profileImage} smallHex`
                                : style.profileImage
                        }
                    />
                </div>
                <div className={style.profileRight}>
                    <div className={style.details}>
                        <div className={style.name}>{currentUser.name}</div>
                        <div className={style.handle}>@{currentAccount.slice(0, 6)}...{currentAccount.slice(39)}</div>
                    </div>
                    <div className={style.moreContainer}>
                        <FiMoreHorizontal />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar