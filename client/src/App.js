import { Route, Routes,Outlet,Navigate,BrowserRouter } from "react-router-dom";
import { Login,Signup,AdminLogin } from "./pages";
import { useState,useEffect } from "react";
import Home from "./pages/Home";
import Complaints from "./pages/Complaints";
import ComplaintHistory from "./pages/ComplaintHistory.jsx";
import AllRequests from "./pages/AllRequests.jsx";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from './redux/userSlice';
const PrivateRoute =({isAuthenticated,...props})=>{
  return isAuthenticated ?
  <>
 
  <Outlet/>
  </>
   : <Navigate replace to ='/login'/>
  
}
function App() {
 
  
   
  //console.log(account);
  //const [isAuthenticated,isUserAuthenticated] = useState(false);
  const [isAdmin,isAdminUser] = useState(false);
  
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear user state on page reload
    window.addEventListener('beforeunload', () => {
      dispatch(logout());
    });

    // Cleanup listener
    return () => {
      window.removeEventListener('beforeunload', () => {
        dispatch(logout());
      });
    };
  }, [dispatch]);
  return (
    
      <BrowserRouter>
        
    <div className="App">
      <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path='/adminlogin' element={<AdminLogin  isAdminUser={isAdminUser} />} />
        
      <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
          <Route path='/' element={<Home isAdmin= {isAdmin}/>}/>
        </Route>

       

        
        <Route path="/signup" element={<Signup />} />
        
             <Route path="/request" element={<Complaints  />} />
       
       
            <Route path="/request/history" element={<ComplaintHistory />} />
       

         <Route path="/request/all" element={<AllRequests />} />
      </Routes>
    </div>
     </BrowserRouter>
    
  );
  
}

export default App;