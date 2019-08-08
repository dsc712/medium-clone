import react, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { withRouter } from "next/router";
import { Layout, Icon, Dropdown, Menu, Button, Avatar } from "antd";
import Link from "next/link";
import axios from "axios";
const { Header, Content, Footer } = Layout;
import Loading from "./Loading.jsx";
import "./app.css";
import 'draft-js/dist/Draft.css'

let isAuthenticated = false;

class App extends Component {
  state = {
    usr: ""
  };

  constructor(props) {
    super(props);
  }

  logout = e => {
    this.props.dispatch(actions.auth.logout());
  };

  menu = () => (
    <Menu position="top" style={{  width: "150%" }}>
      <Menu.Item
        key="1"
        onClick={e => this.props.router.push("/settings/account")}
      >
        <Icon type="user" />
        Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={e => this.props.router.push("/story/new")}>
        <Icon type="edit" />
        New Story
      </Menu.Item>
      <Menu.Item key="3" onClick={e => this.props.router.push("/home")}>
        <Icon type="read" />
        Read Stories
      </Menu.Item>
      <Menu.Item key="4" onClick={this.logout}>
        <Icon type="logout" /> Logout
      </Menu.Item>
    </Menu>
  );

  async authenticate() {
    this.setState({ isAuthenticating: true });
    try {
      const data = await axios.get("/me");
      const user = data.data;
      this.props.dispatch(actions.auth.login({ user }));
      isAuthenticated = true;
    } catch (err) {
      if (err.response && err.response.status === 401) {
        isAuthenticated = false;
        this.props.router.push({ pathname: "/login" });
      }
      // throw err;
    }
    this.setState({ isAuthenticating: false });
  }

  componentWillMount() {
    if (!isAuthenticated) {
      this.authenticate();
    }
  }

  componentWillUnmount() {}

  componentDidMount() {}

  shouldComponentUpdate(props) {
    if (isAuthenticated && !props.auth.check) {
      isAuthenticated = false;
      this.props.router.push({ pathname: "/login" });
      return false;
    }
    return true;
  }

  render() {
    return (
      <Loading isLoading={this.state.isAuthenticating}>
        <Layout>
          <Header
            style={{
              display: "flex",
              color: "#fff",
              justifyContent: "space-between",
              position: "fixed",
              zIndex: 100,
              width: "100%"
            }}
          >
            <Link href={"/home"}>
              <b>
                <Icon
                  style={{ fontSize: "32px", cursor: "pointer" }}
                  type="medium"
                />
              </b>
            </Link>
            {isAuthenticated ? (
              <Dropdown overlay={this.menu()}>
                <Button style={{ marginTop: "15px", padding: "5px" }}>
                  <span>{ this.props.auth.user.photo ? <Avatar size={"small"} src={ this.props.auth.user.photo } />  : <Avatar size={"small"} style={{ backgroundColor: "#f56a00"}} icon="user" />}</span>
                  <span style={{ marginLeft: "10px", marginRight: "10px" }}>{ this.props.auth.user.name } <Icon type="down" /></span>
                </Button>
              </Dropdown>
            ) : (
              ""
            )}
          </Header>
          <Content style={{ margin: "100px auto", minHeight: "100vh" }}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: "center", fontSize: "20px" }}>
            Medium Clone ©2019 Made with <Icon type="heart" />
          </Footer>
        </Layout>
      </Loading>
    );
  }
}

const mapDispatchToProps = dispatch => ({ dispatch });
const mapStateToProps = ({ auth, app }) => ({ auth, app });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
