import p5 from "p5";
import Bird from "./bird";
import Pipe from "./pipe";

const a = new p5((sketch: p5) => {
    let x = 75;
    let y = 100;
    const canvasHeight = 400;
    const canvasWidth = 400;
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
        sketch.createCanvas(canvasWidth, canvasHeight);
        bird.birdImage = img;
    };

    sketch.draw = () => {
        sketch.background(50);
        sketch.image(img, x, y, 60, 40);
        sketch.fill(255);
        bird.show();
        bird.updatePosition(canvasHeight);
        if (bird.hasHitFloor(canvasHeight)) {
            sketch.noLoop();
            setTimeout(() => {
                bird = new Bird(sketch, x, y);
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
