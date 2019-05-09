// var $container = $('.chart-container'),
//     width = $container.width(),
//     height = $container.height();

var svg = d3.select('svg')
    .attr("id", 'map')
    .attr("width", 'xxxx')
    .attr("height", 'xxx')
    .append('g');

var svg = d3.select('.svg-container').append("svg")
    .attr("id", 'map')
    .attr("width", '1200')
    .attr("height", '600')
    .attr('viewBox','0 0 1200 600' )
    .attr('preserveAspectRatio','xMinYMin')
    .append('g');
    // .attr("transform", "translate(" + Math.min(width,height) / 4 + "," + Math.min(width,height) / 4 + ")");

var chart = d3.select('#map');
var width = 1200;
var height = 600;
var aspect = width / height;

d3.select(window)
  .on("resize", function() {
    var targetWidth = chart.node().getBoundingClientRect().width;
    // console.log(targetWidth);
    chart.attr("width", targetWidth);
    chart.attr("height", targetWidth / aspect);
  });


// projectionを定義
var projection = d3.geoMercator() // projection
    // .center([-120,60]) // 緯度経度領域の中心
    .translate([width / 2, height*0.55]) // svgの中心 translate
    .scale(190);

// pathを定義
var path = d3.geoPath(projection);
var color2 = 'rgba(5, 255, 255,0.4)';

// GeoJSONを読み込み、描画
d3.json("data/countries.geojson").then(function(json) {
    svg.append("g").selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", function(d) { return "country"} )
        .attr("d", path) // GeoJSONのgeometryの情報をpath関数で変換
        .attr("stroke", color2) // 線の色
        .attr("fill", "none") // 塗りつぶしの色
        .attr("opacity", 0.5);
    }
)

// 地球の緯度経度グリッド
var graticule = d3.geoGraticule()
.step([10,10]); // stepでグリッドの幅

svg.append("path")
  .datum(graticule) // detumとしてgraticuleを入れる。
  .attr("class", "graticule")
  .attr("d",path)
  .attr("fill","none");
  // .attr("stroke","blue");

// Arc描画
var dataset = [];

