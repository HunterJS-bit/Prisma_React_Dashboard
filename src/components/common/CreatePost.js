import React, { Component, useState } from 'react';
import { gql } from "apollo-boost";
import { useMutation } from '@apollo/react-hooks';


const CREATE_POST = gql`
mutation createPost($type: String!) {
    createPost(type: $type) {
      id
      type
    }
  }
`;

const CreatePost = () => {

    const [values, setValues] = useState({ title: '', author: '', content: '', image: {} })

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }

    return (<section id="create-post">
        <h2>Create Post</h2>
        <fieldset>
            <form  >
                <p className="form-group">
                    <label htmlFor="title">Post Title: </label>
                    <input type="text" name="title" id="name" value={values.title} onChange={handleInputChange} placeholder="Name" />
                </p>
                <p className="form-group">
                    <label htmlFor="author">Author: </label>
                    <input type="text" name="author" className="form-control"
                        value={values.author} onChange={handleInputChange} placeholder="Tag your name.." />
                </p>
                <p className="form-group">
                    <label htmlFor="content" >Content: </label>
                    <textarea className="form-control" name="content"
                        value={values.content} onChange={handleInputChange} rows="8" cols="25" placeholder="Here write your content.."></textarea>
                </p>
                <p>
                    <input type="file" name="avatar" />
                </p>
                <p><button>Create Post</button></p>
            </form>
        </fieldset>
    </section>);

};


export default CreatePost;