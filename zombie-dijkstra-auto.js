const canvas = document.getElementById("map");
const ctx = canvas.getContext("2d");

// Map configuration
const nodes = [
    { id: 1, x: 100, y: 200, name: "Bayer H." },
    { id: 2, x: 500, y: 200, name: "Henry H." },
    { id: 3, x: 700, y: 210, name: "Bartels H." },
    { id: 4, x: 700, y: 400, name: "Buckman H." },
    { id: 5, x: 900, y: 400, name: "Kaplan H." },
    { id: 6, x: 500, y: 600, name: "Library" },
    { id: 7, x: 300, y: 400, name: "Maxcy H." },
    { id: 8, x: 900, y: 170, name: "Dodd's H." },

];

const edges = [
    { from: 1, to: 2, defenders: 3 },
    { from: 2, to: 3, defenders: 3 },
    { from: 3, to: 4, defenders: 1 },
    { from: 4, to: 5, defenders: 2 },
    { from: 3, to: 5, defenders: 4 },
    { from: 1, to: 7, defenders: 4 },
    { from: 7, to: 6, defenders: 2 },
    { from: 6, to: 4, defenders: 3 },
    { from: 3, to: 8, defenders: 2 },
    { from: 8, to: 5, defenders: 2 },
];

// Draw a label under the building
function drawLabel(x, y, text) {
    ctx.fillStyle = "black"; // Label color
    ctx.font = "14px Arial"; // Label font
    ctx.textAlign = "center"; // Center the text under the building
    ctx.fillText(text, x, y + 40); // Adjust the vertical offset for the label
}

// Draw a small building
function drawBuilding(x, y, highlight = false) {
    // Ground
    ctx.fillStyle = "#228B22";
    ctx.fillRect(x - 50, y, 90, 10);

    // Main building
    ctx.fillStyle = highlight ? "#FFD700" : "#f4f4f4";
    ctx.fillRect(x - 40, y - 80, 70, 80);
    ctx.strokeStyle = "#ccc";
    ctx.strokeRect(x - 40, y - 80, 70, 80);

    // Windows
    ctx.fillStyle = "#87CEEB";
    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
            ctx.fillRect(
                x - 30 + col * 20,
                y + row * 20 - 60,
                10,
                10
            );
        }
    }

    // Door
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(x - 10, y - 20, 10, 20);
}

// Load the defender image
const defenderImg = new Image();
defenderImg.src = "icons/hazmat.png"; // Replace with your actual image path

// Draw defenders on the road
function drawDefenders(fromNode, toNode, count) {
    const midX = (fromNode.x + toNode.x) / 2;
    const midY = (fromNode.y + toNode.y) / 2;

    const dx = (toNode.x - fromNode.x) / (count + 1);
    const dy = (toNode.y - fromNode.y) / (count + 1);

    // Center alignment logic: position defenders symmetrically around the midpoint
    const offsetFactor = 0.5; // Adjust this to control grouping density (smaller = tighter grouping)
    for (let i = 0; i < count; i++) {
        const offset = ((i - (count - 1) / 2) * offsetFactor); // Symmetrical offset
        const x = midX + dx * offset;
        const y = midY + dy * offset;

        // Draw the defender image
        const defenderSize = 20; // Adjust the size as needed
        ctx.drawImage(defenderImg, x - defenderSize / 2, y - defenderSize / 2, defenderSize, defenderSize);
    }
}

// Draw the map
function drawMap(highlightBuildings = [], highlightPath = []) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    edges.forEach(edge => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);
        const isHighlighted = highlightPath.includes(edge);

        // Draw the road
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = isHighlighted ? "red" : "gray";
        ctx.lineWidth = isHighlighted ? 2 : 1;
        ctx.stroke();

        // Draw defenders on the road
        drawDefenders(fromNode, toNode, edge.defenders);
    });

    nodes.forEach(node => {
        const highlight = highlightPath.some(edge =>
            edge.from === node.id || edge.to === node.id
        );
        drawBuilding(node.x, node.y, highlight);
        drawLabel(node.x, node.y, node.name || `Building ${node.id}`);
    });

    console.log('highlightBuildings', highlightBuildings)
    highlightBuildings.forEach(nodeId => {
        const node = nodes.find(node => node.id === nodeId)
        ctx.drawImage(
            zombieImg,
            node.x - 20 / 2,
            node.y - 20 / 2,
            20,
            20
        );
    })
}

// Load the zombie image
const zombieImg = new Image();
zombieImg.src = "icons/zombie2.png"; // Replace with your zombie PNG file path

let infectedBuildings = new Set([1]);  // Start with one infected building (e.g., Library)

// Function to calculate the next building based on Dijkstra's logic
function findNextBuilding() {
    let nextBuildingFrom = null
    let nextBuilding = null;
    let minDefenders = Infinity;

    infectedBuildings.forEach(buildingId => {
        const currentNode = nodes.find(node => node.id === buildingId);
        const neighbors = edges.filter(edge => edge.from === buildingId || edge.to === buildingId);

        neighbors.forEach(edge => {
            const neighborId = edge.from === buildingId ? edge.to : edge.from;
            const defenderCount = edge.defenders;

            if (!infectedBuildings.has(neighborId) && defenderCount < minDefenders) {
                minDefenders = defenderCount;
                nextBuilding = neighborId;
                nextBuildingFrom = currentNode.id
            }
        });
    });

    return {from: nextBuildingFrom, to: nextBuilding};
}

// Function to animate the zombie moving along a line
function moveZombieAlongLine(fromNode, toNode) {
    const zombieSize = 30; // Adjust zombie size
    const zombieSpeed = 0.02; // Controls the speed of the movement (0 to 1)
    let t = 0;  // Parameter for linear interpolation (0 -> start, 1 -> end)

    // Get the coordinates of the two buildings
    const startX = fromNode.x;
    const startY = fromNode.y;
    const endX = toNode.x;
    const endY = toNode.y;

    function animate() {
        t += zombieSpeed;  // Increase the parameter over time (speed up the movement)

        // Interpolate the zombie's position along the line
        const currentX = startX + t * (endX - startX);
        const currentY = startY + t * (endY - startY);

        // Redraw the map and draw the zombie at the new position
        drawMap([...infectedBuildings]);
        ctx.drawImage(
            zombieImg,
            currentX - zombieSize / 2,
            currentY - zombieSize / 2,
            zombieSize,
            zombieSize
        );

        // If the zombie hasn't reached the destination, continue animating
        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            // Mark the destination building as infected and continue
            infectedBuildings.add(toNode.id);

            // Start the next movement
            setTimeout(startNextMovement, 500); // Wait a bit before moving again
        }
    }

    animate();
}

// Function to start the next movement
function startNextMovement() {
    const {from: fromNodeId, to: toNodeId} = findNextBuilding();
    if (fromNodeId) {
        const fromNode = nodes.find(node => node.id === fromNodeId)
        const toNode = nodes.find(node => node.id === toNodeId)

        moveZombieAlongLine(fromNode, toNode);
    } else {
        console.log("Zombie has infected all reachable buildings!");
    }
}

// Start the animation when the zombie image is loaded
zombieImg.onload = startNextMovement;