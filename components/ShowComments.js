import React, { Component } from "react";
import { Divider, Card } from "antd";
const { Meta } = Card;

class ShowComments extends Component {
  render() {
    const { id, name, body } = this.props.info;
    console.log("op", this.props.info);
    return (
      <Card>
        <Meta title={id} />
        <Divider />
        <p>{body}</p>
      </Card>
    );
  }
}
export default ShowComments;
