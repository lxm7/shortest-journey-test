import React from "react";

import ToolTip from "../ToolTip";
import "./styles.css";

const activeCss = active => (active ? "route__option--active" : "");

const RouteEnd = ({
  stop,
  onClickRouteEnd,
  active,
  toggleToolTip,
  toolTip
}) => (
  <div
    className={`route__option route__option--${stop} ${activeCss(active)}`}
    onClick={e => toggleToolTip(e, stop)}
  >
    {stop}

    {toolTip && toolTip[stop] && (
      <ToolTip onClickRouteEnd={onClickRouteEnd} stop={stop} />
    )}
  </div>
);

export default RouteEnd;
