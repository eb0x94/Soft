import React, { Component } from 'react';

export default class MessagesView extends Component{
    render(){
        if(this.props.messages.length === 0){
            return(
                <div className="messages-view">
                    <h3>The neighbours message board is empty.</h3>
                </div>
            );
        }
        let msgDiv = this.props.messages.map(msg =>
            <div key={msg._id} className="single-message">
                <h3>{msg.title}</h3>
                <p>{msg.description}</p>
                <span>{msg.username}</span>
            </div>);
        return(
            <div className="messages-view">
            <h1>Your neighbours messages are shown below</h1>
                {msgDiv}
            </div>
        );
    }
}