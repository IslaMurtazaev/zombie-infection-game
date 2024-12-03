import React, { useCallback, useMemo } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Position,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import Building from "./components/Building";
import Ground from "./components/Ground";
import CustomEdge from './components/CustomEdge/CustomEdge';

const BUCKMAN_HALL = {
  id: "buckman",
  position: { x: 700, y: 600 },
  type: "building",
  data: {
    label: "Buckman Hall",
    isInfected: false,
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: "buckman-left",
      },
      {
        type: "source",
        position: Position.Right,
        id: "buckman-right",
      },
    ],
  },
};

const BARTELLS_HALL = {
  id: "bartells",
  position: { x: 700, y: 0 },
  type: "building",
  data: {
    label: "Bartells Hall",
    isInfected: false,
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: "bartells-left",
      },
      {
        type: "source",
        position: Position.Right,
        id: "bartells-right",
      },
    ],
  },
};

const MAXCY_HALL = {
  id: "maxcy",
  position: { x: -50, y: 300 },
  type: "building",
  data: {
    label: "Maxcy Hall",
    isInfected: false,
    handles: [
      {
        type: "source",
        position: Position.Right,
        id: "maxcy-right",
      },
    ],
  },
};

const KAPLAN_HALL = {
  id: "kaplan",
  position: { x: 1100, y: 300 },
  type: "building",
  data: {
    label: "Kaplan Hall",
    isInfected: false,
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: "kaplan-left",
      },
    ],
  },
};

const DODDS_HALL = {
  id: "dodds",
  position: { x: 1100, y: -400 },
  type: "building",
  data: {
    label: "Dodds Hall",
    isInfected: false,
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: "dodds-left",
      },
      {
        type: "source",
        position: Position.Right,
        id: "dodds-right",
      },
    ],
  },
};
const REC_CENTER = {
  id: "reccenter",
  position: { x: -300, y: -100 },
  type: "building",
  data: {
    label: "Recreational Center",
    isInfected: false,
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: "reccenter-left",
      },
      {
        type: "source",
        position: Position.Right,
        id: "reccenter-right",
      },
    ],
  },
};

const LIBRARY = {
  id: "library",
  position: { x: 200, y: 700 },
  type: "building",
  data: {
    label: "Library",
    isInfected: false,
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: "library-left",
      },
      {
        type: "source",
        position: Position.Right,
        id: "library-right",
      },
    ],
  },
};

const GREEN_GROUND = {
  id: "green-ground",
  position: { x: 0, y: 0 }, // Adjust to position the ground
  type: "ground",
  data: {
    label: "Quad", // No label or optional "Green Ground"
  },
};


const initialNodes = [
  REC_CENTER,
  BUCKMAN_HALL,
  BARTELLS_HALL,
  MAXCY_HALL,
  DODDS_HALL,
  KAPLAN_HALL,
  LIBRARY,
  GREEN_GROUND,
];
const initialEdges = [
  { id: "reccenter-bartells", source: "reccenter", target: "bartells", type: 'customEdge', data: {amount: 1, type: 'zombies'} },
  { id: "reccenter-maxcy", source: "reccenter", target: "maxcy", type: 'customEdge', data: {amount: 1, type: 'zombies'} },
  { id: "maxcy-bartells", source: "maxcy", target: "bartells", type: 'customEdge', data: {amount: 1, type: 'zombies'} },
  { id: "maxcy-buckman", source: "maxcy", target: "buckman", type: 'customEdge', data: {amount: 1, type: 'zombies'} },
  { id: "maxcy-library", source: "maxcy", target: "library", type: 'customEdge', data: {amount: 1, type: 'zombies'} },
  { id: "library-buckman", source: "library", target: "buckman", type: 'customEdge', data: {amount: 1, type: 'zombies'} },
  { id: "buckman-kaplan", source: "buckman", target: "kaplan", type: 'customEdge', data: {amount: 1, type: 'zombies'} },
  { id: "bartells-dodds", source: "bartells", target: "dodds", type: 'customEdge', data: {amount: 1, type: 'zombies'} },
  { id: "dodds-kaplan", source: "dodds", target: "kaplan", type: 'customEdge', data: {amount: 1, type: 'zombies'} },
];

const edgeTypes = {
  customEdge: CustomEdge,
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(() => ({ building: Building, ground: Ground }), []);

  return (
    <div style={{ position: "relative", width: '100vw', height: '100vh' }}>
        <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView //Added this for better view.
        >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
    </div>
  );
}
