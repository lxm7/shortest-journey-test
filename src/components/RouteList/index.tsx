import React from "react";

export type RouteListProps = {
  stops: string[];
  distance: number;
};

const RouteList: React.SFC<RouteListProps> = ({ stops, distance }) => (
  <div className="route">
    {stops.map((stop, i) => (
      <div key={i}>
        <span>{stop}</span>
      </div>
    ))}

    <div className="route__distance">Distance: {distance} </div>
  </div>
);

export default React.memo(RouteList);
