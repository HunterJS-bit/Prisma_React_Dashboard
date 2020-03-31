import React from 'react';
import SingleComment from "./SingleComment";

const CommentList = (props) => {
    const { comments } = props;
    console.log('Evo ih komentari');
    console.log(comments);

    const listItems = comments.map((comment) =>
        <SingleComment key={comment.id} comment={comment} />
    );

    return (<div><p>comment list</p>
        { listItems }
    </div>)

};

export default  CommentList;
