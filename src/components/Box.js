import React, { Component } from "react";

class Box extends Component {
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col);
  };

  render() {
    const { boxClass, id } = this.props;

    return <div className={boxClass} id={id} onClick={this.selectBox} />;
  }
}

export default Box;
