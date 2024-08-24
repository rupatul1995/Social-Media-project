import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post("/api/users/login", { email, password });
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    console.log("Login error: ", error);
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: "LOGOUT" });
};