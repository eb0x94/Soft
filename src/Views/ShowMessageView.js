import React, { Component } from 'react';
import '../styles/ShowMessageView.css';

export default class MessagesView extends Component{
    render(){
        if(this.props.messages.length === 0){
            return(
                <div className="messages-view">
                    <h2>The neighbours message board is empty.</h2>
                </div>
            );
        }
        let msgDiv = this.props.messages.map(msg =>
            <div key={msg._id} className="single-message">
                <div className="message-body">
                <h3>{msg.title}</h3>
                <p>{msg.description}</p>
                <span>posted by <span className="username">{msg.username}</span></span>
                </div>
            </div>);
        return(
            <div className="messages-view">
            <h1>Neighbours messages are shown below</h1>
                {msgDiv}
            </div>
        );
    }
}