dataset[0] = [projection([-160.25, -37.40]),projection([-133.52, -24.56]),projection([-123.49, -20.36]),projection([-116.25, -18.22]),projection([-109.55, -17.26]),projection([-103.31, -17.38]),projection([-96.29, -19.03]),projection([-87.31, -22.11]),projection([-70.36, -29.50]),projection([-57.42, -35.48]),];
dataset[1] = [projection([48.13, 25.59]),projection([61.28, 19.36]),projection([77.23, 10.59]),projection([85.43, 6.34]),projection([92.04, 3.43]),projection([97.36, 1.54]),projection([102.51, 0.56]),projection([108.12, 0.48]),projection([114.01, 1.32]),projection([120.54, 3.22]),projection([130.17, 6.58]),projection([156.43, 18.54]),];
dataset[2] = [projection([17.48, 1.16]),projection([38.56, 11.58]),projection([50.54, 18.54]),projection([59.1, 23.27]),projection([66.16, 26.43]),projection([72.58, 29.02]),projection([79.39, 30.31]),projection([86.33, 31.08]),projection([93.54, 30.52]),projection([102.02, 29.32]),projection([111.39, 26.48]),projection([125.09, 21.3]),projection([147.35, 11.28]),];
dataset[3] = [projection([-132.5, -7.46]),projection([-115.2, -16.35]),projection([-100.38, -25.3]),projection([-90.57, -31.16]),projection([-82.23, -35.34]),projection([-73.54, -38.46]),projection([-64.58, -40.56]),projection([-55.18, -41.58]),projection([-44.35, -41.43]),projection([-32.17, -39.48]),projection([-16.3, -35.08]),projection([11.03, -23.37]),];
dataset[4] = [projection([-89.3, 50.1]),projection([-78.03, 57.41]),projection([-68.1, 69.59]),projection([-66.17, 79.53]),projection([-165.23, 88.09]),projection([-147.48, 88.19]),projection([146, 76.5]),projection([156.32, 63.34]),];
dataset[5] = [projection([-51.13, -53.05]),projection([-38.12, -69.13]),projection([-58.34, -79.44]),projection([-130.55, -75.45]),projection([-134.09, -67.22]),];
dataset[6] = [projection([63.38, -48.27]),projection([80.02, -43.55]),projection([101.47, -32.45]),projection([110.51, -25.17]),projection([116.58, -19.06]),projection([121.56, -13.41]),projection([126.32, -8.51]),projection([131.21, -4.29]),projection([136.53, -0.38]),projection([143.59, 2.38]),projection([154.38, 4.55]),projection([178.48, 2.55]),];
dataset[7] = [projection([-146.55, 49.21]),projection([-121.16, 42.47]),projection([-104.55, 34.01]),projection([-96.49, 27.15]),projection([-91.2, 21.23]),projection([-86.57, 16.06]),projection([-83, 11.15]),projection([-79, 6.44]),projection([-74.29, 2.33]),projection([-68.54, -1.17]),projection([-61.03, -4.37]),projection([-46.44, -6.5]),projection([-29.22, -5.41]),];
dataset[8] = [projection([-158.31, -7.5]),projection([-156.39, -7.33]),projection([-129.4, 1.43]),projection([-120.35, 8.21]),projection([-114.12, 14.28]),projection([-108.45, 20.2]),projection([-103.23, 26.04]),projection([-97.21, 31.44]),projection([-89.45, 37.2]),projection([-78.58, 42.48]),projection([-60.42, 47.4]),projection([-19.47, 47.37]),];
dataset[9] = [projection([-165.32, 8.23]),projection([-148.56, 5.37]),projection([-135.23, -0.14]),projection([-128.2, -5.32]),projection([-123.21, -10.39]),projection([-119.16, -15.41]),projection([-115.28, -20.42]),projection([-111.29, -25.45]),projection([-106.51, -30.52]),projection([-100.49, -36.06]),projection([-92.06, -41.27]),projection([-77.11, -46.47]),projection([-37.04, -49.29]),];
dataset[10] = [projection([136.36, -71.56]),projection([95.24, -70.4]),projection([85.5, -60.32]),projection([99.03, -50.08]),];
dataset[11] = [/* projection([113.29, 75.05]),projection([114.1, 76.12]), */projection([-27.02, 79.45]),projection([-26.25, 68.14]),projection([-21.35, 58.16]),projection([-13.03, 48.12]),projection([-5.25, 38.4]),];
dataset[12] = [projection([-131.2, -39.05]),projection([-99.33, -45.04]),projection([-81.17, -44.48]),projection([-69.22, -42.3]),projection([-60.39, -39.15]),projection([-53.54, -35.26]),projection([-48.21, -31.13]),projection([-43.28, -26.38]),projection([-38.47, -21.43]),projection([-33.44, -16.2]),projection([-27.27, -10.17]),projection([-17.22, -2.49]),projection([3.43, 6.11]),];
dataset[13] = [projection([-44.28, 27.57]),projection([-12.26, 35.14]),projection([3.5, 35.28]),projection([15.06, 33.37]),projection([23.49, 30.38]),projection([31.02, 26.53]),projection([37.22, 22.3]),projection([43.24, 17.31]),projection([49.47, 11.5]),projection([57.4, 5.07]),projection([70.53, -3.56]),projection([90.27, -12.29]),];
dataset[14] = [projection([-105.34, 2.43]),projection([-97.18, 0.03]),projection([-77.59, -4.04]),projection([-69.04, -4.07]),projection([-62.43, -2.54]),projection([-57.36, -0.53]),projection([-53.1, 1.46]),projection([-49.03, 5.01]),projection([-44.53, 8.52]),projection([-40.14, 13.26]),projection([-34.23, 19.01]),projection([-25.19, 26.25]),projection([2.03, 40.32]),];
dataset[15] = [projection([75.38, -18.24]),projection([93.33, -12.42]),projection([107.1, -10.43]),projection([115.31, -11.23]),projection([122.07, -13.21]),projection([128.02, -16.21]),projection([133.58, -20.24]),projection([140.45, -25.44]),projection([150.17, -33.14]),projection([179.3, -50.3]),];
dataset[16] = [projection([3.44, 29.26]),projection([24.32, 39.1]),projection([39.42, 46.29]),projection([51.37, 51.09]),projection([63.11, 54.18]),projection([75.09, 56.09]),projection([87.38, 56.41]),projection([100.28, 55.49]),projection([113.34, 53.27]),projection([127.35, 49.12]),projection([146.42, 41.13]),projection([163.41, 33.41]),];
dataset[17] = [projection([1.36, -16.13]),projection([16.52, -22.44]),projection([34.48, -31.27]),projection([46.09, -36.38]),projection([56.1, -40.16]),projection([66, -42.45]),projection([76.12, -44.08]),projection([87.05, -44.21]),projection([98.59, -43.11]),projection([112.5, -40.11]),projection([133.23, -33.17]),projection([151.11, -26.21]),];
dataset[18] = [projection([15.23, -16.49]),projection([42.07, -4.42]),projection([51.1, 0.13]),projection([57.4, 3.38]),projection([63.07, 6.09]),projection([68.07, 7.58]),projection([73, 9.11]),projection([78.03, 9.46]),projection([83.33, 9.42]),projection([89.55, 8.51]),projection([98.02, 6.51]),projection([110.58, 2.31]),projection([130.09, -4.39]),];
dataset[19] = [projection([-177.18, 25.47]),projection([-169.01, 14.32]),projection([-158.22, 8.55]),projection([-151.03, 5]),projection([-144.58, 2.05]),projection([-139.23, -0.06]),projection([-133.48, -1.36]),projection([-127.51, -2.25]),projection([-121, -2.26]),projection([-112.18, -1.2]),projection([-98.19, 2.07]),projection([-78.49, 8.22]),];

