import React, { Component } from "react";
import * as R from "ramda";
import LineTo from "react-lineto";

import RouteList from "../components/RouteList";
import RouteEnd from "../components/RouteEnd";

import { findAllRoutes } from "../utils";
import { adjacencyGraph, graph } from "../constants";

export type IState = {
  routes: any;
  active: object;
  fastest: any;
  cy: any;
  toolTip: object;
};

class App extends Component<{}, IState> {
  state = {
    routes: [],
    fastest: [],
    active: {
      start: { A: true },
      end: { E: true }
    },
    toolTip: { A: false },
    cy: {}
  };

  componentDidMount() {
    this.updateRoutes();

    // console.log(this.cy.getEdges())
  }

  onClickRouteEnd = (e, stop, position) => {
    e.persist();

    this.setState({ toolTip: { [stop]: false } });

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

  toggleToolTip = (_, stop) => {
    this.setState({
      toolTip: {
        [stop]: !R.prop(stop, this.state.toolTip)
      }
    });
  };

  render() {
    const matchNode = node =>
      graph.edges.reduce((c, v) => {
        if (node !== v.from) return c;

        return c.concat(v);
      }, []);

    return (
      <div className="App">
        <h3>Select start / end for route:</h3>

        <div className="route__graph">
          {graph.nodes.map((node, i) => {
            const activeStart = R.hasPath(["start", node.id], {
              ...this.state.active
            });
            const activeEnd = R.hasPath(["end", node.id], {
              ...this.state.active
            });

            return (
              <div key={node.id} style={{ position: "relative" }}>
                <RouteEnd
                  stop={node.id}
                  active={activeEnd || activeStart}
                  toggleToolTip={this.toggleToolTip}
                  onClickRouteEnd={this.onClickRouteEnd}
                  toolTip={this.state.toolTip}
                />

                <span>
                  {matchNode(node.label).map((edge, i) => {
                    const path = R.intersection(this.state.fastest, [
                      edge.from,
                      edge.to
                    ]);

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
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ width: "33.33%" }}>
          <div>
            Shortest route:{" "}
            <h3 style={{ display: "inline-block" }}>
              {R.last(this.state.fastest)}
            </h3>
          </div>

          {R.dropLast(1, this.state.fastest).map((stop: any[], i: number) => {
            return (
              <div className="route__option" key={i}>
                <span>{stop}</span>
              </div>
            );
          })}
        </div>

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
