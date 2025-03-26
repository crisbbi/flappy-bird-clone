import p5 from "p5";
import Bird from "./bird";
import Pipe from "./pipe";

const a = new p5((sketch: p5) => {
    let x = 100;
    let y = 100;
    const canvasHeight = 400;
    const canvasWidth = 400;
    let bird = new Bird(sketch, x, y);
    let pipes: Pipe[] = [];

    sketch.setup = () => {
        sketch.createCanvas(canvasWidth, canvasHeight);
    };

    sketch.draw = () => {
        sketch.background(0);
        sketch.fill(255);
        bird.show();
        bird.update(canvasHeight);

        if (sketch.frameCount % 100 === 0) {
            pipes.push(new Pipe(sketch));
        }
        for (let index = pipes.length - 1; index >= 0; index--) {
            pipes[index].show();
            pipes[index].updatePipePosition();

            if (pipes[index].x + pipes[index].width < -10) {
                pipes.splice(index, 1);
            }
        }
    };

    sketch.keyPressed = () => {
        if (sketch.key === " ") {
            bird.up();
        }
    };
});
