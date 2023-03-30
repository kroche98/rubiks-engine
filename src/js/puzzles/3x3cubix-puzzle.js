import { Cubie, State, Puzzle } from "../basic-types.js";
import { BasicCubeRenderer } from "../basic-cube-renderer.js";
import { CubieType, moves, coordsToCubicle } from "../3x3-data.js";
import { imageLookup } from "../3x3cubix-graphics.js";

const cubies = [
    new Cubie(CubieType.CORNER, 'k', 0, 3),
    new Cubie(CubieType.CORNER, 'k', 0, 3),
    new Cubie(CubieType.CORNER, 'k', 0, 3),
    new Cubie(CubieType.CORNER, 'l', 2, 3),
    new Cubie(CubieType.CORNER, 'm', 0, 3),
    new Cubie(CubieType.CORNER, 'n', 1, 3),
    new Cubie(CubieType.CORNER, 'm', 0, 3),
    new Cubie(CubieType.CORNER, 'm', 1, 3),
    new Cubie(CubieType.EDGE, 'a', 0, 1),
    new Cubie(CubieType.EDGE, 'a', 0, 1),
    new Cubie(CubieType.EDGE, 'a', 0, 1),
    new Cubie(CubieType.EDGE, 'b', 1, 2),
    new Cubie(CubieType.EDGE, 'c', 0, 1),
    new Cubie(CubieType.EDGE, 'e', 0, 1),
    new Cubie(CubieType.EDGE, 'd', 1, 2),
    new Cubie(CubieType.EDGE, 'f', 0, 2),
    new Cubie(CubieType.EDGE, 'c', 0, 1),
    new Cubie(CubieType.EDGE, 'e', 0, 1),
    new Cubie(CubieType.EDGE, 'c', 0, 1),
    new Cubie(CubieType.EDGE, 'f', 0, 2),
    new Cubie(CubieType.CENTER, 'w', 0, 1),
    new Cubie(CubieType.CENTER, 'y', 0, 4),
    new Cubie(CubieType.CENTER, 'x', 0, 2),
    new Cubie(CubieType.CENTER, 'x', 0, 2),
    new Cubie(CubieType.CENTER, 'x', 0, 2),
    new Cubie(CubieType.CENTER, 'z', 0, 2)
];

const imageTitles = [
    'b-bd', 'b-br', 'b-fb', 'b-fd', 'b-fl', 'b-fr', 'b-lb',
    'b-ld', 'b-lr', 'b-rd', 'b-ub', 'b-ud', 'b-uf', 'b-ul',
    'b-ur', 'b-xb', 'b-xd', 'b-xf', 'b-xl', 'b-xr', 'b-xu',
    'r-bd', 'r-br', 'r-fb', 'r-fd', 'r-fl', 'r-fr', 'r-lb',
    'r-ld', 'r-lr', 'r-rd', 'r-ub', 'r-ud', 'r-uf', 'r-ul',
    'r-ur', 'r-xb', 'r-xd', 'r-xf', 'r-xl', 'r-xr', 'r-xu',
    'y-bd', 'y-br', 'y-fb', 'y-fd', 'y-fl', 'y-fr', 'y-lb',
    'y-ld', 'y-lr', 'y-rd', 'y-ub', 'y-ud', 'y-uf', 'y-ul',
    'y-ur', 'y-xb', 'y-xd', 'y-xf', 'y-xl', 'y-xr', 'y-xu'
];

const imageDirectory = process.env.CUBIX_IMG_DIRECTORY;

const renderer = new BasicCubeRenderer(3, 3, 3, coordsToCubicle, imageDirectory, imageTitles, imageLookup);

const solvedState = new State(cubies);

class Puzzle3x3Cubix extends Puzzle {
    static displayName = "3×3 Cubix Tube";

    constructor(state) {
        super(moves, renderer, solvedState, state);
    }

    scramble() {
        // TODO: rewrite this
        const movesArray = Object.keys(this.moveFunctions);
        for (let i = 0; i < 1000; i++) {
            const randomMove = movesArray[Math.floor(Math.random()*movesArray.length)];
            this.applyMove(randomMove);
        }
    }
}

export { Puzzle3x3Cubix }
