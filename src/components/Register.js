import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../actions/auth";
import alertService from "../services/alert.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vfirstname = (value ) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be between 4 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  let regPassword = /((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,8})/;
  if(!regPassword.test(value)){
    return (
      <div className="alert alert-danger" role="alert">
        The password must be 8 characters including 1 uppercase letter, 1 special character, alphanumeric characters.
      </div>
    );
  }
};


const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangeFirstname = (e) => {
    const firstname = e.target.value;
    setFirstname(firstname);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeLastname =(e)=>{
    const lastname=e.target.value;
    setLastname(lastname);
  }

  const onChangeConfirmPassword= (e)=>{
    const confirmPassword=e.target.value;
    setConfirmPassword(confirmPassword);
  }

 

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(firstname,lastname, email, password, confirmPassword ))
        .then(() => {
          setSuccessful(true);
          alertService.showSuccess("User register successfully")
          props.history.push("/login");
        })
        .catch(() => {
          alertService.showError(message)
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="firtname">Firstname</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={firstname}
                  onChange={onChangeFirstname}
                  validations={[required, vfirstname]}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={lastname}
                  onChange={onChangeLastname}
                  validations={[required, vfirstname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  validations={[required]}
                />
              </div>

              <div className="form-group p-3 mb-4">
              <div className="text-center">
                <button className="btn btn-dark btn-block">Sign Up</button>
                </div>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;