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

const startNode = 1;
const targetNode = 5;

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
function drawMap(highlightPath = []) {
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
}

// Dijkstra's algorithm
function findShortestPath(start, target) {
    const distances = {};
    const previous = {};
    const queue = [];
    const pathEdges = [];

    nodes.forEach(node => {
        distances[node.id] = Infinity;
        previous[node.id] = null;
    });
    distances[start] = 0;
    queue.push({ id: start, cost: 0 });

    while (queue.length > 0) {
        queue.sort((a, b) => a.cost - b.cost);
        const current = queue.shift();

        if (current.id === target) break;

        edges.filter(e => e.from === current.id || e.to === current.id)
            .forEach(edge => {
                const neighbor = (edge.from === current.id) ? edge.to : edge.from;
                const newCost = distances[current.id] + edge.defenders;

                if (newCost < distances[neighbor]) {
                    distances[neighbor] = newCost;
                    previous[neighbor] = current.id;
                    queue.push({ id: neighbor, cost: newCost });
                }
            });
    }

    // Reconstruct path
    let step = target;
    while (previous[step] !== null) {
        const from = previous[step];
        const to = step;
        pathEdges.push(edges.find(e => (e.from === from && e.to === to) || (e.from === to && e.to === from)));
        step = from;
    }
    return pathEdges.reverse();
}

// Animate the path
function animatePath(path) {
    let index = 0;

    function step() {
        if (index >= path.length) {
            document.getElementById("info").innerText = "The zombies have reached their target!";
            return;
        }

        const highlight = path.slice(0, index + 1);
        drawMap(highlight);
        index++;
        setTimeout(step, 1000);
    }

    // highlight the start point
    drawMap([{ from: path[0].from, to: path[0].from, defenders: 0 }])
    setTimeout(step, 5000);
}

// Load the zombie image
const zombieImg = new Image();
zombieImg.src = "icons/zombie2.png"; // Replace with your zombie PNG file path

// Function to animate the zombie along the shortest path
function animateZombie(path, speed = 2) {
    let progress = 0; // Progress along the current edge
    let edgeIndex = 0; // Current edge in the path

    function animate() {
        if (edgeIndex >= path.length) {
            console.log("Zombie reached the destination!");
            return; // Stop animation when the path ends
        }

        // Get the current edge and its nodes
        const edge = path[edgeIndex];
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);

        // Calculate the position of the zombie
        const dx = toNode.x - fromNode.x;
        const dy = toNode.y - fromNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const normalizedDx = dx / distance;
        const normalizedDy = dy / distance;

        const zombieX = fromNode.x + normalizedDx * progress;
        const zombieY = fromNode.y + normalizedDy * progress;

        // Clear canvas and redraw everything
        drawMap(path); // Redraw map with highlighted path
        const zombieSize = 20; // Adjust zombie size as needed
        ctx.drawImage(
            zombieImg,
            zombieX - zombieSize / 2,
            zombieY - zombieSize / 2,
            zombieSize,
            zombieSize
        );

        // Update progress along the edge
        progress += speed;

        // Move to the next edge if the zombie reaches the end of the current one
        if (progress >= distance) {
            progress = 0; // Reset progress for the next edge
            edgeIndex++;
        }

        // Continue the animation
        if (edgeIndex < path.length) {
            requestAnimationFrame(animate);
        }
    }

    // Start the animation
    animate();
}


// Main
drawMap();

// Start the animation when the zombie image is loaded
zombieImg.onload = () => {
    const shortestPath = findShortestPath(startNode, targetNode);
    animateZombie(shortestPath);
};

// const shortestPath = findShortestPath(startNode, targetNode);
// animatePath(shortestPath);
