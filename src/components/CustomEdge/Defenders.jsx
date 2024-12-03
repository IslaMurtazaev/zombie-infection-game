import React from 'react';
import {EdgeLabelRenderer} from '@xyflow/react';
import { IoBody } from "react-icons/io5";


export function Defenders({
    amount,
    labelX,
    labelY
}) {
    return (
        <EdgeLabelRenderer>
            <div
                className="button-edge__label nodrag nopan"
                style={{
                    transform: `translate(-5%, -50%) translate(${labelX}px,${labelY}px)`,
                }}
            >
                <div >
                    {/* Render the IoBody icons based on the persistent number */}


                    {Array.from({ length: amount }).map((_, index) => (
                        <IoBody key={index} style={{ margin: "0 2px", fontSize: "24px" }} />
                    ))}

                    <div style={{fontWeight: "bold" }}>
                        No. of People: {amount}
                    </div>
                </div>
            </div>
        </EdgeLabelRenderer>
    );
}
