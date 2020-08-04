import { Cubie } from "./basic-types.js";
import { imageLookup } from "./3x3cubix-graphics.js";
import { CubieType, moves, Renderer } from "./3x3-data.js";

const cornerCubies = [
    new Cubie(CubieType.CORNER, 'k', 0, 3),
    new Cubie(CubieType.CORNER, 'k', 0, 3),
    new Cubie(CubieType.CORNER, 'k', 0, 3),
    new Cubie(CubieType.CORNER, 'l', 2, 3),
    new Cubie(CubieType.CORNER, 'm', 0, 3),
    new Cubie(CubieType.CORNER, 'n', 1, 3),
    new Cubie(CubieType.CORNER, 'm', 0, 3),
    new Cubie(CubieType.CORNER, 'm', 1, 3),
];

const edgeCubies = [
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
];

const centerCubies = [
    new Cubie(CubieType.CENTER, 'w', 0, 1),
    new Cubie(CubieType.CENTER, 'y', 0, 4),
    new Cubie(CubieType.CENTER, 'x', 0, 2),
    new Cubie(CubieType.CENTER, 'x', 0, 2),
    new Cubie(CubieType.CENTER, 'x', 0, 2),
    new Cubie(CubieType.CENTER, 'z', 0, 2)
];

const cubies = [...cornerCubies, ...edgeCubies, ...centerCubies];

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

const imageDirectory = 'graphics/cubix';
const renderer = new Renderer(imageDirectory, imageTitles, imageLookup);

export { cubies, moves, renderer };