import { beforeEach, describe, expect, it, test } from "vitest";
import Pipe from "./pipe";
import Bird from "./bird";

test("If the pipe's position is updated, the x-coordinate should decrease by the speed", () => {
    const pipe = new Pipe();
    const oldXPosition = pipe.x;

    pipe.updatePipePosition();

    expect(pipe.x).toBeLessThan(oldXPosition);
});

describe("Collision detection between the pipe and the bird", () => {
    let pipe: Pipe;
    beforeEach(() => {
        pipe = new Pipe();
        pipe.x = 50;
        pipe.canvasHeight = 200;
    });

    it("If the bird is to the left side of the pipe without touching it, the pipe should not be marked to be highlighted on the next render", () => {
        pipe.topPipeHeight = 30;
        pipe.bottomPipeHeight = 20;
        pipe.canvasHeight = 100;
        const bird = new Bird(undefined, 10, 50);

        const hasCollided = pipe.hasCollidedWithBird(bird);

        expect(hasCollided).toBe(false);
    });

    it("If the bird collides with the left side of the upper pipe, the pipe should be marked to be highlighted on the next render", () => {
        pipe.topPipeHeight = 250;
        const bird = new Bird(undefined, 45, 200);

        const hasCollided = pipe.hasCollidedWithBird(bird);

        expect(hasCollided).toBe(true);
    });

    it("If the bird collides with the left side of the lower pipe, the pipe should be marked to be highlighted on the next render", () => {
        pipe.bottomPipeHeight = 250;
        pipe.canvasHeight = 300;
        const bird = new Bird(undefined, 45, 200);

        const hasCollided = pipe.hasCollidedWithBird(bird);

        expect(hasCollided).toBe(true);
    });

    it("If the bird collides with the bottom side of the upper pipe, the pipe should be marked to be highlighted on the next render", () => {
        pipe.topPipeHeight = 240;
        const bird = new Bird(undefined, 55, 60);

        const hasCollided = pipe.hasCollidedWithBird(bird);

        expect(hasCollided).toBe(true);
    });

    it("If the bird collides with the upper side of the lower pipe, the pipe should be marked to be highlighted on the next render", () => {
        pipe.bottomPipeHeight = 50;
        pipe.canvasHeight = 100;
        const bird = new Bird(undefined, 55, 40);

        const hasCollided = pipe.hasCollidedWithBird(bird);

        expect(hasCollided).toBe(true);
    });

    it("If the bird is between the upper and lower pipe, the pipe should not be marked to be highlighted on the next render", () => {
        pipe.topPipeHeight = 120;
        pipe.bottomPipeHeight = 20;
        const bird = new Bird(undefined, 55, 50);

        const hasCollided = pipe.hasCollidedWithBird(bird);

        expect(hasCollided).toBe(false);
    });

    it("If the bird is to the right of the pipe without touching it, the pipe should not be marked to be highlighted on the next render", () => {
        const birdradius = 10;
        const bird = new Bird(undefined, pipe.x + pipe.width + birdradius + 1, 50);

        const hasCollided = pipe.hasCollidedWithBird(bird);

        expect(hasCollided).toBe(false);
    });

    it("If the bird collides with a pipe, the pipes should be highlighted", () => {
        pipe.topPipeHeight = 30;
        pipe.bottomPipeHeight = 20;
        pipe.canvasHeight = 100;
        const bird = new Bird(undefined, 50, 0);

        const hasCollided = pipe.hasCollidedWithBird(bird);

        expect(hasCollided).toBe(true);
    });
});
