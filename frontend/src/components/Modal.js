import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

 
  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Bug</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="bug_title">Title</Label>
              <Input
                type="text"
                id="bug_title"
                name="bug_title"
                value={this.state.activeItem.bug_title}
                onChange={this.handleChange}
                placeholder="Enter Bug Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="bug-text">Bug text</Label>
              <Input
                type="text"
                id="bug_text"
                name="bug_text"
                value={this.state.activeItem.bug_text}
                onChange={this.handleChange}
                placeholder="Enter bug description"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="active"
                  checked={this.state.activeItem.active}
                  onChange={this.handleChange}
                />
                Active
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}