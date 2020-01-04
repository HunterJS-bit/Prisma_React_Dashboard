import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Divider, Button } from 'antd';

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
      excerpt
    }
  }
`;

const PostTableActions = (props) => {

    let history = useHistory();
    const Post = props.post;
    const [deletePost, { data }] = useMutation(REMOVE_POST);

    const goToEditPost = () => {
        history.push({ pathname: "/edit-post", state: { id: Post.id } });
    }

    const removePost = async () => {
        await deletePost({ variables: { id: Post.id }, refetchQueries: [{ query: GET_POSTS }] });
    }

    return (<span>
        <Button type="primary" onClick={goToEditPost}>Edit Post</Button>
        <Divider type="vertical" />
        <Button type="danger" onClick={removePost}>Delete Post</Button>
    </span>);
}


export default PostTableActions;