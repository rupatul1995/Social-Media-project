import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import Api from "../axiosConfig";
import toast from "react-hot-toast";
import "../style/login.css";

const Login = () => {
  const { state, dispatch } = useContext(AuthContext);
console.log(state, "state");
  const router = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  console.log(userData, "userData");
  function handleChange(event) {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (userData.email && userData.password) {
        const response = await Api.post("/auth/login", { userData });
       
        if (response.data.success) {
          dispatch({ type: "LOGIN", payload: response.data.userData });
    
          setUserData({
            email: "",
            password: "",
          });
          router("/");
          toast.success(response.data.message);
        } else {
          toast.error(response?.data?.error);
        }
      } else {
        throw Error("All fields are mandatory.");
      
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error?.response?.data?.error);
    }
  }

  return (
    <div className="loginmaindiv">
      <form onSubmit={handleSubmit}>
      <h1 className="titlelogin">Instagram</h1>
 
        <br />
        <input
        className="inputslogin"
          type="email"
          onChange={handleChange}
          name="email"
          value={userData.email}
           placeholder="Email"
        />
        
        <br />
        <input
        className="inputslogin"
          type="password"
          onChange={handleChange}
          name="password"
          value={userData.password}
           placeholder="password"
        />
        <br />
        <input type="submit" value="Login" className="Singupforlogin"/>
        <br />
      </form>
      <div className="registertext">
         <p> Don't have an account? </p>
       <button className="registertext1" onClick={() => router("/register")}>Sign up</button>

       </div>
            <p className="forgot-password">Forgot Password?</p>
    </div>


    
 
  );
};

export default Login;




