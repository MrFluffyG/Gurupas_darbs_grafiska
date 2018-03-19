// FPS
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer( );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// update viewport on resize
window.addEventListener( 'resize', function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height );
    camera.aspect = width / height; //aspect ratio
    camera.updateProjectionMatrix();
});

// controls
controls = new THREE.OrbitControls( camera, renderer.domElement);


// creates the shape
var geometry = new THREE.CubeGeometry( 1000, 1000, 1000 );
var cubeMaterials = [
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( "img/ft.png" ), side: THREE.DoubleSide }), //front side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'img/bk.png' ), side: THREE.DoubleSide }), //back side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'img/up.png' ), side: THREE.DoubleSide }), //up side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'img/dn.png' ), side: THREE.DoubleSide }), //down side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'img/rt.png' ), side: THREE.DoubleSide }), //right side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( 'img/lf.png' ), side: THREE.DoubleSide }) //left side
];
// create cube
var cubeMaterial = new THREE.MeshFaceMaterial( cubeMaterials );
var cube = new THREE.Mesh( geometry, cubeMaterial );
scene.add( cube );
var geometry = new THREE.BoxGeometry ( 5, 5, 5 );
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh( geometry, material );
scene.add(cube);
//create spirale (line)
var obj = new THREE.Line(
        new THREE.Geometry(), new THREE.LineBasicMaterial({color: 0x339900}));
    obj.geometry.dynamic = true;
    scene.add(obj);
	// rotation math
	 var tanh = Math.tanh || function tanh(x) {
        return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
    }; 
    var cosh = Math.cosh || function cosh(x) {
        return (Math.exp(x) + Math.exp(-x)) / 2;
    }; 
    var sinh = Math.sinh || function sinh(x) {
        return (Math.exp(x) - Math.exp(-x)) / 2;
    };
	// ensuring rotation
	var sz = 16, cxy = 100, cz = cxy * sz;
    var hxy = Math.PI / cxy, hz = Math.PI / cz;
    var r = 20;
    for (var i = -cz; i < cz; i++) {
        var lxy = i * hxy;
        var lz = i * hz;
        var rxy = r /  cosh(lz);
        var x = rxy * Math.cos(lxy);
        var y = rxy * Math.sin(lxy);
        var z = r * tanh(lz);
        obj.geometry.vertices.push(new THREE.Vector3(x, y, z));
	}
	// rotation animation in loop
	var loop = function loop() {
        requestAnimationFrame(loop);
        obj.rotation.z += 0.1;
        controls.update();
        renderer.clear();
        renderer.render(scene, camera);
    };
	loop();// ensures spinning 

// Camera Position
camera.position.z = 13;
this.controls = new THREE.OrbitControls( this.camera );

// lighting
var ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.3 );
scene.add( ambientLight );



//game logic
var update = function ( ) {
    
};



//render logic
var render = function ( ) {
	requestAnimationFrame( render );
	cube.rotation.x += 0.0001;
	cube.rotation.y += 0.0001;
    renderer.render( scene, camera );
	
};

//run game loop (update, render, repeat)
var GameLoop = function () {
    requestAnimationFrame( GameLoop);
    update();
    render();
};

GameLoop();