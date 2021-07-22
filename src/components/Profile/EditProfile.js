import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
// import { isEmail } from "validator";
import { updateProfile } from "../../actions/user";
import AlertService from "../../services/alert.service";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
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



const EditProfile = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    /* To get user data and bind to input values */
    useEffect( () => {
        setFirstname(currentUser.data.firstName);
        setLastname(currentUser.data.lastName);
   }, []) 

    const onChangeFirstname = (e) => {
        const firstname = e.target.value;
        setFirstname(firstname);
    };

    const onChangeLastname = (e) => {
        const lastname = e.target.value;
        setLastname(lastname);
    }

    const handleUpdateProfile = (e) => {
        e.preventDefault();
    
        setSuccessful(false);
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
          dispatch(updateProfile(firstname,lastname))
            .then(() => {
              setSuccessful(true);
              AlertService.showSuccess("Profile updated successfully")
              props.history.push("/profile");
            })
            .catch(() => {
                AlertService.showError(message)
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
                <Form onSubmit={handleUpdateProfile} ref={form}>
                  
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

                        <div className="form-group p-3 mb-4">
                            <div className="text-center">
                                <button className="btn btn-dark btn-block">Update</button>
                            </div>
                        </div>
                    </div>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    
                </Form>
            </div>
        </div>
    );
};

export default EditProfile;
