import React, { Component } from 'react';
import '../styles/ShowPersonalMessagesView.css';

export default class ShowPersonalMessagesView extends Component{
    render(){
        if(this.props.messages.length === 0){
            return(<div className="personal-messages-view">
                <h3>You haven't created any messages yet, click on "Create a message" to make one.</h3>
            </div>)
        }
        let personalMsgDiv = this.props.messages.map(msg =>
            <div key={msg._id} className="personal-single-message">
                <div className="message-body">
                <h4>{msg.title}</h4>
                <p>{msg.description}</p>
                <span>{this.getActions(msg)}</span>
                </div>
            </div>);
        return(
            <div className="personal-messages-view">
                <h2>Your personal messages are shown below</h2>
                <p>Note that the notes will be filtered, meaning that the newest come on top. :)</p>
                {personalMsgDiv}
            </div>
        );
    }

    getActions(message) {
            return (<span>
                    <input type="button" value="Edit"
                           onClick={this.props.editMessageClicked.bind(this, message._id)} />
                    &nbsp;
                    <input type="button" value="Delete"
                           onClick={this.props.deleteMessageClicked.bind(this, message._id)} />
                </span>
            );

    }
}