var yearset = [];
yearset[0] = ["2019/07/03",'T'];
yearset[1] = ["2019/12/26",'A'];
yearset[2] = ["2020/06/21",'A'];
yearset[3] = ["2020/12/15",'T'];
yearset[4] = ["2021/06/10",'A'];
yearset[5] = ["2021/12/04",'T'];
yearset[6] = ["2023/04/20",'H'];
yearset[7] = ["2023/10/15",'A'];
yearset[8] = ["2024/04/09",'T'];
yearset[9] = ["2024/10/03",'A'];
yearset[10] = ["2026/02/17",'A'];
yearset[11] = ["2026/08/13",'T'];
yearset[12] = ["2027/02/06",'A'];
yearset[13] = ["2027/08/02",'T'];
yearset[14] = ["2028/01/27",'A'];
yearset[15] = ["2028/07/22",'T'];
yearset[16] = ["2030/06/01",'A'];
yearset[17] = ["2030/11/25",'T'];
yearset[18] = ["2031/05/21",'A'];
yearset[19] = ["2031/11/15",'H'];

var color,leng;

for(var i=0;i<=19;i++){
  if(yearset[i][1] == "A"){
    color = 'rgb(218, 165, 32)';
  } else if(yearset[i][1] == 'T'){
    color = 'rgb(240, 248, 255)';
  } else {
    color = 'rgb(235, 0, 235)';
  }
  //　線
  leng = dataset[i].length;

  // console.log(leng);
  var arc = svg.append("path")
      .attr("id", 'p'+i) // 強引にパスのidを数字にしてしまう
      .attr("class", "arc") // 強引にパスのidを数字にしてしまう
      .datum(dataset[i]) // datum
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 5)
      .attr("stroke-linecap", "round")
      .attr("stroke-dasharray", 700)
      .attr("stroke-dashoffset", 700)
      .attr("opacity", 0.2)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .attr("d", d3.line()
        .x(function(d) { return d[0]; })
        .y(function(d) { return d[1]; })
        .curve(d3.curveBasis) // ベーシックカーブ
      );
}

// プロット
var circleset = [];
for(var i=0;i<=19;i++){
  circleset[i] = [55*(i+1)+20, 550];

  if(yearset[i][1] == "A"){
    color = 'rgb(218, 165, 32)';
  } else if(yearset[i][1] == 'T'){
    color = 'rgb(240, 248, 255)';
  } else {
    color = 'rgb(235, 0, 235)';
  }

  var circle = svg.append('g') // SVGのグループ
      .append('circle')
      .attr("id", 'c'+i)
      .attr("class", 'pointed')
      .on("mouseover", circleMouseOver)
      .on("mouseout", circleMouseOut)
      .attr('cx', circleset[i][0])
      .attr('cy', circleset[i][1])
      .attr('r', 10)
      .attr("opacity", 0.2)
      .attr('stroke', 'none') // 枠線色
      .attr('fill', color); // 塗りつぶし色

  var year = svg.append('g') // SVGのグループ
      .append('text')
      .attr('x', circleset[i][0]-23)
      .attr('y', circleset[i][1]+30)
      .text(function (d) { return yearset[i][0];})
      .attr('font-family', 'sans-serif') // 枠線色
      .attr('font-size', '9px') // 塗りつぶし色
      .attr('fill', 'white'); // 塗りつぶし色
}

