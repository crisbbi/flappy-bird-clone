import { test, expect } from "vitest";
import Bird from "./bird";

test("If the bird hits the floor, its y position should be set to the height of the canvas minus 10 and its velocity should be reset", () => {
    const bird = new Bird(undefined, 50, 50);
    const simulatedCanvasHeight = 50;

    bird.update(simulatedCanvasHeight);

    expect(bird.y).toBe(simulatedCanvasHeight - 10);
    expect(bird.velocity).toBe(0);
});
