import React, {useCallback, useMemo} from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Position,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import Building from "./components/Building";

const BUCKMAN_HALL = {
    id: 'buckman',
    position: {x: 600, y: 600},
    type: 'building',
    data: {
        label: 'Buckman Hall',
        isInfected: false,
        handles: [
            {
                type: 'target',
                position: Position.Left,
                id: "buckman-left"
            },
            {
                type: 'source',
                position: Position.Right,
                id: "buckman-right"
            },
        ]
    }
}



const BARTELLS_HALL = {
    id: 'bartells',
    position: {x: 600, y: 0},
    type: 'building',
    data: {
        label: 'Bartells Hall',
        isInfected: false,
        handles: [
            {
                type: 'target',
                position: Position.Left,
                id: "bartells-left"
            },
            {
                type: 'source',
                position: Position.Right,
                id: "bartells-right"
            },
        ]
    }
}

const MAXCY_HALL = {
    id: 'maxcy',
    position: {x: 100, y: 300},
    type: 'building',
    data: {
        label: 'Maxcy Hall',
        isInfected: false,
        handles: [
            {
                type: 'source',
                position: Position.Right,
                id: "maxcy-right"
            },
        ]
    }
}

const KAPLAN_HALL = {
    id: 'kaplan',
    position: {x: 1100, y: 300},
    type: 'building',
    data: {
        label: 'Kaplan Hall',
        isInfected: false,
        handles: [
            {
                type: 'target',
                position: Position.Left,
                id: "kaplan-left"
            },
        ]
    }
}


const initialNodes = [
    BUCKMAN_HALL,
    BARTELLS_HALL,
    MAXCY_HALL,
    KAPLAN_HALL
];
const initialEdges = [
    {id: 'maxcy-bartells', source: 'maxcy', target: 'bartells'},
    {id: 'maxcy-buckman', source: 'maxcy', target: 'buckman'},
    {id: 'buckman-kaplan', source: 'buckman', target: 'kaplan'},
    {id: 'bartells-kaplan', source: 'bartells', target: 'kaplan'}
];


export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const nodeTypes = useMemo(() => ({ building: Building }), []);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}