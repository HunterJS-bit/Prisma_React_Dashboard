import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import CreateEditForm from './CreateEditPost';


const GET_POST = gql`
query getPost($id: String!) {
    getPost(id: $id) {
      id
      title
      content
      excerpt
      isPublished
      author {
          name
      }
    }
  }
`;

const GET_CONSTRIBUTORS = gql`
  {
    getConstributors {
      id
      name
    }
  }
`;

const UPDATE_POST = gql`
mutation updatePost($id: String!, $input: CreatePost!){
  updatePost(id: $id, input: $input) {
    id
  }
}
`;;

const EditPost = (props) => {
  const _id = props.history.location.state.id;

  const { loadingConstributors, errorConst, data } = useQuery(GET_CONSTRIBUTORS);
  const { data: post, loading, error } = useQuery(GET_POST, {
    variables: { id: _id },
  });

  const [updatePost] = useMutation(UPDATE_POST);

  if (loadingConstributors) {
    return <p>LOADING CONSTRIBUTORS</p>;
  }
  if (errorConst) return <p>ERROR</p>;

  if (loading) return <p>LOADING</p>;
  if (error) return <p>ERROR</p>;
  let fetchedPost;
  if (post) {
    console.log('Post is hererer ');
    fetchedPost = post.getPost;
    console.log(fetchedPost);
  }

  const submitForm = (formData, id) => {
    console.log('Submit form');
    console.log(formData);
    console.log(id);
    updatePost({ variables: { id: id, input: formData } })
  }

  const Props = { id: _id, users: data, article: fetchedPost, submit: submitForm };
  return (
    <section id="edit-post">
      <CreateEditForm edit={Props} />
    </section>);
}


export default EditPost;