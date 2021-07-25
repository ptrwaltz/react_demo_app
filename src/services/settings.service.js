import axios from "axios";

const API_URL = "http://localhost:3333/api/admin/";


const getSettings = () => {
    return axios.get(API_URL + "site_settings",
        {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjcsImlhdCI6MTYyNzAxNjA2MiwiZXhwIjoxNjI5NjA4MDYyfQ.kvLODms0QEuc1e02DSic7HZIC1YIQp0yHfJsrRkqlZo',
            }
        });
};

const updateSettings = (formData) => {

    // let obj = {
    //     "application_name": formData.applicationName,
    //     "coin_name": formData.coinName,
    //     "coin_symbol": "100X",
    //     "invite_limit": 10,
    //     "coinsmarketcap_endpoint": "SADFGR",
    //     "coinsmarketcap_api_key": null,
    //     "logo": formData.logo
    // }

    return axios.put(API_URL + "site_settings", formData,
        {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjcsImlhdCI6MTYyNzAxNjA2MiwiZXhwIjoxNjI5NjA4MDYyfQ.kvLODms0QEuc1e02DSic7HZIC1YIQp0yHfJsrRkqlZo',
            }
        });
};

export default {
    getSettings,
    updateSettings
}