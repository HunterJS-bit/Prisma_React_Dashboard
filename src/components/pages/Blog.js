import React, { Component } from 'react';
import Card from './Card';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_BlOG_POSTS = gql`
query ($postCount: Int!) {
    getPosts(postCount: $postCount) {
      id
      title
      excerpt
    }
  }
`;

class Blog extends Component {


    render() {
        return (
            <Query query={GET_BlOG_POSTS} variables={{ postCount: 3 }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    const { getPosts } = data;
                    return (<section id="blog">
                        {getPosts.map((post) =>
                            <Card key={post.title} post={post}></Card>
                        )}
                    </section>);
                }}
            </Query>
        )

    }
}

export default Blog;