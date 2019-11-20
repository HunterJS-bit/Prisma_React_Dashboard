import React, { Component } from 'react';

class Login extends Component {

    state = {
        email: '',
        password: '',
    }

    logIn = (e) => {
        e.preventDefault();
        console.log('Submiting form')
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
                <form onSubmit={this.logIn}>
                    <div >
                        <h3>Login Form</h3>
                        <p>Login to access your dashboard</p>
                    </div>
                    <div >
                        <input type="text" className="form-input"
                            value={this.state.email}
                            onChange={(e) => this.handleChange(e, 'email')} placeholder="email@example.com" />
                    </div>
                    <div>
                        <input type="password" className="form-input"
                            placeholder="password"
                            onChange={(e) => this.handleChange(e, 'password')} />
                    </div>
                    <div>
                        <button className="form-button" type="submit" >Login</button>
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