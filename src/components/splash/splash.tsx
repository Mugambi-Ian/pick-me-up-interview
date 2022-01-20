import React from "react";
import "./splash.css";

export default class Splash extends React.Component<
  {
    closeSplash: () => void;
  },
  {
    animIn: boolean;
  }
> {
  state = {
    animIn: true,
  };

  async componentDidMount() {
    await setTimeout(async () => {
      this.setState({ animIn: false });
      await setTimeout(() => {
        this.props.closeSplash();
      }, 1400);
    }, 2500);
  }

  render() {
    const { animIn } = this.state;
    return (
      <div className="splash-body">
        <img
          alt=""
          src={require("../../assets/drawables/ic-logo.png")}
          className={animIn ? "on-start" : "on-exit"}
        />
      </div>
    );
  }
}
