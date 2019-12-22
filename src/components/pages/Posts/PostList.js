import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Post from './Post';

const GET_POSTS = gql`
  {
    getPosts {
      id
      title
      excerpt
    }
  }
`;

const PostList = () => {
    const { data, loading, error } = useQuery(GET_POSTS);
    if (loading) return <p>LOADING</p>;
    if (error) return <p>ERROR</p>;

    const { getPosts } = data;

    const editPost = () => {
        console.log('Ediit the postt ');
    }

    return (
        <ul className="list-group">
            {
                getPosts.map((post, index) => {
                    return <Post key={index} post={post}></Post>
                })
            }
        </ul>);
}


export default PostList;