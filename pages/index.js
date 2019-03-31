import React, { Component } from "react";
import axios from "axios";
import { Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import App from "../components/layouts/App";
import Story from "../components/Story";
import { Icon, Divider, BackTop, Row, Col } from "antd";

export class Index extends Component {
  state = {
    page: 0,
    stories: [],
    count: 2,
    loading: false,
    hasMore: true,
    total: 0
  };

  componentDidMount() {
    const { count, page } = this.state;
    axios.get(`/stories?page=${page}&count=${count}`).then(res => {
      this.setState({
        stories: this.state.stories.concat(res.data.data.results),
        page: this.state.page + 1,
        total: res.data.data.total
      });
    });
  }

  antIcon = <Icon type="radar-chart" style={{ fontSize: 54 }} spin />;

  fetchStories = () => {
    const { count, page } = this.state;
    if (this.state.stories.length >= this.state.total) {
      this.setState({
        hasMore: false
      });
      return;
    }
    axios.get(`/stories?page=${page}&count=${count}`).then(res => {
      this.setState({
        stories: this.state.stories.concat(res.data.data.results),
        page: this.state.page + 1,
        total: res.data.data.total
      });
    });
    this.setState({ loading: false });
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "85vw",
                  height: "300px",
                  padding: "0 auto"
                }}
              >
                <Spin
                  style={{ textAlign: "center" }}
                  indicator={this.antIcon}
                />
                <h2>Cooking Stories for you...</h2>
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
            {this.state.stories.map(story => (
              <Story
                key={story.id}
                story={story}
                loading={this.state.loading}
              />
            ))}
          </InfiniteScroll>
        </div>
      </App>
    );
  }
}

export default Index;
