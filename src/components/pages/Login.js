import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const LOGIN_USER_MUTATION = gql`
mutation Login($email: String!, $password: String!){
    loginUser(email: $email ,password: $password) {
      id
      email
      token
    }
  }
`;

class Login extends Component {


    state = {
        email: 'djoka@gmail.com',
        password: '1',
    }

    logIn = (e) => {
        e.preventDefault();
        console.log('Submiting form');

    }

    handleChange = (e, property) => {
        this.setState({
            [property]: e.target.value
        });
        console.log(this.state);
    }

    render() {
        return (
            <div className="wrap">
                <Mutation mutation={LOGIN_USER_MUTATION} variables={{ email: this.state.email, password: this.state.password }}>
                    {(logInMutaction) =>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const response = await logInMutaction();
                            const token = response.data.loginUser.token;
                            if (token) {
                                this.props.history.push('/dashboard');
                            }
                            console.log(token);
                        }}>
                            <div >
                                <h3>Login Form</h3>
                                <p>Login to access your dashboard</p>
                            </div>
                            <fieldset>
                                <div >
                                    <input type="text" className="form-input"
                                        value={this.state.email}
                                        onChange={(e) => this.handleChange(e, 'email')} placeholder="email@example.com" />
                                </div>
                                <div>
                                    <input type="text" className="form-input"
                                        value={this.state.password}
                                        placeholder="password"
                                        onChange={(e) => this.handleChange(e, 'password')} />
                                </div>
                                <div>
                                    <button className="form-button" type="submit" >Login</button>
                                </div>
                                <div>
                                    Don't have an account? <a href="/#">Sign Up</a>
                                </div>
                            </fieldset>
                        </form>
                    }
                </Mutation>
            </div >
        );
    }
}

export default Login;