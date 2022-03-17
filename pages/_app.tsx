import Navbar from '../components/Navbar'
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { UserContext } from '../lib/context'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useState } from 'react'
import { firestore } from '../lib/firebase'
import { useUserData } from '../lib/hooks'

function MyApp({ Component, pageProps }) {
  const userData = useUserData()
  
  return (
    <UserContext.Provider value={{ user: {}, username: 'jeff' }} >
      <Navbar />
      <Component {...pageProps} />
      <Toaster/>
    </UserContext.Provider>
  )
}

export default MyApp
