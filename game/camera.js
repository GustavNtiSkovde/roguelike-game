export class Camera {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    follow(target) {
        this.x = target.x + (target.width || 0) / 2 - this.width / 2;
        this.y = target.y + (target.height || 0) / 2 - this.height / 2;
    }
}
