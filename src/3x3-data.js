const CubieType = {
    CORNER: 0,
    EDGE: 1,
    CENTER: 2
}

const moves = {
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

class Renderer {
    constructor(imageDirectory, imageTitles, imageLookup) {
        this.imageDirectory = imageDirectory;
        this.imageTitles = imageTitles;
        this.imageLookup = imageLookup;
        this.images = {};
        this.imageCount = this.imageTitles.length;
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
        for (let title of this.imageTitles) {
            let img = new Image();
            img.onload = () => this.imageOnLoad();
            img.src = `${this.imageDirectory}/${title}.svg`;
            this.images[title] = img;
        }
    }

    renderCube(state, ctx) {
        const X_WIDTH = 72;
        const Y_WIDTH = 72;
        const Z_WIDTH = 36;
        const IMG_WIDTH = 110;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (let y = 0; y < 3; y++) {
            for (let z = 0; z < 3; z++) {
                for (let x = 0; x < 3; x++) {
                    if (x === 2 || y === 2 || z === 2) {
                        const cubicle = coordsToCubicle[[x, y, z]];
                        const cubie = state.cubies[cubicle];
                        const imageTitle = this.imageLookup[cubie.name][cubicle][cubie.orientation];
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

export { CubieType, moves, coordsToCubicle, Renderer };