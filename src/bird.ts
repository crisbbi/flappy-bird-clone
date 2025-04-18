import p5 from "p5";

export default class Bird {
    x: number;
    y: number;
    startPositionX: number;
    startPositionY: number;
    gravity = 0.25;
    velocity = 0;
    p5Sketch?: p5;
    radius = 10;
    birdImage?: p5.Image;
    birdImageWidth = 60;
    birdImageHeight = 40;

    constructor(p5Sketch: p5 | undefined = undefined, x: number, y: number) {
        this.x = x;
        this.startPositionX = x;
        this.y = y;
        this.startPositionY = y;
        this.p5Sketch = p5Sketch;
    }

    show() {
        if (this.birdImage) {
            this.p5Sketch?.image(this.birdImage, this.x, this.y, 60, 40);
        }
    }

    updatePosition(canvasHeight: number) {
        this.velocity += this.gravity;
        this.velocity *= 0.97;
        this.y += this.velocity;
        this.stopIfOutOfBounds(canvasHeight);
    }

    stopIfOutOfBounds(canvasHeight: number) {
        if (this.y + this.radius > canvasHeight) {
            this.y = canvasHeight - this.radius;
            this.velocity = 0;
        }
    }

    hasHitFloor(canvasHeight: number) {
        return this.y + this.birdImageHeight / 2 >= canvasHeight;
    }

    up() {
        this.velocity = -6;
    }

    resetPosition() {
        this.x = this.startPositionX;
        this.y = this.startPositionY;
        this.velocity = 0;
    }
}
