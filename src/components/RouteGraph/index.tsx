import React, { Component } from "react";
import LineTo from "react-lineto";
import * as R from "ramda";

import RouteEnd from "../RouteEnd";
import {
  isActiveStop,
  getCurrentPath,
  getDistance,
  getObjectKeyAsValue
} from "../../utils";
import { Edge, adjacencyGraph, Stop } from "../../constants";
import { IState } from "../../pages/App";

export type RouteGraphProps = {
  active: IState["active"];
  fastest: IState["fastest"];
  toolTip: IState["toolTip"];
  toggleToolTip: (e: React.MouseEvent<HTMLSpanElement>, stop: string) => void;
  onClickRouteEnd: (
    e: React.MouseEvent<HTMLSpanElement>,
    stop: string,
    position: string
  ) => void;
};

const RouteGraph: React.SFC<RouteGraphProps> = ({
  active,
  fastest,
  toolTip,
  toggleToolTip,
  onClickRouteEnd
}) => (
  <div className="route__graph">
    <h3>
      Start {getObjectKeyAsValue(active.start)} - End{" "}
      {getObjectKeyAsValue(active.end)}
    </h3>
    <h3>Shortest distance: {getDistance(fastest)}</h3>

    {R.keys(adjacencyGraph).map((node: string) => {
      return (
        <div key={node} style={{ position: "relative" }}>
          <RouteEnd
            stop={node}
            active={
              isActiveStop(node, "start", active) ||
              isActiveStop(node, "end", active)
            }
            toggleToolTip={toggleToolTip}
            onClickRouteEnd={onClickRouteEnd}
            toolTip={toolTip}
          />

          {adjacencyGraph[node].map((edge: Edge, i: number) => {
            const path = getCurrentPath(fastest, node, edge) as Stop[];
            if (path.length === 0) return;

            return (
              <div key={i}>
                <LineTo
                  className="route__edge"
                  from={`route__option--${path && path[0]}`}
                  to={`route__option--${path && path[1]}`}
                  borderColor={"#9EFFE4"}
                />
                {/* <span>{edge.weight}</span> */}
              </div>
            );
          })}
        </div>
      );
    })}
  </div>
);

export default RouteGraph;
