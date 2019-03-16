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
        }, 1000);
    }

    state = {
        isLoading: true
    };

    render() {
        return (
            <Loading isLoading={ this.state.isLoading }>
                <Layout>
                        <Header style={{ position: 'fixed', zIndex: 1, width: '100%'}}>
                           <Navbar />
                        </Header>
                        <Content style={{ "margin": "100px auto", "minHeight": "100vh" }}>
                            { this.props.children }
                        </Content>
                </Layout>
            </Loading>
        )
    }
}

export default App;