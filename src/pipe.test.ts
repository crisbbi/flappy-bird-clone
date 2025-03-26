import { expect, test } from "vitest";
import Pipe from "./pipe";

test("If the pipe's position is updated, the x-coordinate should decrease by the speed", () => {
    const pipe = new Pipe();
    const oldXPosition = pipe.x;

    pipe.updatePipePosition();

    expect(pipe.x).toBeLessThan(oldXPosition);
});
