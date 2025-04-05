import { describe, expect, it, test } from "vitest";
import Pipe from "./pipe";
import Bird from "./bird";

test("If the pipe's position is updated, the x-coordinate should decrease by the speed", () => {
    const pipe = new Pipe();
    const oldXPosition = pipe.x;

    pipe.updatePipePosition();

    expect(pipe.x).toBeLessThan(oldXPosition);
});

describe("Collision detection between the pipe and the bird", () => {
    it("If the bird is to the left side of the pipe without touching it, the collision should return false", () => {
        const pipe = new Pipe(undefined);
        pipe.x = 50;
        pipe.topPipeHeight = 30;
        pipe.bottomPipeHeight = 20;
        pipe.canvasHeight = 100;
        const bird = new Bird(undefined, 20, 50);

        const collisionResult = pipe.isColliding(bird);

        expect(collisionResult).toBe(false);
    });

    it("If the bird collides with the left side of the upper pipe, the collision should return true", () => {
        const pipe = new Pipe(undefined);
        pipe.x = 50;
        pipe.topPipeHeight = 250;
        const bird = new Bird(undefined, 45, 200);

        const collisionResult = pipe.highlightCollisionOnNextRender(bird);

        expect(collisionResult).toBe(true);
    });

    it("If the bird collides with the left side of the lower pipe, the collision should return true", () => {
        const pipe = new Pipe(undefined);
        pipe.x = 50;
        pipe.bottomPipeHeight = 250;
        pipe.canvasHeight = 300;
        const bird = new Bird(undefined, 45, 200);

        const collisionResult = pipe.highlightCollisionOnNextRender(bird);

        expect(collisionResult).toBe(true);
    });

    it("If the bird collides with the bottom side of the upper pipe, the collision should return true", () => {
        const pipe = new Pipe(undefined);
        pipe.x = 50;
        pipe.topPipeHeight = 50;
        const bird = new Bird(undefined, 55, 60);

        const collisionResult = pipe.highlightCollisionOnNextRender(bird);

        expect(collisionResult).toBe(true);
    });

    it("If the bird collides with the upper side of the lower pipe, the collision should return true", () => {
        const pipe = new Pipe(undefined);
        pipe.x = 50;
        pipe.bottomPipeHeight = 50;
        pipe.canvasHeight = 100;
        const bird = new Bird(undefined, 55, 40);

        const collisionResult = pipe.highlightCollisionOnNextRender(bird);

        expect(collisionResult).toBe(true);
    });

    it("If the bird is between the upper and lower pipe, the collision should return false", () => {
        const pipe = new Pipe(undefined);
        pipe.x = 50;
        pipe.topPipeHeight = 30;
        pipe.bottomPipeHeight = 20;
        pipe.canvasHeight = 100;
        const bird = new Bird(undefined, 55, 50);

        const collisionResult = pipe.highlightCollisionOnNextRender(bird);

        expect(collisionResult).toBe(false);
    });

    it("If the bird is to the right of the pipe without touching it, the collision should return false", () => {
        const pipe = new Pipe(undefined);
        pipe.x = 50;
        const birdradius = 10;
        const bird = new Bird(undefined, pipe.x + pipe.width + birdradius + 1, 50);

        const collisionResult = pipe.highlightCollisionOnNextRender(bird);

        expect(collisionResult).toBe(false);
    });

    it("If the bird collides with a pipe, the pipes should be highlighted", () => {
        const pipe = new Pipe(undefined);
        pipe.x = 50;
        pipe.topPipeHeight = 30;
        pipe.bottomPipeHeight = 20;
        pipe.canvasHeight = 100;
        const bird = new Bird(undefined, 50, 0);

        pipe.isColliding(bird);
        expect(pipe.highlight).toBe(true);
    });
});
