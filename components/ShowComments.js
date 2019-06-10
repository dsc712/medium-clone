import React, { Component } from "react";
import { Divider, Card, Avatar } from "antd";
import Axios from "axios";
const { Meta } = Card;
import moment from "moment";

class Showcomments extends Component {
  state = {
    user: ""
  };
  componentDidMount() {
    let id = this.props.comment.created_by;
    Axios.get("/users/" + id).then(res => {
      this.setState({
        user: res.data.user
      });
      console.log("user", res);
    });
  }
  render() {
    const { created_at, name, body, user } = this.props.comment;

    console.log(this.props.comment);
    return (
      <Card style={{ width: "75%", marginTop:"20px", marginLeft: "20vw", borderRadius: "10px" }}>
        <Meta
          avatar={
            user && user.photo ? (
              <Avatar src={user.photo} />
            ) : (
              <Avatar style={{ backgroundColor: "#f56a00" }} icon="user" />
            )
          }
          title={this.state.user && this.state.user.name}
        />
        <h6>{moment(created_at).fromNow()}</h6>
        <Divider />
        <p>{body}</p>
      </Card>
    );
  }
}
export default Showcomments;
