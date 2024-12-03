import {Position} from "@xyflow/react";

const BUCKMAN_HALL = {
    id: "buckman",
    position: { x: 700, y: 600 },
    type: "building",
    data: {
        label: "Buckman Hall",
        isInfected: false,
        handles: [
            {
                type: "target",
                position: Position.Left,
                id: "buckman-left",
            },
            {
                type: "source",
                position: Position.Right,
                id: "buckman-right",
            },
        ],
    },
};

const BARTELLS_HALL = {
    id: "bartells",
    position: { x: 700, y: 0 },
    type: "building",
    data: {
        label: "Bartells Hall",
        isInfected: false,
        handles: [
            {
                type: "target",
                position: Position.Left,
                id: "bartells-left",
            },
            {
                type: "source",
                position: Position.Right,
                id: "bartells-right",
            },
        ],
    },
};

const MAXCY_HALL = {
    id: "maxcy",
    position: { x: -50, y: 300 },
    type: "building",
    data: {
        label: "Maxcy Hall",
        isInfected: false,
        handles: [
            {
                type: "source",
                position: Position.Right,
                id: "maxcy-right",
            },
            {
                type: "target",
                position: Position.Top,
                id: "maxcy-top",
            },
        ],
    },
};

const KAPLAN_HALL = {
    id: "kaplan",
    position: { x: 1100, y: 300 },
    type: "building",
    data: {
        label: "Kaplan Hall",
        isInfected: false,
        handles: [
            {
                type: "target",
                position: Position.Left,
                id: "kaplan-left",
            },
        ],
    },
};

const DODDS_HALL = {
    id: "dodds",
    position: { x: 1100, y: -400 },
    type: "building",
    data: {
        label: "Dodds Hall",
        isInfected: false,
        handles: [
            {
                type: "target",
                position: Position.Left,
                id: "dodds-left",
            },
            {
                type: "source",
                position: Position.Right,
                id: "dodds-right",
            },
        ],
    },
};
const REC_CENTER = {
    id: "reccenter",
    position: { x: -300, y: -100 },
    type: "building",
    data: {
        label: "Recreational Center",
        isInfected: false,
        handles: [
            {
                type: "target",
                position: Position.Left,
                id: "reccenter-left",
            },
            {
                type: "source",
                position: Position.Right,
                id: "reccenter-right",
            },
        ],
    },
};

const LIBRARY = {
    id: "library",
    position: { x: 200, y: 700 },
    type: "building",
    data: {
        label: "Library",
        isInfected: false,
        handles: [
            {
                type: "target",
                position: Position.Left,
                id: "library-left",
            },
            {
                type: "source",
                position: Position.Right,
                id: "library-right",
            },
        ],
    },
};

const GREEN_GROUND = {
    id: "green-ground",
    position: { x: 0, y: 0 }, // Adjust to position the ground
    type: "ground",
    data: {
        label: "Quad", // No label or optional "Green Ground"
    },
};

export {
    REC_CENTER,
    BUCKMAN_HALL,
    BARTELLS_HALL,
    MAXCY_HALL,
    DODDS_HALL,
    KAPLAN_HALL,
    LIBRARY,
    GREEN_GROUND,
}
