var zone, city,country,song,video;
var weatherURL,cityURL,songURL,youtubeURL;

var lon = getRandomInt2(-180, 120);
var lon2 = lon+60;
zone = lon+',-40,'+lon2+',50,10'
weatherURL = 'http://api.openweathermap.org/data/2.5/box/city?bbox=' + zone + '&appid=f6748bf5cbca6df7965ee552869cc300';

const getParam = url => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest()
    req.responseType = 'json'
    req.open('GET', url, true)
    req.setRequestHeader('Accept', 'application/json')
    req.addEventListener('load', (e) => {
      if (req.status === 200) {
        resolve(req.response)
      } else {
        reject(req.statusText)
      }
    })
    req.send()
  })
};

const playyoutube = video => {
  return new Promise((resolve, reject) => {
    console.log(video)
    var url = '<iframe id="ytplayer" width="560" height="315" src="http://www.youtube.com/embed/' + video + '" frameborder="0" allow="autoplay;picture-in-picture" allowfullscreen></iframe>'
  // console.log(url)
    document.getElementById("player").innerHTML = url;
    if(video != null){
      resolve(console.log("success"))
    } else {
      reject(console.log("err"))
    }
  })
};

function search(){
getParam(weatherURL)
  .then(res => {
    // console.log(res)
    var weather = [];
    var city = [];
    var random_city;
    var j = 0;
    for(var i=0;i<res.list.length;i++){
      weather[i] = res.list[i].weather[0].main;
      if(weather[i]=="Rain"){
        city[j] = res.list[i].name;
        j++;
      }
    }
    random_city = city[getRandomInt(city.length)]
    console.log(random_city)
    var html = '<span>' + random_city + ', </span>'
    document.getElementById("info").innerHTML = html;
    cityURL = "http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix="+ random_city;
    return getParam(cityURL)
  })
  .then(res => {
    // console.log(res)
    if(res.data.length != 0){
      country = res.data[0].country
    } else {
      console.log("cannot get Country")
      return console.log("err")
    }

    if(country == "People's Republic of China"){
      country = "China";
    } else if(country == "South Korea"){
      country = "Korea, Republic of";
    } else if(country == "United States of America"){
      country = "United States";
    }

    var html = '<span>' + country + ' is raining now.</span>'
    document.getElementById("info").insertAdjacentHTML('beforeend', html);

    songURL = "http://ws.audioscrobbler.com/2.0/?method=geo.getTopTracks&country=" +country+ "&api_key=f9cb39ef274c20dc022d3c7f20a708a8&format=json&limit=10";
    console.log(country)
    return getParam(songURL)
  })
  .then(res => {
    console.log(res)
    song = res.tracks.track[getRandomInt(10)].name
    console.log(song)
    youtubeURL = "https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=" + song + "&key=AIzaSyCqE1u9cWpZiNN_-BX8LVUOUNdP_E044jM";
    return getParam(youtubeURL)
  })
  .then(res => {
    // console.log(res)
    video = res.items[0].id.videoId
    // console.log(video)
    return playyoutube(video)
  })
  .catch(err => {
    console.log("err")
  });
}


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function getRandomInt2(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
