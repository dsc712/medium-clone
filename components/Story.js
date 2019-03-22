import React, { Component } from "react";
import { Card, Avatar, Divider } from "antd";
const { Meta } = Card;

export class Story extends Component {
    render(props) {
        return (
            <Card style={{ width: 85vw, marginTop: 16 }}>
                <Meta
                    avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title="Title of the Story"
                    description="This is the description"
                />
                <Divider />
                <p>
                    This is the story of a man in the woods working over the power hungry
                    robot that he made after learning AI in iiitd which can also be some
                    shitty behave so...
                </p>
            </Card>
        );
    }
}

export default Story;