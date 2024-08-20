import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Api from "../axiosConfig";
import { AuthContext } from "../context/auth.context";

const Login = () => {
  const { state, dispatch } = useContext(AuthContext);

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
    // api call to backend
    try {
      if (userData.email && userData.password) {
        const response = await Api.post("/auth/login", { userData });
        // const response = {
        //   data: {
        //     success: true,
        //     message: "Login successfull.",
        //     userData: { name: "Awdiz" },
        //   },
        // };
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
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Email : </label>
        <br />
        <input
          type="email"
          onChange={handleChange}
          name="email"
          value={userData.email}
        />
        <br />
        <label>Password : </label>
        <br />
        <input
          type="password"
          onChange={handleChange}
          name="password"
          value={userData.password}
        />
        <br />
        <input type="submit" value="Login" />
        <br />
      </form>
      <button onClick={() => router("/register")}>Register ?</button>
      <button onClick={() => router("/register-admin")}>
        Admin Register ?
      </button>
      <button onClick={() => router("/login-admin")}>Admin Login ?</button>
    </div>
  );
};

export default Login;