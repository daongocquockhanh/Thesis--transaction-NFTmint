import { createContext, useEffect, useState } from 'react';

export const TwitterContext = createContext()


export const TwitterProvider = ({children}) => {

    return(
        <TwitterContext.Provider value = {{}}>
            {children}
        </TwitterContext.Provider>
    )
}