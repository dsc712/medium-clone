import react, { Component } from 'react';
import cookie from 'js-cookie';
import { Form, Input, Icon, Card, Button, Head, Alert } from 'antd';
import Link from 'next/link';
const Item = Form.Item;
import App from '../components/layouts/App.jsx'
import { withRouter } from 'next/router';
import axios from 'axios';

class Login extends Component {
    state = {
        error: '',
        isChecking: false
    };

    componentDidMount() {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err) {
                return;
            }
            this.sendRequest(values);
        });
    };

    async sendRequest(values) {

        this.setState({ isChecking: true });
        try	{
            const { data } = await axios.post('/login', values );
            cookie.session(data.token);
            this.props.router.push('/');
        } catch(err) {
            if(err.response) {
                this.setState({ error: err.response.data.message })
            } else {
                this.setState({ error: err.message });
            }
        }
        this.setState({ isChecking: false });
    }

    render() {
        const decorator = this.props.form.getFieldDecorator;
        return (
            <App style={{ "height": "100vh"}}>
                <Card style={{ "padding": "10px 30px", "borderRadius": "3%"}}>
                    <div style={{"marginBottom": "10px"}}>
                        { this.state.error && <Alert
                            description={ this.state.error }
                            type="error"
                        />
                        }</div>
                    <Form style={{ width: 400 }} onSubmit={ this.handleSubmit }>
                        <Item style={{ width: 400 }} label={"Email"}>
                            {
                                decorator('email', {
                                    rules: [{ required: true, message: 'Please enter your email'}]
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                                )
                            }
                        </Item>
                        <Item style={{ width: 400 }} label={"Password"}>
                            {
                                decorator('password', {
                                    rules: [{ required: true, message: 'Please enter your password'}]
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                )
                            }
                        </Item>
                        <Button loading={ this.state.isChecking } type="primary" htmlType="submit" block>Login</Button>
                        <div style={{ "margin": "25px auto" }}>
                            <Link href="/register"><a>Create new account</a></Link>
                        </div>
                    </Form>
                </Card>
            </App>
        );
    }
}

export default Form.create()(withRouter(Login));