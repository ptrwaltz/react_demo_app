import React, { useState, useEffect } from "react";
import userService from "../services/user.service";
import Footer from "./Layout/Footer";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    userService.getUser().then(
      (response) => {
        console.log(response);
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Home</h3>
      </header>
      
      <Footer/>
      

    </div>

  );
};

export default Home;