import React, { Component } from 'react';

export default class MessagesView extends Component{
    render(){
        let msgDiv = this.props.messages.map(msg =>
            <div key={msg._id} className="single-message">
                <h3>{msg.title}</h3>
                <p>{msg.description}</p>
                <span>{msg.username}</span>
            </div>);
        return(
            <div className="messages-view">
            <h1>Your entrance's messages are shown below</h1>
                {msgDiv}
            </div>
        );
    }
}