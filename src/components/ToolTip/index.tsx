import React from "react";

export type RouteListProps = {
  stop: string;
  onClickRouteEnd: (
    e: React.MouseEvent<HTMLSpanElement>,
    stop: string,
    position: string
  ) => void;
};

// TODO use package `typestyle` hack a type to handle nested styles object
const toolTipStyle: React.CSSProperties = {
  background: "#eee",
  width: "100px",
  textAlign: "center",
  color: "white",
  position: "absolute",
  bottom: "49px",
  left: "100%",
  padding: ".5em"
};

const optionStyle: React.CSSProperties = {
  background: "#ff5a5f",
  display: "block",
  borderRadius: "3px",
  padding: ".5em",
  marginBottom: "0.3em"
};

const ToolTip: React.SFC<RouteListProps> = ({ onClickRouteEnd, stop }) => (
  <div style={toolTipStyle}>
    {["start", "end"].map(position => (
      <span
        style={optionStyle}
        key={position}
        onClick={e => onClickRouteEnd(e, stop, position)}
      >
        {position}
      </span>
    ))}
  </div>
);

export default ToolTip;
