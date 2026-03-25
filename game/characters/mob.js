import {CharacterList, MonsterOnScreen} from "../objectlists.js"
export class Mob {
    constructor(type, x, y, speed, dmg, imgsrc) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.dmg = dmg;

        this.img = new Image();
        this.img.src = imgsrc;

        this.img.onload = () => {
            this.width = this.img.naturalWidth;
            this.height = this.img.naturalHeight;
        };

        this.nWidth = this.img.naturalWidth;
        this.nHeight = this.img.naturalHeight;
    }

    hitbox() {
        return {
            x: this.x,
            y: this.y,
            width: this.width || 64,
            height: this.height || 64
        };
    }

    moveTowardPlayer(player) {
        let mobX = player.x - this.x;
        let mobY = player.y - this.y;
        let distance = Math.sqrt(mobX * mobX + mobY * mobY);

        if ( distance > 0) {
            this.vx = (mobX / distance);
            this.vy = (mobY / distance);
        }
    }

    attack() {
        
    }

    update(player) {
        this.moveTowardPlayer(player);
        this.x += this.vx * this.speed;
        this.y += this.vy * this.speed;
    }

    draw(ctx, camera) {
        const cx = this.x + (this.width || 0) / 2;
        const cy = this.y + (this.height || 0) / 2;
        ctx.save();
        ctx.translate(cx - camera.x, cy - camera.y);
        ctx.drawImage(
            this.img, -(this.width || 0) / 2, -(this.height || 0) / 2
        );
        ctx.restore();
    }

    pushMob() {
        MonsterOnScreen.push(this);
    }
}