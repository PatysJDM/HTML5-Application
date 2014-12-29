var vscore, counter, overlay, correct, answers, pictures, current;
vscore 	= 10; 
counter = document.getElementById("counter");
overlay = document.querySelector(".overlay");
correct = 0;
answers = {
"cat.jpg" 	: ["kocka", "kočka", "kočička", "kocicka", "cat"],
"dog.jpg" 	: ["pes", "pejsek", "dog"],
"komar.jpg" : ["komar", "komár", "mosquito"],
"lachtan.jpg" : ["lachtan"],
"lama.jpg" : ["lama"],
"lemur.jpg" : ["lemur", "král Jelimán", "kral Jeliman"]
}
pictures = Object.keys(answers);
current = pictures[0];

var setWindowHeight = function setWindowHeightF(){
    var windowHeight = window.innerHeight;
    windowHeight = Math.floor(windowHeight/10)*10;

    document.body.style.height = windowHeight + "px";
    console.log(document.body.style.height);
}
window.addEventListener("resize",setWindowHeight,false);

setWindowHeight();

var clickHandler = function clickF (){
	if (vscore > 0) vscore--;
	this.style.opacity=0;
	this.style.visibility="hidden";
	counter.innerHTML = "Score: " + vscore;
}
counter.innerHTML = "Score: " + vscore;
level.innerHTML = "Level: " + (correct + 1);

for (var i = 0; i < 100; i++) {
	var cover = document.createElement("div");
	cover.className = "cover";
	cover.addEventListener('click', clickHandler, false);

	overlay.appendChild(cover);		
};

document.forms["submit_form"].onsubmit = function(){
	var answer_in, answer, overlay;
	overlay 		= document.getElementsByClassName("overlay");
	answer_in 		= document.getElementById('answer');
	answer 			= answer_in.value;							// Načtení odpovědi z inputu
	answer_in.value = "";											// Vymazání inputu pro zadání odpovědi

	// Kontrola odpovědi
	if (answers[current].indexOf(answer) != -1){
		correct++;

		removeCover();
		// Po odkrytí obrázku je zpoždění 2s, následně je opět překrytý a až po 1s je nastaven další obrázek na pozadí
		setTimeout(function(){
			if (correct < pictures.length){
				current = pictures[correct];
				addCover();
				setTimeout(function(){
					overlay[0].style.backgroundImage = "url('img/" + current + "')"
					level.innerHTML = "Level: " + (correct + 1);
					vscore = vscore + 10;
					counter.innerHTML = "Score: " + vscore;
				}, 1000);
			}
		}, 2000);
	} 
	

	return false; // aby nedošlo k reloadu stránky
}

var addCover = function addCoverF (){
	var covers = document.getElementsByClassName("cover");
	console.log("covers: " + covers.length);

	for (var i = 0; i<covers.length; i++){
		covers[i].style.visibility="visible";
		covers[i].style.opacity=1;
	}
}

var removeCover = function removeCoverF (){
	var covers = document.getElementsByClassName("cover");
	console.log("covers: " + covers.length);

	for (var i = 0; i<covers.length; i++){
		covers[i].style.visibility="hidden";
		covers[i].style.opacity=0;
	}
}
