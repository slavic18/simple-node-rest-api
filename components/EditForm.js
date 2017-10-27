import React from "react";
import Router from "next/router";
import {FormGroup, ControlLabel, HelpBlock, FormControl, Button, FieldGroup} from "react-bootstrap";
import config from "./../config/config.json";

export default class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: props.id,
            username: props.username,
            email: props.email,
            password: '',
            formUrl: config.base_api_url + '/' + props.id
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSuccessSubmit = this.handleSuccessSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            const user = nextProps.user;
            let updatedState = {
                _id: user._id,
                username: user.username,
                email: user.email,
            };
            this.setState(updatedState);
        }
    }


    getUserNameValidationState() {
        const length = this.state.username.length;
        if (length > 5) {
            return 'success';
        } else if (length > 3) {
            return 'warning';
        }
        else if (length > 0) {
            return 'error';
        }
    }

    getRepeatPasswordValidationState() {
        const password = this.state.password,
            repeatPassword = this.state.repeat_password;
        if (!this.state.password) {
            return null;
        }
        if (password !== repeatPassword) {
            return 'error';
        } else {
            if (password.length < 5) {
                return 'warning';
            }
            return 'success';
        }

    }


    handleChange(e) {
        let name = e.target.name,
            updatedState = this.state;
        updatedState[name] = e.target.value;
        this.setState(updatedState);
    }

    validateFields() {
        try {

            if (this.state.username.length < 5) {
                throw new Error('Short username');
            }
            if (this.state.password) {

                if (this.state.password.length < 5) {
                    throw new Error('Short password');
                }
                if (this.state.password && this.state.password !== this.state.repeat_password) {
                    throw new Error('Passwords are not equal');
                }
            }
            return true;
        } catch (error) {
            return false;
        }


    }

    handleSubmit(e) {
        e.preventDefault();
        // validate fields
        if (!this.validateFields()) {
            return false;
        }

        let formData = {
            username: this.state.username,
            email: this.state.email,
        };
        if (this.state.password) {
            formData.password = this.state.password;
        }

        fetch(this.state.formUrl, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(function (response) {
            return response.json();
        }).then(this.handleSuccessSubmit);

        return false;
    }

    handleSuccessSubmit(data) {
        if (data.success && typeof data.user !== 'undefined') {
            alert('successfully edit user');
        } else {
            alert(data.error);
        }
    }

    render() {
        let formTitle = 'Edit user';
        return (
            <div>
                <h2>{formTitle}</h2>
                <div className="row">
                    <div className="col-md-9">
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup
                                validationState={this.getUserNameValidationState()}>
                                <ControlLabel>Username</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.username}
                                    placeholder="user name"
                                    name="username"
                                    onChange={this.handleChange}
                                />
                                <HelpBlock>Min length is 5 symbols</HelpBlock>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.email}
                                    placeholder="user email"
                                    name="email"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup validationState={this.getRepeatPasswordValidationState()}>
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    type="password"
                                    value={this.state.password}
                                    placeholder="user password"
                                    name="password"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup validationState={this.getRepeatPasswordValidationState()}>
                                <ControlLabel>Repeat Password</ControlLabel>
                                <FormControl
                                    type="password"
                                    value={this.state.repeat_password}
                                    placeholder="user password"
                                    name="repeat_password"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <Button type="submit">
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}