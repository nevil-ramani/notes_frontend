import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/Login';
// import App from './components/App';
import NotesPage from './pages/NotesPage';
import Signup from './pages/Signup';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <>
   {/* <App /> */}
   <NotesPage />
   <Login />
   <Signup />
 </>
  
    
 
);

