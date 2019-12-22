import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import useForm from 'react-hook-form';

const GET_POST = gql`
query getPost($id: String!) {
    getPost(id: $id) {
      id
      title
      content
      excerpt
      author {
          name
      }
    }
  }
`;

const EditPost = (props) => {
    const PostID = props.history.location.state.id;
    const { register, errors, reset, handleSubmit } = useForm();
    let POST = { title: '', author: '', content: '', image: '', excerpt: '' };
    const [values, setValues] = useState({
        title: POST.title, author: POST.author, content: POST.content, image: POST.image, excerpt: POST.excerpt
    });


    const { data, loading, error } = useQuery(GET_POST, {
        variables: { id: PostID },
    });

    if (loading) return <p>LOADING</p>;
    if (error) return <p>ERROR</p>;

    const fetchedPost = data.getPost;
    if (fetchedPost) {
        const { title, author, content, image, excerpt } = fetchedPost;
        console.log('Fettched post ');
        console.log(fetchedPost);
    }

    console.log('Evo ih vrednosttt ii ');
    console.log(values);

    return (
        <h1>Show POSTT INFO</h1>);
}


export default EditPost;