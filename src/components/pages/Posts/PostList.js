import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Table } from 'antd';
import TableActions from './PostTableAction';


const GET_POSTS = gql`
  {
    getPosts {
      id
      title
      author {
         name
      }
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


  const { data, loading, error } = useQuery(GET_POSTS);
  if (loading) return <p>LOADING</p>;
  if (error) return <p>ERROR</p>;

  const { getPosts } = data;
  console.log(getPosts);
  return (
    <ul className="list-group">
      <Table {...tableProps} columns={columns} dataSource={getPosts} />
    </ul>);
}


export default PostList;