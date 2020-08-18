import { Cubie } from "./basic-types.js";
import { imageLookup } from "./2x2rubiks-graphics.js";
import { CubieType, moves, Renderer } from "./2x2-data.js";

const cubies = [
    new Cubie(CubieType.CORNER, 'ufl', 0, 3),
    new Cubie(CubieType.CORNER, 'ulb', 0, 3),
    new Cubie(CubieType.CORNER, 'ubr', 0, 3),
    new Cubie(CubieType.CORNER, 'urf', 0, 3),
    new Cubie(CubieType.CORNER, 'dfr', 0, 3),
    new Cubie(CubieType.CORNER, 'drb', 0, 3),
    new Cubie(CubieType.CORNER, 'dbl', 0, 3),
    new Cubie(CubieType.CORNER, 'dlf', 0, 3),
];

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

const imageDirectory = 'graphics/3x3';
const renderer = new Renderer(imageDirectory, imageTitles, imageLookup);

export { cubies, moves, renderer };