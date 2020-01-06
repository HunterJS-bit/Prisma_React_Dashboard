import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_POST = gql`
query getPost($id: String!) {
    getPost(id: $id) {
      id
      title
      content
      excerpt
      author {
          name
      }
    }
  }
`;


class SinglePost extends React.Component {

    componentDidMount() {
        console.log('HEllooo componenta je mauntovana');
    }
    render() {
        const id = this.props.match.params.id;
        console.log(this.props);
        return <Query query={GET_POST} variables={{ id }}>
            {({ loading, error, data }) => {
                if (loading) return null;
                if (error) return `Error! ${error}`;

                console.log(data);
                return (
                    <h1>Ovo je Post</h1>
                );
            }}
        </Query>;
    }
}

export default SinglePost;