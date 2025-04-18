import p5 from "p5";
import Bird from "./bird";
import Pipe from "./pipe";
import { Game } from "./game-manager";

const a = new p5((sketch: p5) => {
    const canvasHeight = 400;
    const canvasWidth = 400;
    let x = -0.25 * canvasWidth;
    let y = -75;
    let bird = new Bird(sketch, x, y);
    let pipes: Pipe[] = [];
    let img: p5.Image;
    let game: Game;

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
        game = new Game(sketch, bird, pipes);
    };

    sketch.draw = () => {
        sketch.background(50);
        sketch.fill(255);
        game.show();
    };

    sketch.keyPressed = () => {
        if (sketch.key === " ") {
            game.moveBirdUp();
        }
    };
});
