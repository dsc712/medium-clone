import React, { Component } from "react";
import { Skeleton, Card, Icon, Avatar, Divider, Tooltip } from "antd";
const { Meta } = Card;

export class Story extends Component {
  state = {
    loading: true
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  render(props) {
    const { loading } = this.state;
    return (
    
      <Card
        style={{ width: "40vw", marginTop: 16 }}
        actions={[
          <Icon type="book" />,
          <Icon type="edit" />,
          <Icon type="message" />
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="Card title"
            description="This is the description"
          />
          <Divider />
          <p>
            <p>
              There will be a body of this story here when Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Deleniti, ullam! Accusantium
              maxime necessitatibus maiores laborum blanditiis quis rem in
              possimus debitis asperiores. Corrupti, aspernatur. Minus quo ipsam
              facere modi magni.
            </p>
          </p>
        </Skeleton>
      </Card>
    );
  }
}

export default Story;
