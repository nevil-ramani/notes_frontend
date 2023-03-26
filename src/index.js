import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RequireAuth from './components/RequireAuth';
import Login from './pages/Login';
// import App from './components/App';
import NotesPage from './pages/NotesPage';
import Signup from './pages/Signup';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <>

<BrowserRouter>


    <ul>
      <li>
        <Link to ="/">Home</Link>
      </li>
      <li>
        <Link to ="/signup">Sign UP</Link>
      </li>
      <li>
        <Link to ="/login">Login</Link>
      </li>
    </ul>
      <Routes>
        
          <Route index element={<RequireAuth> <NotesPage /> </RequireAuth>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
         
      </Routes>
    </BrowserRouter>


   {/* <App /> */}
   {/* <NotesPage />
   <Login />
   <Signup /> */}
 </>
  
    
 
);

