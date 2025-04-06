import p5 from "p5";

export default class Bird {
    x: number;
    y: number;
    gravity = 0.25;
    velocity = 0;
    p5Sketch?: p5;
    radius = 10;
    birdImage?: p5.Image;

    constructor(p5Sketch: p5 | undefined = undefined, x: number, y: number) {
        this.x = x;
        this.y = y;
        this.p5Sketch = p5Sketch;
    }

    show() {
        this.p5Sketch?.fill(255);
        this.p5Sketch?.ellipse(this.x, this.y, 20, 20);
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
        if (this.y - this.radius <= 0) {
            this.y = this.radius;
            this.velocity = 0;
        }
    }

    up() {
        this.velocity = -6;
    }
}
