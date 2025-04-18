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

    distanceBirdToCoordinate(pipeCoordinateX: number) {
        const currentCoordinateX = Math.abs(pipeCoordinateX);
        const birdX = Math.abs(this.bird.x);
        const furthestPointBetweenCoordinateAndBird = Math.max(currentCoordinateX, birdX);
        const nearestPointBetweenCoordinateAndBird = Math.min(currentCoordinateX, birdX);
        const disanceCoordinateToBird = furthestPointBetweenCoordinateAndBird - nearestPointBetweenCoordinateAndBird;
        return disanceCoordinateToBird;
    }

    moveBirdUp() {
        this.bird.up();
    }

    show() {
        this.bird.show();
        this.bird.updatePosition(this.canvasHeight);
        const canvasHeightInWebglMode = this.canvasHeight / 2;
        const pipe = this.findNearestPipeToBird();
        if (this.bird.hasHitFloor(canvasHeightInWebglMode) || (pipe && pipe.hasCollidedWithBird(this.bird))) {
            this.p5Sketch?.noLoop();
            if (pipe && pipe.hasCollidedWithBird(this.bird)) {
                pipe.highlight = true;
            }
            setTimeout(() => this.reset(), 1000);
        }

        const frameCount = this.p5Sketch?.frameCount ?? 0;
        if (frameCount % 100 === 0) {
            this.pipes.push(new Pipe(this.p5Sketch));
        }
        for (let index = this.pipes.length - 1; index >= 0; index--) {
            this.pipes[index].show();
            this.pipes[index].updatePipePosition();

            if (this.pipes[index].x + this.pipes[index].width < -(this.canvasWidth / 2) - 10) {
                this.pipes.splice(index, 1);
            }
        }
    }

    findNearestPipeToBird() {
        if (this.pipes.length === 0) {
            return undefined;
        }
        return this.pipes.reduce<Pipe>((currentlyNearest, currentPipe) => {
            const distanceToCurrentlyNearestPipeLeftSide = this.distanceBirdToCoordinate(currentlyNearest.x);
            const distanceToCurrentlyNearestPipeRightSide = this.distanceBirdToCoordinate(
                currentlyNearest.x + currentlyNearest.width
            );
            const distanceToCurrentPipeLeftSide = this.distanceBirdToCoordinate(currentPipe.x);
            const distanceToCurrentPipeRightSide = this.distanceBirdToCoordinate(currentPipe.x + currentPipe.width);
            const nearestDistance = Math.min(
                distanceToCurrentlyNearestPipeLeftSide,
                distanceToCurrentlyNearestPipeRightSide,
                distanceToCurrentPipeLeftSide,
                distanceToCurrentPipeRightSide
            );
            return nearestDistance === distanceToCurrentlyNearestPipeLeftSide ||
                nearestDistance === distanceToCurrentlyNearestPipeRightSide
                ? currentlyNearest
                : currentPipe;
        }, this.pipes[0]);
    }

    reset() {
        this.bird.resetPosition();
        this.pipes = [];
        this.p5Sketch?.loop();
    }
}
