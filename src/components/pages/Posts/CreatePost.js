import React, { useState } from 'react';
import DropZone from './../../common/DropZone';
import Editor from './../../common/Editor';
import useForm from 'react-hook-form';
import { gql } from "apollo-boost";
import { Form, Icon, Input, Button, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/react-hooks';

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

const CreatePost = () => {
    const { register, errors, reset, handleSubmit } = useForm();
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

    const handleInputChange = e => {
        // const { name, value } = e.target;
        // todo check select dropdown not working as expected
        console.log(e);
        // setValues({ ...values, [name]: value })
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
        createPost({ variables: { input: values } });
    };

    if (loading) return null;
    if (error) return `Error! Description ${error}`;

    return (<section id="create-post">
        <h2>Create Post</h2>
        <fieldset>
            <Form {...formItemLayout} onSubmit={handleSubmit(onSubmit)} className="login-form">
                <Form.Item label="Title">
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Title"
                    />
                </Form.Item>
                <Form.Item label="Author">
                    <Select defaultValue={{ name: 'author' }} labelInValue value={values.author} style={{ width: 120 }} onChange={handleInputChange}>
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
                    <TextArea value={values.excerpt} placeholder="Write your excerpt ..." allowClear onChange={handleInputChange} />
                </Form.Item>
                <Button type="primary" htmlType="submit" className="form-submit-btn">
                    Create Post
                 </Button>

            </Form>

        </fieldset>
    </section>);

};


export default CreatePost;