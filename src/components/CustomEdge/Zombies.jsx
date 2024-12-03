import React from 'react';
import { getSmoothStepPath } from '@xyflow/react';


export function Zombies({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    amount,
}) {
    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <g>
            {Array.from({ length: amount }).map((_, index) => (
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
        </g>
    );
}
