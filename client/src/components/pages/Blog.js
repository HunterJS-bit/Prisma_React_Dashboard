import React, { Component } from 'react';
import Card from './Card';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_BlOG_POSTS = gql`
query ($limit: Int!) {
    blog(limit: $limit) {
        id
        title
        excerpt  
    }
  }
`;

class Blog extends Component {


    render() {
        return (
            <Query query={GET_BlOG_POSTS} variables={{ limit: 3, skip: 0 }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    const { blog } = data;
                    return (<section id="blog">
                        {blog.map((post) =>
                            <Card key={post.title} post={post}></Card>
                        )}
                    </section>);
                }}
            </Query>
        )

    }
}

export default Blog;