import React, { Component } from 'react';
import SideBar from './SideBar';
import dashRoutes from '../router/dashboardRoutes';
import { Layout, Menu, Icon } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default class Dashboard extends Component {

    render() {
        return (
            <div className="dashboard">
                <Router>
                  <Layout>
                  <Header>Header</Header>
                      <Layout>
                        <SideBar></SideBar>
                        <Content
                            style={{
                              margin: '24px 16px',
                              padding: 24,
                              background: '#fff',
                              minHeight: 280,
                            }}
                          >
                        <Switch>
                            {dashRoutes.map((route, index) => (
                                <Route
                                    key={index}
                                    name={route.name}
                                    path={route.route}
                                    exact={route.exact}
                                    component={route.component}
                                ></Route>
                            ))}
                        </Switch>
                        </Content>
                      </Layout>
                      </Layout>
                </Router>
            </div>
        )
    }
}