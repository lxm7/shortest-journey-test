export type DistanceRow = {
  start: string;
  end: string;
  distance: number;
};

export const distances: DistanceRow[] = [
  { start: "A", end: "C", distance: 2 },
  { start: "C", end: "D", distance: 1 },
  { start: "C", end: "F", distance: 4 },
  { start: "B", end: "D", distance: 4 },
  { start: "B", end: "E", distance: 7 },
  { start: "D", end: "F", distance: 1 },
  { start: "D", end: "G", distance: 2 },
  { start: "F", end: "G", distance: 3 },
  { start: "G", end: "H", distance: 4 },
  { start: "E", end: "H", distance: 10 }
];

type Path = {
  node: string;
  weight: number;
};

export type IAdjacencyGraph = {
  [key in string]: Path[];
};

export const adjacencyGraph: IAdjacencyGraph = {
  A: [{ node: "C", weight: 2 }],
  B: [{ node: "D", weight: 4 }, { node: "E", weight: 7 }],
  C: [
    { node: "A", weight: 2 },
    { node: "D", weight: 1 },
    { node: "F", weight: 4 }
  ],
  D: [
    { node: "C", weight: 1 },
    { node: "B", weight: 4 },
    { node: "F", weight: 1 },
    { node: "G", weight: 2 }
  ],
  E: [{ node: "B", weight: 7 }, { node: "H", weight: 10 }],
  F: [
    { node: "C", weight: 4 },
    { node: "D", weight: 1 },
    { node: "G", weight: 3 }
  ],
  G: [
    { node: "D", weight: 2 },
    { node: "F", weight: 3 },
    { node: "H", weight: 4 }
  ],
  H: [{ node: "G", weight: 4 }, { node: "E", weight: 10 }]
};

export const elements = [
  { data: { id: "A", label: "A" } },
  { data: { id: "B", label: "B" } },
  { data: { id: "C", label: "C" } },
  { data: { id: "D", label: "D" } },
  { data: { id: "E", label: "E" } },
  { data: { id: "F", label: "F" } },
  { data: { id: "G", label: "G" } },
  { data: { id: "H", label: "H" } },
  { data: { source: "A", target: "C", label: "Edge weight 2" } },
  { data: { source: "B", target: "D", label: "4" } },
  { data: { source: "B", target: "E", label: "7" } },
  { data: { source: "C", target: "A", label: "2" } },
  { data: { source: "C", target: "D", label: "1" } },
  { data: { source: "C", target: "F", label: "4" } },
  { data: { source: "D", target: "C", label: "1" } },
  { data: { source: "D", target: "B", label: "4" } },
  { data: { source: "D", target: "F", label: "1" } },
  { data: { source: "D", target: "G", label: "2" } },
  { data: { source: "E", target: "B", label: "7" } },
  { data: { source: "E", target: "H", label: "10" } },
  { data: { source: "F", target: "C", label: "4" } },
  { data: { source: "F", target: "D", label: "1" } },
  { data: { source: "F", target: "G", label: "3" } },
  { data: { source: "G", target: "D", label: "2" } },
  { data: { source: "G", target: "F", label: "3" } },
  { data: { source: "G", target: "H", label: "4" } },
  { data: { source: "H", target: "G", label: "4" } },
  { data: { source: "H", target: "E", label: "10" } }
];

export const graph = {
  nodes: [
    { id: "A", label: "A", color: "red" },
    { id: "B", label: "B", color: "red" },
    { id: "C", label: "C", color: "red" },
    { id: "D", label: "D", color: "red" },
    { id: "E", label: "E", color: "red" },
    { id: "F", label: "F", color: "red" },
    { id: "G", label: "G", color: "red" },
    { id: "H", label: "H", color: "red" }
  ],
  edges: [
    { from: "A", to: "C", weight: 2 },
    { from: "B", to: "D", weight: 4 },
    { from: "B", to: "E", weight: 7 },
    { from: "C", to: "A", weight: 2 },
    { from: "C", to: "D", weight: 1 },
    { from: "C", to: "F", weight: 4 },
    { from: "D", to: "C", weight: 1 },
    { from: "D", to: "B", weight: 4 },
    { from: "D", to: "F", weight: 1 },
    { from: "D", to: "G", weight: 2 },
    { from: "E", to: "B", weight: 7 },
    { from: "E", to: "H", weight: 10 },
    { from: "F", to: "C", weight: 4 },
    { from: "F", to: "D", weight: 1 },
    { from: "F", to: "G", weight: 3 },
    { from: "G", to: "D", weight: 2 },
    { from: "G", to: "F", weight: 3 },
    { from: "G", to: "H", weight: 4 },
    { from: "H", to: "G", weight: 4 },
    { from: "H", to: "E", weight: 10 }
  ]
};

// <div className="route__graph">
// {graph.nodes.map(node => {
//   return (
//     <div className={`route__option route__option--${node.label}`}>
//       <div>{node.label}</div>

//       <span>
//         {matchNode(node.label).map(edge => (
//           <Fragment>
//             <LineTo
//               from={`route__option--${edge.from}`}
//               to={`route__option--${edge.to}`}
//               borderColor={"#eee"}
//               // borderWidth='1px'
//             />
//             <span>{edge.weight}</span>
//           </Fragment>
//         ))}
//       </span>
//     </div>
//   );
// })}
// </div>
