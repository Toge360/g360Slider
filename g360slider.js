/*The MIT License (MIT)

Copyright (c) 2017 Tobias Gerlach

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

(function() {
"use strict";

	// globals
	var touchdown;
	var leftPos;
	var width;
	var left;
	var element = document.getElementById('tslides'); // draggable obj
	var mother = document.getElementById('tslider0');
	var motherwidth;
	var motherstyle;
	var tappedElement = "";
	var thisId;
	var style;
	var livePos;
	//var debugEl = document.getElementById('debug'); // debug DIV for outputs
	var bullNav = "";
	var bulnavElement = "";
	var way;
	var direction;
	var elNumber = 0;
	var nextItem;
	var currentElement;
	var newPosition;
	var dummy;
	var dummystyle;
	var dummywidth;
	var pimove;
	var movetime = 0;
	var mousedown = 1;
	var mousemove = 0;
	var myTimer;
	var classCurrent;
	var navElement;
	var bulnavLi;
	var checkWay;
	var aLinks;
	var ltriggerElement;
	var rtriggerElement;
	setup(element,mother); // call Setup
		
	// no scrolling when touching
	element.addEventListener('touchstart', function(e) {e.preventDefault();}, false);
	element.addEventListener('touchmove', function(e) {e.preventDefault();}, false);
	

	
	// Listen for orientation changes 
	window.addEventListener("orientationchange", function() {
		bulnavElement.parentNode.removeChild(bulnavElement);
		ltriggerElement.parentNode.removeChild(ltriggerElement);
		rtriggerElement.parentNode.removeChild(rtriggerElement);
		setup(element,mother); // call Setup
	}, false); 

	// Listen for resize changes 
	window.addEventListener("resize", function() {
		bulnavElement.parentNode.removeChild(bulnavElement);
		ltriggerElement.parentNode.removeChild(ltriggerElement);
		rtriggerElement.parentNode.removeChild(rtriggerElement);
		setup(element,mother); // call Setup
	}, false); 

	
	
	
	
	
	
	// TOUCH ////////////////////////////////////////////////////////////////////////////////////

	
	element.ontouchstart = function (event) { 
		
		movetime = 0;
		mousemove = 0;
		pimove = 0;
		//setInterval(touchtimer, 100) ;
		
		
		myTimer = setInterval(touchtimer, 10);

		
		element.classList.remove('cssanim'); // remove anim class to block animation with css
		
		currentElement = Number(mother.dataset.current);
		//debugEl.innerHTML += 'currentElement: '+currentElement;
		
		 touchdown = event.touches[0].clientX;
		 element = document.getElementById('tslides');
		 style = window.getComputedStyle(element);
		 left = style.getPropertyValue('left');
		 width = parseInt(style.getPropertyValue('width'), 10);
		 leftPos = parseInt(left, 10); 
	 };

	
	element.ontouchmove = function (event) {
		way = 0;
		way = event.touches[0].clientX; // get Drag-Way
		element.style.left = ((leftPos-touchdown)+way)+'px';
		livePos = (leftPos-touchdown)+way;
		mousemove = 1;
		if (currentElement>0) {
			pimove = livePos+(currentElement*dummywidth);
		} else{
			pimove = livePos;
		}
	};

	element.ontouchend = function () {
		
		clearInterval(myTimer);
		
		
		// LINK KLICKS UNTERBINDEN WENN BEWEGT WURDE
		aLinks = element.getElementsByTagName('a');
		for (var l = 0 ; l < aLinks.length ; ++l) {
			aLinks[l].addEventListener("click", function(event) {
				if (pimove > 50) {
					console.log('prevent cause '+pimove); 
					event.preventDefault();
				}
			});
		}
		

		
		// Wenn Movetime kleiner als X ... then make move
		left = style.getPropertyValue('left'); //get left-value after end
		
		if(way <= touchdown){ // nach links
			direction = 1;
			nextItem = currentElement+1;
		} else { // nach rechts
			direction = 0;
			nextItem = currentElement-1;
		}
		
		var nextPosition = dummywidth*nextItem;
		
		if(direction === 0) {
			
			if (nextItem<0) {
				snapBack(leftPos);
			} else {
				if (pimove >= (dummywidth/2)) {
					movetime = 0;
					thisId = nextItem;
					newPosition = nextPosition;
					slide(newPosition,thisId);
				} else {
							
					if ((movetime > 5) && (movetime <= 20) && (pimove > 50)) {
						movetime = 0;
						thisId = nextItem;
						newPosition = nextPosition;
						slide(newPosition,thisId);
					} else {
						movetime = 0;
						snapBack(leftPos);
					}
					
	
				}
			}
		}
		
		if(direction === 1) {		
			pimove = -(pimove);
			if (nextItem>(elNumber-1)) {
				snapBack(leftPos);
			} else {		
				if (pimove <= (dummywidth/2)) {
					
					if ((movetime > 5) && (movetime <= 20) && (pimove > 50)) {
						movetime = 0;
						thisId = nextItem;
						newPosition = nextPosition;
						slide(newPosition,thisId);
					} else {
						movetime = 0;
						snapBack(leftPos);
					}
					
				} else {
					movetime = 0;
					thisId = nextItem; // newID (for mother)
					newPosition = nextPosition;
					slide(newPosition,thisId);
				}
			}
		}
		
		movetime = 0;
	};

	
	// MOUSE ////////////////////////////////////////////////////////////////////////////////////
	
	element.onmousedown = function (event) { 
		
		event.preventDefault();
		
		mousedown = 1;
		mousemove = 0;
		pimove = 0;
		movetime = 0;
		checkWay = 0;
		myTimer = setInterval(touchtimer, 10);
		element.classList.remove('cssanim'); // remove anim class to block animation with css
		currentElement = Number(mother.dataset.current);
		 touchdown = event.clientX;
		 element = document.getElementById('tslides');
		 style = window.getComputedStyle(element);
		 left = style.getPropertyValue('left');
		 width = parseInt(style.getPropertyValue('width'), 10);
		 leftPos = parseInt(left, 10); 
	 };
	
	
	element.onmousemove = function (event) {
		
		
		
		if (mousedown === 1) {
			way = 0;
			way = event.clientX; // get Drag-Way
			mousemove = 1;
			element.style.left = ((leftPos-touchdown)+way)+'px';
			livePos = (leftPos-touchdown)+way;
			if (currentElement>0) {
				pimove = livePos+(currentElement*dummywidth);
			} else{
				pimove = livePos;
			}
		}
	};
	
	
	element.onmouseup = function (event) {		

		mousemove = 0;
		mousedown = 0;
		clearInterval(myTimer);
		
		// LINK KLICKS UNTERBINDEN WENN BEWEGT WURDE
		aLinks = element.getElementsByTagName('a');
		for (var l = 0 ; l < aLinks.length ; ++l) {
			aLinks[l].addEventListener("click", function(event) {
				if (pimove > 50) {
					console.log('prevent cause '+pimove); 
					event.preventDefault();
				}
			});
		}
		
		
		
		
		
		// Wenn Movetime kleiner als X ... then make move
		left = style.getPropertyValue('left'); //get left-value after end

		if(way <= touchdown){ // nach links
			direction = 1;
			nextItem = currentElement+1;
		} else { // nach rechts
			direction = 0;
			nextItem = currentElement-1;
		}
		
		var nextPosition = dummywidth*nextItem;

		
		if(direction === 0) {	
			
			
			
			if (nextItem<0) {
				snapBack(leftPos);
			} else {	
				if (pimove >= (dummywidth/2)) {
					movetime = 0;
					clearInterval(touchtimer);
					thisId = nextItem; // newID (for mother)
					newPosition = nextPosition;
					slide(newPosition,thisId);
				} else {
					
					if (((movetime > 2) && (movetime < 50)) && (pimove > 50)) {
						movetime = 0;
						clearInterval(touchtimer);
						thisId = nextItem;
						newPosition = nextPosition;
						slide(newPosition,thisId); 
					} else {
						movetime = 0;
						clearInterval(touchtimer);
						snapBack(leftPos);
					}	
					
				}
			}
		}
		
		if(direction === 1) {	
			
			//debugEl.innerHTML = 'pi: '+pimove+' MT:'+movetime;
			
			pimove = -(pimove);		
			if (nextItem>(elNumber-1)) {
				snapBack(leftPos);
			} else {		
				if (pimove <= (dummywidth/2)) {
					
					if ((movetime > 2) && (movetime < 50) && (pimove > 50)) {
						movetime = 0;
						clearInterval(touchtimer);
						thisId = nextItem;
						newPosition = nextPosition;
						slide(newPosition,thisId); 
					} else {
						movetime = 0;
						clearInterval(touchtimer);
						snapBack(leftPos);
					}	

				} else {
					movetime = 0;
					clearInterval(touchtimer);
					thisId = nextItem; // newID (for mother)
					newPosition = nextPosition;
					slide(newPosition,thisId);
				}
			}
		}
		
		
	};
	

	
	element.onmouseleave = function () {		
		if (mousedown === 1) {
			mousedown = 0;
			clearInterval(myTimer);
			snapBack(leftPos);
		}
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	function tapHandler(tappedElement,thisId) {	
		newPosition = motherwidth*thisId; // neue Position ermitteln
		slide(newPosition,thisId);
	}
	
	
	function slide(newPosition,thisId) {
		
		element.classList.add('cssanim'); // add anim class to animate with css
		element.style.left = -newPosition+'px'; 	
		setCurrent();
		mother.dataset.current = thisId; // write current Element id to mother
		checkTrigger();

	}
	
	
	function checkTrigger() {	
		currentElement = Number(mother.dataset.current);
		console.log(currentElement); 

		if (currentElement === 0) {ltriggerElement.style.opacity = ".1";} else {ltriggerElement.style.opacity = "1";}
		if (currentElement === (elNumber-1)) {rtriggerElement.style.opacity = ".1";} else {rtriggerElement.style.opacity = "1";}	
	}
	
	
	function setCurrent() {
		// delete "current"-class from bulnav li
		currentElement = Number(mother.dataset.current);
		navElement = bulnavElement.querySelector('[data-id="'+currentElement+'"]'); // "This" Element
		navElement.className = "";
		// add "current"-class to actual bulnav li
		navElement = bulnavElement.querySelector('[data-id="'+thisId+'"]'); // "This" Element
		navElement.className = "current";
	}
	

	function snapBack(leftPos) {
		element.classList.add('cssanim'); // add anim class to animate with css
		element.style.left = leftPos+'px'; 
	}
	
	
	
	function touchtimer(){
		//this will repeat every 5 seconds
		//you can reset counter here
		movetime++;
		//debugEl.innerHTML = 'MT: '+movetime;
	}
	
	
	
	
	function setup(element,mother) {

		// Setup
		elNumber = 0;
		bullNav = '';

		currentElement = Number(mother.dataset.current); // get current Element if there

		if(!currentElement){
			currentElement = 0;
			thisId = 0; // for setCurrent
			mother.dataset.current = 0; // set current data-attribut to mother
		} else {
			thisId = currentElement; // for setCurrent
		}
		
		motherstyle = window.getComputedStyle(mother); // Styles of Mother
		motherwidth = parseInt(motherstyle.getPropertyValue('width'), 10); // width of mother ('px' entfernt)

		var items = element.getElementsByTagName("li"); // get lis under element
		for (var i = 0; i < items.length; ++i) {
			
			elNumber++;
			
			var thisElement = element.getElementsByTagName('li')[i]; // "This" Element
			
			thisElement.style.width = motherwidth+"px"; // gets width of motherelement
			
			thisElement.dataset.id = i; // set data-attribut
			
			if((i===0) && (thisId === 0)){
				classCurrent="current";
			}else{
				classCurrent="";
			} // first li is current
			
			bullNav += '<li data-id="'+i+'" class="'+classCurrent+'"></li>'; // add bulletnav point
			// writing specific data to element
			var thisstyle = window.getComputedStyle(thisElement);
			var thiswidth = parseInt(thisstyle.getPropertyValue('width'), 10);
			thisElement.dataset.left = thiswidth*i; // set data-attribut
			thisElement.dataset.width = thiswidth; // set data-attribut

		}
		
		
		// Trigger Navigation
		var leftTrigger = '<div id="ltrigger" class="triggernav"></div>';
		var rightTrigger = '<div id="rtrigger" class="triggernav"></div>';
		
		
		// set Width to ul#tslides; uses number of lis
		element.style.width = 100*i+"%"; 
		element.style.left = 0; 

		// Building BulNav & TriggerNav
		var ts = document.getElementById('tslider0');
		// BulNav
		ts.insertAdjacentHTML('beforeend', '<ul id="bullnav0" class="bullnav">'+bullNav+'</ul>');
		bulnavElement = document.getElementById('bullnav0');
		
		// Trigger
		ts.insertAdjacentHTML('beforeend', leftTrigger);
		ltriggerElement = document.getElementById('ltrigger');
		
		ts.insertAdjacentHTML('beforeend', rightTrigger);
		rtriggerElement = document.getElementById('rtrigger');
		
		ltriggerElement.style.opacity = ".1"; // left on start "disabled"
		
		
		
		
		var bnstyle = window.getComputedStyle(bulnavElement); // gets all Stylevalues 
		var bnwidth = parseInt(bnstyle.getPropertyValue('width'), 10); 
		bulnavElement.style.marginLeft = "-"+bnwidth/2+"px"; 
	
		setCurrent();  // for BulNav
		
		// use first item of List to define Width of all Items
		dummy = element.getElementsByTagName('li')[0];
		dummystyle = window.getComputedStyle(dummy);
		dummywidth = parseInt(dummystyle.getPropertyValue('width'), 10);
		
		// Jump to current
		var firstLeft = dummywidth*currentElement; // erster left wert
		element.classList.remove('cssanim');
		element.style.left = -firstLeft+'px';
		
		
		// Event-Listener for all Elements (Li) of bulNav
		var bullets = bulnavElement.getElementsByTagName('li'); // make Array
		for (var l = 0 ; l < bullets.length ; ++l) {
			bullets[l].addEventListener("click", function() {
				tappedElement = this;
				thisId = tappedElement.dataset.id;
				tapHandler(tappedElement,thisId);
			});
		}
		
		// Listen for triggerclicks
		rtriggerElement.addEventListener("click", function() {
			currentElement = Number(mother.dataset.current); // get current Element
			thisId = currentElement+1;
			newPosition = motherwidth*thisId; // neue Position ermitteln
			if(thisId<elNumber) {slide(newPosition,thisId);}
		}, false);

		ltriggerElement.addEventListener("click", function() {
			currentElement = Number(mother.dataset.current); // get current Element
			thisId = currentElement-1;
			newPosition = motherwidth*thisId; // neue Position ermitteln
			if(thisId>=0) {slide(newPosition,thisId);}

		}, false);
		
		

	} // setup
	
	
	
	
	
	})();