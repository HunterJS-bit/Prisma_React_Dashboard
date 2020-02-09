import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
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


const POST_COMMENT =  gql`
mutation postComment($input: Comment!) {
    postComment(input: $input)
  }
`;

class SinglePost extends React.Component {


    state = {
      author: null,
      comment: null,
    };

    onChange = (field, e) => {
      this.setState({[field]: e.target.value});
    }

    render() {
        const id = this.props.match.params.id;
        return <Query query={GET_POST} variables={{ id }}>
            {({ loading, error, data }) => {
                if (loading) return null;
                if (error) return `Error! ${error}`;

                const { title, content, author } = data.getPost;

                let editorState = !content ? EditorState.createEmpty() : EditorState.createWithContent(convertFromRaw(content));

                return (
                    <section className="single-post">
                        <h2>{title}</h2>
                        <div className="content">
                            <Editor editorState={editorState} readOnly={true} />
                        </div>
                        <div className="post-author">
                            <p>Posted by: <b>{author ? author.name : ''}</b></p>
                        </div>
                         <Mutation mutation={POST_COMMENT}>
                          {(addPost, { data }) => (
                          <form className="comment-section" onSubmit={e => {
                              e.preventDefault();
                              addPost({ variables: { input: this.state }});
                            }}>
                              <label>Name</label>
                              <input onChange={(e) => this.onChange('author', e)} placeholder="Your Name"></input>
                              <textarea onChange={(e) => this.onChange('comment', e)} placeholder="Your Comment"></textarea>
                              <button type="submit">Leave comment</button>
                          </form>
                           )}
                        </Mutation>
                    </section>
                );
            }}
        </Query>;
    }
}

export default SinglePost;