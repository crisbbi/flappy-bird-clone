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

    constructor(p5Sketch: p5 | undefined = undefined, x: number = Number.MAX_SAFE_INTEGER) {
        this.p5Sketch = p5Sketch;
        this.x = p5Sketch?.width ?? x;
        this.canvasHeight = p5Sketch?.height ?? 0;
        this.topPipeHeight = this.p5Sketch?.random(this.p5Sketch.height * 0.8) ?? 0;
        this.bottomPipeHeight = this.canvasHeight - this.topPipeHeight - this.upperLowerPipeGap;
    }

    show() {
        this.p5Sketch?.fill("#648e2e");
        this.p5Sketch?.stroke("black");
        this.p5Sketch?.strokeWeight(6);
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

    hasCollidedWithBird(bird: Bird) {
        const birdIsTooHigh = bird.y - bird.birdImageHeight / 2 + this.canvasHeight / 2 <= this.topPipeHeight;
        const birdIsTooLow =
            bird.y + bird.birdImageHeight / 2 + this.canvasHeight / 2 >= this.canvasHeight - this.bottomPipeHeight;
        const birdIsBetweenPipes =
            bird.x + bird.birdImageWidth / 2 >= this.x && bird.x - bird.birdImageWidth / 2 <= this.x + this.width;
        return birdIsBetweenPipes && (birdIsTooHigh || birdIsTooLow);
    }
}
