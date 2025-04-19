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
    let font: p5.Font;
    let game: Game;

    sketch.preload = () => {
        img = sketch.loadImage(
            "./src/assets/bird.png",
            success => console.log(success),
            err => console.error(err)
        );
        font = sketch.loadFont(
            "src/assets/Inconsolata.otf",
            success => console.log(success),
            err => console.error(err)
        );
    };

    sketch.setup = () => {
        sketch.createCanvas(canvasWidth, canvasHeight, sketch.WEBGL);
        sketch.textSize(36);
        sketch.textFont(font);
        sketch.angleMode(sketch.DEGREES);
        sketch.imageMode(sketch.CENTER);
        bird.birdImage = img;
        game = new Game(sketch, bird, pipes);
    };

    sketch.draw = () => {
        sketch.fill(255);
        sketch.background(50);
        game.update();
        game.render();
    };

    sketch.keyPressed = () => {
        if (sketch.key === " ") {
            game.moveBirdUp();
        }
    };
});
