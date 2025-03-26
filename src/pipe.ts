import p5 from "p5";

export default class Pipe {
    x = Number.MAX_SAFE_INTEGER;
    topPipeHeight = 0;
    bottomPipeHeight = 0;
    width = 50;
    height = 200;
    p5Sketch?: p5;
    speed = 2;

    constructor(p5Sketch: p5 | undefined = undefined) {
        this.p5Sketch = p5Sketch;
        this.x = p5Sketch?.width ?? Number.MAX_SAFE_INTEGER;
        this.topPipeHeight = this.p5Sketch?.random(this.p5Sketch.height / 2) ?? 0;
        this.bottomPipeHeight = this.p5Sketch?.random(this.p5Sketch.height / 2) ?? 0;
    }

    show() {
        this.p5Sketch?.fill(255);
        this.p5Sketch?.rect(this.x, 0, this.width, this.topPipeHeight);
        const canvasHeight = this.p5Sketch?.height ?? 0;
        const pipeStartHeight = canvasHeight - this.bottomPipeHeight;
        this.p5Sketch?.rect(this.x, pipeStartHeight, this.width, this.bottomPipeHeight);
    }

    updatePipePosition() {
        this.x -= this.speed;
    }
}
