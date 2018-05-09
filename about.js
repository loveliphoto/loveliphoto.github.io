'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
	document.getElementById('bettyButton').addEventListener('click', bettyButton);
	document.getElementById('benButton').addEventListener('click', benButton);
});

function bettyButton(event) {
	var classList = document.getElementById('li').classList;
	classList.toggle('center');
	classList.toggle('left');
}

function benButton(event) {
	var classList = document.getElementById('li').classList;
	classList.toggle('center');
	classList.toggle('right');
}