import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";


class SideBar extends Component {

    render() {
        return (
            <section className="sidebar">
                <h1>Dashboard panel</h1>
                <ul>
                    <li>Home</li>
                    <li>Posts
                        <ul>
                            <li><Link to="/post-list">Post List</Link></li>
                            <li><Link to="/create-post">Create post</Link></li>
                        </ul>
                    </li>
                    <li>Articles
                        <ul>
                            <li>Article List</li>
                            <li>Create article</li>
                        </ul>
                    </li>
                    <li>Profile</li>
                    <li>Logout</li>
                </ul>
            </section>);
    }
}

export default SideBar;