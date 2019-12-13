import React, { Component } from 'react';
import AppContext from './AppContext';


export default class AppProvider extends Component {

    state = {
        userId: '0000000000',
        userEmail: 'user@gmail.com',
    };

    setUser = (currentUser) => {
        this.setState({ userId: currentUser.id, userEmail: currentUser.email })
    }

    render() {
        return (
            <AppContext.Provider value={{ ...this.state, setUser: this.setUser }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}