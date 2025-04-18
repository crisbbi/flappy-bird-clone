import { beforeEach, describe, expect, it, vi } from "vitest";
import { Game } from "./game";
import Bird from "./bird";

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
});
