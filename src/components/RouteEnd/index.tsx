import React, { Component } from "react";
// import cx from 'classnames';
import "./styles.css";

const activeCss = active => (active ? "route__option--active" : "");
const disableCss = disabled => (disabled ? "route__option--disabled" : "");

const RouteEnd = ({
  stop,
  onClickRouteEnd,
  position,
  active,
  journeyIndex
}) => (
  <div
    className={`route__option route__option--relative ${activeCss(active)}`}
    onClick={e => onClickRouteEnd(e, stop, position)}
  >
    {journeyIndex > -1 && <span className="route__order">{journeyIndex}</span>}
    {stop}
  </div>
);

export default RouteEnd;
