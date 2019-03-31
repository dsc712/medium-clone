import React, { Component } from "react";
import { Card, Avatar, Divider } from "antd";
const { Meta } = Card;

export class Story extends Component {
  render() {
    console.log(this.props.story);
    const { title, body, featured_image } = this.props.story;
    return (
      <Card
        style={{ width: "85vw", marginTop: "15px" }}
        loading={this.props.loading}
      >
        <Meta avatar={<Avatar src={featured_image} />} title={title} />
        <Divider />
        {body}
      </Card>
    );
  }
}

export default Story;
