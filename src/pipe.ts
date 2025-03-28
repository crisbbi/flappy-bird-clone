import p5 from "p5";
import Bird from "./bird";

export default class Pipe {
    x = Number.MAX_SAFE_INTEGER;
    topPipeHeight = 0;
    bottomPipeHeight = 0;
    width = 50;
    canvasHeight: number;
    p5Sketch?: p5;
    speed = 2;
    highlight = false;

    constructor(p5Sketch: p5 | undefined = undefined) {
        this.p5Sketch = p5Sketch;
        this.x = p5Sketch?.width ?? Number.MAX_SAFE_INTEGER;
        this.canvasHeight = p5Sketch?.height ?? 0;
        this.topPipeHeight = this.p5Sketch?.random(this.p5Sketch.height * 0.8) ?? 0;
        this.bottomPipeHeight = this.canvasHeight - this.topPipeHeight - 95;
    }

    show() {
        this.p5Sketch?.fill(255);
        if (this.highlight) {
            this.p5Sketch?.fill("red");
        }
        this.p5Sketch?.rect(this.x, 0, this.width, this.topPipeHeight);
        const pipeStartHeight = this.canvasHeight - this.bottomPipeHeight;
        this.p5Sketch?.rect(this.x, pipeStartHeight, this.width, this.bottomPipeHeight);
    }

    updatePipePosition() {
        this.x -= this.speed;
    }

    isColliding(bird: Bird) {
        const birdIsTooHigh = bird.y + bird.radius <= this.topPipeHeight;
        const birdIsTooLow = bird.y + bird.radius >= this.canvasHeight - this.bottomPipeHeight;
        const birdIsBetweenPipes = bird.x + bird.radius >= this.x && bird.x + bird.radius <= this.x + this.width;
        if (birdIsBetweenPipes && (birdIsTooHigh || birdIsTooLow)) {
            this.highlight = true;
            return true;
        }
        this.highlight = false;
        return false;
    }
}