var year = svg.append('g') // SVGのグループ
    .append('text')
    .attr('x', 105)
    .attr('y', 625)
    .text("The Art of Eclipse Forecast")
    .attr('font-family', 'serif') // 枠線色
    .attr('font-size', '24px') // 塗りつぶし色
    .attr('fill', 'white'); // 塗りつぶし色

  var year = svg.append('g') // 皆既日食
      .append('text')
      .attr('x', 605)
      .attr('y', 625)
      .text("Total Eclipse")
      .attr('font-family', 'serif')
      .attr('font-size', '18px')
      .attr('fill', 'white');
  var circle = svg.append('g')
      .append('circle')
      .attr("id", 'c'+i)
      .on("mouseover", circleMouseOver)
      .on("mouseout", circleMouseOut)
      .attr('cx', 580)
      .attr('cy', 620)
      .attr('r', 10)
      // .attr("opacity", 0.25)
      .attr('stroke', 'none')
      .attr('fill', 'rgb(240, 248, 255)');

  var year = svg.append('g') // 金環日食
      .append('text')
      .attr('x', 805)
      .attr('y', 625)
      .text("Annural Eclipse")
      .attr('font-family', 'serif') // 枠線色
      .attr('font-size', '18px') // 塗りつぶし色
      .attr('fill', 'white'); // 塗りつぶし色
  var circle = svg.append('g')
      .append('circle')
      .attr("id", 'c'+i)
      .on("mouseover", circleMouseOver)
      .on("mouseout", circleMouseOut)
      .attr('cx', 780)
      .attr('cy', 620)
      .attr('r', 10)
      // .attr("opacity", 0.25)
      .attr('stroke', 'none')
      .attr('fill', 'rgb(218, 165, 32)');

  var year = svg.append('g') // 金環皆既日食
      .append('text')
      .attr('x', 1005)
      .attr('y', 625)
      .text("Hybrid Eclipse")
      .attr('font-family', 'serif') // 枠線色
      .attr('font-size', '18px') // 塗りつぶし色
      .attr('fill', 'white'); // 塗りつぶし色
  var circle = svg.append('g')
      .append('circle')
      .attr("id", 'c'+i)
      .on("mouseover", circleMouseOver)
      .on("mouseout", circleMouseOut)
      .attr('cx', 980)
      .attr('cy', 620)
      .attr('r', 10)
      // .attr("opacity", 0.25)
      .attr('stroke', 'none')
      .attr('fill', 'rgb(235, 0, 235)');

  var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

// mouse event (line)
function handleMouseOver(d,i) {
      var arc = d3.select(this)
        .attr("opacity", 0.75);
      var sourceStr = this.id;
      var a = sourceStr.replace('p','#c');
      var id = sourceStr.replace('p','');
      var cir = d3.select(a)
        .attr("opacity", 0.75);

      // console.log(sourceStr);
      if(yearset[id][1]=='T'){
        div
          .style("left", "20px")
          .style("bottom", "170px")
          .style("opacity", 1)
          .html('Total Eclipse<br><p class="ecli">A total eclipse occurs when the dark silhouette of the Moon completely obscures the intensely bright light of the Sun, allowing the much fainter solar corona to be visible. During one eclipse, totality occurs at best only in a narrow track on the surface of the Earth. This narrow track is called the path of totality.</p>');
      } else if(yearset[id][1]=='A'){
        div
          .style("left", "20px")
          .style("bottom", "170px")
          .style("opacity", 1)
          .html('Annual Eclipse<br><p class="ecli">An annular eclipse occurs when the Sun and Moon are exactly in line with the Earth, but the apparent size of the Moon is smaller than that of the Sun. Hence the Sun appears as a very bright ring, or annulus, surrounding the dark disk of the Moon.</p>');
      } else {
        div
          .style("left", "20px")
          .style("bottom", "170px")
          .style("opacity", 1)
          .html('Hybrid Eclipse<br><p class="ecli">A hybrid eclipse (also called annular / total eclipse) shifts between a total and annular eclipse. At the certain points on the surface of Earth, it appears as a total eclipse, whereas at other points it appears as the annular. Hybrid eclipses are comparatively rare.</p>');
      }
}

function handleMouseOut(d, i) {
      d3.select(this)
        .attr("opacity", 0.3)
      var sourceStr = this.id;
      var a = sourceStr.replace('p','#c');
      d3.select(a)
        .attr("opacity", 0.3);
      div
        .style("opacity", 0)
}

