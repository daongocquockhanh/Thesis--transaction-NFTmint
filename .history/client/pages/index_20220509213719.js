import { useContext } from 'react'
import { TwitterContext } from '../context/TwitterContext'
import Sidebar from '../components/Sidebar'
import Feed from '../components/home/Feed'
import Widgets from '../components/Widgets'
import Image from 'next/image'
import metamaskLogo from '../assets/metamask.png'
import errorImg from '../assets/error.png'

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none text-white`,
  content: `max-w-[1400px] w-3/3 flex justify-between`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl font-bold text-center mt-24`,
}

export default function Home() {
  const { appStatus, connectToWallet } = useContext(TwitterContext)
    return (
      <div>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
      </div>
    )
 
}
