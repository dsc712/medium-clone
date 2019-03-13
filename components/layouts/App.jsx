import react, { Component } from 'react';
import { Layout } from 'antd';
const { Header, Content } = Layout;
import Loading from './Loading.jsx';
import Navbar from './Navbar.jsx';
import './app.css';
class App extends Component {
    componentDidMount() {
        setTimeout( () => {
            this.setState({ isLoading: false })
        }, 3000);
    }

    state = {
        isLoading: true
    };

    render() {
        return (
            <Loading isLoading={ this.state.isLoading }>
                <Layout>
                        <Header>
                           <Navbar />
                        </Header>
                </Layout>
            </Loading>
        )
    }
}

export default App;