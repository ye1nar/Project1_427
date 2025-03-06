let garden;
let bees = [];
let gardenRevealed = 255; // Start fully covered
let gameState = "start"; // Can be "start", "revealing", or "bees"

function preload() {
    // Load your custom garden image (Replace "flower.jpg" with your file)
    garden = loadImage("flower.jpg");
}

function setup() {
    createCanvas(800, 700);
    background("magenta");

    // Create a "Start" button
    let startButton = createButton("start");
    startButton.position(width / 2 - 20, height / 2);
    startButton.mousePressed(() => {
        gameState = "revealing";
        startButton.hide(); // Hide the button after clicking
    });

    // Generate some bee objects
    for (let i = 0; i < 5; i++) {
        bees.push(new Bee(random(width), random(height)));
    }
}

function draw() {
    if (gameState === "start") {
        textAlign(CENTER, CENTER);
        textSize(20);
        fill(0);
        text("Click for flower", width / 2, height / 2 - 40);
    }
    else if (gameState === "revealing") {
        image(garden, 0, 0, width, height); // Display the garden image

        // Apply a single blue overlay that gradually fades
        fill(0, 0, 255, gardenRevealed);
        rect(0, 0, width, height);

        if (gardenRevealed <= 0) {
            gameState = "bees"; // Once fully revealed, start bees
        }
    }
    else if (gameState === "bees") {
        image(garden, 0, 0, width, height);
        for (let bee of bees) {
            bee.update();
            bee.display();
        }
        
        // Display a message at the end
        textAlign(CENTER, CENTER);
        textSize(24);
        fill(0);
        text("Just bee-cause >.<", width / 2, height - 30);
    }
}

function mousePressed() {
    if (gameState === "revealing") {
        gardenRevealed -= 50; // Clicking gradually reduces opacity

        if (gardenRevealed <= 0) {
            gardenRevealed = 0; // Ensure it doesn't go below 0
            gameState = "bees";
        }
    }
}

class Bee {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = random(1, 3);
        this.angle = random(TWO_PI);
    }

    update() {
        this.x += cos(this.angle) * this.speed;
        this.y += sin(this.angle) * this.speed;

        // Make bees bounce around the canvas
        if (this.x < 0 || this.x > width) this.angle = PI - this.angle;
        if (this.y < 0 || this.y > height) this.angle = -this.angle;
    }

    display() {
        fill(255, 204, 0);
        ellipse(this.x, this.y, 10, 10); // Simple circle for bee body
        fill(0);
        ellipse(this.x - 3, this.y - 2, 5, 5); // Head
    }
}
