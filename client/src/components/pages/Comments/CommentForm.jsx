import React from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
const { TextArea } = Input;

const CommentForm  = (props) => {

    const onSubmit = () => {
        console.log('Submit comment');
    };

    return (<div>
        <Form.Item>
            <TextArea rows={4}  />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>);
}

export default CommentForm;
