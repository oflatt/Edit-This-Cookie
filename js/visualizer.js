

function runVisualizer(){
    var body = document.getElementsByTagName("BODY")[0];
    
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
	console.log(allSeenCookies);
	for (var i = 0; i < allSeenCookies.length; i++) { 
	    console.log(allSeenCookies[i]);
	    ctx.beginPath();
	    var len = allSeenCookies[i].domain.length;
	    ctx.arc(100,125 * (i + 1),35 + len,0,2*Math.PI);
	    ctx.stroke();
	    ctx.fillStyle = "#d2b48c";
	    ctx.fill();
	    ctx.fillStyle = "#000000";
	    ctx.fillText(allSeenCookies[i].domain, 100 - len * 2, 125 * (i + 1));
	}});
}

runVisualizer();

