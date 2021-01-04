import React, { Component } from "react";
import axios from "axios";

// COMMENT LIST NEEDED????????????????????/

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: "", owner: "" };
  }

  handleFormSubmit = (event) => {
    console.log(event);
    const commentInfo = this.state.comment;
    const commetOwner = this.state.owner;

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/events/comments",
        { commentInfo, commetOwner },
        { withCredentials: true }
      )
      .then(() => {
        this.props.getComment();
        this.setState({
          comment: "",
          commentEvent: "",
        });
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <textarea
        name="commentInfo"
        value={this.state.comment}
        onChange={(e) => this.handleChange(e)}
      />
    );
  }
}

export default AddComment;
