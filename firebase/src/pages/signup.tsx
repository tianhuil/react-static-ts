import React from 'react'
import firebase from 'firebase'

const firebaseConfig = {
  // go to https://console.firebase.google.com/u/0/project/react-static-ts/overview
  // click on the app -> settings
  // and copy the javascript snippet
};
firebase.initializeApp(firebaseConfig)

export default () => {
  const nameEl = React.useRef(null)
  const emailEl = React.useRef(null)

  const db = firebase.firestore()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const email = emailEl.current.value
    const name = nameEl.current.value

    db.collection('signups').doc(email).set({
      name,
      email,
    })
    console.log({name, email})
  }

  return <div>
    <h1>Signup</h1>
    <p>The project is still in beta.</p>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" ref={nameEl}/>
      <br/>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" ref={emailEl}/>
      <br/>
      <input type="submit" value="Submit"/>
    </form>
  </div>
}
