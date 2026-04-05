import { ctx, Canvas } from "../canvasctx.js"
import { Scene, Button } from "../menutogame/menubuttons.js"

const Title = new Image();
Title.src = "./game/pictures/menu/bakgrundcredit.png";

// Continue button class for credits screen
class ContinueButton extends Button {
    constructor(x, y, imgSrc) {
        super(x, y, imgSrc);
        
        // Add click listener specifically for credits scene
        window.addEventListener("click", (event) => {
            if (Scene.value !== "Credits") return;
            
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
    
    onClick() {
        Scene.value = "Menu";
    }
}

let continueButton = null;

export function DrawCreditsScreen(maxScore , score) {
    const credits = [
        "All time best score:", maxScore,
        "-------------------------",
        "Score this round:", score,
    ];
    
    ctx.drawImage(Title, 0, 0, Canvas.width, Canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "32px sans-serif";
    ctx.textAlign = "center";

    const startY = Canvas.height / 2 - (credits.length * 50) / 2;
    for (let i = 0; i < credits.length; i++) {
        ctx.fillText(credits[i], Canvas.width / 2, startY + i * 50);
    }

    // Draw continue button
    if (continueButton) {
        continueButton.draw(ctx);
    }
}

export function startCredits() {
    // Initialize continue button if not already created
    if (!continueButton) {
        continueButton = new ContinueButton(
            Canvas.width / 2,
            Canvas.height - 100,
            "./game/pictures/menu/continue.png"
        );
    }
}
