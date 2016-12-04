import $ from 'jquery';

let KinveyRequester = (function () {
    const guestToken = 'a6af80bb-c764-4e33-869b-93acd18c10c4.NLLefvn6WDIr0FfQk5MjPZL/r0bkU6Ig/al1Oozhykc=';
    const appID = 'kid_Sk8C1M7zx';
    const baseUrl = "https://baas.kinvey.com/";
    const appSecret = 'ac33bf67cd0449b49387cf2863a88b73';
    const authHeaders = {"Authorization": "Basic " + btoa(appID + ":" + appSecret), "Content-Type": "application/json"};

    function loginUser(username, password) {
        return $.ajax({
            method: "POST",
            url: baseUrl + 'user/' + appID + '/login',
            headers: authHeaders,
            data: JSON.stringify({username, password}),

        });
    }

    function registerUser(username, password, firstName, lastName, telephone, vhod) {
        let userData = JSON.stringify({
            username: username, password: password, firstName: firstName,
            lastName: lastName, telephone: telephone, vhod: vhod
        });
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appID,
            headers: authHeaders,
            data: userData
        });
    }

    function getAllMessages() {
        return $.ajax({
            method: "GET",
            url: baseUrl + 'appdata/' + appID + "/news?query={}&sort={\"_kmd.lmt\": -1}",
            headers: getKinveyUserAuthHeaders()
        })
    }

    function createMessage(vhod, title, description, username) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appID + "/news",
            headers: getKinveyUserAuthHeaders(),
            data: {vhod, title, description, username}
        });
    }

    function deleteMessage(messageId) {
        return $.ajax({
            method: "DELETE",
            url: baseUrl + "appdata/" + appID + "/news/" + messageId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function findMessageById(messageId) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appID + "/news/" + messageId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function editMessage(messageId, title, description) {
        let vhod = sessionStorage.getItem('userVhod');
        let username = sessionStorage.getItem('username');
        return $.ajax({
            method: "PUT",
            url: baseUrl + 'appdata/' + appID + '/news/' + messageId,
            headers: getKinveyUserAuthHeaders(),
            data: {vhod, title, description, username}
        });
    }

    function getKinveyUserAuthHeaders() {
        let token = sessionStorage.getItem('authToken');
        if(!token){
            return {
                'Authorization': "Kinvey " + guestToken
            };
        }
        return {
            'Authorization': "Kinvey " + token
        };
    }

    function getCurrentVhod(userVhod) {
        return $.ajax({
            method: "GET",
            url: baseUrl + 'appdata/' + appID + "/" + userVhod,
            headers: getKinveyUserAuthHeaders()
        })
    }

    function assignUserToVhod(firstName, lastName, telephone) {
        let vhod = sessionStorage.getItem('userVhod');
        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appID + "/" + vhod,
            headers: getKinveyUserAuthHeaders(),
            data: {firstName, lastName, telephone}
        });
    }


    return {
        loginUser,
        registerUser,
        getAllMessages,
        createMessage,
        deleteMessage,
        findMessageById,
        editMessage,
        assignUserToVhod,
        getCurrentVhod
    }
}());

export default KinveyRequester;