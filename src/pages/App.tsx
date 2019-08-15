import React, { Component, Fragment } from "react";
import * as R from "ramda";

import RouteList from "../components/RouteList";
import RouteEnd from "../components/RouteEnd";

import { findAllRoutes } from "../utils";
import { adjacencyGraph, graph, elements } from "../constants";
import CytoscapeComponent from "react-cytoscapejs";

export type IState = {
  routes: any;
  active: object;
  fastest: any;
  cy: any;
};

class App extends Component<{}, IState> {
  state = {
    routes: [],
    fastest: [],
    active: {
      start: { A: true },
      end: { E: true }
    },
    cy: {}
  };

  componentDidMount() {
    this.updateRoutes();

    // console.log(this.cy.getEdges())
  }

  onClickRouteEnd = (e, stop, position) => {
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
      R.prop("true", R.invertObj(start)),
      R.prop("true", R.invertObj(end))
    );
    // TODO - break out in to functional testable one-liners
    const routes = routesRaw.reduce((acc, curr) => {
      // ts-lint:disable-line
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
    return (
      <div className="App">
        <h3>Select start / end for route:</h3>

        <CytoscapeComponent
          stylesheet={[
            {
              selector: "node",
              style: {
                content: "data(data.task)",
                width: 20,
                height: 20,
                shape: "rectangle"
              }
            },
            {
              selector: "edge",
              style: {
                width: 1,
                "curve-style": "bezier",
                "target-arrow-shape": "triangle",
                "line-color": "#ccc",
                "target-arrow-color": "red"
              }
            }
          ]}
          cy={cyRef => {
            this.cyRef = cyRef;
          }}
          zoomingEnabled={false}
          autoungrabify={true}
          layout={{ name: "random" }}
          style={{ width: "100%", height: "400px" }}
          elements={elements}
        />

        <div style={{ marginBottom: "2em" }}></div>

        <div className="flex__inline">
          <div style={{ flex: 1 }}>
            {["start", "end"].map(position => {
              return (
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
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div style={{ width: "33.33%" }}>
            <h3>Shortest route:</h3>

            {R.dropLast(1, this.state.fastest).map((stop: any[], i: number) => {
              console.log(stop);
              return (
                <div className="route__option" key={i}>
                  <span>{stop}</span>
                </div>
              );
            })}

            <h3>Distance: {R.last(this.state.fastest)}</h3>
          </div>
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
