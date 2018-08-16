//import processing.sound.*;
//import ddf.minim.*;

int FLOWERNUM = 1;
int WALKERNUM = 4;

Walker[][] walker = new Walker[FLOWERNUM][WALKERNUM];
float[] xstem = new float[FLOWERNUM];
float[] ystem = new float[FLOWERNUM];
float[] widstem = new float[FLOWERNUM];
int[][] basecol = new int[FLOWERNUM][3];

int timecount[] = new int[FLOWERNUM];
int stemstart[] = new int[FLOWERNUM];
int stemend[]   = new int[FLOWERNUM];
int livetime[]  = new int[FLOWERNUM]; //unique livetime
int finaltime[]  = new int[FLOWERNUM]; //unique livetime
boolean decay[] = new boolean[FLOWERNUM];
boolean reset[] = new boolean[FLOWERNUM];

PGraphics pg;

//SoundFile file1, file2, file3;
//Minim minim;  
//AudioPlayer file1, file2, file3;
//boolean  ret;

void setup() {
  size(600, 600);

  //frameRate(60);
  background(25,25,25);
  //colorMode(HSB, 360, 100, 100, 100);
  pg = createGraphics(600,600);
  //pg.beginDraw();
  //pg.noStroke();
  //pg.fill(0,0,255);
  //pg.rect(0,0,width,height);
  //pg.endDraw();
  //image(pg,0,0);
  
  //minim = new Minim(this);
  //file1 = minim.loadFile("bgm.mp3");
  //file2 = minim.loadFile("birth2.mp3");
  //file3 = minim.loadFile("decay.mp3");
  //file1 = new SoundFile(this, "bgm.mp3");
  //file2 = new SoundFile(this, "birth2.mp3");
  //file3 = new SoundFile(this, "decay.mp3");
  //file1.loop();
  //file1.play();
  //ret = file1.isPlaying();

  for (int i = 0; i < FLOWERNUM; i++) {
    reset[i] = true;
  }
}

void draw() {
  
  for (int i = 0; i < FLOWERNUM; i++) {
    if(reset[i] == true){
      basecol[i][0] = (int)random(255);
      basecol[i][1] = (int)random(235);
      basecol[i][2] = (int)random(40,255);
      
      for (int j = 0; j < WALKERNUM; j++) {
        walker[i][j] = new Walker();
        walker[i][j].location.x = walker[i][0].location.x;
        walker[i][j].location.y = walker[i][0].location.y;
        walker[i][j].col = color((int)random(255),(int)random(255),(int)random(255),4);
        //walker[i][j].col = color(basecol[i][0],basecol[i][1]+j*5,basecol[i][2]-j*10,2.5*(j+1));
        //println(basecol[i][0], basecol[i][1], basecol[i][2]);
      }
      xstem[i] = walker[i][0].location.x;
      ystem[i] = height;
      widstem[i] = random(5,15);
      
      //time parameter
      timecount[i] = 0;      
      stemstart[i] = (int)random(10, 80);
      stemend[i]   = (int)random(150, 400);
      livetime[i]  = (int)random(700, 900);
      finaltime[i] = 0;
      //file2.play();
      decay[i]     = false;
      reset[i]     = false;
    }   
  }
  
  for (int i = 0; i < FLOWERNUM; i++) {
    if(timecount[i] < stemstart[i]){
      timecount[i]++;
    } else if(timecount[i] >= stemstart[i] && timecount[i] <= stemend[i]){
      timecount[i]++;
      //blendMode(BLEND);
      stroke(255,25);
      strokeWeight(1+widstem[i] - widstem[i]*(timecount[i]-stemstart[i])/(stemend[i]-stemstart[i])); // stem become narrow
      line(xstem[i], ystem[i], xstem[i], height-(height - walker[i][0].location.y)*(timecount[i]-stemstart[i])/(stemend[i]-stemstart[i]));
      ystem[i] = height-(height - walker[i][0].location.y)*(timecount[i]-stemstart[i])/(stemend[i]-stemstart[i]);
    } else if (timecount[i] > stemend[i] && timecount[i] <= livetime[i]){ 
      noStroke();
      //blendMode(ADD);
      //fill(255, 31);  //transparent filter 
      for (int j = 0; j < WALKERNUM; j++) {
        //pg.beginDraw();
        //pg.noStroke();
        walker[i][j].draw();
        //pg.endDraw();
        //image(pg,0,0);
      }
      timecount[i]++;
    } else if(timecount[i] > livetime[i] && timecount[i] < livetime[i]+100){
        if(decay[i] == false){
          //file3.play();
          decay[i] = true;
        }
      //fill(0,0,255, 5);
      //rect(0,0,width,height);
        //blendMode(ADD);
        //fill(0);  //transparent filter 
        for (int j = 0; j < WALKERNUM; j++) {
          for (int k =0; k < 5; k++){
            for (int l=0; l < walker[i][j].trace; l++) {
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
    //println(livetime[i]); 
  }
  
  
}
