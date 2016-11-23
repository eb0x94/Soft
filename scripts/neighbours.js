function startApp() {
    sessionStorage.clear();

    showHideMenuLinks();
    showView('viewHome');

    //binding the navigation links
    $("#linkHome").click(showHomeView);
    $("#linkLogin").click(showLoginView);
    $("#linkRegister").click(showRegisterView);
    $("#linkListNews").click(listNews);
    $("#linkCreateNews").click(showCreateBookView);
    $("#linkLogout").click(logoutUser);

    // binding the form submit buttons
    $("#buttonLoginUser").click(loginUser);
    $("#buttonRegisterUser").click(registerUser);
    $("#buttonCreateNews").click(createNews);
    $("#buttonEditNews").click(editNews);

    // Bind the info / error boxes: hide on click
    $("#infoBox, #errorBox").click(function() {
        $(this).fadeOut();
    });

    // Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function() { $("#loadingBox").show() },
        ajaxStop: function() { $("#loadingBox").hide() }
    });

    //constant kinvey authorization stuff
    const baseUrl = "https://baas.kinvey.com/";
    const appKey = "kid_Sk8C1M7zx";
    const appSecret =
        "ac33bf67cd0449b49387cf2863a88b73";
    const authHeaders = {
        'Authorization': "Basic " +
        btoa(appKey + ":" + appSecret)
    };

    function showHideMenuLinks() {
        $("#linkHome").show();
        if (sessionStorage.getItem('authToken')) {
            // We have logged in user
            $("#linkLogin").hide();
            $("#linkRegister").hide();
            $("#linkListNews").show();
            $("#linkCreateNews").show();
            $("#linkLogout").show();
        } else {
            // No logged in user
            $("#linkLogin").show();
            $("#linkRegister").show();
            $("#linkListNews").hide();
            $("#linkCreateNews").hide();
            $("#linkLogout").hide();
        }
    }

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();
    }

    function showHomeView() {
        showView('viewHome');
    }

    function showLoginView() {
        showView('viewLogin');
        $('#formLogin').trigger('reset');
    }

    function showRegisterView() {
        $('#formRegister').trigger('reset');
        showView('viewRegister');
    }

    function showCreateBookView() {
        $('#formCreateNews').trigger('reset');
        showView('viewCreateNews');
    }

    function loginUser() {
        let userData = {
            username: $('#formLogin input[name=username]').val(),
            password: $('#formLogin input[name=passwd]').val()
        };
        $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/login",
            headers: authHeaders,
            data: userData,
            success: loginSuccess,
            error: handleAjaxError
        });

        function loginSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            showView('viewHome');
            showInfo('Login successful.');
        }
    }

    function registerUser() {
        // let userData = {
        //     username: $('#formRegister input[name=username]').val(),
        //     password: $('#formRegister input[name=passwd]').val()
        // };
        //
        // $.ajax({
        //     method: "POST",
        //     url: baseUrl + "user/" + appKey + "/",
        //     headers: authHeaders,
        //     data: userData,
        //     success: registerSuccess,
        //     error: handleAjaxError
        // });
        //
        // function registerSuccess(userInfo) {
        //     saveAuthInSession(userInfo);
        //     showHideMenuLinks();
        //     showView('viewHome');
        //     showInfo('User registration successful.');
        // }
    }

    function logoutUser() {
        sessionStorage.clear();
        $('#loggedInUser').text("");
        showHideMenuLinks();
        showView('viewHome');
        showInfo('Logout successful.');
    }

    function listNews() {
        $('#viewNews #news').append("UNDER MAINTENANCE");
        showView('viewNews');

    }

    function editNews() {

    }
    function createNews() {

    }

    function saveAuthInSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authToken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        $('#loggedInUser').text(
            "Welcome, " + username + "!");
    }

    function handleAjaxError(response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON &&
            response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        showError(errorMsg);
    }

    function showInfo(message) {
        $('#infoBox').text(message);
        $('#infoBox').show();
        setTimeout(function() {
            $('#infoBox').fadeOut();
        }, 3000);
    }

    function showError(errorMsg) {
        $('#errorBox').text("Error: " + errorMsg);
        $('#errorBox').show();
    }
}