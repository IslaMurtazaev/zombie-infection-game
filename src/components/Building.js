import { Handle } from "@xyflow/react";
import "./Building.css";

function Building({ data }) {
  const handles = data.handles || [];
  const isInfected = data.isInfected; // Check if the building is infected

  return (
    <>
      {handles.map(({ type, position, id }) => (
        <Handle key={id} type={type} position={position} id={id} />
      ))}
      <div className={`building ${isInfected ? "infected" : ""}`}>
        <div className="roof"></div>
        <div className="door"></div>
        <div className="window window1"></div>
        <div className="window window2"></div>
        <div className="window window3"></div>
        <div className="window window4"></div>
        <div className="label">{data.label}</div>
      </div>
    </>
  );
}

export default Building;
