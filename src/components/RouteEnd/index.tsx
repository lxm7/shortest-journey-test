import React, { ReactEventHandler } from "react";

import ToolTip from "../ToolTip";
import { StopObjectWithValue } from "../../pages/App";

import "./styles.css";

const isActive = (active: boolean) => (active ? "route__option--active" : "");

export type RouteEndProps = {
  stop: string;
  active: boolean;
  toggleToolTip: (e: React.MouseEvent<HTMLSpanElement>, stop: string) => void;
  onClickRouteEnd: (
    e: React.MouseEvent<HTMLSpanElement>,
    stop: string,
    position: string
  ) => void;
  toolTip: StopObjectWithValue; // TODO
};

const RouteEnd: React.SFC<RouteEndProps> = ({
  stop,
  onClickRouteEnd,
  active,
  toggleToolTip,
  toolTip
}) => (
  <div
    className={`route__option route__option--${stop} ${isActive(active)}`}
    onClick={e => toggleToolTip(e, stop)}
  >
    {stop}

    {toolTip && toolTip[stop] && (
      <ToolTip onClickRouteEnd={onClickRouteEnd} stop={stop} />
    )}
  </div>
);

export default RouteEnd;
