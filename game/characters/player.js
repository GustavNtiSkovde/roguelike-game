import { Character } from "./superclass.js";

const keys = {};

export class Player extends Character {
    constructor(x, y, name, imgSrc) {
        super(x, y, name, imgSrc);
        this.speed = 5;
        this.facing = "down";
        this.moving = false;
    }

    hitbox() {
        return {
            x: this.x,
            y: this.y,
            width: this.width || 64,
            height: this.height || 64
        };
    }

    update() {
        let dx = 0;
        let dy = 0;

        if (keys["ArrowUp"] || keys["w"] || keys["W"]) {
            dy -= this.speed;
            this.facing = "up";
        }
        if (keys["ArrowDown"] || keys["s"] || keys["S"]) {
            dy += this.speed;
            this.facing = "down";
        }
        if (keys["ArrowLeft"] || keys["a"] || keys["A"]) {
            dx -= this.speed;
            this.facing = "left";
        }
        if (keys["ArrowRight"] || keys["d"] || keys["D"]) {
            dx += this.speed;
            this.facing = "right";
        }

        this.moving = dx !== 0 || dy !== 0;
        this.x += dx;
        this.y += dy;
    }

    draw(ctx, camera) {
        ctx.drawImage(this.img, this.x - camera.x, this.y - camera.y);
    }
}

document.addEventListener("keydown", e => { keys[e.key] = true; });
document.addEventListener("keyup", e => { keys[e.key] = false; });
