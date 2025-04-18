import p5 from "p5";
import Bird from "./bird";
import Pipe from "./pipe";

export class Game {
    p5Sketch?: p5;
    bird: Bird;
    pipes: Pipe[] = [];
    score = 0;
    canvasHeight = 400;
    canvasWidth = 400;

    constructor(sketch: p5 | undefined, bird: Bird, pipes: Pipe[]) {
        this.p5Sketch = sketch;
        this.bird = bird;
        this.pipes = pipes;
        this.canvasHeight = sketch?.height ?? 400;
        this.canvasWidth = sketch?.width ?? 400;
    }

    moveBirdUp() {
        this.bird.up();
    }

    show() {
        this.bird.show();
        this.bird.updatePosition(this.canvasHeight);
        const canvasHeightInWebglMode = this.canvasHeight / 2;
        if (this.bird.hasHitFloor(canvasHeightInWebglMode)) {
            this.p5Sketch?.noLoop();
            setTimeout(() => {
                this.bird.resetPosition();
                this.pipes = [];
                this.p5Sketch?.loop();
            }, 1000);
        }

        const frameCount = this.p5Sketch?.frameCount ?? 0;
        if (frameCount % 100 === 0) {
            this.pipes?.push(new Pipe(this.p5Sketch));
        }
        for (let index = this.pipes.length - 1; index >= 0; index--) {
            this.pipes[index].show();
            this.pipes[index].updatePipePosition();
            this.pipes[index].highlightCollisionOnNextRender(this.bird);

            if (this.pipes[index].x + this.pipes[index].width < -(this.canvasWidth / 2) - 10) {
                this.pipes.splice(index, 1);
            }
        }
    }
}
