import React, { Component } from "react";
import { Card, Avatar, Divider } from "antd";
const { Meta } = Card;
import Link from "next/link";
import ReactHTMLParser from "react-html-parser";

export class Story extends Component {
  state = {
    story: this.props.story
  };

  componentDidMount() {
      if( this.props.story.body.length > 100 ){
          this.setState({ story: this.props.story.body.substring(0, 200) + '...'});
      } else {
          this.setState( { story: this.props.story.body  });
      }
  }

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
          {ReactHTMLParser(this.state.story)}
        </Card>
      </Link>
    );
  }
}

export default Story;
