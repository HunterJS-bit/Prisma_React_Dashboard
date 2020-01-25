import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import {
    Link
} from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

class Sidebar extends Component {

    render() {
        return (
            <Sider>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                     <Menu.Item key="1">
                        <Icon type="bar-chart"  />
                        <span>Analytics</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="book" />
                                <span>Posts</span>
                            </span>
                        }
                    >
                        <Menu.Item key="2">
                            <Icon type="ordered-list" />
                            <span>Post List</span>
                            <Link to="/post-list" />
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="form" />
                            <span>Create Post</span>
                            <Link to="/create-post" />
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="user" />
                                <span>Users</span>
                            </span>
                        }>
                        <Menu.Item key="4">
                            <Icon type="ordered-list" />
                            <span>User List </span>
                            <Link to="/user-list" />
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="user-add" />
                            <span>Create User </span>
                            <Link to="/user-create" />
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="6">
                        <Icon type="profile" />
                        <span>Profile</span>
                    </Menu.Item>
                      <Menu.Item key="7">
                        <Icon type="setting" />
                        <span>Settings</span>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Icon type="logout" />
                        <span>Logout</span>
                    </Menu.Item>
                </Menu></Sider >);
    }
}

export default Sidebar;