import { test, expect } from "vitest";
import Bird from "./bird";

test("If the bird hits the floor, its y position should be set to the height of the canvas minus 10 and its velocity should be reset", () => {
    const bird = new Bird(undefined, 50, 50);
    const simulatedCanvasHeight = 50;

    bird.stopIfOutOfBounds(simulatedCanvasHeight);

    expect(bird.y).toBe(simulatedCanvasHeight - 10);
    expect(bird.velocity).toBe(0);
});

test("The bird should get negative velocity when it's pushed up, such that it moves upwards", () => {
    const yPosition = 50;
    const bird = new Bird(undefined, 50, yPosition);
    const oldVelocity = bird.velocity;

    bird.up();

    expect(bird.velocity).toBeLessThan(oldVelocity);
});

test("When the bird falls down on the floor, it should return true", () => {
    const yPosition = 50;
    const bird = new Bird(undefined, 50, yPosition);
    const simulatedCanvasHeight = 70;
    bird.birdImageHeight = 40;
    const isFloorHit = bird.hasHitFloor(simulatedCanvasHeight);
    expect(isFloorHit).toBe(true);
});

test("When the bird does not hit the floor, it should return false", () => {
    const yPosition = 50;
    const bird = new Bird(undefined, 50, yPosition);
    bird.birdImageHeight = 40;
    const simulatedCanvasHeight = 80;
    const isFloorHit = bird.hasHitFloor(simulatedCanvasHeight);
    expect(isFloorHit).toBe(false);
});
