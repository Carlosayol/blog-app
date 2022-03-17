import { auth, googleAuthProvider } from "../lib/firebase"

const EnterPage = () => {
  const user = null
  const username = null

  return (
    <main>
      {
        user ?
          !username ? <UsernameForm /> : <SignOutButton />
          :
          <SignInButton />
      }
      <h1>Sign In</h1>
    </main>
  )
}

const SignInButton = () => {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider)
  }
  
  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={'/google.png'} /> Sign In with Google
    </button>
  )
}

const SignOutButton = () => {
  return (
    <button onClick={() => auth.signOut()}>
      <img src={'/google.png'} /> Sign Out
    </button>
  )
}

const UsernameForm = () => {
  return (
    <span>
      Hola
    </span>
  )
  
}


export default EnterPage