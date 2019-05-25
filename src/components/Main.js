import React, { Component } from "react";

// Own Imports
import Grid from "./Grid";
import ActionButtons from "./ActionButtons";

class Main extends Component {
  constructor() {
    super();

    this.speed = 100;
    this.rows = 25;
    this.cols = 25;

    this.state = {
      generations: 0,
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false))
    };
  }

  arrayClone = arr => {
    // A trick to clone multi dimensional array, but its slower
    // return JSON.parse(JSON.stringify(arr));

    return arr.map(subArr => {
      return subArr.slice();
    });
  };

  selectBox = (row, col) => {
    const gridFullCopy = this.arrayClone(this.state.gridFull);
    gridFullCopy[row][col] = !gridFullCopy[row][col];

    this.setState(() => ({
      gridFull: gridFullCopy
    }));
  };

  seed = () => {
    const gridFullCopy = this.arrayClone(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridFullCopy[i][j] = true;
        }
      }
    }

    this.setState(() => ({
      gridFull: gridFullCopy
    }));
  };

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
  };

  slow = () => {
    this.speed = 1000;
    this.playButton();
  };

  fast = () => {
    this.speed = 100;
    this.playButton();
  };

  clear = () => {
    const grid = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(false));

    this.setState(() => ({
      gridFull: grid,
      generations: 0
    }));
  };

  gridSize = size => {
    switch (size) {
      case "1":
        this.cols = 20;
        this.rows = 10;
        break;

      case "2":
        this.cols = 50;
        this.rows = 30;
        break;

      default:
        this.cols = 70;
        this.rows = 50;
    }

    this.clear();
  };

  play = () => {
    let originalGrid = this.state.gridFull;
    let clonedGrid = this.arrayClone(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let neighborCounts = 0;

        // Check Top Neighbor
        if (i > 0) if (originalGrid[i - 1][j]) neighborCounts++;

        // Check Bottom Neighbor
        if (i < this.rows - 1) if (originalGrid[i + 1][j]) neighborCounts++;

        // Check Left Neighbor
        if (j > 0) if (originalGrid[i][j - 1]) neighborCounts++;

        // Check Right Neighbor
        if (j < this.cols - 1) if (originalGrid[i][j + 1]) neighborCounts++;

        // Check Top Left Neighbor
        if (i > 0 && j > 0) if (originalGrid[i - 1][j - 1]) neighborCounts++;

        // Check Top Right Neighbor
        if (i > 0 && j < this.cols - 1)
          if (originalGrid[i - 1][j + 1]) neighborCounts++;

        // Check Bottom Left Neighbor
        if (i < this.rows - 1 && j > 0)
          if (originalGrid[i + 1][j - 1]) neighborCounts++;

        // Check Bottom Right Neighbor
        if (i < this.rows - 1 && j < this.cols - 1)
          if (originalGrid[i + 1][j + 1]) neighborCounts++;

        // If box is on, and neighbour count is not 3, switch off the box
        if (originalGrid[i][j] && (neighborCounts < 2 || neighborCounts > 3))
          clonedGrid[i][j] = false;

        // If box is off, and neighbour count is exactly 3, switch on the box
        if (!originalGrid[i][j] && neighborCounts === 3)
          clonedGrid[i][j] = true;
      }
    }

    this.setState(() => ({
      gridFull: clonedGrid
    }));
  };

  componentDidMount() {
    this.seed();
    this.playButton();
  }

  render() {
    return (
      <div>
        <h1>The Game of Life</h1>

        <ActionButtons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          clear={this.clear}
          slow={this.slow}
          fast={this.fast}
          seed={this.seed}
          gridSize={this.gridSize}
        />

        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />

        <h2>Generations: {this.state.generations}</h2>
      </div>
    );
  }
}

export default Main;
