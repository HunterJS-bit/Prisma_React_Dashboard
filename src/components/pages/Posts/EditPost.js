import React, { useState } from 'react';
import DropZone from './../../common/DropZone';
import Editor from './../../common/Editor'
import gql from 'graphql-tag';
import { Form, Input, Button, Select } from 'antd';
import { useQuery, useMutation } from '@apollo/react-hooks';

const { Option } = Select;
const { TextArea } = Input;

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


    const { loadingConstributors, errorConst, data: constributors } = useQuery(GET_CONSTRIBUTORS);
    const { data: post, loading, error } = useQuery(GET_POST, {
        variables: { id: _id },
    });

    const [values, setValues] = useState({
        title: post ? post.title : '', author: post ? post.author : '',
        content: post ? post.content : '', image: post ? post.image : '', excerpt: post ? post.excerpt : ''
    })

    const [updatePost] = useMutation(UPDATE_POST);



    if (loading) return <p>LOADING</p>;
    if (error) return <p>ERROR</p>;
    let fetchedPost;
    if (post) {
        console.log('Post is hererer ');
        fetchedPost = post.getPost;
    }


    const handleInputChange = (e, event) => {
        let { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    const handleSelect = (value) => {
        setValues({ ...values, ['author']: value })
    }

    const handleFile = (file) => {
        setValues({ ...values, image: file });
    }

    const handleEditor = (content) => {
        console.log('Handle editor');
        setValues({ ...values, content: content });
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log('Submit form');
        console.log(values);
        updatePost({ variables: { id: _id, input: values } })
    }

    return (
        <div className="edit-form">
            <h2>Edit Post</h2>
            <fieldset>
                <Form onSubmit={submitForm} className="editPost-form">
                    <Form.Item label="Title">
                        <Input
                            name="title"
                            defaultValue={fetchedPost.title}
                            onChange={(value, event) => handleInputChange(event, value)}
                            placeholder="Title" />
                    </Form.Item>

                    <Form.Item label="Author">
                        <Select defaultValue={fetchedPost.author.name} style={{ width: 120 }} onSelect={(value, event) => handleSelect(value)}>
                            {
                                constributors &&
                                constributors.getConstributors && constributors.getConstributors.map((user) => {
                                    return (<Option key={user.name} value={user.id}>{user.name}</Option>);
                                })
                            }
                            <Option value=""></Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <DropZone file={fetchedPost.image} updateFile={handleFile} />
                    </Form.Item>
                    <Form.Item>
                        <Editor saveContent={handleEditor} />
                    </Form.Item>
                    <Form.Item label="Excerpt">
                        <TextArea name="excerpt" defaultValue={fetchedPost.excerpt} placeholder="Write your excerpt ..." allowClear onChange={(value, event) => handleInputChange(event, value)} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="form-submit-btn">
                        Save
                 </Button>
                </Form>
            </fieldset>

        </div>);
}


export default EditPost;