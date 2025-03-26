import p5 from "p5";

export default class Bird {
    x: number;
    y: number;
    gravity = 0.25;
    velocity = 0;
    p5Sketch?: p5;

    constructor(p5Sketch: p5 | undefined = undefined, x: number, y: number) {
        this.x = x;
        this.y = y;
        this.p5Sketch = p5Sketch;
    }

    show() {
        this.p5Sketch?.fill(255);
        this.p5Sketch?.ellipse(this.x, this.y, 20, 20);
    }

    update(canvasHeight: number) {
        this.velocity += this.gravity;
        this.velocity *= 0.97;
        this.y += this.velocity;
        this.stopIfOutOfBounds(canvasHeight);
    }

    stopIfOutOfBounds(canvasHeight: number) {
        if (this.y + 10 > canvasHeight) {
            this.y = canvasHeight - 10;
            this.velocity = 0;
        }
        if (this.y + 10 <= 0) {
            this.y = 10;
            this.velocity = 0;
        }
    }

    up() {
        this.velocity -= 8;
    }
}
