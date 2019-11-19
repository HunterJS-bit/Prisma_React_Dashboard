import React, { Component } from 'react';

class Login extends Component {

    logIn = (e) => {
        e.preventDefault();
        console.log('Submiting form')
    }

    render() {
        return (
            <div className="wrap">
                <form onSubmit={this.logIn}>
                    <div >
                        <h3>Login Form</h3>
                        <p>Login to access your dashboard</p>
                    </div>
                    <div >
                        <input type="text" className="form-input" placeholder="email@example.com" />
                    </div>
                    <div>
                        <input type="password" className="form-input" placeholder="password" />
                    </div>
                    <div>
                        <button className="form-button" type="submit">Login</button>
                    </div>
                    <div>
                        Don't have an account? <a href="/#">Sign Up</a>
                    </div>
                </form>
            </div >
        );
    }
}

export default Login;