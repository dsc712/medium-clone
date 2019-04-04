import React, { Component } from "react";
import { Card, Avatar, Divider, Icon } from "antd";
const { Meta } = Card;
import Link from "next/link";
import ReactHTMLParser from "react-html-parser";
import moment from 'moment';

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
    const { title, featured_image, id, user, created_at, reading_time } = this.props.story;
    console.log(user);
    return (
      <Link href={`/show?id=${id}`}>
        <Card
          hoverable
          style={{ width: "85vw", marginTop: "15px" }}
          loading={this.props.loading}
          actions={[
              <span>
                <span style={{ marginRight: "15px"}}>
                      { user && user.photo ?<Avatar src={ user && user.photo } /> : <Avatar style={{ backgroundColor: "#f56a00"}} icon="user"/> }
                </span>
                  Written by { user && user.name }
              </span>,
              <span>
                  <Icon type="calendar" /> { moment(created_at).fromNow() }
              </span>,
              <span>
                  <Icon type="clock-circle" /> { reading_time }
              </span>
              ]}
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
