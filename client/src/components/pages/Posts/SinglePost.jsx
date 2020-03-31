import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Editor, EditorState, convertFromRaw } from "draft-js";
import CommentForm from '../Comments/CommentForm';
import CommentList from "../Comments/CommentsList";


const GET_POST = gql`
query getPost($id: String!) {
    getPost(id: $id) {
      id
      title
      content
      excerpt
      comments {
        id
        author
        content
      }
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
      postId: null,
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

                const { id, title, content, author, comments } = data.getPost;
                console.log(data.getPost);

                let editorState = Object.keys(content).length === 0 ? EditorState.createEmpty() : EditorState.createWithContent(convertFromRaw(content));

                return (
                    <section className="single-post">
                        <h2>{title}</h2>
                        <div className="content">
                            <Editor editorState={editorState} readOnly={true} />
                        </div>
                        <div className="post-author">
                            <p>Posted by: <b>{author ? author.name : ''}</b></p>
                        </div>
                        <CommentList comments={comments}/>
                        {/* <Mutation mutation={POST_COMMENT}>*/}
                        {/*  {(postComment, { data }) => (*/}
                        {/*  // <form className="comment-section" onSubmit={e => {*/}
                        {/*  //     e.preventDefault();*/}
                        {/*  //     postComment({ variables: { input: {...this.state, postId: id } }});*/}
                        {/*  //   }}>*/}
                        {/*  //     <label>Name</label>*/}
                        {/*  //     <input onChange={(e) => this.onChange('author', e)} placeholder="Your Name"></input>*/}
                        {/*  //     <textarea onChange={(e) => this.onChange('comment', e)} placeholder="Your Comment"></textarea>*/}
                        {/*  //     <button type="submit">Leave comment</button>*/}
                        {/*  // </form>*/}
                        {/*   )}*/}
                        {/*</Mutation>*/}
                    </section>
                );
            }}
        </Query>;
    }
}

export default SinglePost;
