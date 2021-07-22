import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3333/api/admin/";

const getAllUser = () => {
  return axios.get(API_URL + 'users?page=1&perPage=10&searchData={"is_active":"","email":"","name":"","is_email_verified":"","created_at":"","allRecords":"true"}',
    {
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
        'Authorization': "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYyNjg3OTUwNSwiZXhwIjoxNjI5NDcxNTA1fQ.qL9C0pppAPGl4xy3tZ737y2Mg85e2adC9GnTkQT9g1c',
      }
    });
};

const getUser = () => {    
    return axios.get(API_URL + "account_settings", { headers: authHeader() });
  };

const updateProfile = (firstName, lastName) => {
  const body = {
    "first_name": firstName,
    "last_name": lastName,
    "user_name": "100X232323",
    "mobile_no": "9876543210",
    "bio": "Best User",
    "presence": 1
  };
  return axios.put(API_URL + "account_settings", JSON.stringify(body), {
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json",
      'Authorization': "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYyNjg3OTUwNSwiZXhwIjoxNjI5NDcxNTA1fQ.qL9C0pppAPGl4xy3tZ737y2Mg85e2adC9GnTkQT9g1c',
    }
  });
  };

  export default {
    getAllUser,
    getUser,
    updateProfile
  };