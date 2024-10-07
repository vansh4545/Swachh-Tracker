import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import toast functions
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Login = ({ isUserAuthenticated }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "test@gmail.com",
    password: "test1234",
  });
  const [loading, setLoading] = useState(false); // New loading state

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) => {
    toast.error(err); // Show error toast
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when request starts
    try {
      const { data } = await axios.post(
        "https://swachh-backend.onrender.com/login",
        {
          ...inputValue,
        }
      );

      const { user, accesstoken, success, message } = data;

      if (success) {
        sessionStorage.setItem("userInfo", JSON.stringify(user));
        sessionStorage.setItem("accesstoken", `Bearer ${data.accesstoken}`);
        isUserAuthenticated(true);

        toast.success(message, { // Show success toast
          position: "top-right", // Position at top-right
          autoClose: 3000, // Auto close after 3 seconds
          hideProgressBar: true, // Hide progress bar
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          icon: "✅", // Add a green checkmark as the icon
        });
        
        setTimeout(() => {
          navigate("/home");
        }, 2000); // Navigate after showing the toast for a couple of seconds
      } else {
        toast.error(message, { // Show error toast
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false); // Stop loading once the response is received
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
            disabled={loading} // Disable input while loading
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
            disabled={loading} // Disable input while loading
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "User login"} {/* Show loading text */}
        </button>
        <span>
          Don't have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      <Link className="lnk" to={"/adminlogin"}>Admin Login</Link>
      <ToastContainer /> {/* Toast container for rendering toasts */}
    </div>
  );
};

export default Login;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import Loader from './Loader'; // Assuming you have a Loader component

// const Login = ({ isUserAuthenticated }) => {
//   const navigate = useNavigate();
//   const [inputValue, setInputValue] = useState({
//     email: "test@gmail.com",
//     password: "test1234",
//   });
//   const [loading, setLoading] = useState(false); // New loading state

//   const { email, password } = inputValue;

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setInputValue({
//       ...inputValue,
//       [name]: value,
//     });
//   };

//   const handleError = (err) => {
//     alert(err);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading to true when request starts
//     try {
//       const { data } = await axios.post(
//         "https://swachh-backend.onrender.com/login",
//         {
//           ...inputValue,
//         }
//       );

//       const { user, accesstoken, success, message } = data;

//       if (success) {
//         sessionStorage.setItem("userInfo", JSON.stringify(user));
//         sessionStorage.setItem("accesstoken", `Bearer ${data.accesstoken}`);
//         isUserAuthenticated(true);

//         alert(message);
//         navigate("/home");
//       } else {
//         alert(message);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false); // Stop loading once the response is received
//     }

//     setInputValue({
//       ...inputValue,
//       email: "",
//       password: "",
//     });
//   };

//   return (
//     <div className="form_container">
//       <h2>Login Account</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={email}
//             placeholder="Enter your email"
//             onChange={handleOnChange}
//             disabled={loading} // Disable input while loading
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={password}
//             placeholder="Enter your password"
//             onChange={handleOnChange}
//             disabled={loading} // Disable input while loading
//           />
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? "Loading..." : "User login"} {/* Show loading text */}
//         </button>
//         <span>
//           Don't have an account? <Link to={"/signup"}>Signup</Link>
//         </span>
//       </form>
//       <Link className="lnk" to={"/adminlogin"}>Admin Login</Link>
//       <ToastContainer />

//       {/* {loading && <Loader />}Display Loader component if loading is true */}
//     </div>
//   );
// };

// export default Login;

