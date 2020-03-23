import React, { Component } from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";

import routes from './router/router.config';
import PrivateRoutes from './router/PrivateRoutes';

class Home extends Component {
    render() {
        return (
            <Switch>
                {routes.map((route, index) => {
                    if (!route.private) {
                        return <Route key={index} path={route.path} component={route.component} exact={route.exact} />;
                    } else {
                        return <PrivateRoutes key={index} path={route.path} component={route.component}></PrivateRoutes>;
                    }

                })}

            </Switch>
        )
    }
}

export default Home;
