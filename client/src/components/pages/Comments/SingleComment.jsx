import React from 'react';
import { Comment, Tooltip, Avatar } from 'antd';

const SingleComment = (props) => {

    const { comment } = props;
    console.log('Dataaa');
    console.log(comment);

    const actions = [<span key="comment-basic-reply-to" >Reply to</span>];

    return (  <Comment
        actions={actions}
        author={<a>{comment.author}</a>}
        avatar={
            <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
            />
        }
        content={
            <p>
                { comment.content }
            </p>
        }
    />);
};

export default SingleComment;
