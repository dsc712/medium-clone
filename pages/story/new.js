import react, { Component } from 'react';
import App from '../../components/layouts/App';
import Editor from '../../components/ui/Editor';

class Story extends Component {
    static async getInitialProps({ query }) {
        return query;
    }

    componentDidMount() {
        console.log( this.props );
    }

    render() {
        return (
            <App>
                <Editor story={ this.props.story }/>
            </App>
        )
    }
}

export default Story;
