import React, { Component } from 'react';
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


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: sessionStorage.getItem('username'),
        userId: sessionStorage.getItem('userId')
    };
  }
    componentDidMount(){

        // Attach global AJAX "loading" event handlers
        $(document).on({
            ajaxStart: function() { $("#loadingBox").show() },
            ajaxStop: function() { $("#loadingBox").hide() }
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
        setTimeout(function() {
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
          <NavigationBar username ={this.state.username}
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

  showView(reactComponent){
          ReactDOM.render(reactComponent,document.getElementById('main'));
          $('#errorBox').hide();
  }

    showHomeView(){
    this.showView(<HomeView/>);
    }

    showLoginView(){
        this.showView(<LoginView onsubmit={this.login.bind(this)}/>);
    }

    showRegisterView(){
      this.showView(<RegisterView onsubmit={this.register.bind(this)}/>)
    }

    showMessagesView(){
       this.showView(<MessagesView/>);
    }

    showResidentsView(){
        this.showView(<ResidentsView/>);
    }

    showCreateMessageView(){
        this.showView(<CreateMessageView/>)
    }

    showPersonalMessagesView(){
        this.showView(<PersonalMessagesView/>);
    }

    logout(){
        this.setState({
            username: null
        });
        this.showHomeView();
    }

    login(username, password){
        KinveyRequester.loginUser(username,password).then(loginSuccess.bind(this));
        function loginSuccess(data) {
            this.showInfo("Login successful");
            this.setState({username: data.username});
            this.showHomeView();
        }
    }

    register(username, password, selectedValue){
        switch (selectedValue){
            case 'A': selectedValue = 'vhodA';
                break;
            case 'B': selectedValue = 'vhodB';
                break;
            case 'C': selectedValue = 'vhodC';
                break;
            default:break;
        }
        KinveyRequester.registerUser(username,password, selectedValue).then(registerSuccess.bind(this));
        function registerSuccess(data) {
            this.showInfo("Register successful");
            this.setState({username: data.username});
            this.showHomeView();
        }


    }
}

export default App;