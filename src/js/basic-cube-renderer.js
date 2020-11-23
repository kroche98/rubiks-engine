const XY_WIDTH = 36;
const Z_WIDTH = 18;
const BORDER_WIDTH = 1;

class BasicCubeRenderer {
    constructor(xSize, ySize, zSize, coordsToCubicle, imageDirectory, imageTitles, imageLookup) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.zSize = zSize;
        this.tileWidth = XY_WIDTH + Z_WIDTH + 2 * BORDER_WIDTH;
        this.cubeXWidth = xSize * XY_WIDTH + zSize * Z_WIDTH + 2 * BORDER_WIDTH;
        this.cubeYWidth = ySize * XY_WIDTH + zSize * Z_WIDTH + 2 * BORDER_WIDTH;
        this.coordsToCubicle = coordsToCubicle
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

    getImage(state, x, y, z) {
        const cubicle = this.coordsToCubicle[[x, y, z]];
        const cubie = state.cubies[cubicle];
        const imageTitle = this.imageLookup[cubie.name][cubicle][cubie.orientation];
        const image = this.images[imageTitle];
        return image;
    }

    render(state, {ctx}) {
        const xScaleFactor = ctx.canvas.width / this.cubeXWidth;
        const yScaleFactor = ctx.canvas.height / this.cubeYWidth;
        let scaleFactor;
        let xOffset, yOffset;
        if (xScaleFactor < yScaleFactor) {
            scaleFactor = xScaleFactor;
            xOffset = 0;
            yOffset = (ctx.canvas.height - this.cubeYWidth * scaleFactor) / 2;
        } else {
            scaleFactor = yScaleFactor;
            xOffset = (ctx.canvas.width - this.cubeXWidth * scaleFactor) / 2;
            yOffset = 0;
        }

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        /*
        We want to draw the cube so that it fills up as much of the canvas as possible
        If the aspect ratio of the cube is different than the aspect ratio of the canvas,
        the cube will be drawn to fill one axis and be centered with respect to
        the other axis.

        From our numbering of the cubicles, the (0, 0, 0) cubicle is the back left bottom cubicle.
        In our numbering of the cubicles, x increases as we move to the right, y increases
        as we move up, and z increases as we move out of the screen.

        From the perspective of the pixels on the canvas, (0, 0) is the upper right corner,
        with x increasing to the right and y increasing as we move down.

        To determine where the (0, 0, 0) cubicle should be drawn, consider that if zSize were 1,
        then the x-coordinate would be 0. For each cubicle in the z direction we add, the
        screen x-coordinate increases by Z_SIZE.
        If ySize were 1, the screen y-coordinate would be 0. For each cubicle in the y direction we add,
        the screen y-coordinate increases by XY_SIZE.
        Thus the screen coordinates of the (0, 0, 0) cubicle are ((zSize - 1) * Z_WIDTH, (ySize - 1) * XY_WIDTH)

        Now changing x, y, and z does the following:
        x += 1 => xCoord += X_WIDTH
        y += 1 => yCoord -= Y_WIDTH
        z += 1 => xCoord -= Z_WIDTH; yCoord += Z_WIDTH

        From this we have our formulas for xCoord and yCoord.
        */

        for (let y = 0; y < this.ySize; y++) {
            for (let z = 0; z < this.zSize; z++) {
                for (let x = 0; x < this.xSize; x++) {
                    if (x === this.xSize-1 || y === this.ySize-1 || z === this.zSize-1) {
                        const image = this.getImage(state, x, y, z);
                        const xCoord = (this.zSize - 1 - z) * Z_WIDTH + x * XY_WIDTH;
                        const yCoord = (this.ySize - 1 - y) * XY_WIDTH + z * Z_WIDTH;
                        const scaledXCoord = xOffset + xCoord * scaleFactor;
                        const scaledYCoord = yOffset + yCoord * scaleFactor;
                        const scaledTileWidth = this.tileWidth * scaleFactor;
                        ctx.drawImage(image, scaledXCoord, scaledYCoord, scaledTileWidth, scaledTileWidth);
                    }
                }
            }
        }
    }
}

export { BasicCubeRenderer };
