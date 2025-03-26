import p5 from "p5";
import Bird from "./bird";

const a = new p5((sketch: p5) => {
    let x = 100;
    let y = 100;
    let boxWidth = 50
    let boxHeight = 50
    const canvasHeight = 400
    const canvasWidth = 400
    let bird = new Bird(sketch, x, y);

    sketch.setup = () => {
        sketch.createCanvas(canvasWidth, canvasHeight);
    };

    sketch.draw = () => {
        sketch.background(0);
        sketch.fill(255);
        sketch.rect(x, y, boxWidth, boxHeight);
        bird.show();
        bird.update(canvasHeight);

        if (y + boxHeight < canvasHeight) {
            y++
        }
    };
});


