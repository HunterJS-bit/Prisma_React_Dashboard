import React, { Component } from 'react';
import CreatePost from '../common/CreatePost';

export default class Dashboard extends Component {

    render() {
        return (
            <div>
                <h1>Inside the dashboard </h1>
                <CreatePost></CreatePost>
            </div>
        )
    }
}