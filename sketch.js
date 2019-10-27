var spritesheet;
var spritesheetLeft;
var spritesheetAttack;
var spritesheetRasengan;
// var kunai;
var narutoSprite;
var rasenganSprite;
// var kunaiSprite = [];
var bg;
var myFont;
var data;
var dataAttack;
var checkPos = 0;
var checkAttack = 50;
var checkText;
var speechRec;
var standAnimation = [];
var standAnimationLeft = [];
var runAnimation = [];
var runAnimationLeft = [];
var attackAnimation = [];
var rasenganAnimation = [];

function preload() {

  data = loadJSON('sprite.json');
  dataAttack = loadJSON('spriteAttack.json');
  spritesheet = loadImage('./assets/naruto.png');
  spritesheetLeft = loadImage('./assets/narutoLeft.png');
  spritesheetAttack = loadImage('./assets/narutoRasengan.png');
  spritesheetRasengan = loadImage('./assets/rasengan.png');
  myFont = loadFont('./assets/PressStart2P.ttf');
  // kunai = loadImage('./assets/kunai.png');
  bg = loadImage('./assets/wallpaper.png');
}

function setup() {
  frameRate(12);
  createCanvas(windowWidth, windowHeight);

  //Acquisizione dati JSON
  var frame = data.frames;
  var frameAttack = dataAttack.framesAttack;

  //acquisizione voce
  var lang = navigator.language || 'it-IT';
  speechRec = new p5.SpeechRec(lang, gotSpeech);

  var contin = true;
  var interm = false;
  speechRec.start(contin, interm);

  //inserimento dati movimento in array
  for (var i = 0; i < 3; i++) {
    var loc = frame[i].position;
    var k = spritesheet.get(loc.x, loc.y, loc.w, loc.h);
    standAnimation.push(k);
  }

  for (i = 3; i < 7; i++) {
    loc = frame[i].position;
    k = spritesheet.get(loc.x, loc.y, loc.w, loc.h);
    runAnimation.push(k);
  }

  for (i = 7; i < 10; i++) {
    loc = frame[i].position;
    k = spritesheetLeft.get(loc.x, loc.y, loc.w, loc.h);
    standAnimationLeft.push(k);
  }

  for (i = 10; i < 14; i++) {
    loc = frame[i].position;
    k = spritesheetLeft.get(loc.x, loc.y, loc.w, loc.h);
    runAnimationLeft.push(k);
  }

  for (i = 14; i < 16; i++) {
    loc = frame[i].position;
    k = spritesheet.get(loc.x, loc.y, loc.w, loc.h);
    jumpAnimation.push(k);
  }

  //inserimento dati attacco in array

  for (var i = 0; i < 2; i++) {
    var loc = frameAttack[i].position;
    var k = spritesheetAttack.get(loc.x, loc.y, loc.w, loc.h);
    attackAnimation.push(k);
  }

  for (var i = 2; i < 4; i++) {
    var loc = frameAttack[i].position;
    var k = spritesheetRasengan.get(loc.x, loc.y, loc.w, loc.h);
    rasenganAnimation.push(k);
  }

  narutoSprite = new Sprite(100, windowHeight - 325);
  rasenganSprite = new Sprite(100, windowHeight);
  // kunaiSprite = new enemy(windowWidth + 100, windowHeight - 300);


}

function draw() {
  image(bg, 0, 0, windowWidth, windowHeight);
  textAlign(CENTER);
  textFont(myFont);
  textSize(20);
  fill(255);
  text('Say "Rasengan" to attack', windowWidth / 2, windowHeight / 2 - 125);
  // if(frameCount % 30 == 0) {
  //   var k = new enemy();
  //   kunaiSprite.push(k);
  // }
  //
  // for (var i = 0; i < kunaiSprite.length; i++) {
  //   kunaiSprite[i].display();
  //   kunaiSprite[i].move();
  // }

  //controllo movimenti
  if (keyIsDown(RIGHT_ARROW)) {
    narutoSprite.moveRight();
    checkPos = 0;

  } else if (keyIsDown(LEFT_ARROW)) {
    narutoSprite.moveLeft();
    checkPos = 1;
  }
  // else if(keyIsDown(UP_ARROW)) {
  //   narutoSprite.attack();
  // }

  else if (checkText == 'Rasengan'){
      narutoSprite.attack();
    }

  else {
      narutoSprite.display();
    }

    //impedisce allo sprite di uscire dai bordi dello schermo
    // if(narutoSprite.x >= windowWidth) {
    //   checkFrame = true;
    // }
    //
    // if(narutoSprite.x <= 0) {
    //   checkFrame = true;
    // }
}

function Sprite(_x, _y) {
  this.x = _x;
  this.y = _y;
  this.speed = 10;

  this.moveLeft = function() {
    var i = 2.5;
    do {
      i++;
      this.x -= (this.speed * i);
    } while (i == 10);
    image(runAnimationLeft[frameCount % 4], this.x, this.y, 86, 144);
  }

  this.moveRight = function() {
    var i = 2.5;
    do {
      i++;
      this.x += (this.speed * i);
    } while (i == 10);
    image(runAnimation[frameCount % 4], this.x, this.y, 86, 144);
  }

  this.attack = function() {
      this.x += checkAttack;
      image(attackAnimation[frameCount % 2], this.x, this.y, 158, 112);
      image(rasenganAnimation[frameCount % 2], this.x + 150, this.y - 25, 102, 108);
  }

  this.display = function() {
    if (checkPos == 0) {
      image(standAnimation[frameCount % 3], this.x, this.y, 86, 144);
    }
    if (checkPos == 1) {
      image(standAnimationLeft[frameCount % 3], this.x, this.y, 86, 144);
    }
  }
}

// function enemy() {
//
//   this.x = windowWidth + 100;
//   this.y = windowHeight - 300;
//   this.speed = 20;
//
//   this.display = function() {
//     image(kunai, this.x, this.y, 66.1, 13.1);
//   }
//
//   this.move = function() {
//       this.x -= this.speed;
//   }
//  }

function gotSpeech() {
  if (speechRec.resultValue) {
    //memorizza la parola detta al microfono
    checkText = speechRec.resultString;
  }
  console.log(speechRec.resultString);
}
