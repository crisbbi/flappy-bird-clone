import p5 from "p5";
import Bird from "./bird";
import Pipe from "./pipe";

const a = new p5((sketch: p5) => {
    const canvasHeight = 400;
    const canvasWidth = 400;
    let x = -0.25 * canvasWidth;
    let y = -75;
    let bird = new Bird(sketch, x, y);
    let pipes: Pipe[] = [];
    let img: p5.Image;

    sketch.preload = () => {
        img = sketch.loadImage(
            "./src/bird.png",
            success => console.log(success),
            err => console.error(err)
        );
    };

    sketch.setup = () => {
        sketch.createCanvas(canvasWidth, canvasHeight, sketch.WEBGL);
        sketch.angleMode(sketch.DEGREES);
        sketch.imageMode(sketch.CENTER);
        bird.birdImage = img;
    };

    sketch.draw = () => {
        sketch.background(50);
        sketch.fill(255);
        bird.show();
        bird.updatePosition(canvasHeight);
        const canvasHeightInWebglMode = canvasHeight / 2;
        if (bird.hasHitFloor(canvasHeightInWebglMode)) {
            sketch.noLoop();
            setTimeout(() => {
                bird = new Bird(sketch, x, y);
                bird.birdImage = img;
                pipes = [];
                sketch.loop();
            }, 1000);
        }

        if (sketch.frameCount % 100 === 0) {
            pipes.push(new Pipe(sketch));
        }
        for (let index = pipes.length - 1; index >= 0; index--) {
            pipes[index].show();
            pipes[index].updatePipePosition();
            pipes[index].highlightCollisionOnNextRender(bird);

            if (pipes[index].x + pipes[index].width < -(canvasWidth / 2) - 10) {
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
