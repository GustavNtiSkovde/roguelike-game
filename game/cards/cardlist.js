const increaseHp = 1.25;
export const cardTemplates = [
    {
        title: "Dmg increase",
        effect: (bullet) => bullet.dmg += 10,
        imgsrc: "./game/pictures/cards/attackdmg.png"
    },
    {
        title: "Attack speed increase",
        effect: (bullet) => bullet.speed *= 1.25,
        imgsrc: "./game/pictures/cards/attackspeed.png" 
    },
    {
        title: "Hp increase",
        effect: (player) => player.maxHp += (player.baseHp * increaseHp),
        imgsrc: "./game/pictures/cards/hpincrease.png" 
    },
    {
        title: "Hp heal",
        effect: (player) => player.hp += 30,
        imgsrc: "./game/pictures/cards/hpregen.png" 
    },
    {
        title: "Hp heal && increase",
        effect: (player) => { player.maxHp += (player.baseHp * increaseHp); player.hp += 30; },
        imgsrc: "./game/pictures/cards/hpregenandincrease.png" 
    }
];