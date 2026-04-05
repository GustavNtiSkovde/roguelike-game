export let Scene = { value: "Menu" };
import { Canvas } from "../canvasctx.js";

export class Button {
    constructor(centerX, centerY, imgSrc) {
        this.centerX = centerX;
        this.centerY = centerY;

        this.img = new Image();
        this.img.src = imgSrc;

        this.width = 0;
        this.height = 0;

        this.img.onload = () => {
            this.width = this.img.naturalWidth;
            this.height = this.img.naturalHeight;
        };

        window.addEventListener("click", (event) => {
            if (Scene.value !== "Menu") return;
            
            const rect = Canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const x = this.centerX - this.width / 2;
            const y = this.centerY - this.height / 2;

            if (
                mouseX >= x &&
                mouseX <= x + this.width &&
                mouseY >= y &&
                mouseY <= y + this.height
            ) {
                this.onClick();
            }
        });
    }

    draw(ctx) {
        if (!this.width || !this.height) return;

        const x = this.centerX - this.width / 2;
        const y = this.centerY - this.height / 4;

        ctx.drawImage(this.img, x+32, y, this.width-70, this.height-70);
    }
}


export class playbutton extends Button {
    constructor(x, y, imgSrc) {
        super(x, y, imgSrc);
    }
    onClick() {
        document.documentElement.requestFullscreen()
            .then(() => {
                Scene.value = "Game";
            })
    }
}
