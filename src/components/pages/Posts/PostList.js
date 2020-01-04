import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Table, Divider, Button } from 'antd';


const GET_POSTS = gql`
  {
    getPosts {
      id
      title
      excerpt
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
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary">Edit Post</Button>
          <Divider type="vertical" />
          <Button type="danger">Delete Post</Button>
        </span>
      ),
    },
  ];


  const { data, loading, error } = useQuery(GET_POSTS);
  if (loading) return <p>LOADING</p>;
  if (error) return <p>ERROR</p>;

  const { getPosts } = data;

  return (
    <ul className="list-group">
      <Table {...tableProps} columns={columns} dataSource={getPosts} />
    </ul>);
}


export default PostList;