import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { Table, Layout, Icon, Typography } from 'antd';
import TableActions from './PostTableAction';

const { Content } = Layout;
const { Text } = Typography;

const GET_POSTS = gql`
query ($limit: Int, $skip: Int)  {
    getPosts(limit: $limit, skip: $skip) {
      posts {
        id
        title
        isPublished
        author {
          name
        }
      }
      total
    }
  }
`;

const PostList = () => {
  const tableProps = {
    bordered: true,
    loading: false,
    pagination: { position: "bottom" },
    size: "default",
    title: undefined,
    showHeader: true,
    rowSelection: {},
    scroll: { y: 240 }
  };
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      render: (text, record) => {
        return <Text code> Marko</Text>
      }
    },
    {
      title: 'isPublished',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (text, record) => <div>  <Icon type={record.isPublished ? 'check-circle' : 'close-circle'} theme="twoTone" /></div>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <TableActions post={record} />
      ),
    },
  ];
  let [state, setState] = useState({ total: 0, posts: [] });
  const client = useApolloClient();

  const { loading: load, err } = useQuery(GET_POSTS, {
    variables: { limit: 10, skip: 0 },
    onCompleted: (response) => {
      const res = response.getPosts;
      setState(res);
    }
  });


  if (load) return <p>LOADING</p>;
  if (err) return <p>ERROR</p>;



  const tableChanged = async (pagination) => {
    const skip = pagination.current;
    const { data } = await client.query({
      query: GET_POSTS,
      variables: { limit: 10, skip: skip - 1 },
    });
    const res = data.getPosts;
    setState({ ...state, posts: res.posts });
  }

  return (
    <Content style={{ margin: '0 16px', minHeight: "100vh" }}>
      <Table {...tableProps} columns={columns} onChange={tableChanged} dataSource={state.posts} pagination={{ defaultPageSize: 10, total: state.total }} rowKey="id" />
    </Content>);
}


export default PostList;