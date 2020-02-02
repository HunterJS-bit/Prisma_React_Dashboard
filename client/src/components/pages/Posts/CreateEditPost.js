import React, { useState } from 'react';
import DropZone from '../../common/DropZone';
import Editor from './../../common/Editor';
import { Form, Input, Button, Select, Checkbox } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const PostForm = (props) => {

    const isEdit = props.edit.id; // detect if is create form or not
    const constributors = props.edit.users;
    let emptyArticle = { title: '', author: { name: '' }, content: {}, isPublished: false, image: '', excerpt: '' };
    const Article = isEdit ? props.edit.article : emptyArticle;

    const [formValues, setValues] = useState({
        title: '', author: '',
        content: {}, image: '', excerpt: '', isPublished: false
    })
    /** FORM LAYOUT  */
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

    const handleInput = (e, event) => {
        let { name, value } = event.target;
        setValues({ ...formValues, [name]: value });
    };

    const handleCheckbox = (e, event) => {
        let { name, checked } = event.target;
        setValues({ ...formValues, [name]: checked });
    }

    const handleSelect = (value) => {
        setValues({ ...formValues, 'author': value })
    }

    const handleFile = (file) => {
        setValues({ ...formValues, image: file });
    }

    const handleEditor = (content) => {
        setValues({ ...formValues, content: content });
    }

    const submitForm = (e) => {
        e.preventDefault();
        // todo detect if any of values is changed before submiting the form
        props.edit.submit(formValues, isEdit);
    };

    return (<div className="edit-form">
        <h2>{isEdit ? 'Edit Post' : 'Add Post'}</h2>
        <fieldset>
            <Form {...formItemLayout} onSubmit={submitForm} className="post-form">
                <Form.Item label="Title">
                    <Input
                        name="title"
                        defaultValue={Article.title}
                        onChange={(value, event) => handleInput(event, value)}
                        placeholder="Title" />
                </Form.Item>
                <Form.Item label="Excerpt">
                    <TextArea name="excerpt" defaultValue={Article.excerpt} placeholder="Write your excerpt ..." allowClear onChange={(value, event) => handleInput(event, value)} />
                </Form.Item>
                <Form.Item label="Author">
                    <Select defaultValue={Article.author.name} style={{ width: 120 }} onSelect={(value, event) => handleSelect(value)}>
                        {
                            constributors &&
                            constributors.getConstributors && constributors.getConstributors.map((user) => {
                                return (<Option key={user.name} value={user.id}>{user.name}</Option>);
                            })
                        }
                        <Option value=""></Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Publish">
                    <Checkbox name="isPublished" defaultChecked={Article.isPublished } onChange={(value, event) => handleCheckbox(event, value)}>Publish</Checkbox>,
                </Form.Item>
                <Form.Item>
                    <DropZone file={Article.image} updateFile={handleFile} />
                </Form.Item>
                <Form.Item>
                    <Editor content={Article.content} saveContent={handleEditor} />
                </Form.Item>
                <Button type="primary" htmlType="submit" className="form-submit-btn">
                    {isEdit ? 'Save' : 'Create'}
                </Button>
            </Form>
        </fieldset>
    </div>);

}


export default PostForm;