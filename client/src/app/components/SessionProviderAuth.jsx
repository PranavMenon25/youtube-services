"use client"
import {SessionProvider} from 'next-auth/react'

const SessionProviderAuth = ({children}) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default SessionProviderAuth;