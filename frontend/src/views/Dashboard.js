import React, { Component } from "react";
import ChartistGraph from "react-chartist";


// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        bug_title: "",
        bug_text: "",
      },
      bugList: []
      };
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:8000/api/bugs/');
      const bugList = await res.json();
      this.setState({
        bugList
      });
    } catch (e) {
      console.log(e);
  }
  }
  renderItems = () => {
    const newItems = this.state.bugList
    return newItems.map(item => (
      <li 
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span   
          bug_title={item.bug_text}
          >
            {item.bug_title}
          </span>
      </li>
    ));
  };

render() {
  return (
    <main className="content">
    <div className="row">
      <div className="col-md-6 col-sm-10 mx-auto p-0">
        <div className="card p-3">
          <ul className="list-group list-group-flush">
            {this.renderItems()}
          </ul>
        </div>
      </div>
    </div>
  </main>
  )
}
}

export default App;