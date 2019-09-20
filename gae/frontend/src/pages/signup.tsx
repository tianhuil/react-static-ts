import React from 'react'
import axios from 'axios'

export default () => {
  const nameEl = React.useRef(null)
  const emailEl = React.useRef(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const email = emailEl.current.value
    const name = nameEl.current.value
    const response = await axios.post(
      `http://${process.env.REACT_APP_BACKEND_HOST}/add`,
      {email, name},
    )
    console.log(response)
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
  