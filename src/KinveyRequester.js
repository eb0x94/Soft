import $ from 'jquery';

let KinveyRequester = (function () {
    const appID = 'kid_Sk8C1M7zx';
    const baseUrl = "https://baas.kinvey.com/";
    const appSecret = 'ac33bf67cd0449b49387cf2863a88b73';
    const authHeaders = {"Authorization":"Basic " + btoa(appID + ":" + appSecret), "Content-Type":"application/json"};

    function loginUser(username, password) {
        return $.ajax({
            method: "POST",
            url: baseUrl + 'user/' + appID + '/login',
            headers: authHeaders,
            data: JSON.stringify({username, password}),

        });
    }

    function registerUser(username, password, selectedVhodOption) {
        return $.ajax({
            method: "POST",
            url: baseUrl + appID,
            headers: authHeaders,
            data: JSON.stringify({username, password, selectedVhodOption}),
        });
    }

    return {
        loginUser,
        registerUser
    }
}());

export default KinveyRequester;