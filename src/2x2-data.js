const CubieType = {
    CORNER: 1,
}

const moves = {
    L: {
        permutation: [[0, 7, 6, 1]],
        rotation: [2, 1, 0, 0, 0, 0, 2, 1]
    },
    R: {
        permutation: [[2, 5, 4, 3]],
        rotation: [0, 0, 2, 1, 2, 1, 0, 0]
    },
    F: {
        permutation: [[0, 3, 4, 7]],
        rotation: [1, 0, 0, 2, 1, 0, 0, 2]
    },
    B: {
        permutation: [[1, 6, 5, 2]],
        rotation: [0, 2, 1, 0, 0, 2, 1, 0]
    },
    U: {
        permutation: [[0, 1, 2, 3]],
        rotation: [0, 0, 0, 0, 0, 0, 0, 0]
    },
    D: {
        permutation: [[4, 5, 6, 7]],
        rotation: [0, 0, 0, 0, 0, 0, 0, 0]
    },
    Li: {
        permutation: [[0, 1, 6, 7]],
        rotation: [2, 1, 0, 0, 0, 0, 2, 1]
    },
    Ri: {
        permutation: [[2, 3, 4, 5]],
        rotation: [0, 0, 2, 1, 2, 1, 0, 0]
    },
    Fi: {
        permutation: [[0, 7, 4, 3]],
        rotation: [1, 0, 0, 2, 1, 0, 0, 2]
    },
    Bi: {
        permutation: [[1, 2, 5, 6]],
        rotation: [0, 2, 1, 0, 0, 2, 1, 0]
    },
    Ui: {
        permutation: [[0, 3, 2, 1]],
        rotation: [0, 0, 0, 0, 0, 0, 0, 0]
    },
    Di: {
        permutation: [[4, 7, 6, 5]],
        rotation: [0, 0, 0, 0, 0, 0, 0, 0]
    },
}

const coordsToCubicle = {
    '0,0,0': 6,
    '1,0,0': 5,
    '0,1,0': 1,
    '1,1,0': 2,
    '0,0,1': 7,
    '1,0,1': 4,
    '0,1,1': 0,
    '1,1,1': 3
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

        for (let y = 0; y < 2; y++) {
            for (let z = 0; z < 2; z++) {
                for (let x = 0; x < 2; x++) {
                    if (x === 1 || y === 1 || z === 1) {
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