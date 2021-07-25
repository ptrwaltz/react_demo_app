import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSettings, updateSettings } from "../../actions/settings";
import AlertService from "../../services/alert.service";

const Settings = (props) => {

    const form = useRef();

    const { message } = useSelector(state => state.message);
    const [successful, setSuccessful] = useState(false);
    const dispatch = useDispatch();

    // const [applicationName, setApplicationName] = useState('');
    // const [coinName, setCoinName] = useState('');

    const settings = useSelector(state => state.setting.settings);

    const [applicationName, setApplicationName] = useState(settings.application_name)
    const [coinName, setCoinName] = useState(settings.coin_name)
    const [logo, setLogo] = useState(settings.logo)
    
   /* useDispatch- React hook method to update the state */
    useEffect(() => { 
        dispatch(getSettings());  
        setApplicationName(settings.application_name);
        setCoinName(settings.coin_name);   
        setLogo(settings.logo) 
    }, [])


    const handleUpdateSettings = () => {
        setSuccessful(false);

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append("logo", logo);
        formData.append("application_name", applicationName);
        formData.append("coin_name", coinName);
        formData.append("coin_symbol", "100X");
        formData.append("invite_limit", 10);
        formData.append("coinsmarketcap_endpoint", "SADFGR");
        formData.append("coinsmarketcap_api_key", null);

        console.log(formData);
        dispatch(updateSettings(formData))
            .then(() => {
                setSuccessful(true);
                AlertService.showSuccess("Settings updated successfully")
            })
            .catch(() => {
                AlertService.showError(message)
                setSuccessful(false);
            });
    }

    const onChangeApplicationName = (e) => {
        const applicationname = e.target.value;
        setApplicationName(applicationname);
    }

    const onChangeCoinName = (e) => {
        const coinname = e.target.value;
        setCoinName(coinname);
    }

    const onChangeLogo = (evt) => {
        const logo = evt.target.files[0];
        console.log(logo);
        setLogo(logo);
    }
    return (
        <div className="col-md-12">
            <div className="card card-container">
                <Form ref={form}>

                    <div>
                        <div className="form-group">
                            <label htmlFor="applicationName">Application Name</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="applicationName"
                                value={applicationName || ''}
                                onChange={onChangeApplicationName}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="coinName">Coin Name</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="coinName"
                                value={coinName || ''}
                                onChange={onChangeCoinName}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="logo">Logo</label>
                            <img src="settings.logoz"></img>
                            <Input
                                type="file"
                                className="form-control"
                                name="logo"                               
                                onChange={onChangeLogo}
                            />
                        </div>

                        <div className="form-group p-3 mb-4">
                            <div className="text-center">
                                <button type="button" onClick={handleUpdateSettings} className="btn btn-dark btn-block">Update</button>
                            </div>
                        </div>
                    </div>
                    {/* <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
                </Form>
            </div>
        </div>
    );
}

export default Settings