import { beforeEach, describe, expect, it, vi } from "vitest";
import { Game } from "./game";
import Bird from "./bird";
import Pipe from "./pipe";

describe("Game", () => {
    let game: Game;

    beforeEach(() => {
        game = new Game(undefined, new Bird(undefined, 0, 0), []);
    });

    it("On game reset the pipe array should be cleared", () => {
        game.reset();

        expect(game.pipes.length).toBe(0);
    });

    it("On game reset the bird position reset should be called", () => {
        const resetPositionSpy = vi.spyOn(game.bird, "resetPosition");

        game.reset();

        expect(resetPositionSpy).toHaveBeenCalled();
    });

    it("If the list of pipes is empty, finding the nearest pipe to the bird should return undefined", () => {
        const pipes: Pipe[] = [];
        const bird = new Bird(undefined, 100, 200);
        game.pipes = pipes;
        game.bird = bird;

        const nearestPipe = game.findNearestPipeToBird();
        expect(nearestPipe).toBe(undefined);
    });

    it("If the bird is between 2 pipes and the left one is closer than the right one, it should find the left pipe as the nearest one to the bird", () => {
        const pipes: Pipe[] = [new Pipe(undefined, 0), new Pipe(undefined, 300)];
        const bird = new Bird(undefined, 100, 200);
        game.pipes = pipes;
        game.bird = bird;

        const nearestPipe = game.findNearestPipeToBird();
        expect(nearestPipe).toBe(pipes[0]);
    });

    it("If the bird is between 2 pipes and the right one is closer than the left one, it should find the right pipe as the nearest one to the bird", () => {
        const pipes: Pipe[] = [new Pipe(undefined, 0), new Pipe(undefined, 130)];
        const bird = new Bird(undefined, 100, 200);
        game.pipes = pipes;
        game.bird = bird;

        const nearestPipe = game.findNearestPipeToBird();
        expect(nearestPipe).toEqual(pipes[1]);
    });

    it("If the bird is to the left of 2 pipes and the left one is closer than the right one, it should find the left pipe as the nearest one to the bird", () => {
        const pipes: Pipe[] = [new Pipe(undefined, 150), new Pipe(undefined, 300)];
        const bird = new Bird(undefined, 100, 200);
        game.pipes = pipes;
        game.bird = bird;

        const nearestPipe = game.findNearestPipeToBird();
        expect(nearestPipe).toBe(pipes[0]);
    });
});
