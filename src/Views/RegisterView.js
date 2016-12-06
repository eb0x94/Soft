import React, { Component } from 'react';
import '../styles/RegisterView.css';

export default class RegisterView extends Component {
    render() {
        return (
            <form className="register-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Register</h1>
                <label>
                    <div>Username:</div>
                    <input type="text" name="username" required
                           ref={e => this.usernameField = e} />
                </label>
                <label>
                    <div>Password:</div>
                    <input type="password" name="password" required
                           ref={e => this.passwordField = e} />
                </label>
                <label>
                    <div>First Name:</div>
                    <input type="text" name="firstName" required
                           ref={e => this.firstNameField = e} />
                </label>
                <label>
                    <div>Last Name:</div>
                    <input type="text" name="lastName" required
                           ref={e => this.lastNameField = e} />
                </label>
                <label>
                    <div>Telephone:</div>
                    <input type="text" name="telephone" required
                           ref={e => this.telephoneField = e} />
                </label>
                <label>
                    <div>Choose your entrance:</div>
                    <select defaultValue="A" required ref={(input) => this.optSelected = input }>
                        <option defaultValue="vhodA">A</option>
                        <option defaultValue="vhodB">B</option>
                        <option defaultValue="vhodC">C</option>
                    </select>
                </label>
                <div>
                    <input type="submit" value="Register" />
                </div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.usernameField.value, this.passwordField.value,this.firstNameField.value,
            this.lastNameField.value, this.telephoneField.value, this.optSelected.value);
    }
}
