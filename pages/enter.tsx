import debounce from "lodash.debounce"
import { useCallback, useContext, useEffect, useState } from "react"
import { UserContext } from "../lib/context"
import { auth, firestore, googleAuthProvider } from "../lib/firebase"

const EnterPage = () => {
  const { user, username } = useContext(UserContext)

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
  const [formValue, setFormValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)

  const { user, username } = useContext(UserContext)

  useEffect(() => {
    checkUsername(formValue)
  }, [formValue])

  const onChange = (e) => {
    const val: string = e.target.value.toLowerCase()
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    
    if (val.length < 3) {
      setFormValue(val)
      setLoading(false)
      setIsValid(false)
    }

    if (re.test(val)) {
      setFormValue(val)
      setLoading(true)
      setIsValid(false)
    }
  }

  const checkUsername = useCallback(debounce(async (username: string) => {
    if (username.length >= 3) {
      const ref = firestore.doc(`usernames/${username}`)
      const { exists } = await ref.get()
      console.log('Firestore read')
      setIsValid(!exists)
      setLoading(false)
    }
  }, 500)
  , [])
  
  const onSubmit = async (e) => {
    e.preventDefault()

    const userDoc = firestore.doc(`users/${user.uid}`)
    const usernameDoc = firestore.doc(`usernames/${formValue}`)

    const batch = firestore.batch()
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName })
    batch.set(usernameDoc, { uid: user.uid })

    await batch.commit()
  }

  const UsernameMessage = ({ username, isValid, loading }) => {
    if (loading) {
      return <p>Checking...</p>;
    } else if (isValid) {
      return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
      return <p className="text-danger">That username is taken!</p>;
    } else {
      return <p></p>;
    }
  }

  return (
    !username && (
      <section>
        <h3>Enter Username</h3>
        <form onSubmit={onSubmit}>
          <input name="username" placeholder="username" value={formValue} onChange={onChange} />
          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>
          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  )
  
}


export default EnterPage