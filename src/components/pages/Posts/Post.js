import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";

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

const Post = (props) => {


  let history = useHistory();
  const prop = props;
  const singlePost = props.post;
  const [deletePost, { data }] = useMutation(REMOVE_POST);

  const goToEditPost = () => {
    history.push({ pathname: "/edit-post", state: { id: singlePost.id } });
  }

  const removePost = async () => {
    await deletePost({ variables: { id: singlePost.id }, refetchQueries: [{ query: GET_POSTS }] });

  }

  return (<React.Fragment>
    <p>{singlePost.title}</p>
    <button onClick={goToEditPost}>Edit Post </button>
    <button onClick={removePost}> Remove Post</button>
  </React.Fragment>)
}

export default Post;