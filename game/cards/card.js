export class Card {
    constructor(title, effect, imgsrc) {
        this.title = title;
        this.effect = effect;
        this.x = 0;
        this.y = 0;
        this.img = new Image();
        this.img.src = imgsrc;

        this.img.onload = () => {

            this.width = this.img.naturalWidth * 2;
            this.height = this.img.naturalHeight * 2;
        };

    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
    
    isClicked(mouseX, mouseY) {
        return mouseX >= this.x - this.width / 2 && mouseX <= this.x + this.width / 2 && mouseY >= this.y - this.height / 2 && mouseY <= this.y + this.height / 2;
    }
}