// mouse event (circle)
function circleMouseOver(d,i) {
      d3.select(this)
        .attr("opacity", 0.75);
      var sourceStr = this.id;
      console.log(sourceStr);
      var a = sourceStr.replace('c','#p');
      var id = sourceStr.replace('c','');
      d3.select(a)
        // .transition().delay(500).duration(1000)
        // .attr("stroke-width", 20)
        .attr("opacity", 1.0);
      if(yearset[id][1]=='T'){
        div
          .style("left", "20px")
          .style("bottom", "170px")
          .style("opacity", 1)
          .html('Total Eclipse<br><p class="ecli">A total eclipse occurs when the dark silhouette of the Moon completely obscures the intensely bright light of the Sun, allowing the much fainter solar corona to be visible. During one eclipse, totality occurs at best only in a narrow track on the surface of the Earth. This narrow track is called the path of totality.</p>');
      } else if(yearset[id][1]=='A'){
        div
          .style("left", "20px")
          .style("bottom", "170px")
          .style("opacity", 1)
          .html('Annual Eclipse<br><p class="ecli">An annular eclipse occurs when the Sun and Moon are exactly in line with the Earth, but the apparent size of the Moon is smaller than that of the Sun. Hence the Sun appears as a very bright ring, or annulus, surrounding the dark disk of the Moon.</p>');
      } else {
        div
          .style("left", "20px")
          .style("bottom", "170px")
          .style("opacity", 1)
          .html('Hybrid Eclipse<br><p class="ecli">A hybrid eclipse (also called annular / total eclipse) shifts between a total and annular eclipse. At the certain points on the surface of Earth, it appears as a total eclipse, whereas at other points it appears as the annular. Hybrid eclipses are comparatively rare.</p>');
      }
}

function circleMouseOut(d, i) {
      d3.select(this)
        .attr("opacity", 0.3);
      var sourceStr = this.id;
      var a = sourceStr.replace('c','#p');
      d3.select(a)
        .attr("opacity", 0.3);
      div
        .style("opacity", 0);
}

function refresh() {
  location.reload();
}

function why() {
  document.location = "https://www.youtube.com/watch?v=oNH3akWXaV8";
}

function updateData() {
  var x = document.getElementsByClassName("country")
  for(var i=0;i<x.length;i++){
    var r = Math.floor( Math.random() * 255 ).toString(16);
    var g = Math.floor( Math.random() * 255 ).toString(16);
    var b = Math.floor( Math.random() * 255 ).toString(16);
    x[i].style.fill = "#"+ r + g + b;
    x[i].style.stroke = "#666666";
    x[i].style.opacity = 0.5;

  }
}

// 実験的ボタンアート
// var count = 1;
// var len = 0;
// var wid = 0;
// var j = 0;
//
// function updateData() {
//
//   setInterval(function(){
//     count++;
//     // console.log(count);
//
//     // d = new Date();
//     // hh = d.getHours();
//     // mm = d.getMinutes();
//     // ss = d.getSeconds();
//     // dd = d.getMilliseconds();
//     // console.log(ss);
//
//     // for(var i=0;i<=19;i++){
//       // if(yearset[i][1] == "A"){
//       //   color = 'rgb(218, 165, 32)';
//       // } else if(yearset[i][1] == 'T'){
//       //   color = 'rgb(240, 248, 255)';
//       // } else {
//       //   color = 'rgb(235, 0, 235)';
//       // }
//
//       len = dataset[j].length;
//       wid = -(count-1-len/2)*(count-1-len/2)+(len/2)*(len/2);
//       if(wid == 0){
//         wid = 1;
//       }
//       console.log(len);
//       if(count == len+1){
//         count = 1;
//         j++;
//         return;
//       } else if(2<= count <= len){
//         var newData = dataset[j].slice(count-2,count);
//       }
//       console.log(count);
//
//       var arc = svg.append("path")
//           .attr("id", 'p'+i) // 強引にパスのidを数字にしてしまう
//           .datum(newData) // datum
//           .attr("fill", "none")
//           .attr("stroke", 'rgb(240, 248, 255)')
//           .attr("stroke-width", wid)
//           .attr("stroke-linecap", "round")
//           .attr("opacity", 0.1*count)
//           .attr("d", d3.line()
//             .x(function(d) { return d[0]; })
//             .y(function(d) { return d[1]; })
//             .curve(d3.curveBasis) // ベーシックカーブ
//           );
//     // }
//   },1000);
//
// }
