var welcomeMessage = document.querySelector(".welcome-message");
var wrapper = document.querySelector(".wrapper");
var counter = document.querySelector(".countdown");
var progressbar = document.querySelector(".progress-bar");
var progress = document.querySelector(".progress")
var gameover = document.querySelector(".game-over");
var penalty = document.querySelector(".penalty");
var timerel = document.querySelector(".timer");
var footer = document.querySelector(".footer");
var win = document.querySelector(".win");

document.querySelector(".start").addEventListener("click", () => startCountdown())

var countdown = 3;
var timer = 0;
var currentCookie = 0;
var penalties = -1;
var doTimer = true;

var timerInterval;

let cookieWindows = [
	document.getElementById("cookie-1"),
	document.getElementById("cookie-2"),
	document.getElementById("cookie-3"),
	document.getElementById("cookie-4"),
	document.getElementById("cookie-5"),
	document.getElementById("cookie-6"),
	document.getElementById("cookie-7"),
	document.getElementById("cookie-8"),
	document.getElementById("cookie-9"),
	document.getElementById("cookie-10")
];

let windowSizes = [
	[400, 250],
	[400, 250],
	[400, 250],
	[400, 250],
	[400, 250],
	[400, 200],
	[600, 200],
	[500, 300],
	[500, 400],
	[400, 250]
];

setColor(wrapper);

var c5equationSolution = 0;
var c7doAnotherSwap = true;
var c8doReset = true;

c2makeShureChecked();
c3makeShureChecked();
c5createEaquation();
c5resetInput();

function setColor(el){
	var r = Math.floor(Math.random() * 255);
	var g = Math.floor(Math.random() * 255);
	var b = Math.floor(Math.random() * 255);
	el.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
}

function startCountdown(){
	welcomeMessage.classList.toggle("fade");
	footer.classList.toggle("fade");
	setTimeout(updateContdown, 1000);
}

function updateContdown(){
	
	if(countdown == 3){
		welcomeMessage.classList.toggle("hide");
		footer.classList.toggle("hide");
		counter.classList.remove("hide");
	}
	
	if(countdown == 0){
		counter.innerHTML = "GO";
		setTimeout(startGame, 1000);
		setTimeout(() => counter.classList.toggle("fade"), 200);
	}else {
		counter.innerHTML = countdown;
		setTimeout(updateContdown, 1000);
	}

	countdown--;

}

function startGame(){
	counter.classList.toggle("hide");
	progressbar.classList.toggle("hide");
	wrapper.style.top = "50px";
	wrapper.style.height = "calc(100% - 50px)";

	showCookieWindow(currentCookie, windowSizes[currentCookie][0], windowSizes[currentCookie][1]);
	setProgress()
	addPenalty()

	timerInterval = setInterval(timerTick, 10);
}

function showCookieWindow(id, width, height){
	console.log([width, height]);
	cookieWindows[id].classList.remove("hide");
	cookieWindows[id].style.top = (70 + Math.random() * (window.innerHeight - height - 150)).toString() + "px";
	cookieWindows[id].style.left = (Math.random() * (window.innerWidth - width)).toString() + "px";
	cookieWindows[id].style.width = width + "px";
	cookieWindows[id].style.height = height + "px";
}

function setProgress(){
	progress.innerHTML = "Denied Cookies " + currentCookie + "/10";
}

function nextCookie(){
	if(currentCookie == 9){
		// Game finished
		doTimer = false
		cookieWindows[currentCookie].classList.add("hide");
		progressbar.classList.toggle("hide");
		wrapper.style.top = "0px";
		wrapper.style.height = "100%";
		clearInterval(timerInterval);
		win.classList.toggle("hide");
		win.innerHTML = "<h1>You WON!</h1>You clicked wrong " + penalties + " times.<br>Your time was " + (timer/100.0) + " seconds.<br><br><button onclick='restart()'>RESTART</button>"
		return;
	}
	cookieWindows[currentCookie].classList.add("hide");
	currentCookie++;
	setProgress();
	showCookieWindow(currentCookie, windowSizes[currentCookie][0], windowSizes[currentCookie][1]);
	console.log("cookie")

	if(currentCookie == 7){
		c7startRandomness();
	}else if(currentCookie == 8){
		c8makeShureChecked();
	}
}

function gameOver(){
	cookieWindows[currentCookie].classList.add("hide");
	gameover.classList.toggle("hide");
	gameover.innerHTML = "You really done goofed.<br>I gave you a simple task but you still failed at stage one.";
	progressbar.classList.toggle("hide");
	wrapper.style.top = "0px";
	wrapper.style.height = "100%";

}

function timerTick(){
	if(doTimer){
		timer++;
		timerel.innerHTML = (timer / 100.0).toString() + (timer % 100.0 == 0 ? ".0" : "");
	}
}

