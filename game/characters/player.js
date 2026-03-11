import { Character } from "./superclass.js";

const keys = {};

let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

export class Player extends Character {
    constructor(x, y, name, imgSrc) {
        super(x, y, name, imgSrc);
        this.speed = 5;
        this.facing = "down";
        this.moving = false;
        this.shooting = false;
    }

    hitbox() {
        return {
            x: this.x,
            y: this.y,
            width: this.width || 64,
            height: this.height || 64
        };
    }

    attack() {

    }

    update() {
        let moveX = 0;
        let moveY = 0;
        if (keys["ArrowUp"] || keys["w"] || keys["W"]) {
            moveY -= this.speed;
        }
        if (keys["ArrowDown"] || keys["s"] || keys["S"]) {
            moveY += this.speed;
        }
        if (keys["ArrowLeft"] || keys["a"] || keys["A"]) {
            moveX -= this.speed;
        }
        if (keys["ArrowRight"] || keys["d"] || keys["D"]) {
            moveX += this.speed;
        }

        this.moving = moveX !== 0 || moveY !== 0;
        this.x += moveX;
        this.y += moveY;
    }

    draw(ctx, camera) {
        const worldMouseX = mouseX + camera.x;
        const worldMouseY = mouseY + camera.y;

        const cx = this.x + (this.width || 0) / 2;
        const cy = this.y + (this.height || 0) / 2;
        let angle = Math.atan2(worldMouseY - cy, worldMouseX - cx);
        angle += Math.PI / 2; //Math.atan2s 0 grader är åt höger, tar detta för det ska vara 90 grader så att gubben vapen är mot musen.

        ctx.save();
        ctx.translate(cx - camera.x, cy - camera.y);
        ctx.rotate(angle);
        ctx.drawImage(
            this.img, -(this.width || 0) / 2, -(this.height || 0) / 2
        );
        ctx.restore();
    }
}

document.addEventListener("keydown", e => { keys[e.key] = true; });
document.addEventListener("keyup", e => { keys[e.key] = false; });
