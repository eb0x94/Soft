import React, { Component } from 'react';
import '../styles/CreateMessageView.css';

export default class CreateMessageView extends Component{
    render(){
        return(
            <form className="create-message-form" onSubmit={this.submitForm.bind(this)}>
                <h2 className="form-heading">Create Message for your entrance</h2>
                <div className="form">
                <label>
                    <div>Title:</div>
                    <input type="text" name="title" required
                           ref={e => this.titleField = e} />
                </label>
                <label>
                    <div>Description:</div>
                    <textarea name="description" rows="15" cols="50"
                              ref={e => this.descriptionField = e} />
                </label>
                <div>
                    <input type="submit" value="Create" />
                </div>
                </div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.titleField.value,
            this.descriptionField.value,
        );
    }
}
