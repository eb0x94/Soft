import React, {Component} from 'react';
import '../styles/ResidentsView.css';

export default class ResidentsView extends Component {
    render() {
        return (
            <div className="residents-view">
                <h1>Welcome to the residents view.</h1>

                <form className="residents-form" onSubmit={this.submitForm.bind(this)}>
                    <label>
                        <div>Choose your entrance:</div>
                        <select defaultValue="A" ref={(input) => this.optSelected = input }>
                            <option defaultValue="vhodA">A</option>
                            <option defaultValue="vhodB">B</option>
                            <option defaultValue="vhodC">C</option>
                        </select>
                    </label>
                    <div>
                        <input type="submit" value="Search users" />
                    </div>
                </form>
                <div className="residents">
                </div>
            </div>
        );
    }

    submitForm(event){
        event.preventDefault();
        this.props.onsubmit(this.optSelected.value);
    }
}