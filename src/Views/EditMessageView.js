import React, { Component } from 'react';

export default class EditMessageView extends Component {
    render() {
        return (
            <form className="edit-message-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Edit Message</h1>
                <label>
                    <div>Title:</div>
                    <input type="text" name="title" required
                           defaultValue={this.props.title}
                           ref={e => this.titleField = e} />
                </label>
                <label>
                    <div>Description:</div>
                    <textarea name="description" rows="10"
                              defaultValue={this.props.description}
                              ref={e => this.descriptionField = e} />
                </label>
                <div>
                    <input type="submit" value="Edit" />
                </div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.props.messageId,
            this.titleField.value,
            this.descriptionField.value,
        );
    }
}
