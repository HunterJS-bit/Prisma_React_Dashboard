import React, { useState } from 'react';
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

    const [values, setValues] = useState({ title: '', author: '', content: '', image: '' })
    const [createPost, { val }] = useMutation(CREATE_POST);
    const { loading, error, data } = useQuery(GET_CONSTRIBUTORS);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }

    const handleFileChange = (e) => {
        console.log('Handle file change');
        const file = e.target.files[0];
        setValues({ ...values, image: file });
    }

    if (loading) return null;
    if (error) return `Error! Description ${error}`;

    return (<section id="create-post">
        <h2>Create Post</h2>
        <fieldset>
            <form onSubmit={(e) => {
                console.log('Create Post ');
                e.preventDefault();
                console.log(values);
                createPost({ variables: { input: values } });
            }}>
                <p className="form-group">
                    <label htmlFor="title">Post Title: </label>
                    <input type="text" name="title" id="name" value={values.title} onChange={handleInputChange} placeholder="Name" />
                </p>
                <p className="form-group">
                    <label htmlFor="author">Author: </label>
                    <select value={values.author} name="author" onChange={handleInputChange}>
                        {
                            data.getConstributors.map((user) => {

                                return (<option key={user.name} value={user.id}>{user.name} </option>);
                            })
                        }
                    </select>
                </p>
                <p className="form-group">
                    <label htmlFor="content" >Content: </label>
                    <textarea className="form-control" name="content"
                        value={values.content} onChange={handleInputChange} rows="8" cols="25" placeholder="Here write your content.."></textarea>
                </p>
                <p>
                    <input type="file" name="avatar" onChange={handleFileChange} />
                </p>
                <p><button>Create Post</button></p>
            </form>
        </fieldset>
    </section>);

};


export default CreatePost;