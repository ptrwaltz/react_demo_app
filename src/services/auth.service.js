import axios from "axios";

const API_URL = "http://18.139.117.203:27011/api/v1/auth/";

const register = (firstName, lastName , email, password , confirmPassword , role="verifier") => {
  return axios.post(API_URL + "register", {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    role
  });
};

const login = (email, password) => {
  return axios
    .post("http://localhost:3333/api/auth/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
