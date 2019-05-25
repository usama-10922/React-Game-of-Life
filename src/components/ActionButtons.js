import React, { Component } from "react";
import {
  Button,
  ButtonToolbar,
  DropdownItem,
  DropdownButton
} from "react-bootstrap";

class ActionButtons extends Component {
  handleSelect = eventKey => {
    this.props.gridSize(eventKey);
  };

  render() {
    return (
      <div>
        <ButtonToolbar className="justify-content-center mt-2 mb-2">
          <Button
            className="mr-2"
            variant="light"
            onClick={this.props.playButton}
          >
            Play
          </Button>

          <Button
            className="mr-2"
            variant="light"
            onClick={this.props.pauseButton}
          >
            Pause
          </Button>

          <Button className="mr-2" variant="light" onClick={this.props.clear}>
            Clear
          </Button>

          <Button className="mr-2" variant="light" onClick={this.props.slow}>
            Slow
          </Button>

          <Button className="mr-2" variant="light" onClick={this.props.fast}>
            Fast
          </Button>

          <Button className="mr-2" variant="light" onClick={this.props.seed}>
            Seed
          </Button>

          <DropdownButton
            title="Grid Size"
            id="size-menu"
            onSelect={this.handleSelect}
            variant="light"
          >
            <DropdownItem eventKey="1">20x10</DropdownItem>
            <DropdownItem eventKey="2">50x30</DropdownItem>
            <DropdownItem eventKey="3">70x50</DropdownItem>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}

export default ActionButtons;
