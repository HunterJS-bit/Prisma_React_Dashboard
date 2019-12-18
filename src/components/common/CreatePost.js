import React, { useState } from 'react';
import DropZone from './DropZone';
import useForm from 'react-hook-form';
import { gql } from "apollo-boost";
import { useMutation, useQuery } from '@apollo/react-hooks';


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
    const { register, errors, reset, handleSubmit } = useForm();
    const [values, setValues] = useState({ title: '', author: '', content: '', image: '' })
    const [createPost, { val }] = useMutation(CREATE_POST);
    const { loading, error, data } = useQuery(GET_CONSTRIBUTORS);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }

    const handleFile = (file) => {
        setValues({ ...values, image: file });
    }

    const onSubmit = (event, e) => {
        console.log('Create Post ');
        createPost({ variables: { input: values } });
    };

    if (loading) return null;
    if (error) return `Error! Description ${error}`;

    return (<section id="create-post">
        <h2>Create Post</h2>
        <fieldset>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className="form-group">
                    <label htmlFor="title">Post Title: </label>
                    <input type="text" name="title" id="name"
                        value={values.title} onChange={handleInputChange}
                        aria-invalid={errors.title ? 'true' : 'false'}
                        aria-describedby="error-title-required error-title-maxLength"
                        ref={register({ required: true, maxlength: 20 })}
                        placeholder="Name" />
                    <span>{errors.title && 'Title is required'} </span>
                </p>
                <p className="form-group">
                    <label htmlFor="author">Author: </label>
                    <select value={values.author} name="author"
                        onChange={handleInputChange} ref={register({ required: true })}>
                        {
                            data.getConstributors.map((user) => {

                                return (<option key={user.name} value={user.id}>{user.name} </option>);
                            })
                        }
                    </select>
                    <span>{errors.author && 'Author is required'} </span>
                </p>
                <p className="form-group">
                    <label htmlFor="content" >Content: </label>
                    <textarea className="form-control" name="content"
                        value={values.content}
                        onChange={handleInputChange} ref={register}
                        rows="8" cols="25" placeholder="Here write your content.."></textarea>
                </p>
                <DropZone file={values.image} updateFile={handleFile} />
                <p><button type="submit">Create Post</button></p>

            </form>
        </fieldset>
    </section>);

};


export default CreatePost;