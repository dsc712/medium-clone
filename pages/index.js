import React, { Component } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import App from "../components/layouts/App";
import Story from "../components/Story";
import { Icon, Divider, BackTop, Row, Col } from "antd";

export class Index extends Component {
  state = {
    page: 0,
    stories: [],
    count: 2,
    loading: false
  };

  componentDidMount() {
    const { count, page } = this.state;
    axios.get(`/stories?page=${page}&count=${count}`).then(res => {
      this.setState({
        stories: res.data.data.results
      });
    });
  }

  fetchStories = () => {
    const { count, page } = this.state;
    this.setState({
      page: this.state.page + count,
      loading: true
    });
    axios.get(`/stories?count=${count}&start=${page}`).then(res => {
      console.log(res.data);
      this.setState({
        stories: [...this.state.stories, res.data.data.results]
      });
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
  };

  render() {
    return (
      <App style={{ display: "flex", flexDirection: "row" }}>
        <div className="stories">
          <InfiniteScroll
            dataLength={this.state.stories.length}
            next={this.fetchStories}
            hasMore={this.state.hasMore}
            loader={
              <div>
                <div className="loader-ellips">
                  <span className="loader-ellips__dot one" />
                  <span className="loader-ellips__dot two" />
                  <span className="loader-ellips__dot three" />
                  <span className="loader-ellips__dot four" />
                </div>
                <p style={{ textAlign: "center" }}>
                  <b>Cooking more stories for you</b>
                </p>
              </div>
            }
            endMessage={
              <div style={{ padding: "20px" }}>
                <p style={{ textAlign: "center" }}>
                  <div className="icons-list" style={{ padding: "20px" }}>
                    <Icon
                      type="smile"
                      theme="twoTone"
                      style={{ fontSize: "52px" }}
                    />

                    <Icon
                      type="heart"
                      theme="twoTone"
                      twoToneColor="#eb2f96"
                      style={{ fontSize: "52px" }}
                    />
                    <Icon
                      type="check-circle"
                      theme="twoTone"
                      twoToneColor="#52c41a"
                      style={{ fontSize: "52px" }}
                    />
                  </div>
                  <b>Yay! You have seen it all</b>
                </p>
              </div>
            }
          >
            <div>
              <BackTop visibilityHeight="200" />
            </div>
            <Divider>Stories</Divider>>
            <Row type="flex" justify="space-around">
              {this.state.stories.map(story => (
                <div>
                  <Col span={12}>
                    <Story
                      key={story.id}
                      story={story}
                      loading={this.state.loading}
                    />
                  </Col>
                  <Col span={12}>
                    <Story
                      key={story.id}
                      story={story}
                      loading={this.state.loading}
                    />
                  </Col>
                </div>
              ))}
            </Row>
          </InfiniteScroll>
        </div>
      </App>
    );
  }
}

export default Index;
