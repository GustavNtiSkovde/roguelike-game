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

    moveTowardPlayer() {
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

    update() {
        
    }

    draw(ctx) {
        ctx.drawImage(
            this.img, -(this.width || 0) / 2, -(this.height || 0) / 2
        );
    }

    pushMob() {
        MonsterOnScreen.push(this);
    }
}