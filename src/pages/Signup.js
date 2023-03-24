import React, { useEffect } from 'react'

import signupStore from '../stores/signupStore';


const Signup = () => {

  
  const store = signupStore();
  

  return (
    <div>

      <form onSubmit={store.signupSubmit}>
        <input onChange={store.updateSignupStoreFormFileldChange} value={store.formData.email} type="email" name="email"></input>
        <input onChange={store.updateSignupStoreFormFileldChange} value={store.formData.password} type="password" name="password"></input>
        <button type="submit">Sign Up</button>
        </form>  
    </div>
  )
}

export default Signup