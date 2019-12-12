import React, { Component } from 'react';
import { ReactComponent as Logo } from '../../logo.svg';
import {
    Link
} from "react-router-dom";
import AppContext from '../../context/AppContext';


class Header extends Component {

    static contextType = AppContext;

    render() {
        let value = this.context;
        console.log('Current user');
        console.log(value);
        return (
            <header>
                <Logo width="50px " height="80px" />
                <nav className="navbar navbar-light">
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/mushrooms">Mushrooms</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;