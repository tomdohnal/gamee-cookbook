// @flow
import React, { Component } from 'react';

import { type Point } from '../../redux/modules/recipes';

import './style.scss';

const getCoords = (elem: HTMLElement) => {
  const box = elem.getBoundingClientRect();

  const { body } = document;
  const docEl = document.documentElement;

  const scrollTop =
    window.pageYOffset ||
    (docEl && docEl.scrollTop) ||
    (body && body.scrollTop);
  const scrollLeft =
    window.pageXOffset ||
    (docEl && docEl.scrollLeft) ||
    (body && body.scrollLeft);

  const clientTop = (docEl && docEl.clientTop) || (body && body.clientTop) || 0;
  const clientLeft =
    (docEl && docEl.clientLeft) || (body && body.clientLeft) || 0;

  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
};

type Props = {
  drawing?: Array<Point>,
  disabled?: boolean,
  onDraw?: (point: Point) => void,
};

type State = {
  clicked: boolean,
};

class Paint extends Component<Props, State> {
  state = {
    clicked: false,
  };

  componentDidMount() {
    const { drawing } = this.props;

    if (drawing && drawing.length) {
      drawing.forEach(point => {
        this.canvasContext.beginPath();
        this.canvasContext.arc(point.x, point.y, 1, 0, 2 * Math.PI);
        this.canvasContext.lineWidth = 2;
        this.canvasContext.stroke();
      });
    }
  }

  onMouseDown = () => {
    this.setState({ clicked: true });
  };

  onMouseUp = () => {
    this.setState({ clicked: false });
  };

  onMouseLeave = () => {
    this.setState({ clicked: false });
  };

  onMouseMove = (e: MouseEvent) => {
    const { clicked } = this.state;
    const { onDraw, disabled } = this.props;

    if (clicked && !disabled && onDraw) {
      const canvasCoords = getCoords(this.canvas);

      const x = e.pageX - canvasCoords.left;
      const y = e.pageY - canvasCoords.top;

      this.canvasContext.beginPath();
      this.canvasContext.arc(x, y, 1, 0, 2 * Math.PI);
      this.canvasContext.lineWidth = 2;
      this.canvasContext.stroke();

      onDraw({ x, y });
    }
  };

  setCanvas = (canvas: ?HTMLCanvasElement) => {
    if (canvas && canvas.getContext) {
      this.canvas = canvas;
      this.canvasContext = canvas.getContext('2d');
    }
  };

  canvasContext: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  render() {
    return (
      <canvas
        className="canvas"
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseLeave={this.onMouseLeave}
        onMouseMove={this.onMouseMove}
        ref={this.setCanvas}
        width="400"
        height="200"
      />
    );
  }
}

export default Paint;
