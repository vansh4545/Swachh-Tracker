import { Route, Routes,Outlet,Navigate,BrowserRouter } from "react-router-dom";
import { Login,Signup,AdminLogin } from "./pages";
import { useState,useEffect } from "react";
import Home from "./pages/Home";
import Complaints from "./pages/Complaints";
import ComplaintHistory from "./pages/ComplaintHistory.jsx";
import AllRequests from "./pages/AllRequests.jsx";

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
  
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  // useEffect(() => {
  //   // Sync authentication state with sessionStorage
  //   const handleStorageChange = () => {
  //     setIsAuthenticated(sessionStorage.getItem('isAuthenticated') === 'true');
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
      
  //   };
  // }, []);
  return (
    
      <BrowserRouter>
        
    <div className="App">
      <Routes>
      <Route path="/login" element={<Login isUserAuthenticated={isUserAuthenticated}/>} />
      <Route path='/adminlogin' element={<AdminLogin  isAdminUser={isAdminUser} />} />
        
      
          <Route path='/' element={<Home isAdmin= {isAdmin}/>}/>
       

       

        
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