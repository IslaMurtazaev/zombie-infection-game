import React from 'react';
import { BaseEdge, getSmoothStepPath } from '@xyflow/react';
import { IoBody } from "react-icons/io5";
import { useState, useEffect } from "react";


export function AnimatedSVGEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [number, setNumber] = useState(() => Math.floor(Math.random() * 10) + 1);

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <g>
        {Array.from({ length: number }).map((_, index) => (
          <image
            key={index}
            href="/zombie.png" // Path to the image in public directory
            width="30"
            height="30"
            x={index * 30} // Position each icon horizontally (adjust as needed)
          >
            <animateMotion dur="10s" repeatCount="indefinite" path={edgePath} />
          </image>
        ))}
        <text x="10" y="50" fontSize="16" fill="#ff0073">
        Total people: {number}
      </text>
      </g>

      {/* Text showing the total number of people */}
      
    </>
  );
}
