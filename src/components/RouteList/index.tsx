import React from "react";

export type RouteListProps = {
  stops: string[];
  distance: number;
};

const RouteList: React.SFC<RouteListProps> = ({ stops, distance }) => (
  <div className="route">
    {stops.map((stop, i) => (
      <span style={{ marginRight: "0.5em" }} key={i}>
        <span>{stop}</span>
      </span>
    ))}

    <span className="route__distance">Distance: {distance} </span>
  </div>
);

export default React.memo(RouteList);
