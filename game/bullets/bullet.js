import { bulletsOnScreen } from "../objectlists.js";
export class Bullet {
    constructor(type, x, y, angle, speed, dmg, imgsrc) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.dmg = dmg;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.img = new Image();
        this.img.src = imgsrc;

        this.img.onload = () => {
            this.width = this.img.naturalWidth;
            this.height = this.img.naturalHeight;
        };

        this.nWidth = this.img.naturalWidth;
        this.nHeight = this.img.naturalHeight;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx, camera) {
        if (!this.img) return;
        ctx.drawImage(this.img, this.x - camera.x, this.y - camera.y);
    }

    pushBullet() {
        bulletsOnScreen.push(this);
    }
}