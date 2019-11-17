import React, { Component } from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";

import routes from './router/router.config';

class Home extends Component {
    render() {
        return (
            <Switch>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} component={route.component} exact={route.exact} />
                ))}
            </Switch>
        )
    }
}

export default Home;