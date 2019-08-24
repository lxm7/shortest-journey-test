import React, { Component } from "react";
import * as R from "ramda";

import RouteList from "../components/RouteList";
import RouteGraph from "../components/RouteGraph";

import { findAllRoutes, getObjectKeyAsValue, transformRoutes } from "../utils";
import { adjacencyGraph, Stop, RouteOption, Entity, Route } from "../constants";

export type StopObjectWithValue = {
  [key in string]: boolean;
};

interface Active {
  start: StopObjectWithValue;
  end: StopObjectWithValue;
}

export type IState = {
  routes: any;
  fastest: any;
  active: Active;
  toolTip: StopObjectWithValue;
};

class App extends Component<{}, IState> {
  state = {
    routes: [],
    fastest: [],
    active: {
      start: { A: true },
      end: { E: true }
    },
    toolTip: { A: false }
  };

  componentDidMount() {
    this.updateRoutes();
  }

  onClickRouteEnd = (
    e: React.MouseEvent<HTMLSpanElement>,
    stop: string,
    position: string
  ) => {
    e.persist();

    this.setState(
      (prevState: IState) => ({
        active: {
          ...prevState.active,
          [position]: { [stop]: true }
        }
      }),
      () => this.updateRoutes()
    );
  };

  updateRoutes = () => {
    const {
      active: { start, end }
    } = this.state;

    const routesRaw = findAllRoutes(
      adjacencyGraph,
      getObjectKeyAsValue(start) as Stop,
      getObjectKeyAsValue(end) as Stop
    );

    this.setState({ routes: transformRoutes(routesRaw) }, () =>
      this.getFastestRoute()
    );
  };

  getFastestRoute = () =>
    this.setState(prevState => ({ fastest: prevState.routes[0] }));

  toggleToolTip = (e: React.MouseEvent<HTMLSpanElement>, stop: any) => {
    this.setState({
      toolTip: {
        [stop]: !R.prop(stop, this.state.toolTip)
      }
    });
  };

  render() {
    const { active, fastest, toolTip, routes } = this.state;

    return (
      <div className="App">
        <RouteGraph
          active={active}
          fastest={fastest}
          toggleToolTip={this.toggleToolTip}
          onClickRouteEnd={this.onClickRouteEnd}
          toolTip={toolTip}
        />

        <RouteList routes={routes} />
      </div>
    );
  }
}

export default App;
