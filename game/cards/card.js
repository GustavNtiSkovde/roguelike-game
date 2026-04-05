export class Card {
    constructor(title, effect, imgsrc) {
        this.title = title;
        this.effect = effect;
        this.img = new Image();
        this.img.src = imgsrc;

        this.img.onload = () => {

            this.width = this.img.naturalWidth;
            this.height = this.img.naturalHeight;
        };

        this.nWidth = this.img.naturalWidth;
        this.nHeight = this.img.naturalHeight;
    }

    draw() {

    }

}