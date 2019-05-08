var zone, city,country,song,video;
var weatherURL,cityURL,songURL,youtubeURL;

zone = '123,30,154,50,10'
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
  console.log(url)
    document.getElementById("player").innerHTML = url;
    if(video != null){
      resolve(console.log("success"))
    } else {
      reject(console.log("err"))
    }
  })
};

getParam(weatherURL)
  .then(res => {
    city = res.list[0].name;
    cityURL = "http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix="+ city;
    console.log(city)
    return getParam(cityURL)
  })
  .then(res => {
    country = res.data[0].country
    songURL = "http://ws.audioscrobbler.com/2.0/?method=geo.getTopTracks&country=japan&api_key=f9cb39ef274c20dc022d3c7f20a708a8&format=json&limit=10";
    console.log(country)
    return getParam(songURL)
  })
  .then(res => {
    song = res.tracks.track[0].name
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
