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
    upperLowerPipeGap = 120;

    constructor(p5Sketch: p5 | undefined = undefined) {
        this.p5Sketch = p5Sketch;
        this.x = p5Sketch?.width ?? Number.MAX_SAFE_INTEGER;
        this.canvasHeight = p5Sketch?.height ?? 0;
        this.topPipeHeight = this.p5Sketch?.random(this.p5Sketch.height * 0.8) ?? 0;
        this.bottomPipeHeight = this.canvasHeight - this.topPipeHeight - this.upperLowerPipeGap;
    }

    show() {
        this.p5Sketch?.fill(255);
        if (this.highlight) {
            this.p5Sketch?.fill("red");
        }
        this.p5Sketch?.rect(this.x, -this.canvasHeight / 2, this.width, this.topPipeHeight);
        const bottomPipeStartHeight = this.canvasHeight - this.bottomPipeHeight - this.canvasHeight / 2;
        this.p5Sketch?.rect(this.x, bottomPipeStartHeight, this.width, this.bottomPipeHeight);
    }

    updatePipePosition() {
        this.x -= this.speed;
    }

    highlightCollisionOnNextRender(bird: Bird) {
        const birdIsTooHigh = bird.y - bird.radius <= this.topPipeHeight;
        const birdIsTooLow = bird.y + bird.radius >= this.canvasHeight - this.bottomPipeHeight;
        const birdIsBetweenPipes = bird.x + bird.radius >= this.x && bird.x + bird.radius <= this.x + this.width;
        if (birdIsBetweenPipes && (birdIsTooHigh || birdIsTooLow)) {
            this.highlight = true;
            return;
        }
        this.highlight = false;
    }
}
