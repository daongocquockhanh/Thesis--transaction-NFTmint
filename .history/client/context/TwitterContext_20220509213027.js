import { createContext, useEffect, useState } from 'react';

export const TwitterContext = createContext()


export const TwitterProvider = ({children}) => {
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
        } catch (err) {
            router.push('/')
            setAppStatus('error')
        }
    }

    return(
        <TwitterContext.Provider value = {{}}>
            {children}
        </TwitterContext.Provider>
    )
}