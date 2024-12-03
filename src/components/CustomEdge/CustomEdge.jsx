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
  const {zombies, defenders} = data

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      {zombies > 0 && (
          <Zombies edgePath={edgePath} amount={zombies} />
      )}
      {defenders > 0 && (
          <Defenders amount={defenders} labelX={labelX} labelY={labelY} />
      )}
    </>
  );
}
          