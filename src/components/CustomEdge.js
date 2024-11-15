import React from "react";
import { IconButton } from "@chakra-ui/react";
import { X } from "react-bootstrap-icons";
import {
  BezierEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";

export default function CustomEdge(props) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  } = props;

  const { setEdges } = useReactFlow();

  // Generate the Bezier path and label coordinates
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      {/* Render the edge */}
      <BezierEdge {...props} path={edgePath} />

      {/* Render the edge label */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          {/* Icon button for deleting the edge */}
          <IconButton
            aria-label="Delete Edge"
            icon={<X />}
            colorScheme="red"
            bg="transparent"
            size="sm"
            onClick={() =>
              setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id))
            }
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
