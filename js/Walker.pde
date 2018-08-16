class Walker {
  PVector location;
  PVector velocity;
  color col;
  int trace;
  float[][] walkerposx = new float[10][3000];
  float[][] walkerposy = new float[10][3000];

  Walker() {
    float xstart = random(70,530);
    float ystart = random(75,400);
    location = new PVector(xstart, ystart);
    velocity = new PVector();
    trace = 0;
  }

  void draw() {
    for (int i = 0; i < 5; i++) {
      velocity.x = random(-1.75, 1.75);
      velocity.y = random(-1.75, 1.75);
      location.add(velocity);
      fill(col);
      ellipse(location.x, location.y, 10, 7);
      walkerposx[i][trace] = location.x;
      walkerposy[i][trace] = location.y;     
    }
    trace++;
  }
  
}
