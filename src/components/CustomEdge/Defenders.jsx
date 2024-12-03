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
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    pointerEvents: 'all',
                }}
            >
                <div style={{display: "flex", justifyContent: "center"}}>
                    {Array.from({ length: amount }).map((_, index) => (
                        <IoBody key={index} style={{ margin: "0 2px", fontSize: "24px" }} />
                    ))}
                </div>

                <div style={{fontWeight: "bold" }}>
                    #defenders: {amount}
                </div>
            </div>
        </EdgeLabelRenderer>
    );
}
