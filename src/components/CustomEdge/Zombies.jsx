import React from 'react';

export function Zombies({
    edgePath,
    amount,
}) {

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
                    <animateMotion dur="5s" repeatCount="1" path={edgePath} />
                </image>
            ))}
        </g>
    );
}
