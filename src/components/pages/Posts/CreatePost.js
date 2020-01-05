import React, { useState } from 'react';
import DropZone from './../../common/DropZone';
import Editor from './../../common/Editor';
import { gql } from "apollo-boost";
import { Form, Input, Button, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/react-hooks';
import CreateEditForm from './CreateEditPost';

const { Option } = Select;
const { TextArea } = Input;

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

const CreatePost = (props) => {
    console.log(props);
    const historyState = props.history.location.state;
    console.log(historyState);

    const [values, setValues] = useState({ title: '', author: '', content: '', image: '', excerpt: '' })
    const [createPost, { val }] = useMutation(CREATE_POST);
    const { loading, error, data } = useQuery(GET_CONSTRIBUTORS);

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    const handleInputChange = (e, event) => {
        let { name, value } = event.target;
        setValues({ ...values, [name]: value })
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
    const onSubmit = (event, e) => {
        console.log('Create Post ');
        console.log(values);
        // createPost({ variables: { input: values } });
    };

    if (loading) return null;
    if (error) return `Error! Description ${error}`;

    return (<section id="create-post">
        <h2>Create Post</h2>
        <fieldset>
            <Form {...formItemLayout} onSubmit={onSubmit} className="createPost-form">
                <Form.Item label="Title">
                    <Input
                        name="title"
                        onChange={(value, event) => handleInputChange(event, value)}
                        placeholder="Title" />
                </Form.Item>
                <Form.Item label="Author">
                    <Select defaultValue="''" value={values.author} style={{ width: 120 }} onSelect={(value, event) => handleSelect(value)}>
                        {
                            data.getConstributors.map((user) => {
                                return (<Option key={user.name} value={user.id}>{user.name}</Option>);
                            })
                        }
                        <Option value=""></Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <DropZone file={values.image} updateFile={handleFile} />
                </Form.Item>
                <Form.Item>
                    <Editor saveContent={handleEditor} />
                </Form.Item>
                <Form.Item label="Excerpt">
                    <TextArea name="excerpt" value={values.excerpt} placeholder="Write your excerpt ..." allowClear onChange={(value, event) => handleInputChange(event, value)} />
                </Form.Item>
                <Button type="primary" htmlType="submit" className="form-submit-btn">
                    Create Post
                 </Button>

            </Form>

        </fieldset>
    </section>);

};


export default CreatePost;