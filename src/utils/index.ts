import * as R from "ramda";

import { IAdjacencyGraph, distances, DistanceRow } from "../constants";
import * as utils from "./";

type Route = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";

export type RouteOption = {
  [key in Route]: string;
};

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
export const buildRoutePath = (route: RouteOption[], start: string, weight) =>
  route.concat([start], [weight]);
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
  start: string,
  end: string,
  route = [],
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

  graph[start].map(node => {
    // eslint-disable-line
    if (route.includes(node.node)) return [];
    // import itself via utils.findAllRoutes for recursive jest test
    const newroutes = utils.findAllRoutes(
      graph,
      node.node,
      end,
      route,
      node.weight
    ) as [];
    appendRouteToAllPossibleRoutes(newroutes, allroutes);
  });

  return allroutes;
};

const getTotalDistanceFromRoute = curr => R.sum(curr.filter(n => !isNaN(n)));
const getStopsFromRoute = curr => curr.filter(n => n && isNaN(n));

/*
 * Function addTotalDistanceFromRoutes - maps all routes to start operating on a single route
 *
 * @param {array} route - all stops within a route.
 * @return {number} totals all distances bewteen stops in a given route
 */
export const addTotalDistanceFromRoutes = route =>
  route.reduce((acc, opt) => acc + Number(opt.distance), 0);
