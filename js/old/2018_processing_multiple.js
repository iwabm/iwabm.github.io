// import processing.sound.*;

var FLOWERNUM = 1;
var WALKERNUM = 4;

var walker = [];
var xstem = []; 
var ystem = []; 
var widstem = []; 
var basecol = []; 

var timecount = []; 
var stemstart = []; 
var stemend = [];   
var livetime = [];  
var finaltime = [];  
var decay = []; 
var reset = []; 

// SoundFile file1, file2, file3;
// var  ret;

function setup() {
  var canvas = createCanvas(600, 600);
  canvas.parent('p5Canvas'); // define showing positon in the website

  background(25,25,25);

  for (var i=0; i<FLOWERNUM; i++) {
    walker.push(new Walker);
    basecol[i] = [];
    reset[i] = true;
    for (var j=0; j<WALKERNUM; j++) {
      walker[j] = [];
    }
  }

  // file1 = new SoundFile(this, "bgm.mp3");
  // file2 = new SoundFile(this, "birth2.mp3");
  // file3 = new SoundFile(this, "decay.mp3");
  // file1.loop();

function draw() {
  
  for (var i = 0; i < FLOWERNUM; i++) {
    if(reset[i] == true){
      basecol[i][0] = random(255);
      basecol[i][1] = random(235);
      basecol[i][2] = random(40,255);
      
      for (var j = 0; j < WALKERNUM; j++) {
        walker[i][j] = new Walker();
        walker[i][j].location.x = walker[i][0].location.x;
        walker[i][j].location.y = walker[i][0].location.y;
        walker[i][j].col = color(random(255),random(255),random(255),4);
      }
      xstem[i] = walker[i][0].location.x;
      ystem[i] = height;
      widstem[i] = random(5,15);
      
      //time parameter
      timecount[i] = 0;      
      stemstart[i] = random(10, 80);
      stemend[i]   = random(150, 400);
      livetime[i]  = random(700, 900);
      finaltime[i] = 0;
      // file2.play();
      decay[i]     = false;
      reset[i]     = false;
    }   
  }
  
  for (var i = 0; i < FLOWERNUM; i++) {
    if(timecount[i] < stemstart[i]){
      timecount[i]++;
    } else if(timecount[i] >= stemstart[i] && timecount[i] <= stemend[i]){
      timecount[i]++;
      blendMode(BLEND);
      stroke(255,25);
      strokeWeight(1+widstem[i] - widstem[i]*(timecount[i]-stemstart[i])/(stemend[i]-stemstart[i])); // stem become narrow
      line(xstem[i], ystem[i], xstem[i], height-(height - walker[i][0].location.y)*(timecount[i]-stemstart[i])/(stemend[i]-stemstart[i]));
      ystem[i] = height-(height - walker[i][0].location.y)*(timecount[i]-stemstart[i])/(stemend[i]-stemstart[i]);
    } else if (timecount[i] > stemend[i] && timecount[i] <= livetime[i]){ 
      noStroke();
      blendMode(ADD);
      for (var j = 0; j < WALKERNUM; j++) {
        walker[i][j].draw();
      }
      timecount[i]++;
    } else if(timecount[i] > livetime[i] && timecount[i] < livetime[i]+100){
        if(decay[i] == false){
          // file3.play();
          decay[i] = true;
        }
        blendMode(ADD);
        for (var j = 0; j < WALKERNUM; j++) {
          for (var k =0; k < 5; k++){
            for (var l=0; l < walker[i][j].trace; l++) {
              if(i % 50 == 0){
                //fill(255, 10);
                fill(walker[i][j].col);
                ellipse(walker[i][j].walkerposx[k][l], walker[i][j].walkerposy[k][l]+4*finaltime[i], 2, 2);
              }
            }
          }
        }
        finaltime[i]++;
        timecount[i]++;
    } else if(timecount[i] == livetime[i]+100){
      decay[i] = false;
      reset[i] = true;
    }
  }
  
  
}

function Walker() {
  this.xstart = random(70,530);
  this.ystart = random(75,400);
  this.location = createVector(this.xstart, this.ystart);
  this.velocity = [];
  this.trace = 0;
  this.col;
  this.walkerposx = [];
  this.walkerposy = [];
  for (var i = 0; i < 10; i++) {
    this.walkerposx[i] = [];
    this.walkerposy[i] = [];
  }
  // this.walkerposx = new Array(10)(3000);
  // this.walkerposy = new Array(10)(3000);

  this.draw = function() {
    for (var i = 0; i < 5; i++) {
      this.velocity.x = random(-2, 2);
      this.velocity.y = random(-2, 2);
      this.location.add(this.velocity);
      fill(this.col);
      ellipse(this.location.x, this.location.y, 10, 7);
      this.walkerposx[i][this.trace] = this.location.x;
      this.walkerposy[i][this.trace] = this.location.y;     
    }
    this.trace++;
  }
  
}