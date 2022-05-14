import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { client } from '../lib/client'

export const TwitterContext = createContext()

export const TwitterProvider = ({ children }) => {
    
    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])
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


   

    return (
        <TwitterContext.Provider value={{
            
           
            connectToWallet,
            tweets,
            fetchTweets,
            currentUser,
            //getCurrentUserDetails,
            setAppStatus,
            getProfileImageUrl,
        }}>
            {children}
        </TwitterContext.Provider>
    )
}