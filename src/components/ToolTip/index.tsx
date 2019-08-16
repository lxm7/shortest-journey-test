import React from "react";

export type RouteListProps = {
  stop: string;
  onClickRouteEnd: (
    e: React.MouseEvent<HTMLSpanElement>,
    stop: string,
    position: string
  ) => void;
};

const style = {
  toolTip: {
    background: "#eee",
    width: "100px",
    textAlign: "center",
    color: "white",
    position: "absolute",
    bottom: "49px",
    left: "100%",
    padding: ".5em"
  },
  option: {
    background: "#ff5a5f",
    display: "block",
    borderRadius: "3px",
    padding: ".5em",
    marginBottom: "0.3em"
  }
};

const ToolTip: React.SFC<RouteListProps> = ({ onClickRouteEnd, stop }) => (
  <div
    style={style.toolTip} // @tslint:disable-line
  >
    {["start", "end"].map(position => (
      <span
        style={style.option}
        key={position}
        onClick={e => onClickRouteEnd(e, stop, position)}
      >
        {position}
      </span>
    ))}
  </div>
);

export default ToolTip;
