export type DistanceRow = {
  end1: string;
  end2: string;
  distance: number;
}

export const distances: DistanceRow[] = [
  { end1: "A", end2: "C", distance: 2 },
  { end1: "C", end2: "D", distance: 1 },
  { end1: "C", end2: "F", distance: 4 },
  { end1: "B", end2: "D", distance: 4 },
  { end1: "B", end2: "E", distance: 7 },
  { end1: "D", end2: "F", distance: 1 },
  { end1: "D", end2: "G", distance: 2 },
  { end1: "F", end2: "G", distance: 3 },
  { end1: "G", end2: "H", distance: 4 },
  { end1: "E", end2: "H", distance: 10 },
];

export type IAdjacencyGraph = {
  [key in string]: string[];
}

export const adjacencyGraph: IAdjacencyGraph = {
  'A': ['C'],
  'B': ['D', 'E'],
  'C': ['D', 'F', 'A'],
  'D': ['F', 'G', 'C', 'B'],
  'E': ['H', 'B'],
  'F': ['G', 'C', 'D'],
  'G': ['H', 'D', 'F'],
  'H': ['G', 'E'],
}