import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from "./components/Modal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
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

  handleSubmit = (item) => {
    this.toggle();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    };
    fetch("http://localhost:8000/api/bugs/", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState(data));
  };

  handleDelete = (item) => {
    fetch(`http://localhost:8000/api/bugs/${item.id}/`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => this.setState({ state: !this.state }));
  };

  createItem = () => {
    const item = { bug_title: "", bug_text: "", active: true };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  //TODO: PUT method doesnt work
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    };
    fetch(`http://localhost:8000/api/bugs/${item.id}/`, requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ postId: data.id }));
  };

  async componentDidMount() {
    try {
      const res = await fetch("http://localhost:8000/api/bugs/");
      const bugList = await res.json();
      this.setState({
        bugList,
      });
    } catch (e) {
      console.log(e);
    }
  }

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
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
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
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            BugTracker
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#bugs">Bugs</Nav.Link>
          </Nav>
        </Navbar>
        <div className="mb-4">
          <button className="btn btn-primary" onClick={this.createItem}>
            Add bug
          </button>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
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
      </main>
    );
  }
}

export default App;
