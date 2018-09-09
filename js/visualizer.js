


var width = 0;
var height = 0;


function fitToContainer(){
    var canvas = document.getElementById("myCanvas");
    width = window.innerWidth-175;
    height = window.innerHeight-10;
    console.log(width);
    canvas.width = width;
    canvas.height = height;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function Bubble(cookie, maxnum){
    this.cookie = cookie;
    this.radius = function(){
	return width/80 + this.cookie.number*(width/100)/maxnum;
    }
    this.x = Math.random()*(width-this.radius()*2) + this.radius();
    this.y = Math.random()*(height-this.radius()*2) + this.radius();
    this.color = getRandomColor();

}

function runVisualizer(){
    
    chrome.storage.local.get("cookies", function(item){
	var allSeenCookies = item.cookies;
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	
	/*
	  ctx.fillStyle = "#FF0000";
	  ctx.fillRect(100,50,300,75);
	  ctx.fillStyle = "#FFFF00";
	  ctx.fillText("foo bar", 100, 100);
	  ctx.fillText("foo bar2", 100, 200);
	*/
	var maxnum = 0;
	for(var i = 0; i<allSeenCookies.length;i++){
	    if(allSeenCookies[i].number > maxnum){
		maxnum = allSeenCookies[i].number;
	    }
	}
	
	console.log(allSeenCookies);
	for (var i = 0; i < allSeenCookies.length; i++) {
	    bubble = new Bubble(allSeenCookies[i], maxnum);
	    console.log(bubble);
	    ctx.beginPath();
	    ctx.arc(bubble.x, bubble.y,bubble.radius(),0,2*Math.PI);
	    ctx.stroke();
	    ctx.fillStyle = bubble.color;
	    ctx.fill();
	    ctx.fillStyle = "#000000";
	    ctx.fillText(bubble.cookie.domain, bubble.x-bubble.radius()/2, bubble.y);
	}});
}
fitToContainer();
runVisualizer();

