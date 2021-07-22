import React from "react";
import {useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  // if (!currentUser) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.data.firstName} {currentUser.data.lastName}</strong>
        </h3>
       <Link to={"/edit/1"}>Edit</Link>
      </header>

      {/* <p>
        <strong>Token:</strong> {currentUser.data.token.substring(0, 20)} ...{" "}
        {currentUser.data.token.substr(currentUser.data.token.length - 20)}
      </p> */}
     
      <p>
        <strong>Email:</strong> {currentUser.data.userData.email}
      </p>
      {/* <strong>Authorities:</strong>
      <ul>
        {currentUser.data.role &&
          currentUser.data.role.map((roles, index) => <li key={index}>{roles}</li>)}
      </ul> */}
    </div>
  );
};

export default Profile;