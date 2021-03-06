import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorComponent = (props) => {

    EditorComponent.defaultProps = {
        content: {}
    }

    const content = props.content;
    let defaultState;
    if (!content) {
        defaultState = EditorState.createEmpty();
    } else {
        defaultState =  EditorState.createWithContent(convertFromRaw(content));
    };
    const [state, setEditorState] = useState({ editorState: defaultState })


    const onEditorStateChange = (data) => {
        setEditorState({ ...state, editorState: data });
        const contentState = data.getCurrentContent();
        const rawState = convertToRaw(contentState);
        props.saveContent(rawState);

    }

    return (<Editor
        editorState={state.editorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        onEditorStateChange={onEditorStateChange}
    />);

}

export default EditorComponent;