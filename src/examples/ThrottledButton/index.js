import React from "react";
import { evolve, inc } from "ramda";

import * as $fx from "../../StreakyFx";

export default class ThrottledButton extends React.Component {
  state = {
    clickCount: 0
  };

  handleClick = $fx.throttle(this.props.throttleTime)(() =>
    this.setState(evolve({ clickCount: inc }))
  );

  render() {
    return (
      <button className="btn btn-primary btn-block" onClick={this.handleClick}>
        {this.state.clickCount
          ? `I was clicked ${this.state.clickCount} times`
          : "Hey, I'm a throttled button"}
      </button>
    );
  }
}
