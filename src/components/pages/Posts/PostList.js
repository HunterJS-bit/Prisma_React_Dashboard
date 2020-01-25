import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { Table, Layout, Icon, Avatar, Skeleton } from 'antd';
import TableActions from './PostTableAction';
import TableProps from '../../../shared/tableProps';

const { Content } = Layout;

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
    render: (author, record) => {
      return <Avatar style={{ color: '#fff', backgroundColor: '#87d068' }}>{author.name}</Avatar>
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

const PostList = () => {

  let [state, setState] = useState({ total: 0, posts: [] });
  const client = useApolloClient();

  const { loading: load, err } = useQuery(GET_POSTS, {
    variables: { limit: 10, skip: 0 },
    onCompleted: (response) => {
      const res = response.getPosts;
      setState(res);
    }
  });


  if (load) return <Skeleton loading={true} active avatar paragraph />;
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
      <Table {...TableProps} columns={columns} onChange={tableChanged} dataSource={state.posts} pagination={{ defaultPageSize: 10, total: state.total }} rowKey="id" scroll={{ y: "calc(80vh - 4em)" }} />
    </Content>);
}


export default PostList;