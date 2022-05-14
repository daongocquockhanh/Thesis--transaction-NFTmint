import ProfileHeader from '../components/profile/ProfileHeader'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import ProfileTweets from './../components/profile/ProfileTweets';
const style = {
    wrapper: `flex justify-center h-screen w-screen select-none text-white bg-[#0f0e13]`,
    content: `max-w-[1400px] w-2/3 flex justify-between`,
    mainContent: `flex-[2] border-r border-l border-b  border-[#38444d]`,
}

const profile = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <Sidebar />
                <div className={style.mainContent}>
                    <ProfileHeader />
                    <ProfileTweets />
                </div>
                <Widgets />
            </div>
        </div>
    )
}

export default profile