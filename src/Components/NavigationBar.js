import React, { Component } from 'react';
import './NavigationBar.css';

export default class NavigationBar extends React.Component {
    render() {
        let username = this.props.username;
        if(username == null){
            return (
                <div className="navigation-bar">
                    <a href="#" onClick={this.props.homeClicked}>Home</a>
                    <a href="#" onClick={this.props.loginClicked}>Login</a>
                    <a href="#" onClick={this.props.listResidentsClicked}>List residents</a>
                    <a href="#" onClick={this.props.registerClicked}>Register</a>
                </div>
            );
        }
        else{
            return (
            <div className="navigation-bar">
                <a href="#" onClick={this.props.homeClicked}>Home</a>
                <a href="#" onClick={this.props.listResidentsClicked}>List residents</a>
                <a href="#" onClick={this.props.messagesClicked}>Neighbours' wall</a>
                <a href="#" onClick={this.props.personalMessagesClicked}>My messages</a>
                <a href="#" onClick={this.props.createMessageClicked}>Create a message</a>
                <a href="#" onClick={this.props.logoutClicked}>Logout</a>
                <span className="loggedInUser">Welcome, {this.props.username}!</span>
            </div>
            );
        }
    }
}
