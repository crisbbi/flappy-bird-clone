import { it, expect, describe } from "vitest";
import Bird from "./bird";
import Pipe from "./pipe";

describe("Bird", () => {
    it("If the bird hits the floor, its y position should be set to the height of the canvas minus 10 and its velocity should be reset", () => {
        const bird = new Bird(undefined, 50, 50);
        const simulatedCanvasHeight = 50;

        bird.stopIfOutOfBounds(simulatedCanvasHeight);

        expect(bird.y).toBe(simulatedCanvasHeight - 10);
        expect(bird.velocity).toBe(0);
    });

    it("The bird should get negative velocity when it's pushed up, such that it moves upwards", () => {
        const yPosition = 50;
        const bird = new Bird(undefined, 50, yPosition);
        const oldVelocity = bird.velocity;

        bird.up();

        expect(bird.velocity).toBeLessThan(oldVelocity);
    });

    it("When the bird falls down on the floor, it should return true", () => {
        const yPosition = 50;
        const bird = new Bird(undefined, 50, yPosition);
        const simulatedCanvasHeight = 70;
        bird.birdImageHeight = 40;
        const isFloorHit = bird.hasHitFloor(simulatedCanvasHeight);
        expect(isFloorHit).toBe(true);
    });

    it("When the bird does not hit the floor, it should return false", () => {
        const yPosition = 50;
        const bird = new Bird(undefined, 50, yPosition);
        bird.birdImageHeight = 40;
        // canvas height needs to account for the coordinate system in webgl mode, which starts in the middle of the canvas and not in the top left corner.
        const simulatedCanvasHeight = 80;
        const isFloorHit = bird.hasHitFloor(simulatedCanvasHeight);
        expect(isFloorHit).toBe(false);
    });

    it("When the bird is reset, it should be placed at the initial position", () => {
        const yPosition = 50;
        const xPosition = 50;
        const bird = new Bird(undefined, xPosition, yPosition);
        bird.startPositionX = 400;
        bird.startPositionY = 400;

        bird.resetPosition();

        expect(bird.y).toBe(bird.startPositionY);
        expect(bird.x).toBe(bird.startPositionX);
        expect(bird.velocity).toBe(0);
    });

    it("If the bird is to the left of the right side of the nearest pipe, it should not have fully passed the nearest pipe yet", () => {
        const yPosition = 50;
        const xPosition = 20;
        const bird = new Bird(undefined, xPosition, yPosition);
        const nearestPipe = new Pipe(undefined, 60);

        const birdHasPassedPipe = bird.checkBirdHasPassedNearestPipe(nearestPipe);

        expect(birdHasPassedPipe).toBe(false);
    });

    it("If the bird is to the right of the right side of the nearest pipe, it should have fully passed the nearest pipe", () => {
        const yPosition = 50;
        const xPosition = 80;
        const bird = new Bird(undefined, xPosition, yPosition);
        const nearestPipe = new Pipe(undefined, 10);

        const birdHasPassedPipe = bird.checkBirdHasPassedNearestPipe(nearestPipe);

        expect(birdHasPassedPipe).toBe(true);
    });
});
