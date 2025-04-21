import { beforeEach, describe, expect, it, vi } from "vitest";
import { Game } from "./game-manager";
import Bird from "./bird";
import Pipe from "./pipe";

describe("Game", () => {
    let game: Game;

    beforeEach(() => {
        game = new Game(undefined, undefined, new Bird(undefined, 0, 0), []);
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

    it("Update the score and set it to non-updateable when the bird has passed through a pipe and the score can be updated", () => {
        const bird = new Bird(undefined, 100, 200);
        game.bird = bird;
        game.scoreState = {
            canUpdateScore: true,
            score: 0,
        };
        const pipe = new Pipe(undefined, 30);

        game.updateScore(pipe);

        expect(game.scoreState).toEqual({ canUpdateScore: false, score: 1 });
    });

    it("Do not update the score and keep it to non-updateable when the bird has passed through a pipe and the score should not be increased again", () => {
        const bird = new Bird(undefined, 100, 200);
        game.bird = bird;
        game.scoreState = {
            canUpdateScore: false,
            score: 1,
        };
        const pipe = new Pipe(undefined, 30);

        game.updateScore(pipe);

        expect(game.scoreState).toEqual({ canUpdateScore: false, score: 1 });
    });

    it("Do not update the score but make it updateable again when the bird has not passed through a pipe yet and the score is set to non-updateable", () => {
        const bird = new Bird(undefined, 100, 200);
        game.bird = bird;
        game.scoreState = {
            canUpdateScore: false,
            score: 1,
        };
        const pipe = new Pipe(undefined, 120);

        game.updateScore(pipe);

        expect(game.scoreState).toEqual({ canUpdateScore: true, score: 1 });
    });

    it("If the game is reset, the score is set to 0 and updateable", () => {
        game.scoreState = {
            score: 5,
            canUpdateScore: false,
        };

        game.reset();

        expect(game.scoreState).toEqual({ score: 0, canUpdateScore: true });
    });

    it("If the first background image has not completely moved past the left canvas edge, the left background image decreases its x-coordinate by 1", () => {
        const image1StartX = 0;
        const imagesCoordinates = game.orderBackgroundImages(image1StartX);

        expect(imagesCoordinates).toBe(image1StartX - 1);
    });

    it("If the first background image has completely moved past the left canvas edge, the first background image x-coordinate will be set to 0", () => {
        const image1StartX = -game.canvasWidth;
        const imagesCoordinates = game.orderBackgroundImages(image1StartX);

        expect(imagesCoordinates).toBe(0);
    });

    it("If the game is reset, the bird's tilt angle is set to 0", () => {
        game.reset();
        expect(game.bird.tiltAngleDegrees).toBe(0);
    });
});
