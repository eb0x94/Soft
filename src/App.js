import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import NavigationBar from './Components/NavigationBar';
import Footer from './Components/Footer';
import  HomeView from './Views/HomeView';
import  LoginView from './Views/LoginView';
import RegisterView from './Views/RegisterView';
import $ from 'jquery';
import KinveyRequester from './KinveyRequester';
import ResidentsView from './Views/ResidentsView';
import CreateMessageView from './Views/CreateMessageView';
import MessagesView from './Views/ShowMessageView';
import PersonalMessagesView from './Views/ShowPersonalMessagesView';
import EditMessageView from './Views/EditMessageView';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: sessionStorage.getItem('username'),
            userId: sessionStorage.getItem('userId')
        };
    }

    componentDidMount() {

        // Attach global AJAX "loading" event handlers
        $(document).on({
            ajaxStart: function () {
                $("#loadingBox").show()
            },
            ajaxStop: function () {
                $("#loadingBox").hide()
            }
        });
        this.showHomeView();

        // Attach a global AJAX error handler
        $(document).ajaxError(
            this.handleAjaxError.bind(this));
    }

    handleAjaxError(event, response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON &&
            response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        this.showError(errorMsg);
    }

    showInfo(message) {
        $('#infoBox').text(message).show();
        setTimeout(function () {
            $('#infoBox').fadeOut();
        }, 3000);
    }

    showError(errorMsg) {
        $('#errorBox').text("Error: " + errorMsg).show();
    }


    render() {
        return (
            <div className="App">
                <header>
                    <NavigationBar username={this.state.username}
                                   homeClicked={this.showHomeView.bind(this)}
                                   loginClicked={this.showLoginView.bind(this)}
                                   registerClicked={this.showRegisterView.bind(this)}
                                   messagesClicked={this.showMessagesView.bind(this)}
                                   logoutClicked={this.logout.bind(this)}
                                   createMessageClicked={this.showCreateMessageView.bind(this)}
                                   listResidentsClicked={this.showResidentsView.bind(this)}
                                   personalMessagesClicked={this.showPersonalMessagesView.bind(this)}/>
                    <div id="loadingBox">Loading...</div>
                    <div id="infoBox">Info msg</div>
                    <div id="errorBox">Error msgs will come here</div>
                </header>
                <div id="main">
                </div>
                <Footer/>
            </div>

        );
    }

    showView(reactComponent) {
        ReactDOM.render(reactComponent, document.getElementById('main'));
        $('#errorBox').hide();
    }

    showHomeView() {
        this.showView(<HomeView/>);
    }

    showLoginView() {
        this.showView(<LoginView onsubmit={this.login.bind(this)}/>);
    }

    showRegisterView() {
        this.showView(<RegisterView onsubmit={this.register.bind(this)}/>)
    }

    showMessagesView() {
        let currentEntrance = sessionStorage.getItem('userVhod');
        KinveyRequester.getAllMessages().then(loadMessagesSuccess.bind(this));
        function loadMessagesSuccess(data) {
            let currentEntranceMsgs = [];
            for (let singleMsg of data) {
                if (singleMsg.vhod == currentEntrance) {
                    currentEntranceMsgs.push(singleMsg);
                }
            }

            this.showInfo("Messages loaded.");
            this.showView(<MessagesView messages={currentEntranceMsgs}/>);
        }
    }

    showResidentsView() {
        this.showView(<ResidentsView onsubmit={this.getAllResidents.bind(this)}/>);
    }

    showCreateMessageView() {
        this.showView(<CreateMessageView onsubmit={this.createMessage.bind(this)}/>)
    }

    showPersonalMessagesView() {
        let currentUser = sessionStorage.getItem('username');
        KinveyRequester.getAllMessages().then(loadMessagesSuccess.bind(this));
        function loadMessagesSuccess(data) {
            let personalMessages = [];
            for (let singleMsg of data) {
                if (singleMsg.username == currentUser) {
                    personalMessages.push(singleMsg);
                }
            }

            this.showInfo("Personal messages loaded.");
            this.showView(<PersonalMessagesView messages={personalMessages}
                                                editMessageClicked={this.prepareMessageForEdit.bind(this)}
                                                deleteMessageClicked={this.deletePersonalMessage.bind(this)}/>);
        }
    }

    logout() {
        this.setState({
            username: null
        });
        sessionStorage.clear();
        this.showInfo("Logged out successfully.");
        this.showHomeView();
    }

    login(username, password) {
        KinveyRequester.loginUser(username, password).then(loginSuccess.bind(this));
        function loginSuccess(data) {
            this.showInfo("Login successful");
            this.setState({username: data.username});
            this.saveAuthInSession(data);
            this.showHomeView();
        }
    }

    register(username, password, firstName, lastName, telephone, selectedValue) {
        switch (selectedValue) {
            case 'A':
                selectedValue = 'vhodA';
                break;
            case 'B':
                selectedValue = 'vhodB';
                break;
            case 'C':
                selectedValue = 'vhodC';
                break;
            default:
                break;
        }

        KinveyRequester.registerUser(username, password, firstName, lastName, telephone, selectedValue).then(registerSuccess.bind(this));

        function registerSuccess(data) {
            this.showInfo("Register successful");
            this.setState({username: data.username});
            this.saveAuthInSession(data);
            this.showHomeView();

            KinveyRequester.assignUserToVhod(firstName, lastName,).then(assignSuccess.bind(this));

            function assignSuccess() {
                this.showInfo("You are registered to entrance " + selectedValue);
            }
        }


    }

    createMessage(title, description) {
        let vhod = sessionStorage.getItem('userVhod');
        let username = sessionStorage.getItem('username');

        KinveyRequester.createMessage(vhod, title, description, username).then(createMessageSuccess.bind(this));

        function createMessageSuccess() {
            this.showMessagesView();
            this.showInfo("Messages loaded.");

        }
    }

    prepareMessageForEdit(messageId) {
        KinveyRequester.findMessageById(messageId).then(loadMessageForEditSuccess.bind(this));

        function loadMessageForEditSuccess(message) {
            this.showView(
                <EditMessageView
                    onsubmit={this.editMessage.bind(this)}
                    messageId={message._id}
                    title={message.title}
                    description={message.description}
                />
            );
        }
    }

    editMessage(messageId, title, description) {
        KinveyRequester.editMessage(messageId, title, description).then(editSuccess.bind(this));

        function editSuccess() {
            this.showInfo("Message edited.");
            this.showPersonalMessagesView();

        }
    }

    deletePersonalMessage(messageId) {
        let confirmation = confirm('Do you really want to delete this message?');

        if (!confirmation) {
            return;
        }
        KinveyRequester.deleteMessage(messageId)
            .then(deleteBookSuccess.bind(this));

        function deleteBookSuccess() {
            this.showPersonalMessagesView();
            this.showInfo("Message deleted.");
        }
    }

    getAllResidents(userVhod) {
        $('.residents').empty();
        switch (userVhod) {
            case 'A':
                userVhod = 'vhodA';
                break;
            case 'B':
                userVhod = 'vhodB';
                break;
            case 'C':
                userVhod = 'vhodC';
                break;
            default:
                break;
        }
        KinveyRequester.getCurrentVhod(userVhod).then(userVhodSuccess.bind(this));

        function userVhodSuccess(allUsersInCurrentEntrance) {
            let table = $('<table id="residents-table">');
            let headingTr = $('<th>First Name</th><th>Last Name</th><th>Telephone</th>');
            table.append(headingTr);

            for (let singleUser of allUsersInCurrentEntrance) {
                let tr = $('<tr>');
                tr.append(`<td>${singleUser.firstName}</td><td>${singleUser.lastName}</td>
                <td>${singleUser.telephone}</td>`);
                table.append(tr);
            }

            $('.residents').append(table);
        }
    }

    saveAuthInSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('userVhod', userInfo.vhod);
        sessionStorage.setItem('username', userInfo.username);
    }
}

export default App;
