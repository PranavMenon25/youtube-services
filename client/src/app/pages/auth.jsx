"use client"
import React from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'

const signInWithGoogle = () => {
    signIn('google')
}

const signOutUser = () => {
    signOut()
}

const AuthPage = () => {
  const {data} = useSession();
  console.log("the data is : ", data);
  return (
    <div>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
        <button onClick={signOutUser}>Sign out</button>
    </div>
  )
}

export default AuthPage