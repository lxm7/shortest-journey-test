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
    className={`route__option ${activeCss(active)}`}
    onClick={e => onClickRouteEnd(e, stop, position)}
  >
    {stop}
  </div>
);

export default RouteEnd;
