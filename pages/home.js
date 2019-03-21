import React, { Component } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import App from "../components/layouts/App";
import Story from "../components/Story";

export class Home extends Component {
  state = {
    start: 1,
    stories: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    count: 10
  };

  componentDidMount() {
    const { count, start } = this.state;
    axios.get(`/api/stories?count=${count}&start=${start}`).then(res =>
      this.setState({
        stories: res.data
      })
    );
  }

  fetchStories = () => {
    const { count, start } = this.state;
    this.setState({
      start: this.state.start + count
    });
    axios.get(`/api/stories?count=${count}&start=${start}`).then(res => {
      this.setState({
        stories: this.state.stories.concat(res.data)
      });
    });
  };

  render() {
    return (
      <App style={{ display: "flex", flexDirection: "column" }}>
        <div className="stories">
          <InfiniteScroll
            dataLength={this.state.stories.length}
            next={this.fetchStories}
            hasMore={true}
            loader={<h2>Cooking More Stories For You...</h2>}
          >
            {this.state.stories.map(story => (
              <Story key={story.id} story={story} />
            ))}
          </InfiniteScroll>
        </div>
      </App>
    );
  }
}

export default Home;
