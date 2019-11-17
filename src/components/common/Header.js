import React, { Component } from 'react';
import { ReactComponent as Logo } from '../../logo.svg';
import {
    Link
} from "react-router-dom";

class Header extends Component {

    render() {
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
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;