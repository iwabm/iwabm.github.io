function onButtonClick() {

  var t1 = document.getElementById("textBox");
  // var t2 = "hello";

  var keywords = ['military','cruel','mad','ambient','open source','fluid','night','rainy','marionette','lively','swimming','delicious','responsive','nonverval','waving','dark','space','vertical','tremendous','final','Atrantic','shining','virtual','red','edible','waterproof','hot','beautiful','final','Indian','friendly','multimedia','hungry','tiny','musical','good smell'];
  var l = keywords.length;
  while (l) {
      var j = Math.floor( Math.random() * l );
      var t = keywords[--l];
      keywords[l] = keywords[j];
      keywords[j] = t;
  }

  for (var i=0; i<3; i++){
    var li = document.createElement('li');
    li.textContent = keywords[i] + " " + t1.value;
    document.getElementById('output').appendChild(li);
  }
}