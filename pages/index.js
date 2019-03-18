import react, { Component } from "react";
import App from "../components/layouts/App";
import { Card, Avatar, Divider } from "antd";
const { Meta } = Card;
class Index extends Component {
  state = {
    loading: true,
    stories: ["Story 1", "Story 2", "Story 3", "Story 4", "Story 5"]
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  }

    render() {
        const stories = this.state.stories.map( (val, i) => {
            return <Card key={i} style={{ width: 1000, marginTop: 16 }} loading={this.state.loading}>
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Story"
                    description="This is the description"
                />
                <Divider/>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Accusamus commodi, cumque id impedit incidunt ipsa ipsam
                    nemo neque nesciunt officiis omnis pariatur quas quibusdam
                    reiciendis repellendus unde veniam voluptas voluptate
                </p>
            </Card>
        });

        return (
            <App style={{ "display": "flex", "flexDirection": "column"}}>
                <h1> Stories based on your reading history </h1>
                { stories }
            </App>
        )
    }
}

export default Index;
