import React, { Component } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import Editor from 'draft-js-plugins-editor';
import { withRouter } from 'next/router';
import axios from 'axios';
import { Button, Form, Input, Divider, notification, Card, message } from 'antd';
const Field = Form.Item;

import { ItalicButton, BoldButton, UnderlineButton } from 'draft-js-buttons';

import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css';

import createLinkPlugin from 'draft-js-anchor-plugin';
import 'draft-js-anchor-plugin/lib/plugin.css';

import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';

// import 'draft-js-mention-plugin/lib/plugin.css';

import createMarkdownPlugin from 'draft-js-markdown-plugin';

import createPrismPlugin from 'draft-js-prism-plugin';
import Prism from 'prismjs';
import 'prismjs/themes/prism-solarizedlight.css';


import './editor.css'
// import 'draft-js/dist/Draft.css'

// emoji plugin
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

// anchor plugin
const linkPlugin = createLinkPlugin();

// inline toolbar plugin
const inlineToolbarPlugin = createInlineToolbarPlugin();

const { InlineToolbar } = inlineToolbarPlugin;

const features = {
    inline: ['BOLD',
        'ITALIC',
        'CODE',
        'STRIKETHROUGH',
        'LINK',
        'IMAGE'
    ],

    block: [
        'CODE',
        'header-one',
        'header-two',
        'header-three',
        'header-four',
        'header-five',
        'header-six',
        'ordered-list-item',
        'unordered-list-item',
        'blockquote'
    ],
};

const markDownPlugin = createMarkdownPlugin({ features });
const prismPlugin = createPrismPlugin({ prism: Prism });

class MyEditor extends Component {

    constructor(props) {
        super(props);
        this.onChange = (editorState) => { this.setState({ editorState, body: this.getContentStateInHTML() }) };
        this.props.story && this.fetchStory(this.props.story);
    }

    state = {
        editorState: EditorState.createEmpty(),
        isLoading: false,
        isLoadingForm: false
    };

    handleKeyCommand = ( command, editorState ) => {
        let newState;
        newState = RichUtils.handleKeyCommand( editorState, command );
        if( newState ) {
            this.onChange(newState);
            return "handled"
        }
        return 'non-handled'
    };

    getContentStateInHTML = () => {
        return stateToHTML( this.state.editorState.getCurrentContent() );
    };

    async fetchStory(id) {
        try {
            this.setState({ isLoadingForm: true });
            const res = await axios.get(`/stories/${id}`);
            this.props.form.setFieldsValue({
                title: res.data.story.title,
                featured_image: res.data.story.featured_image,
            });
            this.setState({ body: res.data.story.body });
            this.convertHTMLToEditorState();
        } catch(err) {
            if(err.response) {
                notification.error({ message: err.response.data.message })
            } else {
                throw err;
            }
        }
        this.setState({ isLoadingForm: false });
    }

    convertHTMLToEditorState = () => {
        console.log( this.state.body );
        this.setState({editorState:  EditorState.createWithContent( stateFromHTML( this.state.body ) )});

    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields( ( err, values ) => {
            if(err) return;
            this.sendRequest(values);
        });
    };

    async sendRequest(values) {
        this.setState({ isLoading: true});
        try {
            let res;
            if( this.props.story ) {
                console.log("updating");
                res = await axios.put(`/stories/${ this.props.story }`, { ...values, story: this.state.body } );
                console.log(res.data.data);
            } else {
                console.log( this.state.body );
                res = await axios.post('/stories', { ...values, story: this.state.body } );
                console.log(res);
            }
            message.success("Story Saved Successfully");
            console.log(res);
            this.props.router.push('/settings/account');
        } catch(err) {
            if(err.response) {
                notification.error({ message: err.response.data.message })
            } else {
                throw err;
            }
        }
        this.setState({ isLoading: false });
    }

    myBlockStyleFn = ( contentBlock ) => {
        switch (contentBlock.getType()) {
            case 'code-block': return 'language-javascript';
            case 'atomic': return 'atomic';
            default: return null;
        }
    };

    render() {
        const decorator = this.props.form.getFieldDecorator;

        return (
            <Card style={{ width: '85vw' }} title="Create/Edit your story" loading={ this.state.isLoading }>
                <div  className={"editor"}>
                    <Form onSubmit={ this.onSubmit }>
                        <Field label={"Title of the story"}>
                            {
                                decorator('title',{
                                    rules: [{ required: true }]
                                })(<Input placeholder={"Write your catchy title here..."}/>)
                            }
                        </Field>
                        <Divider />
                        <Field label={"Featured Image"}>
                            {
                                decorator('featured_image',{
                                    rules: [{ required: true }]
                                })(<Input placeholder={"Paste URL of your featuring image..."}/>)
                            }
                        </Field>
                        <b>Story:</b>
                        <Divider />
                        <div style={{ padding: "5px", border: "1px solid #ddd", fontSize: "20px"}}>
                            <Editor
                                className="editor"
                                editorState={ this.state.editorState }
                                placeholder="fill your story with amazing ideas here..."
                                onChange={ this.onChange }
                                plugins={[
                                    emojiPlugin,
                                    inlineToolbarPlugin,
                                    linkPlugin,
                                    markDownPlugin,
                                    prismPlugin
                                ]}
                                handleKeyCommand={ this.handleKeyCommand }
                                blockStyleFn={ this.myBlockStyleFn }
                            />
                        </div>
                        <InlineToolbar>
                            {
                                (externalProps) => (
                                    <div>
                                        <BoldButton {...externalProps} />
                                        <ItalicButton {...externalProps} />
                                        <UnderlineButton {...externalProps} />
                                        <linkPlugin.LinkButton {...externalProps} />
                                    </div>
                                )
                            }
                        </InlineToolbar>
                        <EmojiSuggestions />
                        <div style={{  border: "1px solid #ddd", background: "#ddd",  borderTop: "none", padding: "5px" }}>
                            <EmojiSelect />
                        </div>
                    </Form>
                    <Divider />
                </div>
                <Button loading={ this.state.isLoading } htmlType="submit" onClick={ this.onSubmit }>Save</Button>
            </Card>
        );
    }
}


export default Form.create()( withRouter(MyEditor));
