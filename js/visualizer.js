//initialise simplex noise (replace with perlin noise in future if needed)
var noise = new SimplexNoise();

var vizInit = function (){
  
  var file = document.getElementById("thefile");  // mp3 file
  var audio = document.getElementById("audio"); // audio bar
  var fileLabel = document.querySelector("label.file"); // Select Music
  
  file.onchange = function() {
    fileLabel.classList.add('normal');
    audio.classList.add('active');
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 512;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    // Define scene
    var scene = new THREE.Scene();

    // Define group
    var planes = new THREE.Group();
    planes.position.z = 400;
    var planets = new THREE.Group();
    
    // Define camera
    var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0,0,-200);
    camera.lookAt(scene.position);
    scene.add(camera);

    // Define Renderer
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor(0xf8f8f8);
    // renderer.setRGB( Math.random(), Math.random(),Math.random());

    // Define Plane (Geometry and Material)
    // var planeGeometry1 = new THREE.PlaneGeometry(800, 800, 40, 40);
    var planeGeometry2 = new THREE.PlaneGeometry(4000, 4000, 100, 100);
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        side: THREE.FrontSide, // FrontSide, BackSide, BothSIde
        wireframe: true
    });
    
    // Draw Upper Plane
    var plane = new THREE.Mesh(planeGeometry2, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 40, 0);
    planes.add(plane);
    
    // Draw Bottom Plane
    var plane2 = new THREE.Mesh(planeGeometry2, planeMaterial);
    plane2.rotation.x = -0.5 * Math.PI;
    plane2.position.set(0, -40, 0);
    planes.add(plane2);

    // // Draw right Plane
    // var plane3 = new THREE.Mesh(planeGeometry1, planeMaterial);
    // plane3.rotation.y = -0.5 * Math.PI;
    // plane3.position.set(200, 0, 0);
    // group.add(plane3);
    
    // // Draw left Plane
    // var plane4 = new THREE.Mesh(planeGeometry1, planeMaterial);
    // plane4.rotation.y = -0.5 * Math.PI;
    // plane4.position.set(-200, 0, 0);
    // group.add(plane4);    

    // Define Ball
    var icosahedronGeometry = new THREE.IcosahedronGeometry(1, 3);   
    var ball = new Array(100); 
    var colorball = new Array(100); 

    // Draw Multiple Ball
    for ( var i = 0; i < 100; i ++ ) {
        ball[i] = new THREE.Mesh( icosahedronGeometry, lambertMaterial );

        ball[i].position.x = Math.random() * 400 - 200;
        ball[i].position.y = Math.random() * 80 - 40;
        ball[i].position.z = Math.random() * 1600 - 800;

        ball[i].rotation.x = Math.random() * 720 - 360;
        ball[i].rotation.y = Math.random() * 720 - 360;
        ball[i].rotation.z = Math.random() * 720 - 360;

        colorball[i] = new THREE.Color( 0xffffff ); 
        colorball[i].setRGB( Math.random(), Math.random(),Math.random());
        var lambertMaterial = new THREE.MeshLambertMaterial({
            color: colorball[i],
            wireframe: true
        });

      ball[i].updateMatrix();
      ball[i].matrixAutoUpdate = false;
      planets.add( ball[i] );
    }

    // var ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
    // ball.position.set(0, 0, 0);
    // group.add(ball);

    // Define Lighting
    var ambientLight = new THREE.AmbientLight(0xaaaaaa); // influence reflection
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add( directionalLight );

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.intensity = 2;
    spotLight.position.set(-10, 40, 20);
    for ( var i = 0; i < 100; i ++ ) {
      spotLight.lookAt(ball[i]);
    }
    spotLight.castShadow = true;
    scene.add(spotLight);

    var orbitControls = new THREE.OrbitControls(camera);
    orbitControls.autoRotate = false;

    // var gui = new dat.GUI();
    var guiControls = new function () {
        this.amp = 1.8;
        this.wireframe = true;
    }();
      
    // gui.add(guiControls, 'amp', 0, ball.geometry.parameters.radius - 1);
    // gui.add(guiControls, 'wireframe').onChange(function (e) {
    //     ball.material.wireframe = e;
    // });
    
    // Add Plane and Ball to the Scene
    scene.add(planes);
    scene.add(planets);

    document.getElementById('out').appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    render();

    function render() {
        analyser.getByteFrequencyData(dataArray);

        var lowerHalfArray = dataArray.slice(0, (dataArray.length/2) - 1);
        var upperHalfArray = dataArray.slice((dataArray.length/2) - 1, dataArray.length - 1);

        var overallAvg = avg(dataArray);
        var lowerMax = max(lowerHalfArray);
        var lowerAvg = avg(lowerHalfArray);
        var upperMax = max(upperHalfArray);
        var upperAvg = avg(upperHalfArray);

        var lowerMaxFr = lowerMax / lowerHalfArray.length;
        var lowerAvgFr = lowerAvg / lowerHalfArray.length;
        var upperMaxFr = upperMax / upperHalfArray.length;
        var upperAvgFr = upperAvg / upperHalfArray.length;

        makeRoughGround(plane, modulate(upperAvgFr, 0, 1, 0.5, 4));
        makeRoughGround(plane2, modulate(lowerMaxFr, 0, 1, 0.5, 4));
        for ( var i = 0; i < 100; i ++ ) {
          ball[i].rotation.y += 0.1;
          ball[i].rotation.x += 0.1;
          makeRoughBall(ball[i], modulate(Math.pow(lowerMaxFr, 0.5), 0, 1, 0, 8), modulate(upperAvgFr, 0, 1, 0, 4));
        }
        planets.position.z -= 0.5;
        camera.position.y += 0.05;
        if(planets.position.z == -2000){
          planets.position.z = 2000;
        }
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function makeRoughBall(mesh, bassFr, treFr) {
        mesh.geometry.vertices.forEach(function (vertex, i) {
            var offset = mesh.geometry.parameters.radius;
            var amp = Math.random()+1;
            var time = Date.now();
            vertex.normalize();
            var distance = (offset + bassFr ) + noise.noise3D(vertex.x + time * 0.0007, vertex.y +  time * 0.0008, vertex.z +  time * 0.0009) * amp * treFr;
            vertex.multiplyScalar(distance);
        });
        mesh.geometry.verticesNeedUpdate = true;
        mesh.geometry.normalsNeedUpdate = true;
        mesh.geometry.computeVertexNormals();
        mesh.geometry.computeFaceNormals();
    }

    function makeRoughGround(mesh, distortionFr) {
        mesh.geometry.vertices.forEach(function (vertex, i) {
            var amp = 2;
            var time = Date.now();
            var distance = (noise.noise2D(vertex.x + time * 0.0003, vertex.y + time * 0.0001) + 0) * distortionFr * amp;
            vertex.z = distance;
        });
        mesh.geometry.verticesNeedUpdate = true;
        mesh.geometry.normalsNeedUpdate = true;
        mesh.geometry.computeVertexNormals();
        mesh.geometry.computeFaceNormals();
    }

    audio.play();
  };
}

// main function beginning in the first
window.onload = vizInit();

// event listener
document.body.addEventListener('touchend', function(ev) { context.resume(); });

//some helper functions here
function fractionate(val, minVal, maxVal) {
    return (val - minVal)/(maxVal - minVal);
}

function modulate(val, minVal, maxVal, outMin, outMax) {
    var fr = fractionate(val, minVal, maxVal);
    var delta = outMax - outMin;
    return outMin + (fr * delta);
}

function avg(arr){
    var total = arr.reduce(function(sum, b) { return sum + b; });
    return (total / arr.length);
}

function max(arr){
    return arr.reduce(function(a, b){ return Math.max(a, b); })
}

// todos
// customize the audio controls
// change the background color based on the audio
// display song name inside the vizualization
// implement the same with Perlin noise