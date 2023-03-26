

import React, { useEffect } from 'react'
import loginStore from '../stores/loginStore'


const RequireAuth = (props) => {

    const store = loginStore();
    
    console.log(store.loggedIn)
    // console.log(store)

    if(!store.loggedIn){
        return <div>please login...</div>
    }else{return (
      <div>{props.children}</div>
    )}

  
}

export default RequireAuth