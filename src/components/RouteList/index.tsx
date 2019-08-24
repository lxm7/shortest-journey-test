import React, { Component } from "react";

import Route from "../Route";
import { getDistance, getStops } from "../../utils";
import { Route as RouteType } from "../../constants";

type RouteListProps = {
  routes: RouteType[];
};

const RouteList: React.SFC<RouteListProps> = ({ routes }) => (
  <div>
    <h3>Possible routes:</h3>

    <div className="route__list">
      {routes
        .sort(
          (a: RouteType, b: RouteType) =>
            (getDistance(a) as number) - (getDistance(b) as number)
        )
        .map((row: RouteType, i: number) => (
          <Route
            key={i}
            stops={getStops(row) as any}
            distance={getDistance(row) as any}
          />
        ))}
    </div>
  </div>
);

export default RouteList;
