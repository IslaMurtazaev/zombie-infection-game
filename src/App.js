import React, { useCallback, useMemo } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import Building from "./components/Building";
import Ground from "./components/Ground";
import CustomEdge from './components/CustomEdge/CustomEdge';
import {
  BARTELLS_HALL,
  BUCKMAN_HALL,
  DODDS_HALL, GREEN_GROUND,
  KAPLAN_HALL, LIBRARY,
  MAXCY_HALL,
  REC_CENTER
} from "./components/contstants/locations";

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
  { id: "reccenter-bartells", source: "reccenter", target: "bartells", type: 'customEdge', data: {zombies: 1, defenders: 1} },
  { id: "reccenter-maxcy", source: "reccenter", target: "maxcy", type: 'customEdge', data: {zombies: 1, defenders: 1} },
  { id: "maxcy-bartells", source: "maxcy", target: "bartells", type: 'customEdge', data: {zombies: 1, defenders: 5} },
  { id: "maxcy-buckman", source: "maxcy", target: "buckman", type: 'customEdge', data: {zombies: 1, defenders: 1} },
  { id: "maxcy-library", source: "maxcy", target: "library", type: 'customEdge', data: {zombies: 1, defenders: 1} },
  { id: "library-buckman", source: "library", target: "buckman", type: 'customEdge', data: {zombies: 1, defenders: 1} },
  { id: "buckman-kaplan", source: "buckman", target: "kaplan", type: 'customEdge', data: {zombies: 1, defenders: 1} },
  { id: "bartells-dodds", source: "bartells", target: "dodds", type: 'customEdge', data: {zombies: 1, defenders: 1} },
  { id: "dodds-kaplan", source: "dodds", target: "kaplan", type: 'customEdge', data: {zombies: 1, defenders: 1} },
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
