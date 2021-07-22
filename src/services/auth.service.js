import axios from "axios";

const API_URL = "http://18.139.117.203:27011/api/v1/auth/";

// const register = (firstName, lastName , email, password , confirmPassword , role="verifier") => {
//   return axios.post(API_URL + "register", {
//     firstName,
//     lastName,
//     email,
//     password,
//     confirmPassword,
//     role
//   });
// };

const register = (firstName, lastName , email, password , confirmPassword , role="verifier") => {
  
  let obj = 
    {
      "name"  : firstName +''+lastName, 
      "email": email,
      "password":password,
      "confirm_password":confirmPassword,
      "role" : "user"
  }
  
  return axios.post("http://localhost:3333/api/admin/users", obj);
};


const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
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
