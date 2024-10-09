let joueur;
let starList = [];

function setup() {
  createCanvas(500, 500);
  background(0);
  joueur = new Joueur();
}

function draw(){
  background(0);
  joueur.afficher();
  joueur.deplacer();

  starList.push(new Star(random(10,width-10),0,random(5,20), random(2,5),[random(0,255),255,255]));
  for(let star of starList){
    star.afficher();
    star.deplacer();
  }

  for(let i=0; i<starList.length; i++){
    if(joueur.attraper(starList[i]) == true){
      starList.splice(i,1);
      createStar();
      createStar();
    }
  }

}

function createStar(){
  starList.push(new Star(random(width),0,random(5,15),random(2,5),[255,255,255])); 
}

class Joueur {
  constructor() {
    this.couleur = [255, 0, 0];
    this.size = 30;
    this.speed = 2;
    this.x = width / 2;
    this.y = height - 50;
  }

  deplacer() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width) {
      this.x += this.speed;
    }
  }

  afficher() {
    fill(this.couleur);
    triangle(this.x - this.size / 2,this.y,this.x,this.y - this.size,this.x + this.size / 2,this.y);
  }

  attraper(star){
    let distance = dist(this.x,this.y,star.x,star.y);
    if(distance< this.size){
      return true;
    }else{
      return false;
    }
  }

}



class Star {
  constructor(x, y, size, speed, couleur) {
    this.couleur = couleur;
    this.size = size;
    this.speed = speed;
    this.x = x;
    this.y = y;
  }
  afficher() {
    fill(this.couleur);
    ellipse(this.x, this.y, this.size);
  }

  deplacer() {
    this.y += this.speed;
  }
}