import { adjacencyGraph } from '../constants';
import * as utils from './';

describe("utils of application", () => {
  describe("buildRoutePath", () => {
    it('should build a route from queue of stops with each incoming start point', () => {
      const test = utils.buildRoutePath([], 'A')
      const test2 = utils.buildRoutePath(['A'], 'C')
      expect(test).toEqual(['A'])
      expect(test2).toEqual(['A', 'C'])
    });
  });

  describe("findAllRoutes", () => {
    it('should return at least one array of letters/destinations if viable route is selected', () => {
      const test = utils.findAllRoutes(adjacencyGraph, 'B', 'C', [])
      expect(test[0].length).toBeGreaterThanOrEqual(1)
      expect(test[0]).toEqual(['B', 'D', 'F', 'C'])
    });

    it('each route returned should be unique', () => {
      const test: any[] | string = utils.findAllRoutes(adjacencyGraph, 'B', 'C', [])

      test.map((route, i) => {
        expect(route[i]).not.toEqual(route[i + 1])
      });
    });

    it('our start and end letters should be present at the start and end of each array route returned', () => {
      const test = utils.findAllRoutes(adjacencyGraph, 'A', 'B', [])
      const firstRoute = test[0]
      const secondRoute = test[1]
      
      expect(firstRoute[0]).toEqual('A')
      expect(firstRoute[firstRoute.length - 1]).toEqual('B')
      expect(secondRoute[0]).toEqual('A')
      expect(secondRoute[secondRoute.length - 1]).toEqual('B')
    });

    it('should return single array of start route if our start route/letter is also same as the end ', () => {
      const test = utils.findAllRoutes(adjacencyGraph, 'A', 'A', [])
      expect(test).toEqual([['A']]);
    });

    it('should error if start point is not a property of our graph', () => {
      const test = utils.findAllRoutes(adjacencyGraph, expect.anything(), 'B', [])

      expect(test).toEqual(["The start route string \"Anything\" does not exist in route table"])
    });

    it('should recursively call itself if the route is not met on the first iteration', () => {
      const findAllRoutesSpy = jest.spyOn(utils, 'findAllRoutes');
      const result = utils.findAllRoutes(adjacencyGraph, 'A', 'B', []);
      expect(result).toStrictEqual([
        [ 'A', 'C', 'D', 'F', 'G', 'H', 'E', 'B' ],
        [ 'A', 'C', 'D', 'G', 'H', 'E', 'B' ],
        [ 'A', 'C', 'D', 'B' ],
        [ 'A', 'C', 'F', 'G', 'H', 'E', 'B' ],
        [ 'A', 'C', 'F', 'G', 'D', 'B' ],
        [ 'A', 'C', 'F', 'D', 'G', 'H', 'E', 'B' ],
        [ 'A', 'C', 'F', 'D', 'B' ],
      ]);
      expect(findAllRoutesSpy).toHaveBeenCalledTimes(27);

      const result2 = utils.findAllRoutes(adjacencyGraph, 'B', 'H', []);
      expect(result2).toStrictEqual([
        [ 'B', 'D', 'F', 'G', 'H' ],
        [ 'B', 'D', 'G', 'H' ],
        [ 'B', 'D', 'C', 'F', 'G', 'H' ],
        [ 'B', 'E', 'H' ],
      ]);
      expect(findAllRoutesSpy).toHaveBeenCalledTimes(46);

      findAllRoutesSpy.mockRestore();
    });

    it('should recursively call once if the route is met on the first iteration', () => {
      const findAllRoutesSpy = jest.spyOn(utils, 'findAllRoutes');

      const result = utils.findAllRoutes(adjacencyGraph, 'A', 'C', []);
      expect(result).toStrictEqual([
        [ 'A', 'C'],
      ]);
      expect(findAllRoutesSpy).toHaveBeenCalledTimes(2);

      findAllRoutesSpy.mockRestore();
    });
  });

  describe("getRoutesWithDistances", () => {
    it('should return the given stops with their weight/distances for each', () => {
      const getRoutesWithDistancesSpy = jest.spyOn(utils, 'getRoutesWithDistances');
      const result = utils.getRoutesWithDistances([
        [ 'A', 'C', 'D', 'B' ],
        [ 'A', 'C', 'F', 'G', 'H', 'E', 'B' ],
      ]);

      expect(getRoutesWithDistancesSpy).toHaveBeenCalledTimes(1);

      expect(result).toEqual([
        [
          { end1: 'A', end2: 'C', distance: 2 },
          { end1: 'C', end2: 'D', distance: 1 },
          { end1: 'B', end2: 'D', distance: 4 }
        ],
        [ 
          { end1: 'A', end2: 'C', distance: 2 },
          { end1: 'C', end2: 'F', distance: 4 },
          { end1: 'F', end2: 'G', distance: 3 },
          { end1: 'G', end2: 'H', distance: 4 },
          { end1: 'E', end2: 'H', distance: 10 },
          { end1: 'B', end2: 'E', distance: 7 }, 
        ],
      ]);
    });
  });

  describe("addTotalDistanceFromRoutes", () => {
    it('should reduce array of stops to a number', () => {
      const result = utils.addTotalDistanceFromRoutes([
        { end1: 'A', end2: 'C', distance: 2 },
        { end1: 'C', end2: 'D', distance: 1 },
        { end1: 'B', end2: 'D', distance: 4 },
      ]);

      expect(typeof result).toBe('number');
    });

    it('should return the sum of all distances accumulated in given DistanceRow ', () => {
      const addTotalDistanceFromRoutesSpy = jest.spyOn(utils, 'addTotalDistanceFromRoutes');
      const result = utils.addTotalDistanceFromRoutes([
        { end1: 'A', end2: 'C', distance: 2 },
        { end1: 'C', end2: 'D', distance: 1 },
        { end1: 'B', end2: 'D', distance: 4 },
      ]);

      expect(addTotalDistanceFromRoutesSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(7);

      addTotalDistanceFromRoutesSpy.mockRestore();
    });

    it('should call function once per route', () => {
      const addTotalDistanceFromRoutesSpy = jest.spyOn(utils, 'addTotalDistanceFromRoutes');
      utils.addTotalDistanceFromRoutes(
        [
          { end1: 'A', end2: 'C', distance: 2 },
          { end1: 'C', end2: 'D', distance: 1 },
          { end1: 'B', end2: 'D', distance: 4 },
        ])
      utils.addTotalDistanceFromRoutes(
        [
          { end1: 'A', end2: 'C', distance: 2 },
          { end1: 'C', end2: 'F', distance: 4 },
          { end1: 'F', end2: 'G', distance: 3 },
          { end1: 'G', end2: 'H', distance: 4 },
          { end1: 'E', end2: 'H', distance: 10 },
          { end1: 'B', end2: 'E', distance: 7 }, 
        ]
      );

      expect(addTotalDistanceFromRoutesSpy).toHaveBeenCalledTimes(2);
    });
  });
});