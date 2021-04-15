import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import { CommentModal, CustomModal as Modal } from "./components/Modal";
import axios from "axios";
import { ReactComponent as Logo } from "./logo.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      commentModal: false,
      activeItem: {
        bug_title: "",
        bug_text: "",
        active: false,
      },
      bugList: [],
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  toggleComment = () => {
    this.setState({ commentModal: !this.state.commentModal });
  };

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/bugs/")
      .then((res) => this.setState({ bugList: res.data }))
      .catch((err) => console.log(err));
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/bugs/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios.post("/api/bugs/", item).then((res) => this.refreshList());
  };

  
  handleSubmitComment = (item) => {
    this.toggleComment();

    if (item.id) {
      axios
        .put(`/api/comments/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios.post("/api/comments/", item).then((res) => this.refreshList());
  };


  handleDelete = (item) => {
    axios.delete(`/api/bugs/${item.id}/`).then((res) => this.refreshList());
  };

  addComment = () => {
    const item = {
      comment_author: "",
      comment_text: "",
      comment_date: "",
    };

    this.setState({ activeItem: item, commentModal: !this.state.commentModal });
  };

  createItem = () => {
    const item = { bug_title: "", bug_text: "", active: true };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
    if (item.id) {
      axios
        .put(`/api/bugs/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios.post("/api/bugs/", item).then((res) => this.refreshList());
  };

  renderItems = () => {
    const newItems = this.state.bugList;
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span bug_title={item.bug_title}>
          {item.bug_title}
          <div>{item.bug_text}</div>
          <a href="">Comments</a>
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-primary mr-2"
            onClick={() => this.addComment(item)}
          >
            Add comment
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="content">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <Logo
              width="30"
              height="30"
              className="d-inline-block align-top"
            ></Logo>
            BugTracker
          </Navbar.Brand>
        </Navbar>

        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="mb-4 mt-4">
              <div classname="row">
                <button className="btn btn-primary" onClick={this.createItem}>
                  Add bug
                </button>
              </div>
            </div>
            <div className="card p-3">
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        {this.state.commentModal ? (
          <CommentModal
            activeItem={this.state.activeItem}
            toggle={this.toggleComment}
            onSave={this.handleSubmitComment}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
