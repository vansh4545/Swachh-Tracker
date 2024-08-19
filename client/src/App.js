import { Route, Routes,Outlet,Navigate,BrowserRouter } from "react-router-dom";
import { Login,Signup,AdminLogin } from "./pages";
import { useState } from "react";
import Home from "./pages/Home";
import Complaints from "./pages/Complaints";
import ComplaintHistory from "./pages/ComplaintHistory.jsx";
import AllRequests from "./pages/AllRequests.jsx";
import { useSelector } from 'react-redux';
const PrivateRoute =({isal,...props})=>{
  return isal ?
  <>
 
  <Outlet/>
  </>
   : <Navigate replace to ='/login'/>
  
}
function App() {
 
  
   
  //console.log(account);
  const [isAuthenticated,isUserAuthenticated] = useState(false);
  const [isAdmin,isAdminUser] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isal] = useState(userInfo.email);
  return (
    
      <BrowserRouter>
        
    <div className="App">
      <Routes>
      <Route path="/login" element={<Login isUserAuthenticated={isUserAuthenticated}/>} />
      <Route path='/adminlogin' element={<AdminLogin  isAdminUser={isAdminUser} isUserAuthenticated={isUserAuthenticated}/>} />
        
      <Route path='/' element={<PrivateRoute isal={isal}/>} >
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