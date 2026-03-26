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

    hitbox() {
        return {
            x: this.x,
            y: this.y,
            width: this.width || 32,
            height: this.height || 32
        };
    }

    draw(ctx, camera) {
        if (!this.img) return;
        const width = this.width || this.img.naturalWidth || 0;
        const height = this.height || this.img.naturalHeight || 0;
        ctx.drawImage(this.img, this.x - camera.x - width / 2, this.y - camera.y - height / 2);
    }

    pushBullet() {
        bulletsOnScreen.push(this);
    }
}