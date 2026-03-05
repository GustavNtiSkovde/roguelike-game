export class Camera {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    follow(target) {
        this.x = target.x - this.width / 2;
        this.y = target.y - this.height / 2;
    }
}
