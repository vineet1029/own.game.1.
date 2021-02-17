var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var fruitGroup;
var enemyGroup;
var knifesound;

function preload() {
  fruit01 = loadImage("fruit1.png");
  fruit02 = loadImage("fruit2.png");
  fruit03 = loadImage("fruit3.png");
  fruit04 = loadImage("fruit4.png");

  monsterImage = loadImage("alien1.png");;
  sword0 = loadImage("123.png");
  gameover0 = loadImage("gameover.png");
}

function setup() {
  createCanvas(400, 400);
  sword = createSprite(200, 200, 20, 20);
  sword.addImage("0", sword0);
  sword.scale = 0.2;
  fruitGroup = new Group();
  enemyGroup = new Group();
  gameover = createSprite(200, 200, 20, 20);
  gameover.addImage("over", gameover0);

}

function draw() {
  background("blanchedalmond");
  drawSprites();
  text("Score: " + score, 350, 20);
  score.visible = true;


  if (gameState === PLAY) {
    fruits();
    Enemy();
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    gameover.visible = false;
    if (fruitGroup.isTouching(sword)) {
      score = score + 1;
      fruitGroup.destroyEach();
      
    }
    if (enemyGroup.isTouching(sword)) {
      gameState = END;
      sword.x = 200;
      sword.y = 200;
    }

  }
  if (gameState === END) {
    gameover.visible = true;
    fruitGroup.velocityX = 0;
    enemyGroup.velocityX = 0;
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
  }

}

function fruits() {
  if (frameCount % 80 === 0) {
    var fruit = createSprite(600, 165, 10, 40);
    position = Math.round(random(1, 2));
    if (position == 1) {
      fruit.x = 400;
      fruit.velocityX = -(7 + (score / 4));
    } else {
      if (position == 2) {
        fruit.x = 0;
        fruit.velocityX = (7 + (score / 4));

      }
    }

    fruit.scale = 0.2;
    //generate random obstacles
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        fruit.addImage(fruit01);

        break;
      case 2:
        fruit.addImage(fruit02);
        break;
      case 3:
        fruit.addImage(fruit03);
        break;
      case 4:
        fruit.addImage(fruit04);
        break;

      default:
        break;
    }

    fruit.y = Math.round(random(50, 380));
    fruit.setLifetime = 100;
    fruitGroup.add(fruit);
  }
}

function Enemy() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20);
    monster.addImage("moving", monsterImage);
    monster.y = Math.round(random(100, 300));
    monster.velocityX = -(8 + (score / 10));
    monster.setLifetime = 50;
    enemyGroup.add(monster);
  }

}