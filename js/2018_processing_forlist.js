var FLOWERNUM = 1;
var WALKERNUM = 4;

var walker = [];
var basecol = []; 
var xstem, ystem, widstem;
var timecount, stemstart, stemend, livetime, finaltime, decay, reset;  // = []; 

// var stop;

// function preload() {
//   soundFormats('mp3');
//   file1 = loadSound('/js/bgm.mp3');
//   file2 = loadSound('/js/birth2.mp3');
//   file3 = loadSound('/js/decay.mp3');
// }

function setup() {
  var canvas = createCanvas(600, 450);
  canvas.parent('p5Canvas-forlist'); // define showing positon in the website

  background(25,25,25);
  walker.push(new Walker);
  reset = true;
  stop = false;

  for (var i=0; i<WALKERNUM; i++) {
      walker[i] = [];
  }

  // file1.loop();
}

function draw() {

  if(reset == true){
    basecol[0] = random(255);
    basecol[1] = random(235);
    basecol[2] = random(40,255);
    
    for (var j = 0; j < WALKERNUM; j++) {
      walker[j] = new Walker();
      walker[j].location.x = walker[0].location.x;
      walker[j].location.y = walker[0].location.y;
      walker[j].col = color(random(255),random(255),random(255),4);
    }
    xstem = walker[0].location.x;
    ystem = height;
    widstem = random(5,15);
    
    timecount = 0;      
    stemstart = random(10, 30);
    stemend   = random(100, 200);
    livetime  = random(350, 500);
    finaltime = 0;
    // file2.play();
    decay     = false;
    reset     = false;
  }   
  
  if(timecount < stemstart){
    timecount++;
  } else if(timecount >= stemstart && timecount <= stemend){
    timecount++;
    blendMode(BLEND);
    stroke(255,25);
    strokeWeight(1+widstem - widstem*(timecount-stemstart)/(stemend-stemstart)); // stem become narrow
    line(xstem, ystem, xstem, height-(height - walker[0].location.y)*(timecount-stemstart)/(stemend-stemstart));
    ystem = height-(height - walker[0].location.y)*(timecount-stemstart)/(stemend-stemstart);
  } else if (timecount > stemend && timecount <= livetime){ 
    noStroke();
    blendMode(ADD);
    for (var j = 0; j < WALKERNUM; j++) {
      walker[j].draw();
    }
    timecount++;
  } else if(timecount > livetime && timecount < livetime+150){
      if(decay == false){
        // file3.play();
        decay = true;
        
      }
      blendMode(ADD);
      for (var j = 0; j < WALKERNUM; j++) {
         for (var k =0; k < 5; k++){
          for (var l=0; l < walker[j].trace; l++) {
              if(l%2 == 0){
                fill(walker[j].col);
                ellipse(walker[j].walkerposx[k][l], walker[j].walkerposy[k][l]+3*finaltime, 2, 2);
              }
          }
         }
      }
      finaltime++;
      timecount++;
      // print(timecount);
  } else {
    decay = false;
    reset = true;
    // print(reset);
  }
  
}

// function keyPressed() {
//   if (key == 's' || key == 'S') {
//     saveCanvas(canvas, 'myCanvas', 'jpg');
//   } else if (key == 'p' || key == 'P') {
//       if(stop == false){
//         noLoop();
//         file1.pause();
//         stop = true;
//       } else {
//         file1.play();
//         loop();
//         stop = false;
//       }
//   } 
// }

function Walker() {

  this.xstart = random(70,530);
  this.ystart = random(50,200);
  this.velocityx = random(-1.5, 1.5);
  this.velocityy = random(-1.5, 1.5);
  this.location = createVector(this.xstart, this.ystart);
  this.velocity = createVector(this.velocityx, this.velocityy);
  this.trace = 0;
  this.col = color(0,0,0);
  this.walkerposx = [];
  this.walkerposy = [];
   for (var i = 0; i < 5; i++) {
     this.walkerposx[i] = [];
     this.walkerposy[i] = [];
   }

    this.draw = function() {
       for (var i = 0; i < 5; i++) {
        this.velocity.x = random(-1.5, 1.5);
        this.velocity.y = random(-1.5, 1.5);
        this.location.add(this.velocity);
        fill(this.col);
        ellipse(this.location.x, this.location.y, 8, 6);
        this.walkerposx[i][this.trace] = this.location.x;
        this.walkerposy[i][this.trace] = this.location.y;     
       }
      this.trace++;
    }
  }