import React, { Component } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import App from "../components/layouts/App";
import Story from "../components/Story";
import { Icon, Divider, BackTop } from "antd";
import Banner from "../components/Banner";

export class Home extends Component {
  state = {
    page: 0,
    stories: [],
    count: 2,
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

  fetchStories = () => {
    setTimeout(() => {
      if (this.state.stories.length >= this.state.total) {
        this.setState({
          hasMore: false
        });
        return;
      }
      const { count, page } = this.state;
      axios.get(`/stories?page=${page}&count=${count}`).then(res => {
        this.setState({
          stories: this.state.stories.concat(res.data.data.results),
          page: this.state.page + 1,
          total: res.data.data.total
        });
      });
    }, 500);
  };

  render() {
    return (
      <App>
        <Banner />
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
              <BackTop visibilityHeight="400" />
            </div>

            <Divider style={{ fontSize: "40px", marginTop: "-10px" }}>
              Stories
            </Divider>
            <div
              style={{
                padding: "6.5%",
                overflowX: "hidden"
              }}
            >
              {this.state.stories.map(story => (
                <Story
                  key={story.id}
                  story={story}
                  style={{ paddingTop: "50px" }}
                />
              ))}
            </div>

            <Divider />
          </InfiniteScroll>
        </div>
      </App>
    );
  }
}

export default Home;
