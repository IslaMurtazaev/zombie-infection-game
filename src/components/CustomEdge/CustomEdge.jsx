import React from 'react';
import {
  BaseEdge,
  getBezierPath,
} from '@xyflow/react';
import {Zombies} from "./Zombies";
import {Defenders} from "./Defenders";
 
export default function CustomEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const {amount, type} = data

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      {type === "zombies" ? (
          <Zombies sourceX={sourceX} sourceY={sourceY} targetX={targetX} targetY={targetY} sourcePosition={sourcePosition} targetPosition={targetPosition} amount={amount} />
      ) : (
          <Defenders amount={amount} labelX={labelX} labelY={labelY} />
      )}
    </>
  );
}
          