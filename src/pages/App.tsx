import React, { Component, Fragment } from "react";
import * as R from "ramda";
import LineTo, { Line } from "react-lineto";

import RouteList from "../components/RouteList";
import RouteEnd from "../components/RouteEnd";

import { findAllRoutes } from "../utils";
import { adjacencyGraph, graph } from "../constants";
import { validate } from "@babel/types";

export type IState = {
  routes: any;
  active: object;
  fastest: any;
};

const setEdgeAndWeight = (edge, weight) => ({ edge, weight });

class App extends Component<{}, IState> {
  state = {
    routes: [],
    fastest: [],
    active: {
      start: { A: true },
      end: { E: true }
    }
  };

  componentDidMount() {
    this.updateRoutes();
  }

  onClickRouteEnd = (_, stop, position) => {
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
      R.prop("true", R.invertObj(start)),
      R.prop("true", R.invertObj(end))
    );
    // TODO - break out in to functional testable one-liners
    const routes = routesRaw.reduce((acc, curr) => {
      const distance = R.sum(curr.filter(n => !isNaN(n)));
      const stops = curr.filter(n => n && isNaN(n));
      const row = stops.concat(distance);
      return [...acc, row];
    }, []);

    this.setState({ routes }, () => this.getFastestRoute());
  };

  getFastestRoute = () =>
    this.setState(prevState => ({ fastest: prevState.routes[0] }));

  render() {
    const adjacencyGraphArr = Object.keys(adjacencyGraph).map(key => ({
      [key]: adjacencyGraph[key]
    }));
    const matchNode = node =>
      graph.edges.reduce((c, v) => {
        if (node !== v.from) return c;

        return c.concat(v);
      }, []);

    return (
      <div className="App">
        <h3>Select start / end for route:</h3>

        <div className="route__graph">
          {graph.nodes.map(node => {
            return (
              <div className={`route__option route__option--${node.label}`}>
                <div>{node.label}</div>

                <span>
                  {matchNode(node.label).map(edge => (
                    <Fragment>
                      <LineTo
                        from={`route__option--${edge.from}`}
                        to={`route__option--${edge.to}`}
                        borderColor={"#eee"}
                        // borderWidth='1px'
                      />
                      <span>{edge.weight}</span>
                    </Fragment>
                  ))}
                </span>
              </div>
            );
          })}
        </div>

        {["start", "end"].map(position => (
          <div key={position} className="route__end">
            {Object.keys(adjacencyGraph).map((stop, i) => {
              return (
                <RouteEnd
                  key={i}
                  index={i}
                  stop={stop}
                  position={position}
                  active={this.state.active[position][stop]}
                  onClickRouteEnd={this.onClickRouteEnd}
                  journeyIndex={this.state.fastest.indexOf(stop)}
                  fastestRoute={this.state.fastest}
                />
              );
            })}
          </div>
        ))}

        <h3>Possible routes:</h3>

        <div className="route__list">
          {this.state.routes
            .sort((a, b) => R.last(a) - R.last(b))
            .map((row: any[], i: number) => {
              return (
                <RouteList
                  key={i}
                  stops={R.dropLast(1, row)}
                  distance={R.last(row)}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default App;
