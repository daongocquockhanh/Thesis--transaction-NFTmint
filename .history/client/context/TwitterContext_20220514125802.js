import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { client } from '../lib/client'

export const TwitterContext = createContext()

export const TwitterProvider = ({children}) => {
    const [appStatus, setAppStatus] = useState('loading')
    const [currentAccount, setCurrentAccount] = useState('')
    const [tweets, setTweets] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    const router = useRouter()

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])
    
    useEffect(() => {
        if (!currentAccount && appStatus == 'connected') return
        getCurrentUserDetails(currentAccount)
        fetchTweets()
    }, [currentAccount, appStatus])
    
    
    const checkIfWalletIsConnected = async () => {
        if (!window.ethereum) return setAppStatus('noMetaMask')
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_accounts',
            })
            if (addressArray.length > 0) {
                setAppStatus('connected')
                setCurrentAccount(addressArray[0])
                createUserAccount(addressArray[0])
            } else {
                router.push('/')
                setAppStatus('notConnected')
            }

        } catch (error) {
            setAppStatus('error')
        }
    }

        const connectToWallet = async () => {
            if (!window.ethereum) return setAppStatus('noMetaMask')
            try {
                setAppStatus('loading')

                const addressArray = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                })

                if (addressArray.length > 0) {
                    setAppStatus('connected')
                    setCurrentAccount(addressArray[0])
                    createUserAccount(addressArray[0])
                } else {
                    router.push('/')
                    setAppStatus('notConnected')
                }
            } catch (error) {
                setAppStatus('error')
            }
        }

    const createUserAccount = async (userAddress = currentAccount) => {
        if (!window.ethereum) return setAppStatus('noMetaMask')
        try {
            const userDoc = {
                _type: 'users',
                _id: userAddress,
                name: 'Unnamed',
                isProfileImageNft: false,
                profileImage:
                    'https://www.canva.com/design/DAE4oTMf4-c/cmF8j3PsbdpEGTpKgY_dHg/edit',
                walletAddress: userAddress,
            }

            await client.createIfNotExists(userDoc)

            setAppStatus('connected')
        } catch (error) {
            router.push('/')
            setAppStatus('error')
        }
    }

    const fetchTweets = async () => {
        const query = `
      *[_type == "tweets"]{
        "author": author->{name, walletAddress, profileImage, isProfileImageNft},
        tweet,
        timestamp
      }|order(timestamp desc)
    `

        // setTweets(await client.fetch(query))

        const sanityResponse = await client.fetch(query)

        setTweets([])

        /**
         * Async await not available with for..of loops.
         */
        sanityResponse.forEach(async item => {
           /* const profileImageUrl = await getNftProfileImage(
                item.author.profileImage,
                item.author.isProfileImageNft,
            ) */

            
                const newItem = {
                    tweet: item.tweet,
                    timestamp: item.timestamp,
                    author: {
                        name: item.author.name,
                        walletAddress: item.author.walletAddress,
                        profileImage: item.author.profileImage,
                        isProfileImageNft: item.author.isProfileImageNft,
                    },
                }

                setTweets(prevState => [...prevState, newItem])
           
        })
    }

    const getCurrentUserDetails = async (userAccount = currentAccount) => {
        if (appStatus !== 'connected') return

        const query = `
      *[_type == "users" && _id == "${userAccount}"]{
        "tweets": tweets[]->{timestamp, tweet}|order(timestamp desc),
        name,
        profileImage,
        isProfileImageNft,
        coverImage,
        walletAddress
      }
    `
        const sanityResponse = await client.fetch(query)

        /* const profileImageUri = await getNftProfileImage(
            sanityResponse[0].profileImage,
            sanityResponse[0].isProfileImageNft,
        ) */

        setCurrentUser({
            tweets: sanityResponse[0].tweets,
            name: sanityResponse[0].name,
            profileImage: sanityResponse[0].profileImage,
            walletAddress: sanityResponse[0].walletAddress,
            coverImage: sanityResponse[0].coverImage,
            isProfileImageNft: sanityResponse[0].isProfileImageNft,
        })
    }

    

    return (
        <TwitterContext.Provider 
        value={{ 
        appStatus, 
        currentAccount, 
        connectToWallet,
        fetchTweets,
        tweets,
        currentUser,
        getCurrentUserDetails,}}>
            {children}
        </TwitterContext.Provider>
    )
}