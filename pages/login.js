import react, { Component } from "react";
import cookie from "js-cookie";
import { Form, Input, Icon, Card, Button, Head, Alert } from "antd";
import Link from "next/link";
const Item = Form.Item;
import App from "../components/layouts/App.jsx";
import { withRouter } from "next/router";
import axios from "axios";

class Login extends Component {
  state = {
    error: ""
  };

  componentDidMount() {}

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
      const { data } = await axios.post("/login", values);
      cookie.session(data.token);
      this.props.router.push("/");
    } catch (err) {
      if (err.response) {
        this.setState({ error: err.response.data.message });
      } else {
        this.setState({ error: err.message });
      }
    }
  }

  render() {
    const decorator = this.props.form.getFieldDecorator;
    return (
      <App style={{ height: "100vh" }}>
        <Card style={{ padding: "10px 30px" }}>
          <Form style={{ width: 400 }} onSubmit={this.handleSubmit}>
            <Item label={"Email"}>
              {decorator("email", {
                rules: [{ required: true, message: "Please enter your email" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                />
              )}
            </Item>
            <Item label={"Password"}>
              {decorator("password", {
                rules: [
                  { required: true, message: "Please enter your password" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Item>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
              <Link href="/register">
                <a>Create new account</a>
              </Link>
            </div>
            <div style={{ marginTop: "10px" }}>
              {this.state.error && (
                <Alert description={this.state.error} type="error" />
              )}
            </div>
          </Form>
        </Card>
      </App>
    );
  }
}

export default Form.create()(withRouter(Login));
