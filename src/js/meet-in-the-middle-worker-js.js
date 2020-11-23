import { MitmSolver } from "./meet-in-the-middle-solver.js";

onmessage = function({ data: { leftState, rightState, moves }}) {
    const solver = new MitmSolver(leftState, rightState, moves);
    const solution = solver.findSolution();
    postMessage(solution);
};
