import React, { Component } from "react";

// Own Imports
import Box from "./Box";

class Grid extends Component {
  render() {
    const width = this.props.cols * 14;
    const { gridFull, rows, cols } = this.props;
    let rowsArray = [];

    let boxClass = "";

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let boxId = i + "_" + j;

        boxClass = gridFull[i][j] ? "box on" : "box off";
        rowsArray.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        );
      }
    }

    return (
      <div className="grid" style={{ width: width }}>
        {rowsArray}
      </div>
    );
  }
}

export default Grid;
