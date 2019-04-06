import React, { Component } from "react";
import axios from "axios";

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
    console.log("id:", this.props);
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            name="response"
            type="text"
            onChange={this.handleChange}
            value={this.state.comment}
            placeholder="Comment on this..."
          />
        </form>
      </div>
    );
  }
}

export default Response;
