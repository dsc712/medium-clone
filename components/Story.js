import React, { Component } from "react";
import { Card, Avatar, Divider } from "antd";
const { Meta } = Card;
import Link from "next/link";

export class Story extends Component {
  render() {
    const { title, body, featured_image, id } = this.props.story;
    return (
      <Link href={`/show?id=${id}`}>
        <Card
          hoverable
          style={{ width: "85vw", marginTop: "15px" }}
          loading={this.props.loading}
        >
          <Meta avatar={<Avatar src={featured_image} />} title={title} />

          <Divider />
          {body}
        </Card>
      </Link>
    );
  }
}

export default Story;
