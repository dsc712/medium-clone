import React, { Component } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import App from "../components/layouts/App";
import Story from "../components/Story";

export class Home extends Component {
  state = {
    page: 0,
    stories: [],
    count: 2
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
      page: this.state.page + count
    });
    axios.get(`/stories?count=${count}&start=${page}`).then(res => {
      this.setState({
        stories: [...this.state.stories, res.data ]
      });
    });
  };

  render() {
    return (
      <App style={{ display: "flex", flexDirection: "row" }}>
        <div className="stories">
          <InfiniteScroll
            dataLength={this.state.stories.length}
            next={this.fetchStories}
            hasMore={true}
            loader={<h2>Cooking More Stories For You...</h2>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {
              this.state.stories.map(story => (
                <Story key={story.id} story={story} />
               ))
            }
          </InfiniteScroll>
        </div>
      </App>
    );
  }
}

export default Home;
