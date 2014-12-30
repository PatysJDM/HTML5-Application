var vscore, counter, overlay, correct, answers, pictures, current, scheme, divScore, yourScore, newGame;
vscore 		= 10; 
counter 	= document.getElementById("counter");
overlay 	= document.querySelector(".overlay");
scheme 		= document.getElementById("scheme");
divScore 	= document.getElementById("divScore");
yourScore 	= document.getElementById("yourScore");
newGame 	= document.getElementById("newGame");
correct 	= 0;
answers 	= {
"cat.jpg" 	: ["kocka", "kočka", "kočička", "kocicka", "cat"],
"dog.jpg" 	: ["pes", "pejsek", "dog"],
"komar.jpg" : ["komar", "komár", "mosquito"],
"lachtan.jpg" : ["lachtan"],
"lama.jpg" : ["lama"],
"lemur.jpg" : ["lemur", "král Jelimán", "kral Jeliman"]
}
pictures = Object.keys(answers); // Pole názvů všech obrázků, které mohou být na pozadí
current = pictures[0]; // Aktuální obrázek nastavený na pozadí

/* Funkce pro nastavení výšky body podle velikosti okna */ 
var setWindowHeight = function setWindowHeightF(){
    var windowHeight = window.innerHeight;
    windowHeight = Math.floor(windowHeight/10)*10;	// Výška musí být dělitelná 10, aby nezbylo nezakrytý proužek obrázku
    document.body.style.height = windowHeight + "px";
    // console.log(document.body.style.height);
}
window.addEventListener('resize',setWindowHeight,false); // Při změně velikosti okna se znovu nastaví výška body
newGame.addEventListener('click', function(){window.location.reload();}, false); // Při kliknutí na New game se stránka znovu načte 

setWindowHeight();	// Nastavení výšky body
counter.innerHTML = "Score: " + vscore;	// Zobrazení počátečního skóre (10)
level.innerHTML = "Level: " + (correct + 1); // Zobrazení počátečního levelu

/* Funkce, která se provede po kliknutí na překrývající políčko */
var clickHandler = function clickF(){
	if (vscore > 0) vscore--;	// Skóre se o jedna zmenší, pokud je větší než 0
	this.style.opacity = 0;		// Průhlednost překrývacího divu se nastaví na 0 - zcela průhledný
	this.style.visibility = "hidden"; // Překrývací div již nebude viditelný a nepůjde na něj kliknout
	counter.innerHTML = "Score: " + vscore;	// Aktualizace skóre
}

/* Vytvoření matice divů (10x10), která překrývá obrázek na pozadí */
for (var i = 0; i < 100; i++) {
	var cover = document.createElement("div");
	cover.className = "cover";
	cover.addEventListener('click', clickHandler, false);
	overlay.appendChild(cover);		
};

/* Funkce, která se provede po stistknutí tlačítka submit */
document.forms["submit_form"].onsubmit = function(){
	var answer_in, answer, overlay;
	overlay 		= document.getElementsByClassName("overlay");
	answer_in 		= document.getElementById('answer');
	answer 			= answer_in.value;							// Načtení odpovědi z inputu
	answer_in.value = "";										// Vymazání inputu pro zadání odpovědi

	// Kontrola odpovědi
	if (answers[current].indexOf(answer) != -1){
		correct++; // Počet správně zodpovězených obrázků

		removeCover();	// Odhalení celého obrázku
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
			}else{
				showScore();
			}
		}, 2000);
	} 

	return false; // aby nedošlo k reloadu stránky
}

/* Funkce, která obrázek znovu zakrývá */ 
var addCover = function addCoverF(){
	var covers = document.getElementsByClassName("cover"); // Nalezení všech elementů s třídou cover
	// console.log("covers: " + covers.length);

	for (var i = 0; i < covers.length; i++){
		covers[i].style.visibility = "visible"; // Překrytí je opět viditelné a neprůhledné
		covers[i].style.opacity = 1;
	}
}

/* Funkce pro odhalení celého obrázku */ 
var removeCover = function removeCoverF(){
	var covers = document.getElementsByClassName("cover"); // Nalezení všech elementů s třídou cover
	// console.log("covers: " + covers.length);

	for (var i = 0; i < covers.length; i++){
		covers[i].style.visibility = "hidden"; // Překrytí je neviditelné a průhledné
		covers[i].style.opacity = 0;
	}
}

/* Funkce, která zobrazí skóre na konci hry */
var showScore = function showScoreF(){
	divScore.style.visibility = "visible";
	yourScore.innerHTML = "Your score: " + vscore;
}