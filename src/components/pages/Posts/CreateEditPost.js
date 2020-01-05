import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;
const { TextArea } = Input;


const PostForm = (props) => {

    const isEdit = props.edit;
    let emptyArticle = { title: '', author: '', content: '', image: '', excerpt: '' };
    const Article = isEdit ? props.article : emptyArticle;

    const [formValues, setValues] = useState({
        title: '', author: '',
        content: '', image: '', excerpt: ''
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

    const submitForm = (e) => {
        e.preventDefault();
    };

    const handleInput = (e, event) => {
        let { name, value } = event.target;
        setValues({ ...formValues, [name]: value });
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
                <Button type="primary" htmlType="submit" className="form-submit-btn">
                    {isEdit ? 'Save' : 'Create'}
                </Button>
            </Form>
        </fieldset>
    </div>);

}


export default PostForm;