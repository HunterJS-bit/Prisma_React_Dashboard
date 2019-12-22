import React from 'react';
import { useHistory } from "react-router-dom";

const Post = (props) => {

    let history = useHistory();

    const singlePost = props.post;
    const editPost = () => {
        console.log('Editt postt ');
        history.push({ pathname: "/create-post", state: { detail: singlePost.id } });
    }

    return (<React.Fragment>
        <p>{singlePost.title}</p>
        <button onClick={editPost}>Edit Post </button>
    </React.Fragment>)
}

export default Post;