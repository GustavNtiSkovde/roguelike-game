export const mobTemplates = {
    redMob: {  hp:30, speed: 5, dmg: 5, attackspeed: 500, exp: 7, pointsgiven: 4, imgsrc: "./game/pictures/characters/monster.png"},
    zonmbieMob: {  hp:40, speed: 3, dmg: 7, attackspeed: 500, exp: 10, pointsgiven: 5, imgsrc: "./game/pictures/characters/zombie.png"},
    watereMob: { hp:35, speed: 4, dmg: 6, attackspeed: 500, exp: 9, pointsgiven: 4, imgsrc: "./game/pictures/characters/water.png"},
    ankaMob: {  hp:25, speed: 5, dmg: 3, attackspeed: 500, exp: 8, pointsgiven: 3, imgsrc: "./game/pictures/characters/anka.png"},
};

const keys = Object.keys(mobTemplates);

const randomKey = keys[Math.floor(Math.random() * keys.length)];

export const randomMob = mobTemplates[randomKey];