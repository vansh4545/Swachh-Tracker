import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


import { ToastContainer, toast } from "react-toastify";
const AdminLogin = ({isAdminUser}) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
 
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) => {
    alert(err)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data}  = await axios.post(
        "https://swachh-backend.onrender.com/login",
        {
          ...inputValue,
        }
        
      );
       isAdminUser(true);
       sessionStorage.setItem('accesstoken', `Bearer ${data.accesstoken}`);
      
      const { user,accesstoken,success, message } = data;
      if (success) {
        
        alert("Admin Logged in successfully")
        navigate("/");
      } else {
        alert(message)
        
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Admin login</button>
        <span>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
     
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
