import React from 'react';
import { Link } from "react-router-dom";

const Card = (props) => {
    const post = props.post;

    const mystyle = {
        color: "gray",
        backgroundColor: "white",
        padding: "15px 10px",
        fontFamily: "Arial",
        margin: "10px",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        maxWidth: "250px",
        cursor: "pointer",

    };



    return (<Link to={`post/${post.id}`}>
        <div className="card" style={mystyle} >
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
        </div>
    </Link>);
}


export default Card;