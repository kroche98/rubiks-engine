const CubieType = {
    CORNER: 1,
    EDGE: 2,
    CENTER: 3,
}

const moves = {
    L: {
        permutation: [[0, 7, 6, 1], [8, 14, 15, 16]],
        rotation: [2, 1, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        inverse: "Li"
    },
    R: {
        permutation: [[2, 5, 4, 3], [10, 18, 19, 12]],
        rotation: [0, 0, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        inverse: "Ri"
    },
    F: {
        permutation: [[0, 3, 4, 7], [11, 12, 13, 14]],
        rotation: [1, 0, 0, 2, 1, 0, 0, 2, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        inverse: "Fi"
    },
    B: {
        permutation: [[1, 6, 5, 2], [9, 16, 17, 18]],
        rotation: [0, 2, 1, 0, 0, 2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0],
        inverse: "Bi"
    },
    U: {
        permutation: [[0, 1, 2, 3], [8, 9, 10, 11]],
        rotation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        inverse: "Ui"
    },
    D: {
        permutation: [[4, 5, 6, 7], [13, 19, 17, 15]],
        rotation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        inverse: "Di"
    },
    Li: {
        permutation: [[0, 1, 6, 7], [8, 16, 15, 14]],
        rotation: [2, 1, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
        inverse: "L"
    },
    Ri: {
        permutation: [[2, 3, 4, 5], [10, 12, 19, 18]],
        rotation: [0, 0, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
        inverse: "R"
    },
    Fi: {
        permutation: [[0, 7, 4, 3], [11, 14, 13, 12]],
        rotation: [1, 0, 0, 2, 1, 0, 0, 2, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        inverse: "F"
    },
    Bi: {
        permutation: [[1, 2, 5, 6], [9, 18, 17, 16]],
        rotation: [0, 2, 1, 0, 0, 2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 3, 0, 0],
        inverse: "B"
    },
    Ui: {
        permutation: [[0, 3, 2, 1], [8, 11, 10, 9]],
        rotation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
        inverse: "U"
    },
    Di: {
        permutation: [[4, 7, 6, 5], [13, 15, 17, 19]],
        rotation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        inverse: "D"
    },
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

export { CubieType, moves, coordsToCubicle };