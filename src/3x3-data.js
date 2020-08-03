import { Cubie } from "./basic-types.js";
import { imageLookup } from "./3x3-graphics.js";

const CubieType = {
    CORNER: 0,
    EDGE: 1,
    CENTER: 2
}

let cornerCubies = [
    new Cubie(CubieType.CORNER, 'ufl', 0, 3),
    new Cubie(CubieType.CORNER, 'ulb', 0, 3),
    new Cubie(CubieType.CORNER, 'ubr', 0, 3),
    new Cubie(CubieType.CORNER, 'urf', 0, 3),
    new Cubie(CubieType.CORNER, 'dfr', 0, 3),
    new Cubie(CubieType.CORNER, 'drb', 0, 3),
    new Cubie(CubieType.CORNER, 'dbl', 0, 3),
    new Cubie(CubieType.CORNER, 'dlf', 0, 3),
];

let edgeCubies = [
    new Cubie(CubieType.EDGE, 'ul', 0, 2),
    new Cubie(CubieType.EDGE, 'ub', 0, 2),
    new Cubie(CubieType.EDGE, 'ur', 0, 2),
    new Cubie(CubieType.EDGE, 'uf', 0, 2),
    new Cubie(CubieType.EDGE, 'fr', 0, 2),
    new Cubie(CubieType.EDGE, 'df', 0, 2),
    new Cubie(CubieType.EDGE, 'fl', 0, 2),
    new Cubie(CubieType.EDGE, 'dl', 0, 2),
    new Cubie(CubieType.EDGE, 'bl', 0, 2),
    new Cubie(CubieType.EDGE, 'db', 0, 2),
    new Cubie(CubieType.EDGE, 'br', 0, 2),
    new Cubie(CubieType.EDGE, 'dr', 0, 2),
];

let centerCubies = [
    new Cubie(CubieType.CENTER, 'u', 0, 1),
    new Cubie(CubieType.CENTER, 'f', 0, 1),
    new Cubie(CubieType.CENTER, 'l', 0, 1),
    new Cubie(CubieType.CENTER, 'b', 0, 1),
    new Cubie(CubieType.CENTER, 'r', 0, 1),
    new Cubie(CubieType.CENTER, 'd', 0, 1)
];

let cubies = [...cornerCubies, ...edgeCubies, ...centerCubies];

let moves = {
    L: {
        permutation: [[0, 7, 6, 1], [8, 14, 15, 16]],
        rotation: [2, 1, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
    },
    R: {
        permutation: [[2, 5, 4, 3], [10, 18, 19, 12]],
        rotation: [0, 0, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
    },
    F: {
        permutation: [[0, 3, 4, 7], [11, 12, 13, 14]],
        rotation: [1, 0, 0, 2, 1, 0, 0, 2, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
    },
    B: {
        permutation: [[1, 6, 5, 2], [9, 16, 17, 18]],
        rotation: [0, 2, 1, 0, 0, 2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0]
    },
    U: {
        permutation: [[0, 1, 2, 3], [8, 9, 10, 11]],
        rotation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
    },
    D: {
        permutation: [[4, 5, 6, 7], [13, 19, 17, 15]],
        rotation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    }
}

const coordsToCubicle = {
    '0,0,0': 6,
    '1,0,0': 17,
    '2,0,0': 5,
    '0,1,0': 16,
    '1,1,0': 23,
    '2,1,0': 18,
    '0,2,0': 1,
    '1,2,0': 9,
    '2,2,0': 2,
    '0,0,1': 15,
    '1,0,1': 25,
    '2,0,1': 19,
    '0,1,1': 22,
    '1,1,1': null,
    '2,1,1': 24,
    '0,2,1': 8,
    '1,2,1': 20,
    '2,2,1': 10,
    '0,0,2': 7,
    '1,0,2': 13,
    '2,0,2': 4,
    '0,1,2': 14,
    '1,1,2': 21,
    '2,1,2': 12,
    '0,2,2': 0,
    '1,2,2': 11,
    '2,2,2': 3
};

const imageTitles = [
    'wbr', 'brw', 'rwb', 'wob', 'obw', 'bwo', 'wgo', 'gow', 'owg', 'wrg', 'rgw', 'gwr',
    'ygr', 'gry', 'ryg', 'yog', 'ogy', 'gyo', 'ybo', 'boy', 'oyb', 'yrb', 'rby', 'byr',
    'wrk', 'rkw', 'kwr', 'krw', 'rwk', 'wkr', 'wbk', 'bkw', 'kwb', 'kbw', 'bwk', 'wkb',
    'wok', 'okw', 'kwo', 'kow', 'owk', 'wko', 'wgk', 'gkw', 'kwg', 'kgw', 'gwk', 'wkg',
    'yrk', 'rky', 'kyr', 'kry', 'ryk', 'ykr', 'ygk', 'gky', 'kyg', 'kgy', 'gyk', 'ykg',
    'yok', 'oky', 'kyo', 'koy', 'oyk', 'yko', 'ybk', 'bky', 'kyb', 'kby', 'byk', 'ykb',
    'rbk', 'bkr', 'krb', 'kbr', 'brk', 'rkb', 'rgk', 'gkr', 'krg', 'kgr', 'grk', 'rkg',
    'obk', 'bko', 'kob', 'kbo', 'bok', 'okb', 'ogk', 'gko', 'kog', 'kgo', 'gok', 'okg',
    'wkk', 'kkw', 'kwk', 'ykk', 'kky', 'kyk', 'okk', 'kko', 'kok', 'rkk', 'kkr', 'krk',
    'bkk', 'kkb', 'kbk', 'gkk', 'kkg', 'kgk'
];

class Renderer {
    constructor() {
        this.images = {};
        this.imageCount = imageTitles.length;
        this.imagesLoadedCount = 0;
        this.ready = false;
        this.loadImages();
    }

    imageOnLoad() {
        this.imagesLoadedCount++;
        if (this.imagesLoadedCount === this.imageCount) {
            this.ready = true;
        }
    }

    loadImages() {
        for (let title of imageTitles) {
            let img = new Image();
            img.onload = () => this.imageOnLoad();
            img.src = `graphics/3x3/${title}.svg`;
            this.images[title] = img;
        }
    }

    renderCube(state, ctx) {
        const X_WIDTH = 72;
        const Y_WIDTH = 72;
        const Z_WIDTH = 36;
        const IMG_WIDTH = 110;
    
        for (let y = 0; y < 3; y++) {
            for (let z = 0; z < 3; z++) {
                for (let x = 0; x < 3; x++) {
                    if (x === 2 || y === 2 || z === 2) {
                        const cubicle = coordsToCubicle[[x, y, z]];
                        const cubie = state.cubies[cubicle];
                        const imageTitle = imageLookup[cubie.name][cubicle][cubie.orientation];
                        const image = this.images[imageTitle];
                        const xCoord = Z_WIDTH * (2 - z) + X_WIDTH * x
                        const yCoord = Z_WIDTH * (4 + z) - Y_WIDTH * y
                        ctx.drawImage(image, xCoord, yCoord, IMG_WIDTH, IMG_WIDTH);
                    }
                }
            }
        }
    }
}

export { cubies, moves, Renderer };