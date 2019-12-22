import React from 'react';
import { useHistory } from "react-router-dom";

const Post = (props) => {

    let history = useHistory();

    const singlePost = props.post;

    const goToEditPost = () => {
        history.push({ pathname: "/edit-post", state: { id: singlePost.id } });
    }

    return (<React.Fragment>
        <p>{singlePost.title}</p>
        <button onClick={goToEditPost}>Edit Post </button>
    </React.Fragment>)
}

export default Post;