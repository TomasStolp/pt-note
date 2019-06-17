//http://www.williammalone.com/articles/create-html5-canvas-javascript-game-character/1/



var canvas;
var context;
var images = {};
var totalResources = 4;
var numResourcesLoaded = 0;
var fps = 30;
var x = 50;
var y = 185;
var currentbike = "dirt"


function prepareCanvas(canvasDiv, canvasWidth, canvasHeight)
{
  
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);

	context = document.getElementById('canvas').getContext("2d");
	
	loadImage("dirt");
	loadImage("retro");
	loadImage("sport");
	loadImage("rider");
}

function loadImage(name) {

  images[name] = new Image();
  images[name].onload = function() { 
	  resourceLoaded();
  }
  images[name].src = "images/" + name + ".png";
}

function resourceLoaded() {

  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources) {
  redraw()
  }
}

//  currentbike = document.getElementById("currentbike").innerHTML
//  console.log(currentbike)

function redraw() {
				
  canvas.width = canvas.width; // clears the canvas 


  context.drawImage(images[currentbike], x - 10, y - 125);

  context.drawImage(images["rider"], x - 10, y - 125);
}



var sportbutton = document.getElementById("sport")
sportbutton.onclick = function(){
  currentbike = "sport"
  redraw()
}

var retrobutton = document.getElementById("retro")
retrobutton.onclick = function(){
  currentbike = "retro"
  redraw()
}


var dirtbutton = document.getElementById("dirt")
dirtbutton.onclick = function(){
  currentbike = "dirt"
  redraw()
}
