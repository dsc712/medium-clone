import React, { Component } from "react";
import axios from "axios";
import { Input, Button } from "antd";
const { TextArea } = Input;
class Response extends Component {
  state = {
    comment: ""
  };

  handleChange = e => {
    this.setState({
      comment: e.target.value
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const cmt = await axios.post("/response", {
      comment: this.state.comment,
      storyId: this.props.info.data.id,
      loggedUserId: this.props.info.LoggedUser.id
    });

    this.setState({
      comment: ""
    });
  };

  render() {
    return (
      <div style={{ width: "80%", margin: "5px auto" }}>
        <TextArea
          rows={8}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          value={this.state.comment}
          placeholder="Comment on this..."
          style={{ width: "80%", margin: "5px auto" }}
        />
        <br />
        <Button
          type="danger"
          size="large"
          htmlType="submit"
          onClick={this.handleSubmit}
        >
          Post
        </Button>
      </div>
    );
  }
}

export default Response;
{
  /* <form onSubmit={this.handleSubmit}>
          <input
            name="response"
            type="text"
            onChange={this.handleChange}
            value={this.state.comment}
            placeholder="Comment on this..."
          />
          <button type="submit">Post</button>
        </form> */
}
