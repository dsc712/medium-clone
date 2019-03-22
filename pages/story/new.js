import react, { Component } from 'react';
import App from '../../components/layouts/App';
import Editor from '../../components/ui/Editor';

class Story extends Component {
    render() {
        return (
            <App>
                <Editor />
            </App>
        )
    }
}

export default Story;
