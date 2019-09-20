import React from 'react'
import axios from 'axios'

export default () => {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const response = await axios.post(
      `http://${process.env.REACT_APP_BACKEND_HOST}/add`,
      new FormData(event.currentTarget),
      { headers: {'Content-Type': 'multipart/form-data' } }
    )
    console.log(response)
  }
  
  return <div>
    <h1>Signup</h1>
    <p>The project is still in beta.</p>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name"/>
      <br/>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email"/>
      <br/>
      <input type="submit" value="Submit"/>
    </form>
  </div>
}
  