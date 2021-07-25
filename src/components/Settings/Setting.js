
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import settingService from "../../services/settings.service";
import AlertService from "../../services/alert.service";
import { updateSettingAction } from "../../actions/settings";

const Settings = (props) => {

    const [applicationName, setApplicationName] = useState('')
    const [coinName, setCoinName] = useState('')
    const [logo, setLogo] = useState('')      

      const [successful, setSuccessful] = useState(false);

      const dispatch = useDispatch();

      const getSetting = () =>{
        settingService.getSettings().then(response=>{
            setApplicationName(response.data.data.application_name);
            setCoinName(response.data.data.coin_name);   
            setLogo(response.data.data.logo) 

        }) .catch(e => {
            console.log(e);
          });
      }
    
   /* useDispatch- React hook method to update the state */
    useEffect(() => { 
        getSetting();
    }, [])
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
        setLogo(URL.createObjectURL(evt.target.files[0]));
    }


      const updateContent = () => {
        const formData = new FormData();
        formData.append("logo", logo);
        formData.append("application_name", applicationName);
        formData.append("coin_name", coinName);
        formData.append("coin_symbol", "100X");
        formData.append("invite_limit", 10);
        formData.append("coinsmarketcap_endpoint", "SADFGR");
        formData.append("coinsmarketcap_api_key", null);
        dispatch(updateSettingAction(formData))
          .then(response => {
            setSuccessful(true);
            AlertService.showSuccess("Settings updated successfully")
          })
          .catch(e => {
            console.log(e);
          });
      };

    return (
        <div className="col-md-12">
             {applicationName ? (
            <div className="card card-container">
                <form>

                    <div>
                        <div className="form-group">
                            <label htmlFor="application_name">Application Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="application_name"
                                value={applicationName}
                                onChange={onChangeApplicationName}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="coin_name">Coin Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="coin_name"
                                value={coinName}
                                onChange={onChangeCoinName}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="logo">Logo</label>
                            <img src={`http://localhost:3333/${logo}`} style={{width:"100%"}}></img>
                            <input
                                type="file"
                                className="form-control"
                                name="logo"                               
                                onChange={onChangeLogo}
                            />
                        </div>

                        <div className="form-group p-3 mb-4">
                            <div className="text-center">
                                <button type="button" onClick={updateContent} className="btn btn-dark btn-block">Update</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
                  </div>

    );
}

export default Settings