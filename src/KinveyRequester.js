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

    function registerUser(username,password, firstName, lastName, telephone, vhod) {
        let userData = JSON.stringify({username: username,password: password, firstName: firstName,
            lastName: lastName, telephone: telephone, vhod: vhod});
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
            data: { vhod, title, description, username }
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

    function editMessage(messageId, title, description){
        let vhod = sessionStorage.getItem('userVhod');
        let username = sessionStorage.getItem('username');
        return $.ajax({
            method: "PUT",
            url: baseUrl + 'appdata/' + appID + '/news/' + messageId,
            headers: getKinveyUserAuthHeaders(),
            data: { vhod, title, description, username }
        });
    }

    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
        };
    }



    return {
        loginUser,
        registerUser,
        getAllMessages,
        createMessage,
        deleteMessage,
        findMessageById,
        editMessage
    }
}());

export default KinveyRequester;