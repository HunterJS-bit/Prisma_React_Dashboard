import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Editor, EditorState, convertFromRaw } from "draft-js";

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

    render() {
        const id = this.props.match.params.id;
        return <Query query={GET_POST} variables={{ id }}>
            {({ loading, error, data }) => {
                if (loading) return null;
                if (error) return `Error! ${error}`;

                const { title, content, author } = data.getPost;
                const convertedContent = convertFromRaw(content);
                const editorState = EditorState.createWithContent(convertedContent);
                console.log(editorState);

                return (
                    <section className="single-post">
                        <h1>Single Post</h1>
                        <h2>{title}</h2>
                        <div className="content">
                            <Editor editorState={editorState} readOnly={true} />
                        </div>
                    </section>
                );
            }}
        </Query>;
    }
}

export default SinglePost;