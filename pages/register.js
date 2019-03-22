import react, {Component} from 'react';
import cookie from 'js-cookie';
import {Form, Input, Icon, Card, Button, Head, Alert, message} from 'antd';
import Link from 'next/link';
import { withRouter } from "next/router";
import axios from 'axios';
import "../components/layouts/register.css"

const Item = Form.Item;


class Register extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        error: ""
    };

    handleSubmit = e => {
        console.log("ash submitting")
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
            message.success("You have been Successfully Registered!! ")
            this.props.router.push("/");

        } catch (err) {
            if (err.response) {
                this.setState({error: err.response.data.message});
            } else {
                this.setState({error: err.message});
            }
        }
    }

    render() {

        console.log(this.props.form);
        const decorator = this.props.form.getFieldDecorator;
        return (
            <div className={"wrapper"}>

                <div className={"form-wrapper"}>

                    <h1> Create Account</h1>
                    <div style={{"marginBottom": "10px"}}>
                        {this.state.error && <Alert
                            description={this.state.error}
                            type="error"
                        />
                        }</div>

                    <div>
                        <Form onSubmit={this.handleSubmit} layout={"vertical"} className={"form"}>
                            <Item style={{width: 400}} label="Name">
                                {
                                    decorator("name", {
                                        rules: [{
                                            min: 3, message: "Minimum Length 3"
                                        },
                                            {
                                                required: true, message: "Please input your Name!"
                                            }]
                                    })
                                    (<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}

                                            placeholder="Enter your name" />)
                                }
                            </Item>
                            <Item style={{width: 400}} label="Email">
                                {
                                    decorator("email", {
                                        rules: [{
                                            type: 'email', message: "Enter valid email"
                                        },
                                            {
                                                required: true, message: "please input your Email!"
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
                                    }, {
                                        validator: this.validateToNextPassword,
                                    }],
                                })(
                                    <Input type="password"
                                           prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                                )}
                            </Item>
                            <Item label="Confirm Password" className={"password"}>
                                {decorator('confirm', {
                                    rules: [{
                                        required: true, message: 'Please confirm your password!',
                                    }, {
                                        validator: this.compareToFirstPassword,
                                    }],
                                })(
                                    <Input
                                        type="password" onBlur={this.handleConfirmBlur}
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    />
                                )}
                            </Item>
                            <Button type="primary" htmlType="submit" block>Create Account</Button>
                        </Form>
                    </div>
                    <div >
                        <Link><a href="/login">Already Have an Account?</a></Link>
                    </div>
                </div>
            </div>
        )

    }
}

export default Form.create()(withRouter(Register));