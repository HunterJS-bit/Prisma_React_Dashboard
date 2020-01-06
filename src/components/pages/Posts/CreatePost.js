import React from 'react';
import { gql } from "apollo-boost";
import { useMutation, useQuery } from '@apollo/react-hooks';
import CreateEditForm from './CreateEditPost';


const CREATE_POST = gql`
mutation createPost($input: CreatePost!) {
    createPost(input: $input)
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

const CreatePost = () => {

    const [createPost, { val }] = useMutation(CREATE_POST);
    const { loading, error, data } = useQuery(GET_CONSTRIBUTORS);


    const onSubmit = (formData) => {
        console.log('Create Post ');
        console.log(formData)
        // createPost({ variables: { input: formData } });
    };

    if (loading) return null;
    if (error) return `Error! Description ${error}`;
    // props to detect if for is edit or create
    const Props = { id: false, users: data, submit: onSubmit };
    return (<section id="create-post">
        <CreateEditForm edit={Props} />
    </section>);

};


export default CreatePost;