import p5 from "p5";
import Bird from "./bird";

const a = new p5((sketch: p5) => {
    let x = 100;
    let y = 100;
    const canvasHeight = 400;
    const canvasWidth = 400;
    let bird = new Bird(sketch, x, y);

    sketch.setup = () => {
        sketch.createCanvas(canvasWidth, canvasHeight);
    };

    sketch.draw = () => {
        sketch.background(0);
        sketch.fill(255);
        bird.show();
        bird.update(canvasHeight);
    };

    sketch.keyPressed = () => {
        if (sketch.key === " ") {
            bird.up();
        }
    };
});
