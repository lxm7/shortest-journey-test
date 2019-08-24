import * as R from "ramda";

import {
  IAdjacencyGraph,
  RouteOption,
  Edge,
  Stop,
  Entity,
  Route
} from "../constants";
import { IState, StopObjectWithValue } from "../pages/App";
import * as utils from "./";

/*
 * Function appendRouteToAllPossibleRoutes - Accumulates generated routes and queues them up into our list of
 * possible routes
 *
 * @param {array} newRoutes array of strings (destination letters)
 * @param {array} allRoutes
 * @return {array} returns an array of arrays of newRoutes
 */
export const appendRouteToAllPossibleRoutes = (
  newRoutes: RouteOption[],
  allRoutes: RouteOption[]
) => newRoutes.map((newRoute: RouteOption) => allRoutes.push(newRoute));

/*
 * Function buildRoutePath - Accumulates start points for each stop and builds a given route
 *
 * @param {array} route - accumulation of stops
 * @param {string} start - start destination for subsequent stop
 * @return {array} returns an array of arrays of newRoutes
 */
export const buildRoutePath = (route: Route, start: Stop, weight?: number) =>
  route.concat([start], [weight as number]);

/*
 * Function findAllRoutes - Takes several params, introspects routeGraph and gathers all possible routes
 * between selected start and end
 *
 * @param {object} routeGraph - a lookup to show all possible edges to each key'd node
 * @param {string} start - selected node e.g, "C"
 * @param {string} end - selected node e.g, "D"
 * @param {array} path - current path of nodes to get to our destination
 * @return {array} returns an array of arrays that can take us from C to D for example
 */
export const findAllRoutes = (
  graph: IAdjacencyGraph,
  start: Stop,
  end: Stop,
  route = [] as Route,
  weight?: number
) => {
  // build route with each recursive start point
  route = buildRoutePath(route, start, weight);
  // if our start route/letter is also at the end return current route
  if (start === end) {
    return [route];
  }

  // If we enter a start route/letter that doesn't exist
  if (!graph.hasOwnProperty(start)) {
    return [`The start route string "${start}" does not exist in route table`];
  }

  // If we enter an end route/letter that doesn't exist
  if (!graph.hasOwnProperty(end)) {
    return [`The end route string "${end}" does not exist in route table`];
  }

  const allroutes: RouteOption[] = [];
  let totalDistance = [] as any;

  graph[start].map((node: Edge) => {
    const nodeEdge: string = node.node;
    // eslint-disable-line
    if (route.includes(nodeEdge)) return [];

    const newroutes = utils.findAllRoutes(
      graph,
      nodeEdge as Stop,
      end,
      route,
      node.weight
    ) as [];
    appendRouteToAllPossibleRoutes(newroutes, allroutes);
  });

  return allroutes;
};

/*
 * Function activeStop
 *
 * @param {node} node
 * @param {string} position
 * @param {object} activeState
 * @return {boolean}
 */
export const isActiveStop = (
  node: string,
  position: string,
  activeState: IState["active"]
) =>
  R.hasPath([position, node], {
    ...activeState
  });

/*
 * Function distance
 *
 * @param {array} fastestRoute
 * @return {number}
 */
export const getDistance = (route: Route) => R.last(route);

/*
 * Function stops
 *
 * @param {array} fastestRoute
 * @return {array} list of stops without the distance at the end
 */
export const getStops = (route: Route) => R.dropLast(1, route);

/*
 * Function path
 *
 * @param {array} fastestRoute
 * @param {edge} edge
 * @return {array} list of stops without the distance at the end
 */
export const getCurrentPath = (route: Route, node: string, edge: Edge) =>
  R.intersection(route, [node, edge.node]);

/*
 * Function getObjectKeyAsValue
 *
 * @param {Stop} stop
 * @return {string}
 */
export const getObjectKeyAsValue = (stop: StopObjectWithValue) =>
  R.keys(stop)[0];

/*
 * Function transformRoutes
 *
 * @param {Stop} routesRaw
 * @return {array}
 */
export const transformRoutes = (routesRaw: any[]) =>
  routesRaw.reduce((acc: any, curr: any[]) => {
    // TODO - replace anys
    const distance = R.sum(curr.filter((n: number) => !isNaN(n)));
    const stops = curr.filter((n: number) => n && isNaN(n));
    const row = stops.concat(distance);
    return [...acc, row];
  }, []);
