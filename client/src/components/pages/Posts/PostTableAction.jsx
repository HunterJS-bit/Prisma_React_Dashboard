import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Divider, Modal, Button } from 'antd';

const { confirm } = Modal;

const REMOVE_POST = gql`
mutation removePost($id: String!) {
    removePost(id: $id)
  }
`;

const GET_POSTS = gql`
  {
    getPosts {
      id
      title
    }
  }
`;

const PostTableActions = (props) => {

  let history = useHistory();
  const Post = props.post;
  const [deletePost] = useMutation(REMOVE_POST);

  const goToEditPost = () => {
    history.push({ pathname: "/edit-post", state: { id: Post.id } });
  }

  const removePost = async () => {
    await deletePost({ variables: { id: Post.id }, refetchQueries: [{ query: GET_POSTS }] });
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this Post?',
      content: 'NOTE: This post will be deleted forever',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        removePost();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  return (<span>
    <Button type="primary" onClick={goToEditPost}>Edit Post</Button>
    <Divider type="vertical" />
    <Button type="danger" onClick={showDeleteConfirm}>Delete Post</Button>
  </span>);
}


export default PostTableActions;