function reset(){
	currentCookie = 0;
	countdown = 3;
	penalties = -1;
	timer = 0;
	doTimer = true;

	c2makeShureChecked();
	c3makeShureChecked();
	c5createEaquation();
	c5resetInput();
	c2reset();
	c3reset();
	c7doAnotherSwap = true;
	c8doReset = true;
}

function restart(){
	reset();
	welcomeMessage.classList.remove("fade");
	footer.classList.remove("fade");
	counter.classList.remove("fade");
	win.classList.toggle("hide");
	welcomeMessage.classList.toggle("hide");
	footer.classList.toggle("hide");
}

function addPenalty(){
	penalties++;
	penalty.innerHTML = "Penalties: " + penalties;

	if(penalties > 0){
		timer += 500;
	}
}

// Functions for the Cookie Windows. Prefix: cX (x == Cookie Window Number)

function c2makeShureChecked(){
	let options = document.getElementsByClassName("c2-options");
	for(let i = 0; i < options.length; i++){
		options[i].checked = 1;
	}
}

function c2showMore(){
	let cookie = cookieWindows[2];

	cookie.children[0].classList.add("hide");
	cookie.children[1].classList.add("hide");
	cookie.children[2].classList.remove("hide");
	cookie.children[3].classList.remove("hide");
}

function c2reset(){
	let cookie = cookieWindows[2];

	cookie.children[0].classList.remove("hide");
	cookie.children[1].classList.remove("hide");
	cookie.children[2].classList.add("hide");
	cookie.children[3].classList.add("hide");
}

function c2checkOptions(){
	let unchecked = true;
	let options = document.getElementsByClassName("c2-options");
	for(let i = 0; i < options.length; i++){
		if(options[i].checked == 1){
			// One ist still checked
			unchecked = false;
		}
	}

	if(unchecked){
		nextCookie();
	}else{
		addPenalty();
	}
}




function c3makeShureChecked(){
	let options = document.getElementsByClassName("c3-options");
	for(let i = 0; i < options.length; i++){
		options[i].checked = 1;
	}

	document.querySelector(".c3-input").value="Yes";
}

function c3showMore(){
	let cookie = cookieWindows[3];

	cookie.children[0].classList.add("hide");
	cookie.children[1].classList.add("hide");
	cookie.children[2].classList.remove("hide");
	cookie.children[3].classList.remove("hide");
}

function c3reset(){
	let cookie = cookieWindows[3];

	cookie.children[0].classList.remove("hide");
	cookie.children[1].classList.remove("hide");
	cookie.children[2].classList.add("hide");
	cookie.children[3].classList.add("hide");
}

function c3checkOptions(){
	let unchecked = true;
	let options = document.getElementsByClassName("c2-options");
	for(let i = 0; i < options.length; i++){
		if(options[i].checked == 1){
			// One ist still checked
			unchecked = false;
		}
	}

	if(document.querySelector(".c3-input").value != "NO!1!"){
		unchecked = false;
	}

	if(unchecked){
		nextCookie();
	}else{
		addPenalty();
	}
}

function c5resetInput(){
	document.querySelector(".c5-solution").value = "";
}

function c5createEaquation(){
	var span = document.querySelector(".c5-equation");
	let a = Math.floor(Math.random() * 15);
	let b = Math.floor(Math.random() * 5);
	let c = Math.floor(Math.random() * 30);
	c5equationSolution = (a + c) * b;
	span.innerHTML = "<code>( " + a + " + " + c + " ) * " + b + "</code>";
}

function c5checkSolution(){
	let usersol = parseInt(document.querySelector(".c5-solution").value);
	if(c5equationSolution == usersol) {
		nextCookie();
	}else{
		addPenalty();
	}
}

function c7startRandomness(){
	var btn = document.querySelector(".c7-btn");
	btn.style.top = (Math.random() * 140).toString() + "px";
	btn.style.left = (Math.random() * 250).toString() + "px";

	if(c7doAnotherSwap){
		setTimeout(c7startRandomness, 600);
	}
}

function c7endRandomness(){
	c7doAnotherSwap = false;
	nextCookie();
}


function c8makeShureChecked(){
	let options = document.getElementsByClassName("c8-options");
	for(let i = 0; i < options.length; i++){
		options[i].checked = 0;
	}

	if(c8doReset){
		setTimeout(c8makeShureChecked, 5000);
	}
}

function c8checkOptions(){
	let unchecked = false;
	let options = document.getElementsByClassName("c8-options");
	if(options[0].checked == 1 &&
		options[1].checked == 1 &&
		options[2].checked == 0 &&
		options[3].checked == 1 &&
		options[4].checked == 1 &&
		options[5].checked == 1 &&
		options[6].checked == 0){
		unchecked = true;
	}

	if(unchecked){
		c8doReset = false;
		nextCookie();
	}else{
		addPenalty();
	}
}
