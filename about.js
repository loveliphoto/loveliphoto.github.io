'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
	document.getElementById('bettyButton').addEventListener('click', bettyButton);
	document.getElementById('benButton').addEventListener('click', benButton);
	document.getElementById('bettyButt').addEventListener('click', bettyButton);
	document.getElementById('benButt').addEventListener('click', benButton);
});

function bettyButton(event) {
	document.getElementById('bettyButton').classList.toggle('hidden');
	document.getElementById('bettyButt').classList.toggle('hidden');

	var classList = document.getElementById('li').classList;
	classList.toggle('center');
	classList.toggle('left');
}

function benButton(event) {
	document.getElementById('benButton').classList.toggle('hidden');
	document.getElementById('benButt').classList.toggle('hidden');

	var classList = document.getElementById('li').classList;
	classList.toggle('center');
	classList.toggle('right');
}