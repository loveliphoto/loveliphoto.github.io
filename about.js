'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
	document.getElementById('bettyButton').addEventListener('click', bettyButton);
	document.getElementById('benButton').addEventListener('click', benButton);
});

function bettyButton(event) {
	document.getElementById('li').classList.toggle('left');
}

function benButton(event) {
	document.getElementById('li').classList.toggle('right');
}