import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Api from "../axiosConfig";
import "../style/Register.css";



const Register = () => {
  const router = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    username:"",
  });

  console.log(userData, "userData");
  function handleChange(event) {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (userData.name && userData.email && userData.password && userData.username ) {
        const response = await Api.post("/auth/register", { userData });
        if (response.data.success) {
          setUserData({
            name: "",
            email: "",
            password: "",
            username:"",
          });
          router("/login");
          toast.success(response.data.message);
        }
      } else {
        throw Error("All fields are mandatory.");
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error.response.data.error);
    }
  }

 
  return (
    <div className="maindiv">
      <form onSubmit={handleSubmit}>
       
       <h1 className="titlediv">Instagram</h1>
       <p className="seetext">Sign up to see photos and videos from your friends. </p>

       <br />
       <input className="inputs"
          type="text"
          onChange={handleChange}
          name="name"
          value={userData.name}
          placeholder="Full Name"
        />
    
        <br />
        <input className="inputs"
          type="text"
          onChange={handleChange}
          name="username"
          value={userData.username}
          placeholder="Username"
        />
        <br />
        <input
          className="inputs"
          type="email"
          onChange={handleChange}
          name="email"
          value={userData.email}
          placeholder="Email"
        />
        <br />

        <input
          className="inputs"
          type="password"
          onChange={handleChange}
          name="password"
          value={userData.password}
          placeholder="Password"
        />
        <br />
       
        <input type="submit" value="Sign up" className="Singup"/>
        <br />
        <p className="people">People who use our service may have uploaded your contact information to Instagram. Learn More</p>
         
         <div className="logintext">
         <p>Have an account? </p>
         <button className="logintext1" onClick={() => router("/login")}>Log in</button>
         </div>
      </form>
    </div>
  );
};

export default Register;