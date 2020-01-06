import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { Table, Layout } from 'antd';
import TableActions from './PostTableAction';

const { Content } = Layout;

const GET_POSTS = gql`
query ($limit: Int, $skip: Int)  {
    getPosts(limit: $limit, skip: $skip) {
      posts {
        id
        title
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
    },
    {
      title: 'Publish Status',
      dataIndex: 'isPublished',
      key: 'isPublished',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <TableActions post={record} />
      ),
    },
  ];
  let [state, setPosts] = useState([]);
  const client = useApolloClient();

  const { data: Posts, loading: load, err } = useQuery(GET_POSTS, {
    variables: { limit: 10, skip: 0 },
    onCompleted: (response) => {
      const res = response.getPosts;
      setPosts(res.posts);
    }
  });





  if (load) return <p>LOADING</p>;
  if (err) return <p>ERROR</p>;
  let tableData;
  tableData = Posts.getPosts;


  const tableChanged = async (pagination) => {
    console.log('Table is changeddd ');
    const skip = pagination.current;
    const { data } = await client.query({
      query: GET_POSTS,
      variables: { limit: 10, skip: skip - 1 },
    });
    const res = data.getPosts;
    setPosts(res.posts);

  }
  return (
    <Content style={{ margin: '0 16px', minHeight: "100vh" }}>
      <Table {...tableProps} columns={columns} onChange={tableChanged} dataSource={state} pagination={{ defaultPageSize: 10, total: tableData.total }} rowKey="id" />
    </Content>);
}


export default PostList;