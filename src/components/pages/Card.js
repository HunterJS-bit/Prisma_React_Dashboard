import React from 'react';

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


    return (<div className="card" style={mystyle}>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
    </div>);
}


export default Card;