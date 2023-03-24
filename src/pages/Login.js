import React, { useEffect } from 'react'

import loginStore from '../stores/loginStore';





const Login = () => {

  
  const store = loginStore();
  

  return (
    <div>

      <form onSubmit={store.loginSubmit}>
        <input onChange={store.updateLoginFormFileldChange} value={store.formData.email} type="email" name="email"></input>
        <input onChange={store.updateLoginFormFileldChange} value={store.formData.password} type="password" name="password"></input>
        <button type="submit">login</button>
        </form>  
    </div>
  )
}

export default Login