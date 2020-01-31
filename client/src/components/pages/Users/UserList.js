import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { Table, Layout, Skeleton } from 'antd';
import tableProps from '../../../shared/tableProps';
import UserTableActions from './UserTableActions';

const { Content } = Layout;

const GET_USERS = gql`
query ($limit: Int, $skip: Int)  {
    getUsers(limit: $limit, skip: $skip) {
      users {
        id
        name
        email
        role
      }
      total
    }
  }
`;

const columns = [
    {
        name: 'Name',
        dataIndex: 'name',
        key: 'Name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
          <UserTableActions/>
        ),
    },
];

const UserList = props => {
    let [state, setState] = useState({ total: 0, users: [] });
    const client = useApolloClient();

    const { loading, err } = useQuery(GET_USERS, {
        variables: { limit: 10, skip: 0 },
        onCompleted: (response) => {
            const res = response.getUsers;
            setState(res);
        }
    });

    if (loading) return <Skeleton active avatar></Skeleton>;
    if (err) return <p>Error</p>;

    const tableChanged = async (pagination) => {
        const skip = pagination.current;
        const { data } = await client.query({
            query: GET_USERS,
            variables: { limit: 10, skip: skip - 1 },
        });
        const res = data.getUsers;
        setState({ ...state, posts: res.posts });
    }


    return (<Content style={{ margin: '0 16px', minHeight: "100vh" }}>
        <Table {...tableProps} columns={columns} onChange={tableChanged} dataSource={state.users} pagination={{ defaultPageSize: 10, total: state.total }} rowKey="id" scroll={{ y: "calc(80vh - 4em)" }} />
    </Content>);

}

export default UserList;