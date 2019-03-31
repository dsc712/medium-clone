import React, { Component } from "react";
import { withRouter } from "next/router";
import axios from "axios";
import App from "../components/layouts/App";
import { Card } from "antd";
const { Meta } = Card;
import ReactHTMLParser from "react-html-parser";

class show extends Component {
  state = {
    data: ""
  };
  componentDidMount() {
    let id = this.props.router.query.id;
    axios.get("/stories/" + id).then(res => {
      this.setState({
        data: res.data.story
      });
    });
  }
  render() {
    const { id, title, body, featured_image } = this.state.data;
    return (
      <App style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ textAlign: "center" }}>
          <h1>{title}</h1>
          <img alt="example" src={featured_image} />
          <div
            style={{
              textAlign: "justify",
              margin: "auto",
              padding: "100px",
              fontSize: "1.5em"
            }}
          >
            <p>{ReactHTMLParser(body)}</p>
          </div>
        </div>
      </App>
    );
  }
}

export default withRouter(show);
