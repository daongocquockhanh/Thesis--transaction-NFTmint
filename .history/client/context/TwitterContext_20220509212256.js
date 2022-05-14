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
        
    }


   

    return (
        <TwitterContext.Provider value={{
            
           
            
           
           
           
        }}>
            {children}
        </TwitterContext.Provider>
    )
}