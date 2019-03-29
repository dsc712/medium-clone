import react, {Component} from 'react';
import cookie from 'js-cookie';
import {Form, Input, Icon, Card, Button, Head, Alert, message, Layout} from 'antd';
import Link from 'next/link';
import {withRouter} from "next/router";
import axios from 'axios';

const Item = Form.Item;
const {Header, Content, Footer} = Layout;

class Register extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        error: "",
        confirmPassword: ""
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.sendRequest(values);
        });
    };

    async sendRequest(values) {
        try {
            const {data} = await axios.post("/register", values);
            cookie.session(data.token);
            message.success("You have been Successfully Registered!! ");
            this.props.router.push("/");

        } catch (err) {
            if (err.response) {
                this.setState({error: err.response.data.message});
            } else {
                this.setState({error: err.message});
            }
        }
    }

    validateToNextPassword = (e) => {
        const value = e.target.value;
        this.setState({password: value});
    };

    compareToFirstPassword = (e) => {
        const value = e.target.value;
        this.setState({confirmPassword: value});
    };

    checkPassword() {
        console.log(this.state.password, this.state.confirmPassword);
        if (this.state.password !== this.state.confirmPassword) {
            return "warning"
        }
        return "success";
    };

    getHelp() {
        if (this.state.password !== this.state.confirmPassword) {
            return "Password doesn't match"
        }
        return "Password matches";
    };

    render() {
        const decorator = this.props.form.getFieldDecorator;
        return (
            <Layout>
                <Header style={{
                    display: "flex",
                    color: "#fff",
                    justifyContent: "space-between",
                    position: 'fixed',
                    zIndex: 1,
                    width: '100%'
                }}>
                    <Link href={"/"}><b><Icon style={{"fontSize": "32px", "cursor": "pointer"}}
                                              type="medium"/></b></Link>
                </Header>
                <Content>
                    <Card style={{width: 500, margin: '85px auto', borderRadius: "3%", padding: "10px 30px"}}
                          title="Create Account">
                        <div style={{"marginBottom": "10px"}}>
                            {this.state.error && <Alert
                                description={this.state.error}
                                type="error"
                            />
                            }</div>

                        <div>
                            <Form onSubmit={this.handleSubmit} layout={"vertical"}>
                                <Item label="Name">
                                    {
                                        decorator("name", {
                                            rules: [{
                                                min: 3, message: "Minimum Length 3"
                                            },
                                                {
                                                    required: true, message: "Please input your Name!"
                                                }]
                                        })
                                        (
                                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="Enter your name"/>
                                        )
                                    }
                                </Item>
                                <Item label="Email">
                                    {
                                        decorator("email", {
                                            rules: [{
                                                type: 'email', message: "Enter a valid email"
                                            },
                                                {
                                                    required: true, message: "Please input your Email!"
                                                }]
                                        })
                                        (<Input
                                            prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            type={"email"}
                                            placeholder="Email"/>)
                                    }
                                </Item>
                                <Item label="Password" className={"password"}>
                                    {decorator('password', {
                                        rules: [{
                                            required: true, message: 'Please input your password!',
                                        }],
                                    })(
                                        <Input onChange={this.validateToNextPassword}
                                               type="password"
                                               placeholder={"Password"}
                                               prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                                    )}
                                </Item>
                                <Item label="Confirm Password" className={"password"} hasFeedback
                                      validateStatus={this.checkPassword()} help={this.getHelp()}>
                                    {decorator('confirm', {
                                        rules: [{
                                            required: true, message: 'Please confirm your password!',
                                        }],
                                    })(
                                        <Input
                                            onChange={this.compareToFirstPassword}
                                            placeholder={"Confirm Password"}
                                            type="password"
                                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        />
                                    )}
                                </Item>
                                <Button type="primary" htmlType="submit" block>Create Account</Button>
                            </Form>
                        </div>
                        <div style={{"textAlign": "center", "marginTop": "10px"}}>
                            <Link href="/login">Already Have an Account?</Link>
                        </div>
                    </Card>
                </Content>
                <Footer style={{textAlign: 'center', fontSize: '20px'}}>
                    Medium Clone ©2019
                    Made with <Icon type="heart"/>
                </Footer>
            </Layout>

        )

    }
}

export default Form.create()(withRouter(Register));