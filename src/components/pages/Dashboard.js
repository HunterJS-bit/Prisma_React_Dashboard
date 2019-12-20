import React, { Component } from 'react';
import SideBar from './SideBar';
import dashRoutes from '../router/dashboardRoutes';


import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


export default class Dashboard extends Component {

    render() {
        return (
            <div className="dashboard">
                <Router>
                    <SideBar></SideBar>
                    <section className="render">
                        <Switch>
                            {dashRoutes.map((route, index) => (
                                <Route
                                    name={route.name}
                                    path={route.route}
                                    exact={route.exact}
                                    component={route.component}
                                ></Route>
                            ))}
                        </Switch>
                    </section>


                </Router>
            </div>
        )
    }
}