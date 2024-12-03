import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from '@xyflow/react';
import { IoBody } from "react-icons/io5";
import { useState, useEffect } from "react";
 
export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });


  
//   const onEdgeClick = () => {
//     setEdges((edges) => edges.filter((edge) => edge.id !== id));
//   };

const [number, setNumber] = useState(() => Math.floor(Math.random() * 10) + 1);

 
 
return (
  <>
    <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
    <EdgeLabelRenderer>
      <div
        className="button-edge__label nodrag nopan"
        style={{
          transform: `translate(-5%, -50%) translate(${labelX}px,${labelY}px)`,
        }}
      >
        <div >
          {/* Render the IoBody icons based on the persistent number */}
          

          {Array.from({ length: number }).map((_, index) => (
            <IoBody key={index} style={{ margin: "0 2px", fontSize: "24px" }} />
          ))}

          <div style={{fontWeight: "bold" }}>
              No. of People: {number}
          </div>
        </div>
      </div>
    </EdgeLabelRenderer>
  </>
);
}
          