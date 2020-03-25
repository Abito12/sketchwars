import React, {Component} from 'react';
import { signup } from '../helpers/auth';
import SignupView from '../templates/SignUp';

export default class SignUpComponent extends Component {

    signIn = async (method) => await signup(method);

    render() {
        return <SignupView signUpHandler={this.signIn} />;
    }
}


